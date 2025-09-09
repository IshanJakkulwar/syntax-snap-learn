import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomNav } from "@/components/layout/BottomNav";
import { Home } from "@/pages/Home";
import { Explore } from "@/pages/Explore";
import { Practice } from "@/pages/Practice";
import { Profile } from "@/pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "explore":
        return <Explore />;
      case "practice":
        return <Practice />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          {renderContent()}
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
