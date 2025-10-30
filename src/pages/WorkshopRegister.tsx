import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Code2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface WorkshopRegisterProps {
  onBack?: () => void;
}

const WorkshopRegister = ({ onBack }: WorkshopRegisterProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: "",
    experience: "",
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success("Registration submitted successfully!");
    }, 500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for registering for our workshop program. We've sent a confirmation email to {formData.email} with next steps.
          </p>
          <div className="space-y-3">
            <Button size="lg" className="w-full" onClick={onBack}>
              Back to Workshops
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={onBack}>
              View Workshop Schedule
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
            <span className="text-xl font-bold">Workshop Registration</span>
          </div>
        </div>
      </header>

      {/* Registration Form */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Register for a Workshop</h1>
            <p className="text-muted-foreground text-lg">
              Complete the form below to secure your spot in our next workshop program.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Program Selection */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Program Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="program">Select Workshop Program *</Label>
                  <Select
                    required
                    value={formData.program}
                    onValueChange={(value) => setFormData({ ...formData, program: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="digital-literacy">Digital Literacy Workshop</SelectItem>
                      <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                      <SelectItem value="robotics">Robotics Engineering</SelectItem>
                      <SelectItem value="web-dev">Web Development Bootcamp</SelectItem>
                      <SelectItem value="python">Python Programming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Programming Experience *</Label>
                  <Select
                    required
                    value={formData.experience}
                    onValueChange={(value) => setFormData({ ...formData, experience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - No prior experience</SelectItem>
                      <SelectItem value="some">Some Experience - Basic coding knowledge</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Comfortable with programming</SelectItem>
                      <SelectItem value="advanced">Advanced - Extensive coding background</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, agreeTerms: checked as boolean })
                    }
                  />
                  <div className="flex-1">
                    <label
                      htmlFor="terms"
                      className="text-sm cursor-pointer leading-relaxed"
                    >
                      I agree to the terms and conditions and understand that workshop spots are
                      limited and allocated on a first-come, first-served basis. *
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full">
                  Complete Registration
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  * Required fields
                </p>
              </div>
            </form>
          </div>

          {/* Additional Information */}
          <div className="mt-8 p-6 bg-muted/30 rounded-xl">
            <h4 className="font-semibold mb-3">What happens next?</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">1.</span>
                <span>You'll receive a confirmation email within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">2.</span>
                <span>Our team will contact you to discuss schedule options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">3.</span>
                <span>You'll receive workshop materials and preparation guidelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">4.</span>
                <span>Join your first session and start your learning journey!</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorkshopRegister;
