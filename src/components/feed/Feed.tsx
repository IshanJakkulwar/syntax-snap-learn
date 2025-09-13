import { useState, useEffect } from "react";
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

  const handleLike = (lessonId: string) => {
    setFeedItems(prev => prev.map(item => {
      if (item.type === "lesson" && item.data.id === lessonId) {
        const isLiked = !item.data.isLiked;
        return {
          ...item,
          data: {
            ...item.data,
            isLiked,
            likes: item.data.likes + (isLiked ? 1 : -1)
          }
        };
      }
      return item;
    }));
    
    const lesson = feedItems.find(item => item.type === "lesson" && item.data.id === lessonId)?.data;
    if (lesson?.isLiked) {
      toast.success("Added to your liked lessons!");
    } else {
      toast.success("Removed from liked lessons!");
    }
  };

  const handleSave = (lessonId: string) => {
    setFeedItems(prev => prev.map(item => {
      if (item.type === "lesson" && item.data.id === lessonId) {
        const isSaved = !item.data.isSaved;
        return {
          ...item,
          data: {
            ...item.data,
            isSaved
          }
        };
      }
      return item;
    }));
    
    const lesson = feedItems.find(item => item.type === "lesson" && item.data.id === lessonId)?.data;
    if (lesson?.isSaved) {
      toast.success("Saved for later!");
    } else {
      toast.success("Removed from saved lessons!");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
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
        setCurrentIndex(prev => prev + 1);
      }
    }, 1500);
  };

  const handleQuizSkip = () => {
    toast("Quiz skipped");
    if (currentIndex < feedItems.length - 1) {
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
    <div className="h-screen overflow-y-auto snap-scroll custom-scrollbar">
      {feedItems.map((item, index) => (
        <div key={`${item.type}-${index}`} className="w-full">
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
            <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow relative snap-item">
              <div className="text-center text-primary-foreground z-10">
                <div className="text-8xl mb-6">{item.data.image}</div>
                <h2 className="text-3xl font-bold mb-4">{item.data.title}</h2>
                <p className="text-xl opacity-90 mb-8 max-w-md">{item.data.description}</p>
                <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors">
                  {item.data.cta}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Load more indicator */}
      <div className="h-20 flex items-center justify-center bg-muted/50">
        <p className="text-sm text-muted-foreground">Loading more lessons...</p>
      </div>
    </div>
  );
};