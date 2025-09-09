import { useState } from "react";
import { Heart, Bookmark, Share2, MoreHorizontal, Play, Pause, Volume2, VolumeX } from "lucide-react";
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
}

export const LessonCard = ({ 
  lesson, 
  isPlaying = false,
  isMuted = true,
  onPlayToggle,
  onMuteToggle,
  onLike,
  onSave,
  onShare 
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

      {/* Video/Content Area */}
      <div className="relative h-full">
        {/* Thumbnail/Video placeholder */}
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-primary-foreground p-6">
              <div className="text-6xl mb-4">
                {lesson.language === "Python" && "🐍"}
                {lesson.language === "JavaScript" && "⚡"}
                {lesson.language === "C++" && "⚙️"}
                {lesson.language === "React" && "⚛️"}
              </div>
              <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
              <p className="text-lg opacity-90">{lesson.topic}</p>
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
        <div className="absolute top-6 left-4 right-4 flex items-start justify-between z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-black/20 text-white border-white/20">
              {lesson.creator}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("border text-xs", levelColors[lesson.level])}
            >
              {lesson.level}
            </Badge>
            <Badge variant="secondary" className="bg-black/20 text-white border-white/20">
              {lesson.language}
            </Badge>
          </div>
          {onMuteToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMuteToggle}
              className="bg-black/20 text-white hover:bg-black/30 border-white/20"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {/* Bottom info and actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          {/* Caption */}
          <div className="mb-4">
            <p className="text-white text-sm leading-relaxed">{lesson.caption}</p>
            <p className="text-white/70 text-xs mt-1">{lesson.duration}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="text-white hover:bg-white/20"
            >
              {showCode ? "Hide Code" : "Show Code"}
            </Button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={onLike}
                className={cn(
                  "text-white hover:bg-white/20 transition-colors",
                  lesson.isLiked && "text-red-400"
                )}
              >
                <Heart className={cn("w-5 h-5", lesson.isLiked && "fill-current")} />
                <span className="text-xs ml-1">{lesson.likes}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onSave}
                className={cn(
                  "text-white hover:bg-white/20 transition-colors",
                  lesson.isSaved && "text-yellow-400"
                )}
              >
                <Bookmark className={cn("w-5 h-5", lesson.isSaved && "fill-current")} />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onShare}
                className="text-white hover:bg-white/20"
              >
                <Share2 className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Code snippet overlay */}
      {showCode && lesson.codeSnippet && (
        <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border animate-slide-up max-h-[50%] overflow-y-auto">
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