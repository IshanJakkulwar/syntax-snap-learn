import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Search, UserPlus, Trophy, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Friend {
  id: string;
  username: string;
  level: string;
  streak: number;
  xp: number;
  isOnline: boolean;
  currentActivity?: string;
  recentAchievement?: string;
  favoriteLanguage: string;
}

const sampleFriends: Friend[] = [
  {
    id: "1",
    username: "alexDev",
    level: "Advanced",
    streak: 15,
    xp: 4250,
    isOnline: true,
    currentActivity: "Learning React Hooks",
    recentAchievement: "Python Master",
    favoriteLanguage: "Python"
  },
  {
    id: "2", 
    username: "codeNinja",
    level: "Intermediate",
    streak: 8,
    xp: 2800,
    isOnline: false,
    recentAchievement: "Quiz Champion",
    favoriteLanguage: "JavaScript"
  },
  {
    id: "3",
    username: "mlEnthusiast",
    level: "Advanced", 
    streak: 22,
    xp: 5670,
    isOnline: true,
    currentActivity: "ML Algorithms Quiz",
    favoriteLanguage: "Python"
  },
  {
    id: "4",
    username: "webMaster",
    level: "Intermediate",
    streak: 5,
    xp: 1950,
    isOnline: true,
    currentActivity: "CSS Grid Layout",
    favoriteLanguage: "CSS"
  }
];

const suggestedFriends = [
  {
    id: "s1",
    username: "reactGuru",
    level: "Advanced",
    mutualFriends: 3,
    favoriteLanguage: "React"
  },
  {
    id: "s2",
    username: "pythonPro", 
    level: "Expert",
    mutualFriends: 2,
    favoriteLanguage: "Python"
  },
  {
    id: "s3",
    username: "jsWizard",
    level: "Intermediate", 
    mutualFriends: 1,
    favoriteLanguage: "JavaScript"
  }
];

export const FriendsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"friends" | "suggestions">("friends");

  const filteredFriends = sampleFriends.filter(friend =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = (username: string) => {
    // Mock friend request
    console.log(`Sending friend request to ${username}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline" size="sm">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Friends
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("friends")}
          className={`pb-3 px-1 border-b-2 transition-colors ${
            activeTab === "friends"
              ? "border-primary text-primary font-medium"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          My Friends ({sampleFriends.length})
        </button>
        <button
          onClick={() => setActiveTab("suggestions")}
          className={`pb-3 px-1 border-b-2 transition-colors ${
            activeTab === "suggestions"
              ? "border-primary text-primary font-medium"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Suggestions ({suggestedFriends.length})
        </button>
      </div>

      {/* Friends List */}
      {activeTab === "friends" && (
        <div className="space-y-4">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">
                {searchTerm ? "No friends found" : "No friends yet"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm 
                  ? "Try a different search term"
                  : "Start connecting with other learners"
                }
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setActiveTab("suggestions")}
                  className="gradient-primary text-primary-foreground"
                >
                  Find Friends
                </Button>
              )}
            </div>
          ) : (
            filteredFriends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="gradient-primary text-primary-foreground">
                          {friend.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{friend.username}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {friend.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {friend.favoriteLanguage}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>🔥</span>
                          <span>{friend.streak} streak</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{friend.xp} XP</span>
                        </div>
                      </div>
                      
                      {friend.currentActivity && (
                        <div className="text-xs text-primary mt-1">
                          Currently: {friend.currentActivity}
                        </div>
                      )}
                      
                      {friend.recentAchievement && (
                        <div className="flex items-center gap-1 text-xs text-warning mt-1">
                          <Trophy className="w-3 h-3" />
                          <span>Recent: {friend.recentAchievement}</span>
                        </div>
                      )}
                    </div>
                    
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Friend Suggestions */}
      {activeTab === "suggestions" && (
        <div className="space-y-4">
          <h3 className="font-medium">People you may know</h3>
          
          {suggestedFriends.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="gradient-primary text-primary-foreground">
                      {person.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{person.username}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {person.level}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {person.favoriteLanguage}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {person.mutualFriends} mutual friend{person.mutualFriends !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleAddFriend(person.username)}
                    size="sm"
                    className="gradient-primary text-primary-foreground"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Add Friend
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
          
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-4">
              Want to find more friends?
            </p>
            <Button variant="outline">
              Browse More Users
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};