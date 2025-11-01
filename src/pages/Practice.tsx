import { useState } from "react";
import { Play, CheckCircle, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const problemsByTopic = {
  Python: [
    {
      id: "py1",
      title: "List Comprehensions",
      difficulty: "Easy",
      topic: "Python",
      description: "Create a list comprehension that filters even numbers from a list and squares them.",
      starterCode: `def filter_and_square(nums):
    # Use list comprehension
    pass`,
      hints: [
        "Use the syntax [expression for item in list if condition]",
        "Check if number % 2 == 0 for even numbers"
      ]
    },
    {
      id: "py2",
      title: "Dictionary Merging",
      difficulty: "Medium",
      topic: "Python",
      description: "Write a function to merge two dictionaries, combining values for duplicate keys.",
      starterCode: `def merge_dicts(dict1, dict2):
    # Your code here
    pass`,
      hints: [
        "Use the ** operator or dict.update()",
        "Handle duplicate keys by summing values"
      ]
    }
  ],
  React: [
    {
      id: "react1",
      title: "useState Hook",
      difficulty: "Easy",
      topic: "React",
      description: "Create a counter component using the useState hook with increment and decrement buttons.",
      starterCode: `import { useState } from 'react';

function Counter() {
  // Your code here
}`,
      hints: [
        "Initialize state with useState(0)",
        "Create functions to update state with prevState => prevState + 1"
      ]
    },
    {
      id: "react2",
      title: "useEffect Hook",
      difficulty: "Medium",
      topic: "React",
      description: "Implement a component that fetches data when it mounts using useEffect.",
      starterCode: `import { useState, useEffect } from 'react';

function DataFetcher() {
  // Your code here
}`,
      hints: [
        "Use an empty dependency array [] to run only on mount",
        "Don't forget to handle loading and error states"
      ]
    }
  ],
  ML: [
    {
      id: "ml1",
      title: "Linear Regression",
      difficulty: "Medium",
      topic: "Machine Learning",
      description: "Implement a simple linear regression model using gradient descent.",
      starterCode: `import numpy as np

def linear_regression(X, y, learning_rate, iterations):
    # Your code here
    pass`,
      hints: [
        "Initialize weights and bias to zeros",
        "Calculate gradients and update parameters iteratively"
      ]
    },
    {
      id: "ml2",
      title: "K-Means Clustering",
      difficulty: "Hard",
      topic: "Machine Learning",
      description: "Implement the K-means clustering algorithm from scratch.",
      starterCode: `import numpy as np

def kmeans(X, k, max_iters):
    # Your code here
    pass`,
      hints: [
        "Randomly initialize k centroids",
        "Alternate between assigning points to clusters and updating centroids"
      ]
    }
  ]
};

export const Practice = () => {
  const [activeTopic, setActiveTopic] = useState("Python");
  const [selectedProblem, setSelectedProblem] = useState(problemsByTopic.Python[0]);
  const [code, setCode] = useState(selectedProblem.starterCode);
  const [showHints, setShowHints] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string>("");
  const isMobile = useIsMobile();

  const allProblems = problemsByTopic[activeTopic as keyof typeof problemsByTopic] || [];

  const handleRun = async () => {
    setIsRunning(true);
    setResult("");
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setResult("✅ All test cases passed!\n\nOutput:\n[0, 1]\n\nExecution time: 42ms");
    setIsRunning(false);
  };

  const handleProblemSelect = (problem: typeof allProblems[0]) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setResult("");
    setShowHints(false);
  };

  const difficultyColors = {
    Easy: "bg-success/10 text-success border-success/20",
    Medium: "bg-warning/10 text-warning border-warning/20",
    Hard: "bg-destructive/10 text-destructive border-destructive/20"
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <div className="text-6xl mb-4">💻</div>
          <h2 className="text-2xl font-bold mb-4">Practice Mode</h2>
          <p className="text-muted-foreground mb-6">
            The full coding workspace experience is optimized for desktop. 
            Switch to a larger screen to start practicing!
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Code editor with syntax highlighting</p>
            <p>• Test console and execution</p>
            <p>• Problem library with hints</p>
            <p>• Progress tracking</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex">
      {/* Problem List Sidebar */}
      <div className="w-80 border-r border-border bg-card overflow-y-auto custom-scrollbar">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold">Practice Problems</h2>
          <p className="text-sm text-muted-foreground">Solve coding challenges</p>
        </div>
        
        <Tabs value={activeTopic} onValueChange={setActiveTopic} className="w-full">
          <TabsList className="w-full grid grid-cols-3 m-4">
            <TabsTrigger value="Python">Python</TabsTrigger>
            <TabsTrigger value="React">React</TabsTrigger>
            <TabsTrigger value="ML">ML</TabsTrigger>
          </TabsList>
          
          <div className="p-4 space-y-3">
            {allProblems.map((problem) => (
              <Card 
                key={problem.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-medium ${
                  selectedProblem.id === problem.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => handleProblemSelect(problem)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{problem.title}</h3>
                  <Badge 
                    variant="outline"
                    className={`text-xs ${difficultyColors[problem.difficulty as keyof typeof difficultyColors]}`}
                  >
                    {problem.difficulty}
                  </Badge>
                </div>
                <Badge variant="secondary" className="text-xs mb-2">
                  {problem.topic}
                </Badge>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {problem.description}
                </p>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{selectedProblem.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge 
                  variant="outline"
                  className={difficultyColors[selectedProblem.difficulty as keyof typeof difficultyColors]}
                >
                  {selectedProblem.difficulty}
                </Badge>
                <Badge variant="secondary">{selectedProblem.topic}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowHints(!showHints)}
              >
                <Star className="w-4 h-4 mr-2" />
                Hints
              </Button>
              <Button
                onClick={handleRun}
                disabled={isRunning}
                className="gradient-primary text-primary-foreground hover:opacity-90"
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Problem Description */}
          <div className="w-1/3 p-6 border-r border-border overflow-y-auto custom-scrollbar">
            <h3 className="font-semibold mb-3">Problem Description</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {selectedProblem.description}
            </p>

            {showHints && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 animate-fade-in">
                <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Hints
                </h4>
                <ul className="space-y-2">
                  {selectedProblem.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Example
              </h4>
              <div className="text-sm font-mono bg-background p-3 rounded border">
                <div className="text-muted-foreground">Input:</div>
                <div>nums = [2,7,11,15], target = 9</div>
                <div className="text-muted-foreground mt-2">Output:</div>
                <div>[0,1]</div>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Python</span>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full font-mono text-sm resize-none"
                placeholder="Write your solution here..."
              />
            </div>

            {/* Results Panel */}
            {result && (
              <div className="border-t border-border bg-card p-4">
                <h4 className="font-medium mb-2">Output</h4>
                <pre className="text-sm bg-background p-3 rounded border font-mono whitespace-pre-wrap">
                  {result}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};