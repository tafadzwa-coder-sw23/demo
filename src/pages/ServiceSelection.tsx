import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Truck, UtensilsCrossed, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceSelection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: "ride",
      title: "Book a Ride",
      description: "Get a taxi or car service to your destination",
      icon: Car,
      color: "truck-orange",
      route: "/transport"
    },
    {
      id: "truck",
      title: "Hire a Truck",
      description: "Book trucks for moving, hauling, and delivery",
      icon: Truck,
      color: "truck-red",
      route: "/transport"
    },
    {
      id: "food",
      title: "Order Food",
      description: "Discover restaurants and food trucks nearby",
      icon: UtensilsCrossed,
      color: "truck-yellow",
      route: "/food"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-sunset">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">TruckEats Go</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one platform for transportation and food delivery. 
            Book rides, hire trucks, or order food - all in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.id} 
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-warm border-2 hover:border-primary"
                onClick={() => navigate(service.route)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-${service.color}/20 flex items-center justify-center mb-4`}>
                    <IconComponent className={`h-8 w-8 text-${service.color}`} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.route);
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5min</div>
              <p className="text-muted-foreground">Average pickup time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Available anytime</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Active drivers & restaurants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;