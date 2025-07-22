import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Truck, Clock, Star } from "lucide-react";

export const Services = () => {
  const services = [
    {
      icon: Utensils,
      title: "Food Truck Delivery",
      description: "Order from the best local food trucks. Fresh, authentic street food delivered to your door.",
      features: ["30+ Food Trucks", "Real-time Tracking", "Hot & Fresh"],
      color: "text-primary"
    },
    {
      icon: Truck,
      title: "Truck Services",
      description: "Moving, delivery, or hauling? Book professional truck services for all your transportation needs.",
      features: ["Licensed Drivers", "Insured Service", "Same-Day Available"],
      color: "text-truck-red"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Two Services, One App
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're craving street food or need reliable truck services, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-warm transition-all duration-300 hover:scale-105 border-2">
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-warm flex items-center justify-center mb-4`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Star className="w-4 h-4 text-truck-yellow" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};