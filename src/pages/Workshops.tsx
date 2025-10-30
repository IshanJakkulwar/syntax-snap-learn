import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Cpu, Sparkles, Calendar, Users, Clock, Award } from "lucide-react";

interface WorkshopsProps {
  onBack?: () => void;
  onRegister?: () => void;
  onSchedule?: () => void;
}

const Workshops = ({ onBack, onRegister, onSchedule }: WorkshopsProps) => {
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
            <span className="text-xl font-bold">Dij Workshops</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Hands-On Learning Experiences</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Skills Through Interactive Workshops
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our immersive workshops designed to empower students with cutting-edge skills in digital literacy, AI, and robotics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onRegister}>Register Now</Button>
              <Button size="lg" variant="outline" onClick={onSchedule}>View Schedule</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Types */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Workshop Programs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of programs designed for all skill levels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Digital Literacy */}
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all hover:shadow-lg">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Digital Literacy Workshops</h3>
              <p className="text-muted-foreground mb-6">
                Build foundational tech skills from basic computing to advanced programming concepts.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">4-8 week programs</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Small group sessions (12-15 students)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Certificate upon completion</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Introduction to Computing & Internet Safety
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  HTML/CSS Web Development
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Python Programming Basics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Data Literacy & Spreadsheets
                </li>
              </ul>
              <Button className="w-full">Learn More</Button>
            </div>

            {/* AI Workshops */}
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all hover:shadow-lg">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Cpu className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI & Machine Learning</h3>
              <p className="text-muted-foreground mb-6">
                Explore artificial intelligence through hands-on projects and real-world applications.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">6-10 week programs</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Small group sessions (10-12 students)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Project portfolio & certificate</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Introduction to AI & ML Concepts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Neural Networks & Deep Learning
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Computer Vision Projects
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  AI Ethics & Responsible AI
                </li>
              </ul>
              <Button className="w-full">Learn More</Button>
            </div>

            {/* Robotics */}
            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary transition-all hover:shadow-lg">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Robotics Engineering</h3>
              <p className="text-muted-foreground mb-6">
                Build, program, and innovate with robotics technology in hands-on workshop environments.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">8-12 week programs</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Small group sessions (8-10 students)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Competition entry & certificate</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Robot Design & Mechanical Assembly
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Arduino & Raspberry Pi Programming
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Sensors, Motors & Automation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Robotics Competition Projects
                </li>
              </ul>
              <Button className="w-full">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Workshops */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Dij Workshops?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide more than just education—we create transformative learning experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground text-sm">
                Learn from industry professionals with real-world experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hands-On Projects</h3>
              <p className="text-muted-foreground text-sm">
                Build real projects you can showcase in your portfolio
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Certification</h3>
              <p className="text-muted-foreground text-sm">
                Earn recognized certificates upon program completion
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
              <p className="text-muted-foreground text-sm">
                Weekend and evening sessions available to fit your schedule
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Begin Your Learning Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join our next workshop session and transform your skills with Dij.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onRegister}>Register for a Workshop</Button>
            <Button size="lg" variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshops;
