import { Feed } from "@/components/feed/Feed";

interface HomeProps {
  onNavigateToNotes: (lessonId: string) => void;
}

export const Home = ({ onNavigateToNotes }: HomeProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        <Feed onNavigateToNotes={onNavigateToNotes} />
      </div>
    </div>
  );
};