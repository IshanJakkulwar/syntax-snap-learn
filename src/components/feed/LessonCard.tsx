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
    // Responsive card container that scales properly on all screens
    // Uses min-h-screen with dvh (dynamic viewport height) fallback for mobile browsers
    // max-w-4xl ensures cards don't get too wide on ultra-wide screens
    // Flex layout keeps content centered and prevents overflow
    <Card className="relative w-full min-h-[100dvh] min-h-screen max-w-4xl mx-auto bg-card overflow-hidden snap-item border-none shadow-none flex flex-col">
      {/* Progress bar - sticky at top, always visible */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-border z-20">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Card Content Area - uses flex-1 to fill available space */}
      <div 
        className="relative flex-1 flex flex-col min-h-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main card content - centered with proper spacing on all screens */}
        {/* Uses padding that scales with viewport (px-4 sm:px-6 lg:px-8) */}
        {/* flex items-center ensures vertical centering across all aspect ratios */}
        <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted/30 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl w-full">
            {/* Card header with icon - scales based on screen size */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6">
                {lesson.language === "Python" && "🐍"}
                {lesson.language === "JavaScript" && "⚡"}
                {lesson.language === "C++" && "⚙️"}
                {lesson.language === "React" && "⚛️"}
              </div>
            </div>
            
            {/* Card body with slide content - responsive padding and text sizing */}
            {/* min-h ensures content card has enough height on landscape mobile */}
            <div 
              className="bg-background/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-border shadow-lg max-w-2xl mx-auto transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] min-h-[200px]"
              style={{
                transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
                opacity: isTransitioning ? 0.7 : 1
              }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">{slides[currentSlide].title}</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                {slides[currentSlide].content}
              </p>
            </div>
          </div>
        </div>

        {/* Top info badges - responsive positioning and sizing */}
        {/* Uses safe-area padding for notched devices */}
        <div className="absolute top-4 sm:top-6 left-3 sm:left-4 right-3 sm:right-4 flex items-start justify-between z-30 pt-safe">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 max-w-[85%]">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md shadow-sm text-xs sm:text-sm">
              {lesson.creator}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("border text-xs backdrop-blur-md shadow-sm", levelColors[lesson.level])}
            >
              {lesson.level}
            </Badge>
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md shadow-sm text-xs sm:text-sm">
              {lesson.language}
            </Badge>
          </div>
        </div>

        {/* Desktop navigation arrows - centered vertically using 50% transform */}
        {/* Responsive sizing and positioning for different screen widths */}
        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 lg:left-8 right-4 lg:right-8 justify-between items-center z-30 pointer-events-none">
          <Button
            variant="ghost"
            size="lg"
            onClick={previousSlide}
            className={cn(
              "w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 shadow-lg pointer-events-auto border-0",
              currentSlide === 0 && "opacity-30 cursor-not-allowed"
            )}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={nextSlide}
            className={cn(
              "w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 shadow-lg pointer-events-auto border-0",
              currentSlide === slides.length - 1 && "opacity-30 cursor-not-allowed"
            )}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </Button>
        </div>

        {/* Mobile only - vertical buttons on right side */}
        {/* Responsive sizing and gap - smaller on very small screens */}
        {/* Uses safe-area padding to avoid notches on modern phones */}
        <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 md:hidden flex flex-col gap-2 sm:gap-3 z-20 pr-safe">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 flex-col border-0 p-0",
              lesson.isLiked ? "text-destructive" : "text-foreground"
            )}
          >
            <Heart className={cn("w-5 h-5 sm:w-6 sm:h-6", lesson.isLiked && "fill-current")} />
            <span className="text-[10px] sm:text-xs mt-0.5 font-medium">{lesson.likes > 999 ? `${Math.floor(lesson.likes/1000)}k` : lesson.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0 p-0",
              lesson.isSaved ? "text-warning" : "text-foreground"
            )}
          >
            <Bookmark className={cn("w-5 h-5 sm:w-6 sm:h-6", lesson.isSaved && "fill-current")} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0 p-0",
              showCode ? "text-primary" : "text-foreground"
            )}
          >
            <span className="text-base sm:text-lg font-bold">{"</>"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-150 border-0 p-0"
          >
            <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSwipeRight}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-all duration-150 border-0 p-0"
          >
            <span className="text-lg sm:text-xl">📝</span>
          </Button>
        </div>

        {/* Action buttons - horizontal below card for desktop/tablet */}
        {/* Always visible at bottom, responsive positioning with safe-area padding */}
        {/* Scales button size based on screen width for optimal touch targets */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 hidden md:flex gap-2 lg:gap-3 z-20 pb-safe">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={cn(
              "w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0 p-0",
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
              "w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0 p-0",
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
              "w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-accent transition-all duration-150 border-0 p-0",
              showCode ? "text-primary" : "text-foreground"
            )}
          >
            <span className="text-base lg:text-lg font-bold">{"</>"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-150 border-0 p-0"
          >
            <Share2 className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-accent transition-all duration-150 border-0 p-0"
          >
            <Copy className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onSwipeRight}
            className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground hover:bg-primary transition-all duration-150 border-0 p-0"
          >
            <FileText className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Code snippet overlay - slides up from bottom */}
      {/* Responsive max-height (60% on small screens, 70% on larger) */}
      {/* Uses dvh units for better mobile browser support (dynamic viewport) */}
      {/* Safe-area padding ensures content isn't hidden behind home indicator */}
      {showCode && lesson.codeSnippet && (
        <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border animate-slide-up max-h-[60dvh] sm:max-h-[70dvh] overflow-y-auto overscroll-contain touch-pan-y ios-touch-scroll pb-safe">
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h4 className="font-semibold text-sm sm:text-base">Code Example</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCode(false)}
                className="text-muted-foreground hover:text-foreground h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>
            
            {/* Code block with horizontal scroll for long lines */}
            <div className="bg-muted rounded-lg p-2 sm:p-3 mb-2 sm:mb-3 overflow-x-auto">
              <pre className="text-xs sm:text-sm overflow-x-auto">
                <code>{lesson.codeSnippet}</code>
              </pre>
            </div>

            {/* Key takeaways list - responsive text sizing */}
            {lesson.takeaways && (
              <div>
                <h5 className="font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">Key Takeaways:</h5>
                <ul className="space-y-1">
                  {lesson.takeaways.map((takeaway, index) => (
                    <li key={index} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5 sm:mt-1 flex-shrink-0">•</span>
                      <span className="flex-1">{takeaway}</span>
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