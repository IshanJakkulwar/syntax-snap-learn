import { useState, useEffect } from "react";
import { LessonCard } from "./LessonCard";
import { QuizCard } from "./QuizCard";
import { expandedLessons, expandedQuizzes } from "@/data/expandedContent";
import { toast } from "sonner";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [direction, setDirection] = useState(0);

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

  const handleNext = () => {
    if (currentIndex < feedItems.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrevious();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

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
    
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleQuizSkip = () => {
    toast("Quiz skipped");
    handleNext();
  };

  if (feedItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your personalized feed...</p>
        </div>
      </div>
    );
  }

  const currentItem = feedItems[currentIndex];
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center relative overflow-hidden px-4 md:px-0">
      {/* Navigation Buttons - Desktop */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border disabled:opacity-30"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        disabled={currentIndex === feedItems.length - 1}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border border-border disabled:opacity-30"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Card Container */}
      <div className="w-full max-w-2xl h-[90vh] md:h-[85vh] relative">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <div className="w-full h-full bg-card rounded-2xl shadow-xl overflow-hidden">
              {currentItem.type === "lesson" ? (
                <LessonCard
                  lesson={currentItem.data}
                  isPlaying={true}
                  onLike={() => handleLike(currentItem.data.id)}
                  onSave={() => handleSave(currentItem.data.id)}
                  onShare={handleShare}
                  onSwipeRight={() => onNavigateToNotes(currentItem.data.id)}
                />
              ) : currentItem.type === "quiz" ? (
                <QuizCard
                  quiz={currentItem.data}
                  onAnswer={handleQuizAnswer}
                  onSkip={handleQuizSkip}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow relative">
                  <div className="text-center text-primary-foreground z-10 px-6">
                    <div className="text-8xl mb-6">{currentItem.data.image}</div>
                    <h2 className="text-3xl font-bold mb-4">{currentItem.data.title}</h2>
                    <p className="text-xl opacity-90 mb-8 max-w-md mx-auto">{currentItem.data.description}</p>
                    <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors">
                      {currentItem.data.cta}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
        <p className="text-sm font-medium text-muted-foreground">
          {currentIndex + 1} / {feedItems.length}
        </p>
      </div>
    </div>
  );
};