import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { coursesData } from "@/data/coursesData";
import ReactMarkdown from "react-markdown";

interface LessonViewerProps {
  courseId: string;
  lessonId: string;
  onBack: () => void;
}

export const LessonViewer = ({ courseId, lessonId, onBack }: LessonViewerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const course = coursesData[courseId as keyof typeof coursesData];
  const lesson = course?.curriculum.find(l => l.id === Number(lessonId));


  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20 lg:pb-0">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lesson not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const currentIndex = course.curriculum.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? course.curriculum[currentIndex - 1] : null;
  const nextLesson = currentIndex < course.curriculum.length - 1 ? course.curriculum[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="p-4 border-b border-border sticky top-0 bg-background z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Lesson {currentIndex + 1} of {course.curriculum.length}
                </p>
              </div>
            </div>
            <Badge variant={lesson.type === 'video' ? 'default' : 'secondary'}>
              {lesson.type === 'video' ? 'Video' : 'Notes'}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <Card className="overflow-hidden">
            {lesson.type === 'video' ? (
              // Video Player
              <div className="relative bg-gradient-hero aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">{course.thumbnail}</div>
                  <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                  <p className="text-white/80 mb-4">{lesson.duration}</p>
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Play Video
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              // Notes Content
              <ScrollArea className="h-[70vh]">
                <div className="p-6 md:p-8 prose prose-sm md:prose-base dark:prose-invert max-w-none">
                  <h1>{lesson.title}</h1>
                  <ReactMarkdown>{lesson.notesContent || ''}</ReactMarkdown>
                </div>
              </ScrollArea>
            )}
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            {prevLesson ? (
              <Button
                variant="outline"
                onClick={onBack}
                className="text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Button
                onClick={onBack}
                className="text-sm"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={onBack}
              >
                Back to Course
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
