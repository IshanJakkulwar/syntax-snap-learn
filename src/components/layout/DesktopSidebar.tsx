import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Users } from "lucide-react";

export const DesktopSidebar = () => {
  return (
    <div className="hidden lg:block w-80 space-y-6">
      {/* Up Next */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Up Next
        </h3>
        <div className="space-y-3">
          {upNextItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">{item.language}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Streak Counter */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Your Progress
        </h3>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">7</div>
            <p className="text-sm text-muted-foreground">Day Streak 🔥</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP Today</span>
              <span className="font-medium">240/300</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="gradient-primary h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </Card>

      {/* Friend Activity */}
      <Card className="p-6">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Friend Activity
        </h3>
        <div className="space-y-3">
          {friendActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-secondary rounded-full"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.friend}</span> completed
                </p>
                <p className="text-xs text-muted-foreground truncate">{activity.lesson}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activity.score}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const upNextItems = [
  { language: "PY", title: "List Comprehensions", duration: "2m 30s" },
  { language: "JS", title: "Array Methods", duration: "1m 45s" },
  { language: "C++", title: "Pointers Basics", duration: "3m 15s" },
];

const friendActivity = [
  { friend: "Sarah", lesson: "Python Loops", score: "95%" },
  { friend: "Mike", lesson: "React Hooks", score: "87%" },
  { friend: "Alex", lesson: "SQL Joins", score: "92%" },
];