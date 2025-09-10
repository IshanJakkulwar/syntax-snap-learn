import { Feed } from "@/components/feed/Feed";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";

interface HomeProps {
  onNavigateToNotes: (lessonId: string) => void;
}

export const Home = ({ onNavigateToNotes }: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="lg:flex lg:max-w-7xl lg:mx-auto">
        {/* Main Feed */}
        <div className="flex-1 lg:max-w-2xl lg:mx-auto">
          <Feed onNavigateToNotes={onNavigateToNotes} />
        </div>
        
        {/* Desktop Sidebar */}
        <div className="lg:pl-8">
          <DesktopSidebar />
        </div>
      </div>
    </div>
  );
};