import { useState, useEffect, useRef } from "react";
import { LessonCard } from "./LessonCard";
import { QuizCard } from "./QuizCard";
import { expandedLessons, expandedQuizzes } from "@/data/expandedContent";
import { toast } from "sonner";

interface FeedItem {
  type: "lesson" | "quiz" | "ad";
  data: any;
}

interface FeedProps {
  onNavigateToNotes: (lessonId: string) => void;
}

export const Feed = ({ onNavigateToNotes }: FeedProps) => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const programmaticScroll = useRef(false);

  useEffect(() => {
    const el = itemRefs.current[currentIndex];
    if (el && programmaticScroll.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      programmaticScroll.current = false;
    }
  }, [currentIndex]);

  useEffect(() => {
    // Generate feed with lessons, periodic quizzes, and ads
    const items: FeedItem[] = [];
    
    expandedLessons.forEach((lesson, index) => {
      items.push({ type: "lesson", data: lesson });
      
      // Add quiz every 5 lessons
      if ((index + 1) % 5 === 0 && expandedQuizzes[Math.floor(index / 5)]) {
        items.push({ 
          type: "quiz", 
          data: expandedQuizzes[Math.floor(index / 5)] 
        });
      }
      
      // Add promotional ad every 15 items
      if ((index + 1) % 15 === 0) {
        items.push({
          type: "ad",
          data: {
            id: `ad-${index}`,
            title: "Upgrade to Pro",
            description: "Unlock advanced courses and coding challenges",
            cta: "Start Free Trial",
            image: "🚀"
          }
        });
      }
    });
    
    setFeedItems(items);
  }, []);

  // Keep currentIndex in sync with the visible item
  useEffect(() => {
    const rootEl = listRef.current;
    if (!rootEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number((visible.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) {
            setCurrentIndex((prev) => (prev !== idx ? idx : prev));
          }
        }
      },
      { root: rootEl, threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [feedItems.length]);

  const handleLike = (lessonId: string) => {
    setFeedItems((prev) => {
      let isNowLiked = false;
      const updated = prev.map((item) => {
        if (item.type === "lesson" && item.data.id === lessonId) {
          isNowLiked = !item.data.isLiked;
          return {
            ...item,
            data: {
              ...item.data,
              isLiked: isNowLiked,
              likes: item.data.likes + (isNowLiked ? 1 : -1),
            },
          };
        }
        return item;
      });

      toast.success(
        isNowLiked ? "Added to your liked lessons!" : "Removed from liked lessons!",
        { duration: 2000 }
      );

      return updated;
    });
  };

  const handleSave = (lessonId: string) => {
    setFeedItems((prev) => {
      let isNowSaved = false;
      const updated = prev.map((item) => {
        if (item.type === "lesson" && item.data.id === lessonId) {
          isNowSaved = !item.data.isSaved;
          return {
            ...item,
            data: {
              ...item.data,
              isSaved: isNowSaved,
            },
          };
        }
        return item;
      });

      toast.success(isNowSaved ? "Saved for later!" : "Removed from saved lessons!", { duration: 2000 });

      return updated;
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", { duration: 2000 });
  };

  const handleQuizAnswer = (correct: boolean) => {
    if (correct) {
      toast.success("Correct! Great job! 🎉");
    } else {
      toast.error("Not quite right. Keep learning! 📚");
    }
    
    // Move to next item after quiz
    setTimeout(() => {
      if (currentIndex < feedItems.length - 1) {
        programmaticScroll.current = true;
        setCurrentIndex(prev => prev + 1);
      }
    }, 1500);
  };

  const handleQuizSkip = () => {
    toast("Quiz skipped");
    if (currentIndex < feedItems.length - 1) {
      programmaticScroll.current = true;
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (feedItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your personalized feed...</p>
        </div>
      </div>
    );
  }

  return (
    // Feed container - uses dvh (dynamic viewport height) for proper mobile browser support
    // Snap scroll ensures cards align properly on all screen sizes
    // overflow-y-auto enables vertical scrolling
    <div ref={listRef} className="min-h-[100dvh] min-h-screen overflow-y-auto snap-scroll scrollbar-hide">
      {feedItems.map((item, index) => (
        // Each feed item wrapper - maintains full width responsiveness
        <div ref={(el) => (itemRefs.current[index] = el)} data-index={index} key={`${item.type}-${index}`} className="w-full">
          {item.type === "lesson" ? (
            <LessonCard
              lesson={item.data}
              isPlaying={index === currentIndex}
              onLike={() => handleLike(item.data.id)}
              onSave={() => handleSave(item.data.id)}
              onShare={handleShare}
              onSwipeRight={() => onNavigateToNotes(item.data.id)}
            />
          ) : item.type === "quiz" ? (
            <QuizCard
              quiz={item.data}
              onAnswer={handleQuizAnswer}
              onSkip={handleQuizSkip}
            />
          ) : (
            // Ad card - responsive sizing and spacing for all screens
            // Uses dvh for consistent height across mobile browsers
            <div className="min-h-[100dvh] min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow relative snap-item px-4 sm:px-6">
              <div className="text-center text-primary-foreground z-10 max-w-2xl">
                <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">{item.data.image}</div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{item.data.title}</h2>
                <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-md mx-auto px-4">{item.data.description}</p>
                <button className="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/90 transition-colors">
                  {item.data.cta}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Load more indicator - responsive text and padding */}
      <div className="h-16 sm:h-20 flex items-center justify-center bg-muted/50">
        <p className="text-xs sm:text-sm text-muted-foreground">Loading more lessons...</p>
      </div>
    </div>
  );
};