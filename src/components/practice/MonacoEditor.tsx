import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Check, X, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface Exercise {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: "Easy" | "Medium" | "Hard";
  starterCode: string;
  solution: string;
  tests: Array<{
    input: string;
    expected: string;
    description: string;
  }>;
  hints: string[];
}

interface MonacoEditorProps {
  exercise: Exercise;
  onComplete: () => void;
}

export const MonacoEditor = ({ exercise, onComplete }: MonacoEditorProps) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<Array<{
    passed: boolean;
    output: string;
    expected: string;
    description: string;
  }>>([]);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  useEffect(() => {
    setCode(exercise.starterCode);
    setResults([]);
    setShowHints(false);
    setCurrentHint(0);
  }, [exercise]);

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock test results - in real implementation, this would execute the code safely
    const mockResults = exercise.tests.map((test, index) => ({
      passed: Math.random() > 0.3, // 70% pass rate for demo
      output: `Mock output ${index + 1}`,
      expected: test.expected,
      description: test.description
    }));
    
    setResults(mockResults);
    setIsRunning(false);
    
    // Check if all tests passed
    if (mockResults.every(result => result.passed)) {
      onComplete();
    }
  };

  const getHint = () => {
    if (currentHint < exercise.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
    setShowHints(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10 text-success border-success/20";
      case "Medium": return "bg-warning/10 text-warning border-warning/20";
      case "Hard": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold">{exercise.title}</h2>
            <p className="text-muted-foreground text-sm mt-1">{exercise.description}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
              {exercise.difficulty}
            </Badge>
            <Badge variant="secondary">{exercise.language}</Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-3 bg-muted/30 border-b">
            <span className="text-sm font-medium">Code Editor</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={getHint}
                disabled={currentHint >= exercise.hints.length}
              >
                <Lightbulb className="w-4 h-4 mr-1" />
                Hint {currentHint + 1}/{exercise.hints.length}
              </Button>
              <Button
                onClick={runCode}
                disabled={isRunning}
                className="gradient-primary text-primary-foreground"
                size="sm"
              >
                <Play className="w-4 h-4 mr-1" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            <Editor
              height="100%"
              language={exercise.language.toLowerCase()}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                minimap: { enabled: false },
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="w-96 border-l flex flex-col">
          <div className="p-3 bg-muted/30 border-b">
            <span className="text-sm font-medium">Test Results</span>
          </div>
          
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Hints */}
            {showHints && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <Card className="p-3 bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-primary mb-1">Hint {currentHint + 1}</h4>
                      <p className="text-sm">{exercise.hints[currentHint]}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Test Results */}
            {results.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">Test Cases</h4>
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-3 border-2 ${
                      result.passed 
                        ? 'border-success/20 bg-success/5' 
                        : 'border-destructive/20 bg-destructive/5'
                    }`}>
                      <div className="flex items-start gap-2">
                        {result.passed ? (
                          <Check className="w-4 h-4 text-success mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-destructive mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">
                            Test {index + 1}: {result.description}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Expected: {result.expected}
                          </div>
                          {!result.passed && (
                            <div className="text-xs text-destructive mt-1">
                              Got: {result.output}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
                
                {results.every(r => r.passed) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-4 bg-success/10 border border-success/20 rounded-lg"
                  >
                    <div className="text-2xl mb-2">🎉</div>
                    <div className="font-medium text-success">All tests passed!</div>
                    <div className="text-xs text-muted-foreground">Great job solving this exercise</div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Instructions when no results */}
            {results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Play className="w-8 h-8 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Click "Run Code" to test your solution</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};