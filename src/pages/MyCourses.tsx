import { useState } from "react";
import { Search, Filter, Play, Clock, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const courses = [
  {
    id: "1",
    title: "Python Fundamentals",
    description: "Master the basics of Python programming",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    level: "Beginner",
    estimatedTime: "45 min",
    thumbnail: "🐍",
    lastAccessed: "2 hours ago"
  },
  {
    id: "2", 
    title: "JavaScript ES6+",
    description: "Modern JavaScript features and best practices",
    progress: 45,
    totalLessons: 8,
    completedLessons: 4,
    level: "Intermediate", 
    estimatedTime: "30 min",
    thumbnail: "⚡",
    lastAccessed: "1 day ago"
  },
  {
    id: "3",
    title: "React Hooks Deep Dive",
    description: "Master all React hooks with practical examples",
    progress: 20,
    totalLessons: 15,
    completedLessons: 3,
    level: "Advanced",
    estimatedTime: "60 min", 
    thumbnail: "⚛️",
    lastAccessed: "3 days ago"
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    description: "Essential DSA concepts for interviews",
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    level: "Intermediate",
    estimatedTime: "90 min",
    thumbnail: "🔗",
    lastAccessed: "1 week ago"
  }
];

interface MyCoursesProps {
  onNavigateToCourse?: (courseId: string) => void;
}

export const MyCourses = ({ onNavigateToCourse }: MyCoursesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "progress") return b.progress - a.progress;
    if (sortBy === "alphabetical") return a.title.localeCompare(b.title);
    return 0; // recent - already in correct order
  });

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">Track your learning progress and continue where you left off</p>
        </div>

        {/* Search and Sort */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search your courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="recent">Recent</option>
            <option value="progress">Progress</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-2xl font-bold text-primary">{courses.length}</div>
            <div className="text-xs text-muted-foreground">Total Courses</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">✅</div>
            <div className="text-2xl font-bold text-success">{courses.filter(c => c.progress === 100).length}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-2xl font-bold text-warning">{courses.filter(c => c.progress > 0 && c.progress < 100).length}</div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">⏱️</div>
            <div className="text-2xl font-bold text-primary">{courses.reduce((acc, c) => acc + parseInt(c.estimatedTime), 0)}</div>
            <div className="text-xs text-muted-foreground">Total Minutes</div>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="space-y-4">
          {sortedCourses.map((course) => (
            <Card key={course.id} className="p-6 hover:shadow-medium transition-all duration-200 cursor-pointer group">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{course.thumbnail}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {course.description}
                      </p>
                    </div>
                    {course.progress === 100 && (
                      <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span className="text-muted-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  {/* Course Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="secondary" className="text-xs">
                        {course.level}
                      </Badge>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.estimatedTime}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      Last accessed {course.lastAccessed}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex-1 mr-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="shrink-0"
                      onClick={() => onNavigateToCourse?.(course.id)}
                    >
                      {course.progress === 0 ? "Start" : "Continue"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search query</p>
            <Button variant="outline">Browse All Courses</Button>
          </div>
        )}
      </div>
    </div>
  );
};