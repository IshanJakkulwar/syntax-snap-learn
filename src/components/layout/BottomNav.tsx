import { Home, Search, Play, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "explore", icon: Search, label: "Explore" },
  { id: "practice", icon: Play, label: "Practice" },
  { id: "profile", icon: User, label: "Profile" },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 pb-safe-bottom">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200",
                "min-w-[56px] min-h-[48px]",
                isActive
                  ? "text-primary scale-110"
                  : "text-muted-foreground hover:text-foreground hover:scale-105"
              )}
            >
               <Icon 
                size={20} 
                className={cn(
                  "transition-all duration-200",
                  isActive && "drop-shadow-sm"
                )} 
              />
               <span 
                className={cn(
                  "text-[10px] mt-0.5 font-medium transition-all duration-200",
                  isActive && "font-bold"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};