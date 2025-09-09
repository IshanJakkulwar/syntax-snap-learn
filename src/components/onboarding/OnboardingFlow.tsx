import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingData {
  skillLevel: string;
  languages: string[];
  goals: string[];
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const skillLevels = [
  { id: "beginner", label: "Beginner", description: "New to programming" },
  { id: "intermediate", label: "Intermediate", description: "Some experience" },
  { id: "advanced", label: "Advanced", description: "Years of experience" }
];

const languages = [
  { id: "python", label: "Python", emoji: "🐍" },
  { id: "javascript", label: "JavaScript", emoji: "🟨" },
  { id: "cpp", label: "C++", emoji: "⚡" },
  { id: "java", label: "Java", emoji: "☕" },
  { id: "react", label: "React", emoji: "⚛️" },
  { id: "ml", label: "Machine Learning", emoji: "🤖" },
  { id: "web", label: "Web Development", emoji: "🌐" },
  { id: "algorithms", label: "Algorithms", emoji: "🧮" }
];

const goals = [
  { id: "career", label: "Switch careers", emoji: "🚀" },
  { id: "interview", label: "Ace interviews", emoji: "💼" },
  { id: "project", label: "Build projects", emoji: "🛠️" },
  { id: "learn", label: "Learn for fun", emoji: "🎉" },
  { id: "upgrade", label: "Upgrade skills", emoji: "📈" },
  { id: "freelance", label: "Start freelancing", emoji: "💰" }
];

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [skillLevel, setSkillLevel] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const toggleLanguage = (langId: string) => {
    setSelectedLanguages(prev => 
      prev.includes(langId) 
        ? prev.filter(id => id !== langId)
        : [...prev, langId]
    );
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        skillLevel,
        languages: selectedLanguages,
        goals: selectedGoals
      });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return skillLevel !== "";
      case 2: return selectedLanguages.length > 0;
      case 3: return selectedGoals.length > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-6">
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">What's your coding level?</h2>
                <p className="text-muted-foreground">Help us personalize your learning journey</p>
              </div>

              <div className="space-y-3">
                {skillLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSkillLevel(level.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      skillLevel === level.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-semibold">{level.label}</div>
                    <div className="text-sm text-muted-foreground">{level.description}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">What interests you?</h2>
                <p className="text-muted-foreground">Select all languages and topics you want to learn</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => toggleLanguage(lang.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedLanguages.includes(lang.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{lang.emoji}</div>
                    <div className="text-sm font-medium">{lang.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">What's your goal?</h2>
                <p className="text-muted-foreground">Choose what you want to achieve</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedGoals.includes(goal.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{goal.emoji}</div>
                    <div className="text-sm font-medium">{goal.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gradient-primary text-primary-foreground"
          >
            {step === totalSteps ? "Get Started!" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};