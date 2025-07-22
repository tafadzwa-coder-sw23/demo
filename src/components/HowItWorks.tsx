import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Truck, CheckCircle } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Select",
      description: "Find food trucks or truck services near you. Filter by cuisine, rating, or service type."
    },
    {
      icon: MapPin,
      title: "Choose Location",
      description: "Set your delivery location or pickup point. We'll show you the best options nearby."
    },
    {
      icon: Truck,
      title: "Track & Enjoy",
      description: "Follow your order or service in real-time. Get updates every step of the way."
    },
    {
      icon: CheckCircle,
      title: "Rate & Review",
      description: "Share your experience to help other users discover great food trucks and services."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting your favorite food or booking truck services is simple and quick
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="hover:shadow-warm transition-all duration-300 text-center border-2">
                <CardContent className="p-6">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-warm rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-primary z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};