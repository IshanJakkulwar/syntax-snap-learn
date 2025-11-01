import { useState } from "react";
import { User, Settings, Trophy, Clock, Bookmark, History, Users, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const userStats = {
  username: "codingWizard",
  level: "Intermediate",
  xp: 2450,
  nextLevelXp: 3000,
  streak: 7,
  totalLessons: 342,
  quizAccuracy: 87,
  favoriteLanguage: "Python"
};

const achievements = [
  { id: "1", name: "First Steps", description: "Completed your first lesson", icon: "🚀", earned: true },
  { id: "2", name: "Python Master", description: "Completed 50 Python lessons", icon: "🐍", earned: true },
  { id: "3", name: "Quiz Champion", description: "Scored 90%+ on 10 quizzes", icon: "🏆", earned: false },
  { id: "4", name: "Week Warrior", description: "7-day learning streak", icon: "🔥", earned: true },
  { id: "5", name: "Social Learner", description: "Shared 5 lessons", icon: "🤝", earned: false },
];

const savedLessons = [
  { id: "1", title: "Python List Comprehensions", language: "Python", savedAt: "2 hours ago" },
  { id: "2", title: "React useEffect Hook", language: "React", savedAt: "1 day ago" },
  { id: "3", title: "JavaScript Array Methods", language: "JavaScript", savedAt: "3 days ago" },
];

const learningHistory = [
  { id: "1", title: "C++ Pointers Basics", completed: true, score: 95, completedAt: "Today" },
  { id: "2", title: "JavaScript Promises", completed: true, score: 88, completedAt: "Yesterday" },
  { id: "3", title: "Python Functions", completed: true, score: 92, completedAt: "2 days ago" },
];

interface ProfileProps {
  onNavigateToSettings: () => void;
  onNavigateToPolicy?: () => void;
}

export const Profile = ({ onNavigateToSettings, onNavigateToPolicy }: ProfileProps) => {
  const [activeTab, setActiveTab] = useState("saved");

  const xpPercentage = (userStats.xp / userStats.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl gradient-primary text-primary-foreground">
                {userStats.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{userStats.username}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={onNavigateToPolicy}>
                    <FileText className="w-4 h-4 mr-2" />
                    View Policy
                  </Button>
                  <Button variant="outline" size="sm" onClick={onNavigateToSettings}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
              
              <Badge variant="secondary" className="mb-3">
                {userStats.level} Developer
              </Badge>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Level Progress</span>
                  <span className="font-medium">{userStats.xp}/{userStats.nextLevelXp} XP</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="gradient-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${xpPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🔥</div>
            <div className="text-2xl font-bold text-primary">{userStats.streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">📚</div>
            <div className="text-2xl font-bold text-primary">{userStats.totalLessons}</div>
            <div className="text-xs text-muted-foreground">Lessons</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-2xl font-bold text-primary">{userStats.quizAccuracy}%</div>
            <div className="text-xs text-muted-foreground">Quiz Accuracy</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🐍</div>
            <div className="text-lg font-bold text-primary">{userStats.favoriteLanguage}</div>
            <div className="text-xs text-muted-foreground">Top Language</div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  achievement.earned 
                    ? 'border-primary/20 bg-primary/5' 
                    : 'border-border bg-muted/30 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{achievement.name}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <div className="text-primary">✓</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Friends</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved" className="mt-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Saved Lessons</h3>
              <div className="space-y-3">
                {savedLessons.slice(0, 3).map((lesson) => (
                  <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">
                        {lesson.language.slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      <p className="text-xs text-muted-foreground">Saved {lesson.savedAt}</p>
                    </div>
                    <Badge variant="secondary">{lesson.language}</Badge>
                  </div>
                ))}
                 {savedLessons.length > 3 && (
                  <button 
                    className="w-full p-3 text-center text-primary hover:bg-muted/50 rounded-lg transition-colors"
                    onClick={() => {
                      // Show all saved lessons
                      alert("Showing all saved lessons...");
                    }}
                  >
                    See More ({savedLessons.length - 3} more)
                  </button>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Learning History</h3>
              <div className="space-y-3">
                {learningHistory.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 bg-success/10 border border-success/20 rounded-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">Completed {item.completedAt}</p>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      {item.score}%
                    </Badge>
                  </div>
                ))}
                 {learningHistory.length > 3 && (
                  <button 
                    className="w-full p-3 text-center text-primary hover:bg-muted/50 rounded-lg transition-colors"
                    onClick={() => {
                      // Show all learning history
                      alert("Showing full learning history...");
                    }}
                  >
                    See More ({learningHistory.length - 3} more)
                  </button>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">All Achievements</h3>
              <div className="grid gap-4">
                {achievements.slice(0, 3).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      achievement.earned 
                        ? 'border-primary/20 bg-primary/5' 
                        : 'border-border bg-muted/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Badge variant="default" className="gradient-primary text-primary-foreground">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
                 {achievements.length > 3 && (
                  <button 
                    className="w-full p-3 text-center text-primary hover:bg-muted/50 rounded-lg transition-colors"
                    onClick={() => {
                      // Show all achievements
                      alert("Showing all achievements...");
                    }}
                  >
                    See More ({achievements.length - 3} more)
                  </button>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="friends" className="mt-4">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Friends</h3>
              <div className="text-center py-8">
                <div className="text-4xl mb-4">👥</div>
                <h4 className="font-medium mb-2">Connect with friends</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn together and see each other's progress
                </p>
                <Button className="gradient-primary text-primary-foreground hover:opacity-90" onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}?invite=codingwizard`);
                  // toast would go here but we'll show simple alert for now
                  alert("Invite link copied! Share with friends to learn together.");
                }}>
                  Find Friends
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};