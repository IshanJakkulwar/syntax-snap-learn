import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Flame, Target, Share2, Gift } from "lucide-react";
import { motion } from "framer-motion";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  todayComplete: boolean;
  weeklyGoal: number;
  weeklyProgress: number;
  totalDays: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  streakRequired: number;
}

const streakAchievements: Achievement[] = [
  {
    id: "first-day",
    title: "First Step",
    description: "Complete your first day",
    icon: "🎯",
    unlocked: true,
    streakRequired: 1
  },
  {
    id: "week-warrior",
    title: "Week Warrior",
    description: "7-day learning streak",
    icon: "🔥",
    unlocked: true,
    streakRequired: 7
  },
  {
    id: "dedication",
    title: "Dedication",
    description: "15-day learning streak",
    icon: "💪",
    unlocked: false,
    streakRequired: 15
  },
  {
    id: "unstoppable",
    title: "Unstoppable",
    description: "30-day learning streak",
    icon: "🚀",
    unlocked: false,
    streakRequired: 30
  },
  {
    id: "legend",
    title: "Legend",
    description: "100-day learning streak",
    icon: "👑",
    unlocked: false,
    streakRequired: 100
  }
];

export const StreakTracker = () => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 12,
    longestStreak: 25,
    todayComplete: true,
    weeklyGoal: 5,
    weeklyProgress: 4,
    totalDays: 67
  });

  const [showShareModal, setShowShareModal] = useState(false);

  // Generate calendar data for the last 30 days
  const generateCalendarData = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      // Mock activity data - in real app this would come from user data
      const hasActivity = Math.random() > 0.3; // 70% chance of activity
      const intensity = hasActivity ? Math.floor(Math.random() * 3) + 1 : 0;
      
      days.push({
        date,
        hasActivity,
        intensity, // 0-3 scale
        isToday: i === 0
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarData();
  const weeklyProgressPercentage = (streakData.weeklyProgress / streakData.weeklyGoal) * 100;
  
  const getNextAchievement = () => {
    return streakAchievements.find(achievement => 
      !achievement.unlocked && achievement.streakRequired > streakData.currentStreak
    );
  };

  const nextAchievement = getNextAchievement();

  const shareStreak = () => {
    const text = `🔥 ${streakData.currentStreak}-day learning streak on Syntax! Join me in learning to code! #SyntaxApp #CodingStreak`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Coding Streak',
        text,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(text);
      setShowShareModal(true);
      setTimeout(() => setShowShareModal(false), 2000);
    }
  };

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 1: return "bg-primary/30";
      case 2: return "bg-primary/60";
      case 3: return "bg-primary";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Streak Card */}
      <Card className="p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="relative">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center"
          >
            <Flame className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          
          <h2 className="text-3xl font-bold mb-2">
            {streakData.currentStreak} Days
          </h2>
          <p className="text-muted-foreground mb-4">Current Streak</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-xl font-semibold">{streakData.longestStreak}</div>
              <div className="text-xs text-muted-foreground">Longest Streak</div>
            </div>
            <div>
              <div className="text-xl font-semibold">{streakData.totalDays}</div>
              <div className="text-xs text-muted-foreground">Total Days</div>
            </div>
          </div>
          
          <div className="flex gap-2 justify-center">
            <Button
              onClick={shareStreak}
              variant="outline"
              size="sm"
              className="flex-1 max-w-32"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 max-w-32"
            >
              <Gift className="w-4 h-4 mr-1" />
              Rewards
            </Button>
          </div>
        </div>
      </Card>

      {/* Weekly Goal */}
      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Weekly Goal</h3>
          <Badge variant="secondary">
            {streakData.weeklyProgress}/{streakData.weeklyGoal} days
          </Badge>
        </div>
        
        <Progress value={weeklyProgressPercentage} className="mb-2" />
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{streakData.weeklyProgress} days completed</span>
          <span>{streakData.weeklyGoal - streakData.weeklyProgress} days to go</span>
        </div>
      </Card>

      {/* Activity Calendar */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Activity Calendar</h3>
        </div>
        
        <div className="grid grid-cols-10 gap-1 mb-3">
          {calendarDays.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              className={`
                w-6 h-6 rounded-sm transition-all cursor-pointer
                ${getIntensityColor(day.intensity)}
                ${day.isToday ? 'ring-2 ring-primary ring-offset-1' : ''}
                hover:scale-110
              `}
              title={`${day.date.toLocaleDateString()} - ${
                day.hasActivity ? `${day.intensity} activities` : 'No activity'
              }`}
            />
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-muted rounded-sm"></div>
            <div className="w-3 h-3 bg-primary/30 rounded-sm"></div>
            <div className="w-3 h-3 bg-primary/60 rounded-sm"></div>
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
          </div>
          <span>More</span>
        </div>
      </Card>

      {/* Next Achievement */}
      {nextAchievement && (
        <Card className="p-4 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{nextAchievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-medium">{nextAchievement.title}</h4>
              <p className="text-sm text-muted-foreground">{nextAchievement.description}</p>
              <div className="mt-2">
                <Progress 
                  value={(streakData.currentStreak / nextAchievement.streakRequired) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{streakData.currentStreak} days</span>
                  <span>{nextAchievement.streakRequired} days needed</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Streak Achievements */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Streak Achievements</h3>
        
        <div className="space-y-3">
          {streakAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-primary/5 border border-primary/20'
                  : 'bg-muted/30 opacity-60'
              }`}
            >
              <div className="text-xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  {achievement.unlocked && (
                    <Badge variant="default" className="text-xs">
                      Unlocked
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {achievement.streakRequired} days
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Share Modal */}
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg z-50"
        >
          Streak shared to clipboard! 📋
        </motion.div>
      )}
    </div>
  );
};