import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, MapPin } from "lucide-react";

export const FeaturedTrucks = () => {
  const trucks = [
    {
      name: "Taco Libre",
      cuisine: "Mexican",
      rating: 4.8,
      time: "25-35 min",
      distance: "0.8 mi",
      image: "🌮",
      popular: "Fish Tacos",
      description: "Authentic Mexican street food with a modern twist"
    },
    {
      name: "Burger Brigade",
      cuisine: "American",
      rating: 4.9,
      time: "20-30 min",
      distance: "1.2 mi",
      image: "🍔",
      popular: "Truffle Burger",
      description: "Gourmet burgers made with premium local ingredients"
    },
    {
      name: "Noodle Nomad",
      cuisine: "Asian",
      rating: 4.7,
      time: "15-25 min",
      distance: "0.5 mi",
      image: "🍜",
      popular: "Ramen Bowl",
      description: "Traditional Asian noodles and dumplings"
    }
  ];

  return (
    <section className="py-20 bg-warm-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Food Trucks
          </h2>
          <p className="text-xl text-muted-foreground">
            Discover the most popular food trucks in your area
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trucks.map((truck, index) => (
            <Card key={index} className="hover:shadow-warm transition-all duration-300 hover:scale-105 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{truck.image}</div>
                <CardTitle className="text-xl">{truck.name}</CardTitle>
                <CardDescription>{truck.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{truck.cuisine}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-truck-yellow fill-current" />
                    <span className="text-sm font-medium">{truck.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{truck.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{truck.distance} away</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-2">Most Popular:</div>
                  <div className="font-medium text-primary">{truck.popular}</div>
                </div>

                <Button variant="truck" className="w-full">
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};