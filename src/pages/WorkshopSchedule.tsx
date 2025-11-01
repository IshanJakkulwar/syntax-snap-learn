import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code2, Calendar, Clock, Users, MapPin } from "lucide-react";

interface WorkshopScheduleProps {
  onBack?: () => void;
  onRegister?: () => void;
}

const WorkshopSchedule = ({ onBack, onRegister }: WorkshopScheduleProps) => {
  const upcomingWorkshops = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      program: "Digital Literacy",
      date: "March 15-17, 2025",
      time: "10:00 AM - 4:00 PM",
      duration: "3 days",
      location: "Online (Zoom)",
      spots: 8,
      totalSpots: 15,
      level: "Beginner",
      instructor: "Ishan Jakkulwar",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      program: "AI & Machine Learning",
      date: "March 22-29, 2025",
      time: "6:00 PM - 9:00 PM",
      duration: "4 sessions",
      location: "Hybrid (In-person + Online)",
      spots: 3,
      totalSpots: 12,
      level: "Intermediate",
      instructor: "Aditya Shah",
    },
    {
      id: 3,
      title: "Arduino Robot Building Workshop",
      program: "Robotics Engineering",
      date: "April 5-12, 2025",
      time: "2:00 PM - 6:00 PM",
      duration: "2 weekends",
      location: "Dij Innovation Lab, Building A",
      spots: 5,
      totalSpots: 10,
      level: "Beginner",
      instructor: "Ishan Jakkulwar",
    },
    {
      id: 4,
      title: "Web Development with React",
      program: "Digital Literacy",
      date: "April 15-22, 2025",
      time: "7:00 PM - 9:30 PM",
      duration: "4 sessions",
      location: "Online (Zoom)",
      spots: 12,
      totalSpots: 20,
      level: "Intermediate",
      instructor: "Aditya Shah",
    },
    {
      id: 5,
      title: "AI Ethics & Responsible AI Development",
      program: "AI & Machine Learning",
      date: "May 3, 2025",
      time: "10:00 AM - 5:00 PM",
      duration: "1 day intensive",
      location: "Online (Zoom)",
      spots: 15,
      totalSpots: 25,
      level: "All Levels",
      instructor: "Ishan Jakkulwar",
    },
    {
      id: 6,
      title: "Advanced Robotics Competition Prep",
      program: "Robotics Engineering",
      date: "May 10-24, 2025",
      time: "9:00 AM - 5:00 PM",
      duration: "3 Saturdays",
      location: "Dij Innovation Lab, Building A",
      spots: 2,
      totalSpots: 8,
      level: "Advanced",
      instructor: "Aditya Shah",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-success/10 text-success border-success/20";
      case "Intermediate":
        return "bg-warning/10 text-warning border-warning/20";
      case "Advanced":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getAvailabilityColor = (spots: number, total: number) => {
    const percentage = (spots / total) * 100;
    if (percentage > 50) return "text-success";
    if (percentage > 20) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Workshop Schedule</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-6 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Workshop Sessions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Browse our scheduled workshops and secure your spot today. Limited seats available!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Badge variant="outline" className="px-4 py-2">All Programs</Badge>
            <Badge variant="outline" className="px-4 py-2">Digital Literacy</Badge>
            <Badge variant="outline" className="px-4 py-2">AI & Machine Learning</Badge>
            <Badge variant="outline" className="px-4 py-2">Robotics Engineering</Badge>
          </div>
        </div>
      </section>

      {/* Workshop List */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingWorkshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {workshop.program}
                      </Badge>
                      <Badge variant="outline" className={getLevelColor(workshop.level)}>
                        {workshop.level}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Instructor: {workshop.instructor}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{workshop.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">
                      {workshop.time} • {workshop.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{workshop.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span className={getAvailabilityColor(workshop.spots, workshop.totalSpots)}>
                      {workshop.spots} of {workshop.totalSpots} spots available
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={onRegister}
                    disabled={workshop.spots === 0}
                  >
                    {workshop.spots === 0 ? "Fully Booked" : "Register Now"}
                  </Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Important Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold mb-3">Registration Policy</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Registration closes 48 hours before workshop start</li>
                <li>• Payment required to secure your spot</li>
                <li>• Early bird discounts available for group registrations</li>
                <li>• Cancellations accepted up to 7 days before start date</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• All workshop materials and resources</li>
                <li>• Certificate of completion</li>
                <li>• Access to online learning platform</li>
                <li>• Post-workshop support and community access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See What You're Looking For?</h2>
          <p className="text-muted-foreground mb-6">
            We're constantly adding new workshops. Contact us to suggest a topic or join our
            waitlist for upcoming sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline">
              Join Waitlist
            </Button>
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopSchedule;
