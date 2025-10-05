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
import { LessonViewer } from "@/pages/LessonViewer";
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentView({ page: tab });
  };

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
          onViewLesson={(lessonId: number, type: 'video' | 'notes') => 
            setCurrentView({ 
              page: "lesson-viewer", 
              data: { courseId: currentView.data?.courseId, lessonId: String(lessonId), returnTo: "course-detail" } 
            })
          }
        />;
      case "video-course":
        return <VideoCoursePage 
          courseId={currentView.data?.courseId} 
          onBack={() => setCurrentView({ page: "explore" })}
          onStartVideo={() => setCurrentView({ page: "home" })}
          onViewLesson={(lessonId: number, type: 'video' | 'notes') => 
            setCurrentView({ 
              page: "lesson-viewer", 
              data: { courseId: currentView.data?.courseId, lessonId: String(lessonId), returnTo: "video-course" } 
            })
          }
        />;
      case "lesson-viewer":
        return <LessonViewer 
          courseId={currentView.data?.courseId}
          lessonId={currentView.data?.lessonId}
          onBack={() => setCurrentView({ page: currentView.data?.returnTo || "video-course", data: { courseId: currentView.data?.courseId } })}
        />;
      default:
        return <Home onNavigateToNotes={(lessonId: string) => setCurrentView({ page: "notes", data: { lessonId } })} />;
    }
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
