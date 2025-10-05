import { useState } from "react";
import { Heart, Bookmark, Share2, MoreHorizontal, Play, Pause, Volume2, VolumeX, StickyNote } from "lucide-react";
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
    <Card className="relative w-full h-screen max-w-md mx-auto bg-card overflow-hidden snap-item border-none shadow-none">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border z-20">
        <div className="h-full bg-primary w-0 transition-all duration-300 ease-out"></div>
      </div>

      {/* Video/Content Area - reduced height */}
      <div className="relative h-[60vh] lg:h-[70vh]">
        {/* Thumbnail/Video placeholder */}
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-primary-foreground p-4 lg:hidden">
              <div className="text-5xl mb-3">
                {lesson.language === "Python" && "🐍"}
                {lesson.language === "JavaScript" && "⚡"}
                {lesson.language === "C++" && "⚙️"}
                {lesson.language === "React" && "⚛️"}
              </div>
              <h2 className="text-xl font-bold mb-1 break-words px-2">{lesson.title}</h2>
              <p className="text-base opacity-90 break-words px-2">{lesson.topic}</p>
            </div>
            {/* Desktop centered icon only */}
            <div className="hidden lg:block text-center text-primary-foreground">
              <div className="text-8xl">
                {lesson.language === "Python" && "🐍"}
                {lesson.language === "JavaScript" && "⚡"}
                {lesson.language === "C++" && "⚙️"}
                {lesson.language === "React" && "⚛️"}
              </div>
            </div>
          </div>
        </div>

        {/* Play/Pause overlay */}
        {onPlayToggle && (
          <button
            onClick={onPlayToggle}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200 hover:bg-black/30"
          >
            {isPlaying ? (
              <Pause className="w-16 h-16 text-white drop-shadow-lg" />
            ) : (
              <Play className="w-16 h-16 text-white drop-shadow-lg" />
            )}
          </button>
        )}

        {/* Top info overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
          <div className="flex flex-wrap items-center gap-2 max-w-[calc(100%-80px)]">
            <Badge variant="secondary" className="bg-black/20 text-white border-white/20 text-xs">
              {lesson.creator}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("border text-xs", levelColors[lesson.level])}
            >
              {lesson.level}
            </Badge>
            <Badge variant="secondary" className="bg-black/20 text-white border-white/20 text-xs">
              {lesson.language}
            </Badge>
          </div>
          <div className="flex gap-2">
            {onMuteToggle && (
              <button
                onClick={onMuteToggle}
                className="w-8 h-8 flex items-center justify-center text-white hover:bg-black/30 rounded-full transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={onSwipeRight}
              className="w-8 h-8 flex items-center justify-center text-white hover:bg-black/30 rounded-full transition-colors"
            >
              <StickyNote className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Caption area - bottom for all devices */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pb-20 md:pb-6 max-w-[calc(100%-80px)]">
          <div>
            <h2 className="text-white text-lg lg:text-2xl font-bold mb-1.5 break-words">{lesson.title}</h2>
            <p className="text-white text-sm leading-relaxed break-words">{lesson.caption}</p>
            <p className="text-white/70 text-xs mt-1">{lesson.duration}</p>
          </div>
        </div>

        {/* Right side action buttons (mobile only) - centered vertically */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 lg:hidden flex flex-col gap-4 z-20">
          <button
            onClick={onLike}
            className={cn(
              "w-10 h-10 flex items-center justify-center transition-colors",
              lesson.isLiked ? "text-red-500" : "text-white"
            )}
          >
            <Heart className={cn("w-7 h-7", lesson.isLiked && "fill-current")} />
          </button>

          <button
            onClick={onSave}
            className={cn(
              "w-10 h-10 flex items-center justify-center transition-colors",
              lesson.isSaved ? "text-yellow-400" : "text-white"
            )}
          >
            <Bookmark className={cn("w-7 h-7", lesson.isSaved && "fill-current")} />
          </button>

          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "w-10 h-10 flex items-center justify-center transition-colors",
              showCode ? "text-blue-400" : "text-white"
            )}
          >
            <span className="text-lg font-bold">{"</>"}</span>
          </button>

          <button
            onClick={onShare}
            className="w-10 h-10 flex items-center justify-center text-white transition-colors"
          >
            <Share2 className="w-7 h-7" />
          </button>
        </div>

        {/* Desktop action buttons - right side vertical */}
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-4">
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "w-10 h-10 flex items-center justify-center transition-colors",
              showCode ? "text-blue-400" : "text-white"
            )}
          >
            <span className="text-lg font-bold">{"</>"}</span>
          </button>

          <button
            onClick={onLike}
            className={cn(
              "w-10 h-10 flex items-center justify-center transition-colors",
              lesson.isLiked ? "text-red-500" : "text-white"
            )}
          >
            <Heart className={cn("w-7 h-7", lesson.isLiked && "fill-current")} />
          </button>

          <button
            onClick={onSave}
            className={cn(
              "w-10 h-10 flex items-center justify-center transition-colors",
              lesson.isSaved ? "text-yellow-400" : "text-white"
            )}
          >
            <Bookmark className={cn("w-7 h-7", lesson.isSaved && "fill-current")} />
          </button>

          <button
            onClick={onShare}
            className="w-10 h-10 flex items-center justify-center text-white transition-colors"
          >
            <Share2 className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Code snippet overlay */}
      {showCode && lesson.codeSnippet && (
        <div className="absolute inset-0 bg-card overflow-y-auto overscroll-contain touch-pan-y ios-touch-scroll z-30 pb-20 md:pb-6">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3 sticky top-0 bg-card pb-2 z-10">
              <h4 className="font-semibold">Code Example</h4>
              <button
                onClick={() => setShowCode(false)}
                className="text-muted-foreground hover:text-foreground w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            
            <div className="bg-muted rounded-lg p-3 mb-3 overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap break-words">
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
                      <span className="break-words">{takeaway}</span>
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