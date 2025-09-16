import { useState } from "react";
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, Trophy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface VideoCoursePageProps {
  courseId: string;
  onBack: () => void;
  onStartVideo?: () => void;
}

const videoCourseData = {
  "1": {
    title: "Python Fundamentals Video Series",
    description: "Watch comprehensive video tutorials covering Python programming from basics to advanced concepts.",
    instructor: "Dr. Sarah Chen",
    level: "Beginner",
    estimatedTime: "2 hours",
    videos: 15,
    students: 18500,
    rating: 4.9,
    thumbnail: "🐍",
    skills: ["Variables", "Functions", "OOP", "Data Structures", "Error Handling"],
    videoList: [
      { id: 1, title: "Python Installation & Setup", duration: "8 min", completed: true },
      { id: 2, title: "Variables and Data Types", duration: "12 min", completed: true },
      { id: 3, title: "Working with Strings", duration: "10 min", completed: false },
      { id: 4, title: "Lists and Tuples", duration: "15 min", completed: false },
      { id: 5, title: "Dictionaries and Sets", duration: "12 min", completed: false },
      { id: 6, title: "Conditional Statements", duration: "10 min", completed: false },
      { id: 7, title: "Loops and Iteration", duration: "14 min", completed: false },
      { id: 8, title: "Functions Basics", duration: "16 min", completed: false },
      { id: 9, title: "Advanced Functions", duration: "12 min", completed: false },
      { id: 10, title: "Classes and Objects", duration: "18 min", completed: false },
      { id: 11, title: "Inheritance", duration: "14 min", completed: false },
      { id: 12, title: "File Handling", duration: "12 min", completed: false },
      { id: 13, title: "Exception Handling", duration: "10 min", completed: false },
      { id: 14, title: "Libraries and Modules", duration: "15 min", completed: false },
      { id: 15, title: "Final Project Walkthrough", duration: "20 min", completed: false }
    ]
  },
  "2": {
    title: "JavaScript ES6+ Video Course",
    description: "Master modern JavaScript with practical video examples and real-world applications.",
    instructor: "Alex Rodriguez",
    level: "Intermediate",
    estimatedTime: "1.5 hours",
    videos: 12,
    students: 14200,
    rating: 4.8,
    thumbnail: "⚡",
    skills: ["ES6 Syntax", "Async Programming", "Modules", "Advanced Patterns"],
    videoList: [
      { id: 1, title: "ES6 Introduction", duration: "6 min", completed: false },
      { id: 2, title: "Arrow Functions Explained", duration: "8 min", completed: false },
      { id: 3, title: "Destructuring in Detail", duration: "10 min", completed: false },
      { id: 4, title: "Template Literals", duration: "7 min", completed: false },
      { id: 5, title: "Promises Deep Dive", duration: "12 min", completed: false },
      { id: 6, title: "Async/Await Mastery", duration: "10 min", completed: false },
      { id: 7, title: "ES6 Modules", duration: "9 min", completed: false },
      { id: 8, title: "Classes in JavaScript", duration: "11 min", completed: false },
      { id: 9, title: "Map and Set Objects", duration: "8 min", completed: false },
      { id: 10, title: "Symbols and Iterators", duration: "9 min", completed: false },
      { id: 11, title: "Advanced ES6 Patterns", duration: "13 min", completed: false },
      { id: 12, title: "Building a Modern JS App", duration: "15 min", completed: false }
    ]
  }
};

export const VideoCoursePage = ({ courseId, onBack, onStartVideo }: VideoCoursePageProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const course = videoCourseData[courseId as keyof typeof videoCourseData];

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Video course not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const completedVideos = course.videoList.filter(video => video.completed).length;
  const progressPercentage = (completedVideos / course.videos) * 100;

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold">Video Course</h1>
          </div>
        </div>

        {/* Course Hero */}
        <div className="p-4 md:p-6">
          <Card className="p-4 md:p-6 gradient-hero text-white">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="text-4xl md:text-6xl mx-auto md:mx-0">{course.thumbnail}</div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-white/90 mb-4">
                  {showFullDescription 
                    ? course.description 
                    : course.description.slice(0, 120) + "..."
                  }
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-white/80 hover:text-white ml-2 underline"
                  >
                    {showFullDescription ? "Show less" : "See more"}
                  </button>
                </p>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 text-sm text-white/80 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    {course.videos} videos
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {course.rating}
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                  {course.level}
                </Badge>
              </div>
            </div>

            {progressPercentage > 0 && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/80">Progress</span>
                  <span className="text-sm text-white/80">{completedVideos}/{course.videos} completed</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button 
                onClick={onStartVideo}
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 mr-2" />
                {progressPercentage > 0 ? "Continue Watching" : "Start Videos"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Course Content */}
        <div className="p-4 md:p-6 grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills You'll Learn */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                What You'll Learn
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {course.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Video List */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Video Playlist</h3>
              <div className="space-y-2">
                {course.videoList.map((video, index) => (
                  <div 
                    key={video.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50 cursor-pointer",
                      video.completed && "bg-success/10 border-success/20"
                    )}
                    onClick={() => onStartVideo?.()}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        video.completed 
                          ? "bg-success text-success-foreground" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {video.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{video.title}</p>
                        <p className="text-xs text-muted-foreground">{video.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Instructor</h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground mt-1">Video Course Instructor</p>
                </div>
              </div>
            </Card>

            {/* Course Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Course Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Level</span>
                  <Badge variant="secondary">{course.level}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="text-sm font-medium">{course.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Videos</span>
                  <span className="text-sm font-medium">{course.videos}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Students</span>
                  <span className="text-sm font-medium">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-warning" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};