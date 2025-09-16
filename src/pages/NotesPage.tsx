import { useState } from "react";
import { ArrowLeft, Bookmark, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NotesPageProps {
  lessonId: string;
  onBack: () => void;
}

// Placeholder notes content
const notesContent = {
  "1": {
    title: "Python For Loops",
    language: "Python",
    level: "Beginner",
    duration: "25 minutes",
    overview: "Master the fundamentals of Python for loops and iteration patterns.",
    sections: [
      {
        title: "Basic For Loop Syntax",
        content: "The for loop in Python is used to iterate over sequences like lists, tuples, strings, and ranges.",
        codeExample: `for item in sequence:
    # do something with item
    print(item)

# Example with range
for i in range(5):
    print(f"Number: {i}")`
      },
      {
        title: "Iterating Over Lists",
        content: "The most common use case is iterating over list elements.",
        codeExample: `fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(f"I like {fruit}")

# With index using enumerate
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")`
      },
      {
        title: "Loop Control Statements",
        content: "Use break and continue to control loop execution.",
        codeExample: `for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break     # Stop at 7
    print(i)`
      }
    ],
    keyPoints: [
      "For loops iterate over sequences automatically",
      "Use enumerate() to get both index and value",
      "break exits the loop, continue skips to next iteration",
      "range() generates number sequences for loops"
    ],
    exercises: [
      "Create a loop that prints numbers 1-10",
      "Iterate over a list of names and print greetings",
      "Use a loop to calculate the sum of numbers 1-100"
    ]
  },
  "2": {
    title: "Python List Comprehensions",
    language: "Python", 
    level: "Intermediate",
    duration: "30 minutes",
    overview: "Learn to write concise and powerful list comprehensions in Python.",
    sections: [
      {
        title: "Basic List Comprehension",
        content: "List comprehensions provide a concise way to create lists based on existing sequences.",
        codeExample: `# Traditional way
squares = []
for x in range(10):
    squares.append(x**2)

# List comprehension way
squares = [x**2 for x in range(10)]`
      },
      {
        title: "Conditional List Comprehensions",
        content: "Add conditions to filter elements during list creation.",
        codeExample: `# Only even squares
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# With if-else
numbers = [x if x > 0 else 0 for x in range(-5, 6)]`
      }
    ],
    keyPoints: [
      "List comprehensions are more concise than traditional loops",
      "They can include conditions for filtering",
      "Use if-else for transforming values conditionally",
      "They're generally faster than equivalent for loops"
    ],
    exercises: [
      "Create a list of squares for even numbers 1-20",
      "Filter a list of words to only include those longer than 5 characters",
      "Transform a list of temperatures from Celsius to Fahrenheit"
    ]
  }
};

export const NotesPage = ({ lessonId, onBack }: NotesPageProps) => {
  const [savedNotes, setSavedNotes] = useState(false);
  
  // Get notes content or default
  const notes = notesContent[lessonId as keyof typeof notesContent] || {
    title: "Lesson Notes",
    language: "General",
    level: "Beginner",
    duration: "20 minutes",
    overview: "Comprehensive notes for this coding lesson.",
    sections: [
      {
        title: "Introduction",
        content: "This lesson covers fundamental programming concepts with practical examples.",
        codeExample: "// Code examples will appear here\nconsole.log('Hello, World!');"
      }
    ],
    keyPoints: [
      "Understanding core concepts is essential",
      "Practice with real examples",
      "Apply knowledge in projects"
    ],
    exercises: [
      "Complete the practice exercises",
      "Build a small project using these concepts"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="hover:bg-muted"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="font-bold text-lg">{notes.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{notes.language}</Badge>
                  <Badge variant="outline">{notes.level}</Badge>
                  <span className="text-sm text-muted-foreground">{notes.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSavedNotes(!savedNotes)}
                className={savedNotes ? "text-warning" : ""}
              >
                <Bookmark className={`w-4 h-4 ${savedNotes ? "fill-current" : ""}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigator.share({
                    title: notes.title,
                    text: notes.overview,
                    url: window.location.href
                  }).catch(() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  });
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  const content = `${notes.title}\n\n${notes.overview}\n\n${notes.sections.map(s => `${s.title}\n${s.content}\n${s.codeExample || ''}`).join('\n\n')}\n\nKey Points:\n${notes.keyPoints.map(p => `• ${p}`).join('\n')}\n\nExercises:\n${notes.exercises.map((e, i) => `${i + 1}. ${e}`).join('\n')}`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${notes.title.replace(/\s+/g, '_')}_notes.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Overview */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-3">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{notes.overview}</p>
        </Card>

        {/* Sections */}
        {notes.sections.map((section, index) => (
          <Card key={index} className="p-6 mb-6">
            <h3 className="text-lg font-bold mb-3">{section.title}</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">{section.content}</p>
            
            {section.codeExample && (
              <div className="bg-muted rounded-lg p-4 mb-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{section.codeExample}</code>
                </pre>
              </div>
            )}
          </Card>
        ))}

        {/* Key Points */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold mb-3">Key Points</h3>
          <ul className="space-y-2">
            {notes.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1 text-sm">•</span>
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Exercises */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-3">Practice Exercises</h3>
          <div className="space-y-3">
            {notes.exercises.map((exercise, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <p className="text-muted-foreground">{exercise}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};