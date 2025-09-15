import { Home, Search, Play, User } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

interface DesktopSideNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "explore", icon: Search, label: "Explore" },
  { id: "practice", icon: Play, label: "Practice" },
  { id: "profile", icon: User, label: "Profile" },
];

export const DesktopSideNav = ({ activeTab, onTabChange }: DesktopSideNavProps) => {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-24 bg-card/95 backdrop-blur-sm border-r border-border py-4">
      <nav className="flex flex-col items-center justify-between w-full h-full">
        <div className="flex flex-col items-center gap-2 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center w-full py-3 transition-all duration-200",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={item.label}
              >
                <Icon size={24} className={cn("mb-1", isActive && "drop-shadow-sm")} />
                <span className="text-[10px] font-medium truncate max-w-[80px]">{item.label}</span>
              </button>
            );
          })}
        </div>
        {/* Theme toggle at bottom */}
        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </nav>
    </aside>
  );
};
