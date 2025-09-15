import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  quiz: {
    id: string;
    type: "mcq" | "reorder" | "find-bug" | "match" | "predict";
    question: string;
    options?: string[];
    correctAnswer?: number;
    explanation?: string;
    language: string;
    topic: string;
  };
  onAnswer?: (correct: boolean) => void;
  onSkip?: () => void;
}

export const QuizCard = ({ quiz, onAnswer, onSkip }: QuizCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer?.(correct);
    }, 2000);
  };

  return (
    <Card className="relative w-full h-screen max-w-md mx-auto bg-card overflow-hidden snap-item border-none shadow-none">
      {/* Quiz indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-accent z-20"></div>

        <div className="h-full flex flex-col p-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Quiz Time! 🧠
            </Badge>
            <Badge variant="secondary">
              {quiz.language}
            </Badge>
          </div>
          
          {onSkip && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="w-4 h-4 mr-1" />
              Skip
            </Button>
          )}
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4 md:mb-6 leading-relaxed">
            {quiz.question}
          </h2>

          {/* MCQ Options */}
          {quiz.type === "mcq" && quiz.options && (
            <div className="space-y-3 mb-4 md:mb-6">
              {quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-3 md:p-4 text-left rounded-xl border-2 transition-all duration-200",
                    "hover:border-primary/50 hover:bg-primary/5",
                    selectedAnswer === index && !showResult && "border-primary bg-primary/10",
                    showResult && selectedAnswer === index && isCorrect && "border-success bg-success/10",
                    showResult && selectedAnswer === index && !isCorrect && "border-destructive bg-destructive/10",
                    showResult && index === quiz.correctAnswer && "border-success bg-success/10"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm md:text-base">{option}</span>
                    {showResult && index === quiz.correctAnswer && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                    {showResult && selectedAnswer === index && !isCorrect && (
                      <XCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Mobile submit button - directly below options */}
          {!showResult && (
            <div className="md:hidden mb-4">
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full h-11 text-base font-semibold gradient-primary text-primary-foreground"
              >
                Submit Answer
              </Button>
            </div>
          )}

          {/* Result */}
          {showResult && (
            <div className={cn(
              "p-3 md:p-4 rounded-xl mb-4 md:mb-6 animate-fade-in",
              isCorrect ? "bg-success/10 border border-success/20" : "bg-destructive/10 border border-destructive/20"
            )}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
                <span className={cn(
                  "font-bold",
                  isCorrect ? "text-success" : "text-destructive"
                )}>
                  {isCorrect ? "Correct!" : "Not quite!"}
                </span>
              </div>
              {quiz.explanation && (
                <p className="text-sm text-muted-foreground">
                  {quiz.explanation}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Desktop submit button */}
        {!showResult && (
          <div className="hidden md:block">
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full h-12 text-lg font-semibold gradient-primary text-primary-foreground hover:opacity-90 transition-opacity mb-4"
            >
              Submit Answer
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};