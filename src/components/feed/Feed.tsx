import { useState, useEffect } from "react";
import { LessonCard } from "./LessonCard";
import { QuizCard } from "./QuizCard";
import { sampleLessons, sampleQuizzes } from "@/data/sampleContent";
import { toast } from "sonner";

interface FeedItem {
  type: "lesson" | "quiz";
  data: any;
}

export const Feed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Generate feed with lessons and periodic quizzes
    const items: FeedItem[] = [];
    
    sampleLessons.forEach((lesson, index) => {
      items.push({ type: "lesson", data: lesson });
      
      // Add quiz every 3 lessons
      if ((index + 1) % 3 === 0 && sampleQuizzes[Math.floor(index / 3)]) {
        items.push({ 
          type: "quiz", 
          data: sampleQuizzes[Math.floor(index / 3)] 
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
    
    toast.success("Added to your liked lessons!");
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
    
    toast.success("Saved for later!");
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
            />
          ) : (
            <QuizCard
              quiz={item.data}
              onAnswer={handleQuizAnswer}
              onSkip={handleQuizSkip}
            />
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