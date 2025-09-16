import { useState } from "react";
import { ArrowLeft, Play, Clock, Users, Star, BookOpen, Trophy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseDetailProps {
  courseId: string;
  onBack: () => void;
  onStartCourse?: () => void;
}

const courseData = {
  "1": {
    title: "Python Fundamentals",
    description: "Master the basics of Python programming with hands-on exercises and real-world projects. This comprehensive course covers variables, data types, control structures, functions, and object-oriented programming concepts.",
    instructor: "Dr. Sarah Chen",
    instructorBio: "Senior Software Engineer at Google with 8+ years in Python development",
    level: "Beginner",
    estimatedTime: "45 min",
    lessons: 12,
    students: 15420,
    rating: 4.8,
    thumbnail: "🐍",
    skills: ["Variables & Data Types", "Control Flow", "Functions", "OOP Basics", "File Handling"],
    curriculum: [
      { id: 1, title: "Introduction to Python", duration: "3 min", completed: true },
      { id: 2, title: "Variables and Data Types", duration: "4 min", completed: true },
      { id: 3, title: "Working with Strings", duration: "3 min", completed: false },
      { id: 4, title: "Lists and Dictionaries", duration: "5 min", completed: false },
      { id: 5, title: "Control Flow - If Statements", duration: "4 min", completed: false },
      { id: 6, title: "Loops in Python", duration: "5 min", completed: false },
      { id: 7, title: "Functions Basics", duration: "4 min", completed: false },
      { id: 8, title: "Advanced Functions", duration: "3 min", completed: false },
      { id: 9, title: "Classes and Objects", duration: "6 min", completed: false },
      { id: 10, title: "File Operations", duration: "4 min", completed: false },
      { id: 11, title: "Error Handling", duration: "3 min", completed: false },
      { id: 12, title: "Final Project", duration: "6 min", completed: false }
    ]
  },
  "2": {
    title: "JavaScript ES6+",
    description: "Dive deep into modern JavaScript features and best practices. Learn ES6+ syntax, async programming, and advanced concepts that every JavaScript developer should know.",
    instructor: "Alex Rodriguez",
    instructorBio: "Full-stack developer and JavaScript evangelist with 6+ years experience",
    level: "Intermediate",
    estimatedTime: "30 min",
    lessons: 8,
    students: 12890,
    rating: 4.7,
    thumbnail: "⚡",
    skills: ["ES6 Syntax", "Arrow Functions", "Destructuring", "Async/Await", "Modules"],
    curriculum: [
      { id: 1, title: "ES6 Overview", duration: "3 min", completed: false },
      { id: 2, title: "Arrow Functions", duration: "4 min", completed: false },
      { id: 3, title: "Destructuring", duration: "4 min", completed: false },
      { id: 4, title: "Template Literals", duration: "3 min", completed: false },
      { id: 5, title: "Promises and Async/Await", duration: "6 min", completed: false },
      { id: 6, title: "Modules", duration: "4 min", completed: false },
      { id: 7, title: "Classes", duration: "3 min", completed: false },
      { id: 8, title: "Advanced Patterns", duration: "3 min", completed: false }
    ]
  },
  "3": {
    title: "React Hooks Deep Dive",
    description: "Master all React hooks with practical examples and advanced patterns. From useState to custom hooks, become a React hooks expert.",
    instructor: "Emma Thompson",
    instructorBio: "React core team contributor and frontend architect",
    level: "Advanced",
    estimatedTime: "60 min",
    lessons: 15,
    students: 8750,
    rating: 4.9,
    thumbnail: "⚛️",
    skills: ["useState", "useEffect", "useContext", "Custom Hooks", "Performance Optimization"],
    curriculum: [
      { id: 1, title: "Introduction to Hooks", duration: "4 min", completed: false },
      { id: 2, title: "useState Deep Dive", duration: "5 min", completed: false },
      { id: 3, title: "useEffect Mastery", duration: "6 min", completed: false },
      { id: 4, title: "useContext", duration: "4 min", completed: false },
      { id: 5, title: "useReducer", duration: "5 min", completed: false },
      { id: 6, title: "useMemo", duration: "3 min", completed: false },
      { id: 7, title: "useCallback", duration: "3 min", completed: false },
      { id: 8, title: "useRef", duration: "3 min", completed: false },
      { id: 9, title: "Custom Hooks Basics", duration: "4 min", completed: false },
      { id: 10, title: "Advanced Custom Hooks", duration: "5 min", completed: false },
      { id: 11, title: "Hook Patterns", duration: "4 min", completed: false },
      { id: 12, title: "Performance Optimization", duration: "5 min", completed: false },
      { id: 13, title: "Testing Hooks", duration: "4 min", completed: false },
      { id: 14, title: "Hooks Best Practices", duration: "3 min", completed: false },
      { id: 15, title: "Final Project", duration: "7 min", completed: false }
    ]
  },
  "4": {
    title: "Data Structures & Algorithms",
    description: "Essential DSA concepts for technical interviews and competitive programming. Master arrays, linked lists, trees, graphs, and dynamic programming.",
    instructor: "Prof. David Kim",
    instructorBio: "Computer Science professor and competitive programming coach",
    level: "Intermediate",
    estimatedTime: "90 min",
    lessons: 20,
    students: 22100,
    rating: 4.6,
    thumbnail: "🔗",
    skills: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"],
    curriculum: [
      { id: 1, title: "Big O Notation", duration: "5 min", completed: false },
      { id: 2, title: "Arrays and Strings", duration: "4 min", completed: false },
      { id: 3, title: "Two Pointers Technique", duration: "4 min", completed: false },
      { id: 4, title: "Sliding Window", duration: "5 min", completed: false },
      { id: 5, title: "Linked Lists", duration: "5 min", completed: false },
      { id: 6, title: "Stacks and Queues", duration: "4 min", completed: false },
      { id: 7, title: "Binary Trees", duration: "5 min", completed: false },
      { id: 8, title: "Binary Search Trees", duration: "4 min", completed: false },
      { id: 9, title: "Tree Traversals", duration: "4 min", completed: false },
      { id: 10, title: "Heaps", duration: "4 min", completed: false },
      { id: 11, title: "Graphs Introduction", duration: "5 min", completed: false },
      { id: 12, title: "BFS and DFS", duration: "5 min", completed: false },
      { id: 13, title: "Dynamic Programming Basics", duration: "6 min", completed: false },
      { id: 14, title: "DP Patterns", duration: "5 min", completed: false },
      { id: 15, title: "Recursion and Backtracking", duration: "5 min", completed: false },
      { id: 16, title: "Sorting Algorithms", duration: "4 min", completed: false },
      { id: 17, title: "Binary Search", duration: "4 min", completed: false },
      { id: 18, title: "Hash Tables", duration: "4 min", completed: false },
      { id: 19, title: "Interview Strategies", duration: "4 min", completed: false },
      { id: 20, title: "Practice Problems", duration: "8 min", completed: false }
    ]
  }
};

export const CourseDetail = ({ courseId, onBack, onStartCourse }: CourseDetailProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const completedLessons = course.curriculum.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / course.lessons) * 100;

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold">Course Details</h1>
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
                    <BookOpen className="w-4 h-4" />
                    {course.lessons} lessons
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
                  <span className="text-sm text-white/80">{completedLessons}/{course.lessons} completed</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button 
                onClick={onStartCourse}
                className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
              >
                <Play className="w-4 h-4 mr-2" />
                {progressPercentage > 0 ? "Continue Learning" : "Start Course"}
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">
                <BookOpen className="w-4 h-4 mr-2" />
                Add to My Courses
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

            {/* Curriculum */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Course Curriculum</h3>
              <div className="space-y-2">
                {course.curriculum.map((lesson, index) => (
                  <div 
                    key={lesson.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50",
                      lesson.completed && "bg-success/10 border-success/20"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        lesson.completed 
                          ? "bg-success text-success-foreground" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {lesson.completed ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                    </Button>
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
                  <p className="text-sm text-muted-foreground mt-1">{course.instructorBio}</p>
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
                  <span className="text-sm text-muted-foreground">Lessons</span>
                  <span className="text-sm font-medium">{course.lessons}</span>
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