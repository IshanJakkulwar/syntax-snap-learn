import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Cpu, Sparkles, Users, Award, BookOpen } from "lucide-react";

interface IndexProps {
  onGetStarted?: () => void;
  onNavigateToWorkshops?: () => void;
}

const Index = ({ onGetStarted, onNavigateToWorkshops }: IndexProps) => {

  const handleGetStarted = () => {
    onGetStarted?.();
  };

  const handleWorkshopsClick = () => {
    onNavigateToWorkshops?.();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">Dij</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#programs" className="text-muted-foreground hover:text-foreground transition-colors">Programs</a>
            <a href="#syntax-ai" className="text-muted-foreground hover:text-foreground transition-colors">Syntax AI</a>
            <Button onClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Empowering the Next Generation of Innovators</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
              Transform Your Digital Future
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Dij delivers cutting-edge digital literacy, AI, and robotics workshops combined with our revolutionary learning platform, Syntax AI—where education meets innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleGetStarted} className="gap-2">
                Explore Syntax AI
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleWorkshopsClick}>Learn About Our Workshops</Button>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Who We Are</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dij is at the forefront of digital education, bridging the gap between traditional learning and future-ready skills.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We're dedicated to democratizing access to cutting-edge technology education. Through hands-on workshops and our innovative Syntax AI platform, we equip students with the skills they need to thrive in an increasingly digital world.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From AI fundamentals to robotics engineering, we make complex concepts accessible and engaging for learners of all levels.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-border">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Code2 className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Digital Literacy</h4>
                    <p className="text-sm text-muted-foreground">Building foundational tech skills for the modern world</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Cpu className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">AI & Machine Learning</h4>
                    <p className="text-sm text-muted-foreground">Hands-on experience with cutting-edge AI technologies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Robotics Engineering</h4>
                    <p className="text-sm text-muted-foreground">Interactive workshops bringing code to life</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Workshop Programs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Interactive, hands-on learning experiences designed to inspire and educate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-8 border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Digital Literacy</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive workshops covering essential digital skills, from basic computing to advanced programming concepts.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Introduction to Computing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Web Development Basics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Data Literacy & Analysis
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI Workshops</h3>
              <p className="text-muted-foreground mb-4">
                Explore the fascinating world of artificial intelligence through practical projects and real-world applications.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Machine Learning Fundamentals
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Neural Networks & Deep Learning
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  AI Ethics & Applications
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Robotics</h3>
              <p className="text-muted-foreground mb-4">
                Hands-on robotics workshops where students build, program, and innovate with cutting-edge technology.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Robot Design & Assembly
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Sensors & Automation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  Advanced Robotics Projects
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Syntax AI Section */}
      <section id="syntax-ai" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-3xl p-12 border border-primary/20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Our Revolutionary Platform</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Syntax AI</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Learn to code the way you scroll. Syntax AI transforms programming education with bite-sized, swipeable lessons that make learning addictive and effective.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Interactive Learning</div>
                    <div className="text-sm text-muted-foreground">Swipe through lessons like social media</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Code2 className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Real Code Examples</div>
                    <div className="text-sm text-muted-foreground">Practice with actual programming concepts</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Community Driven</div>
                    <div className="text-sm text-muted-foreground">Learn alongside thousands of students</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-semibold mb-1">Gamified Progress</div>
                    <div className="text-sm text-muted-foreground">Track streaks and earn achievements</div>
                  </div>
                </div>
              </div>
              <Button size="lg" onClick={handleGetStarted} className="gap-2">
                Try Syntax AI Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students already transforming their futures with Dij.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleGetStarted} className="gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline">Contact Us</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">Dij</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering the next generation through digital literacy, AI, and robotics education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Digital Literacy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">AI Workshops</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Robotics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Syntax AI</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Dij. All rights reserved. Powering digital futures through innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;