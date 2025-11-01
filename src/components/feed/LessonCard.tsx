import { useState } from "react";
import { Heart, Bookmark, Share2, ChevronLeft, ChevronRight, Copy, FileText } from "lucide-react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = lesson.language === "Python" ? [
    {
      title: "Python Lists: The Basics",
      content: "Lists are Python's most versatile data structure. They're ordered, mutable collections that can hold any type of data. Create them with square brackets: my_list = [1, 2, 3, 'hello']. Unlike arrays in other languages, Python lists can mix different data types in a single list."
    },
    {
      title: "List Operations & Methods",
      content: "Common list methods include .append() to add items, .remove() to delete, .pop() to remove and return the last item, and .sort() to order elements. Use indexing with my_list[0] for the first item, negative indices like my_list[-1] for the last item, and slicing with my_list[1:3] to get ranges."
    },
    {
      title: "List Comprehensions",
      content: "List comprehensions offer a concise way to create lists. Instead of using loops, write [x**2 for x in range(10)] to create a list of squares. Add conditions like [x for x in range(20) if x % 2 == 0] for even numbers. This Pythonic approach is both faster and more readable than traditional loops."
    }
  ] : lesson.language === "JavaScript" ? [
    {
      title: "JavaScript Arrays Fundamentals",
      content: "Arrays are ordered collections in JavaScript. Create them using const arr = [1, 2, 3] or new Array(). They're zero-indexed and can hold any data type. Access elements with arr[0], modify with arr[1] = 'new value', and check length with arr.length property."
    },
    {
      title: "Modern Array Methods",
      content: "Master these essential methods: .map() transforms each element, .filter() creates a new array with matching elements, .reduce() combines values into a single result, and .forEach() executes a function for each item. These methods don't modify the original array (except forEach), promoting immutability."
    },
    {
      title: "ES6 Array Features",
      content: "Spread operator [...arr] copies arrays, destructuring [first, second] = arr extracts values, and .find() locates specific elements. Use .some() to test if any element matches, .every() to check if all match, and .includes() for simple existence checks. Arrow functions make these operations concise."
    }
  ] : lesson.language === "React" ? [
    {
      title: "React Hooks: useState",
      content: "useState is React's fundamental hook for managing component state. Call it at the top level: const [count, setCount] = useState(0). The first value is your current state, the second is the setter function. Always use the setter to update state—never modify state directly!"
    },
    {
      title: "useEffect for Side Effects",
      content: "useEffect handles side effects like data fetching, subscriptions, or DOM manipulation. It runs after render: useEffect(() => { /* code */ }, [dependencies]). The dependency array controls when it re-runs. Empty array [] means run once on mount, no array means run on every render."
    },
    {
      title: "Component Best Practices",
      content: "Keep components small and focused on a single responsibility. Use props for parent-child communication, lift state up when sharing data between components. Prefer functional components with hooks over class components. Break complex UIs into smaller, reusable pieces for better maintainability."
    }
  ] : [
    {
      title: "C++ Pointers & Memory",
      content: "Pointers store memory addresses of variables. Declare with int* ptr and initialize with &variable. Dereference with *ptr to access the value. Understanding pointers is crucial for dynamic memory allocation with new/delete and working with arrays efficiently."
    },
    {
      title: "Object-Oriented Programming",
      content: "C++ supports full OOP with classes, inheritance, and polymorphism. Define classes with class MyClass { private: int data; public: void method(); }. Use constructors for initialization, destructors for cleanup, and access specifiers (private, public, protected) to control encapsulation."
    },
    {
      title: "STL & Modern C++",
      content: "The Standard Template Library provides powerful containers (vector, map, set) and algorithms (sort, find, transform). Modern C++ (C++11 onwards) introduced smart pointers (unique_ptr, shared_ptr), auto keyword, range-based for loops, and lambda functions for cleaner, safer code."
    }
  ];

  const nextSlide = () => {
    if (isTransitioning || currentSlide >= slides.length - 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const previousSlide = () => {
    if (isTransitioning || currentSlide <= 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      previousSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const levelColors = {
    Beginner: "bg-success/10 text-success border-success/20",
    Intermediate: "bg-warning/10 text-warning border-warning/20", 
    Advanced: "bg-destructive/10 text-destructive border-destructive/20"
  };

  return (
    <Card className="relative w-full h-screen max-w-md mx-auto bg-card overflow-hidden snap-item border-none shadow-none">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border z-20">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Card Content Area */}
      <div 
        className="relative h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
            
            {/* Card body with slide content */}
            <div 
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-border shadow-lg max-w-2xl mx-auto transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
                opacity: isTransitioning ? 0.7 : 1
              }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">{slides[currentSlide].title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {slides[currentSlide].content}
              </p>
            </div>
          </div>
        </div>

        {/* Top info badges */}
        <div className="absolute top-6 left-4 right-4 flex items-start justify-between z-30">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md shadow-sm">
              {lesson.creator}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("border text-xs backdrop-blur-md shadow-sm", levelColors[lesson.level])}
            >
              {lesson.level}
            </Badge>
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md shadow-sm">
              {lesson.language}
            </Badge>
          </div>
        </div>

        {/* Desktop navigation arrows - higher position */}
        <div className="hidden lg:flex absolute top-[calc(50%-220px)] left-0 right-0 justify-center items-center gap-4 z-30 pointer-events-none">
          <Button
            variant="ghost"
            size="lg"
            onClick={previousSlide}
            className={cn(
              "w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 shadow-lg pointer-events-auto border-0",
              currentSlide === 0 && "opacity-30 cursor-not-allowed"
            )}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="w-32" /> {/* Spacer for icon */}
          <Button
            variant="ghost"
            size="lg"
            onClick={nextSlide}
            className={cn(
              "w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 shadow-lg pointer-events-auto border-0",
              currentSlide === slides.length - 1 && "opacity-30 cursor-not-allowed"
            )}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile only - vertical buttons on right */}
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

        {/* Action buttons - horizontal below card for desktop - icon only and centered */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex gap-3 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={cn(
              "w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0",
              lesson.isLiked ? "text-destructive" : "text-foreground"
            )}
          >
            <Heart className={cn("w-5 h-5", lesson.isLiked && "fill-current")} />
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
            <Bookmark className={cn("w-5 h-5", lesson.isSaved && "fill-current")} />
          </Button>

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
            onClick={onShare}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-150 border-0"
          >
            <Share2 className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-150 border-0"
          >
            <Copy className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSwipeRight}
            className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-all duration-150 border-0"
          >
            <FileText className="w-5 h-5" />
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