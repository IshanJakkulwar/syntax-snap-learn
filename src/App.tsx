import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomNav } from "@/components/layout/BottomNav";
import { DesktopSideNav } from "@/components/layout/DesktopSideNav";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { Home } from "@/pages/Home";
import { Explore } from "@/pages/Explore";
import { Practice } from "@/pages/Practice";
import { Profile } from "@/pages/Profile";
import { NotesPage } from "@/pages/NotesPage";
import { Settings } from "@/pages/Settings";
import { MyCourses } from "@/pages/MyCourses";
import { CourseDetail } from "@/pages/CourseDetail";
import { VideoCoursePage } from "@/pages/VideoCoursePage";
import { useIsMobile } from "@/hooks/use-mobile";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [currentView, setCurrentView] = useState<{ page: string; data?: any }>({ page: "home" });
  const isMobile = useIsMobile();

  const handleOnboardingComplete = (data: any) => {
    console.log("Onboarding completed:", data);
    setHasCompletedOnboarding(true);
  };

  if (!hasCompletedOnboarding) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  const renderContent = () => {
    switch (currentView.page) {
      case "home":
        return <Home onNavigateToNotes={(lessonId: string) => setCurrentView({ page: "notes", data: { lessonId } })} />;
      case "explore":
        return <Explore 
          onNavigateToMyCourses={() => setCurrentView({ page: "my-courses" })} 
          onNavigateToCourse={(courseId: string) => setCurrentView({ page: "video-course", data: { courseId } })}
        />;
      case "practice":
        return <Practice />;
      case "profile":
        return <Profile onNavigateToSettings={() => setCurrentView({ page: "settings" })} />;
      case "notes":
        return <NotesPage lessonId={currentView.data?.lessonId} onBack={() => setCurrentView({ page: "home" })} />;
      case "settings":
        return <Settings onBack={() => setCurrentView({ page: "profile" })} />;
      case "my-courses":
        return <MyCourses onNavigateToCourse={(courseId: string) => setCurrentView({ page: "course-detail", data: { courseId } })} />;
      case "course-detail":
        return <CourseDetail 
          courseId={currentView.data?.courseId} 
          onBack={() => setCurrentView({ page: "my-courses" })}
          onStartCourse={() => setCurrentView({ page: "home" })}
        />;
      case "video-course":
        return <VideoCoursePage 
          courseId={currentView.data?.courseId} 
          onBack={() => setCurrentView({ page: "explore" })}
          onStartVideo={() => setCurrentView({ page: "home" })}
        />;
      default:
        return <Home onNavigateToNotes={(lessonId: string) => setCurrentView({ page: "notes", data: { lessonId } })} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentView({ page: tab });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background flex">
          {!isMobile && (
            <DesktopSideNav activeTab={activeTab} onTabChange={handleTabChange} />
          )}
          <main className="flex-1 w-full md:ml-24">
            {renderContent()}
          </main>
          {isMobile && (
            <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
