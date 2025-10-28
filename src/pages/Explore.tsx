import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const topics = [
  "Python", "JavaScript", "C++", "React", "Machine Learning", 
  "Data Structures", "Algorithms", "Web Development", "Mobile"
];

const levels = ["Beginner", "Intermediate", "Advanced"];
const durations = ["Quick (<2 min)", "Standard (2-5 min)", "Deep Dive (5+ min)"];

const collections = [
  {
    id: "1",
    title: "Python Fundamentals",
    description: "Master the basics of Python programming",
    itemCount: 12,
    level: "Beginner",
    estimatedTime: "45 min",
    thumbnail: "🐍"
  },
  {
    id: "2", 
    title: "JavaScript ES6+",
    description: "Modern JavaScript features and best practices",
    itemCount: 8,
    level: "Intermediate", 
    estimatedTime: "30 min",
    thumbnail: "⚡"
  },
  {
    id: "3",
    title: "React Hooks Deep Dive",
    description: "Master all React hooks with practical examples",
    itemCount: 15,
    level: "Advanced",
    estimatedTime: "60 min", 
    thumbnail: "⚛️"
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    description: "Essential DSA concepts for interviews",
    itemCount: 20,
    level: "Intermediate",
    estimatedTime: "90 min",
    thumbnail: "🔗"
  }
];

interface ExploreProps {
  onNavigateToMyCourses?: () => void;
  onNavigateToCourse?: (courseId: string) => void;
}

export const Explore = ({ onNavigateToMyCourses, onNavigateToCourse }: ExploreProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = !selectedLevel || collection.level === selectedLevel;
    
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Explore</h1>
          <p className="text-muted-foreground">Discover new topics and collections</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search topics, languages, frameworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 h-12"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-card rounded-lg border animate-fade-in">
            <div className="space-y-4">
              {/* Topics */}
              <div>
                <h3 className="font-medium mb-2">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {topics.slice(0, 6).map((topic) => (
                    <Badge
                      key={topic}
                      variant={selectedTopics.includes(topic) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedTopics.includes(topic) && "gradient-primary text-primary-foreground"
                      )}
                      onClick={() => toggleTopic(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                  {topics.length > 6 && (
                    <Badge 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={() => {
                        // Show all topics
                        const remainingTopics = topics.slice(6);
                        setSelectedTopics(prev => [...prev, ...remainingTopics]);
                      }}
                    >
                      See more +{topics.length - 6}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Level */}
              <div>
                <h3 className="font-medium mb-2">Level</h3>
                <div className="flex gap-2">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer transition-colors",
                        selectedLevel === level && "gradient-primary text-primary-foreground"
                      )}
                      onClick={() => setSelectedLevel(selectedLevel === level ? "" : level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTopics([]);
                    setSelectedLevel("");
                    setSearchQuery("");
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <Button variant="ghost" className="border-b-2 border-primary font-semibold">
            For You
          </Button>
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
            onClick={onNavigateToMyCourses}
          >
            My Courses
          </Button>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCollections.map((collection) => (
            <Card 
              key={collection.id} 
              className="p-6 hover:shadow-medium transition-all duration-200 cursor-pointer group"
              onClick={() => onNavigateToCourse?.(collection.id)}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{collection.thumbnail}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {collection.level}
                    </Badge>
                    <span>•</span>
                    <span>{collection.itemCount} bite-sized lessons</span>
                    <span>•</span>
                    <span>{collection.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No collections found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};