import { Feed } from "@/components/feed/Feed";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="lg:flex lg:max-w-7xl lg:mx-auto">
        {/* Main Feed */}
        <div className="flex-1 lg:max-w-2xl lg:mx-auto">
          <Feed />
        </div>
        
        {/* Desktop Sidebar */}
        <div className="lg:pl-8">
          <DesktopSidebar />
        </div>
      </div>
    </div>
  );
};