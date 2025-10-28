import { useState } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    creator: string;
    language: string;
    topic: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    caption: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    codeSnippet?: string;
    takeaways?: string[];
    likes: number;
    isLiked: boolean;
    isSaved: boolean;
  };
  isPlaying?: boolean;
  isMuted?: boolean;
  onPlayToggle?: () => void;
  onMuteToggle?: () => void;
  onLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  onSwipeRight?: () => void;
}

export const LessonCard = ({ 
  lesson, 
  isPlaying = false,
  isMuted = true,
  onPlayToggle,
  onMuteToggle,
  onLike,
  onSave,
  onShare,
  onSwipeRight 
}: LessonCardProps) => {
  const [showCode, setShowCode] = useState(false);

  const levelColors = {
    Beginner: "bg-success/10 text-success border-success/20",
    Intermediate: "bg-warning/10 text-warning border-warning/20", 
    Advanced: "bg-destructive/10 text-destructive border-destructive/20"
  };

  return (
    <Card className="relative w-full h-screen max-w-md lg:max-w-none mx-auto bg-card overflow-hidden snap-item border-none shadow-none">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border z-20">
        <div className="h-full bg-primary w-0 transition-all duration-300 ease-out"></div>
      </div>

      {/* Card Content Area */}
      <div className="relative h-full">
        {/* Main card content */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted/30 flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            {/* Card header with icon */}
            <div className="text-center mb-8">
              <div className="text-7xl mb-6">
                {lesson.language === "Python" && "🐍"}
                {lesson.language === "JavaScript" && "⚡"}
                {lesson.language === "C++" && "⚙️"}
                {lesson.language === "React" && "⚛️"}
              </div>
            </div>
            
            {/* Card body with placeholder content */}
            <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">{lesson.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {lesson.caption}
              </p>
              <div className="space-y-4">
                <p className="text-foreground">
                  In this lesson, we'll explore the fundamental concepts and practical applications. You'll learn step-by-step how to implement this technique in your own projects.
                </p>
                <p className="text-muted-foreground">
                  We'll cover best practices, common pitfalls to avoid, and real-world examples that demonstrate the power of this approach.
                </p>
                <p className="text-foreground">
                  By the end of this bite-sized lesson, you'll have a solid understanding and be ready to apply these concepts immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top info badges */}
        <div className="absolute top-6 left-4 right-4 flex items-start justify-between z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {lesson.creator}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("border text-xs", levelColors[lesson.level])}
            >
              {lesson.level}
            </Badge>
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {lesson.language}
            </Badge>
          </div>
        </div>


        {/* Right side action buttons (mobile only) - centered vertically like TikTok */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 lg:hidden flex flex-col gap-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={cn(
              "w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 flex-col border-0",
              lesson.isLiked ? "text-destructive" : "text-foreground"
            )}
          >
            <Heart className={cn("w-7 h-7", lesson.isLiked && "fill-current")} />
            <span className="text-xs mt-0.5 font-medium">{lesson.likes > 999 ? `${Math.floor(lesson.likes/1000)}k` : lesson.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className={cn(
              "w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0",
              lesson.isSaved ? "text-warning" : "text-foreground"
            )}
          >
            <Bookmark className={cn("w-7 h-7", lesson.isSaved && "fill-current")} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0",
              showCode ? "text-primary" : "text-foreground"
            )}
          >
            <span className="text-lg font-bold">{"</>"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-150 border-0"
          >
            <Share2 className="w-7 h-7" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSwipeRight}
            className="w-14 h-14 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-all duration-150 border-0"
          >
            <span className="text-xl">📝</span>
          </Button>
        </div>

        {/* Desktop action buttons - right side vertical */}
        <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0",
              showCode ? "text-primary" : "text-foreground"
            )}
          >
            <span className="text-lg font-bold">{"</>"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={cn(
              "w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0 flex-col",
              lesson.isLiked ? "text-destructive" : "text-foreground"
            )}
          >
            <Heart className={cn("w-6 h-6", lesson.isLiked && "fill-current")} />
            <span className="text-xs mt-0.5 font-medium">{lesson.likes > 999 ? `${Math.floor(lesson.likes/1000)}k` : lesson.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className={cn(
              "w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0",
              lesson.isSaved ? "text-warning" : "text-foreground"
            )}
          >
            <Bookmark className={cn("w-6 h-6", lesson.isSaved && "fill-current")} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-150 border-0"
          >
            <Share2 className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSwipeRight}
            className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-all duration-150 border-0"
          >
            <span className="text-xl">📝</span>
          </Button>
        </div>
      </div>

      {/* Code snippet overlay */}
      {showCode && lesson.codeSnippet && (
        <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border animate-slide-up max-h-[70%] overflow-y-auto overscroll-contain touch-pan-y ios-touch-scroll">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Code Example</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCode(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>
            
            <div className="bg-muted rounded-lg p-3 mb-3">
              <pre className="text-sm overflow-x-auto">
                <code>{lesson.codeSnippet}</code>
              </pre>
            </div>

            {lesson.takeaways && (
              <div>
                <h5 className="font-medium mb-2 text-sm">Key Takeaways:</h5>
                <ul className="space-y-1">
                  {lesson.takeaways.map((takeaway, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};