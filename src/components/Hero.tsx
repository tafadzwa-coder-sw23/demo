import { Button } from "@/components/ui/button";
import { MapPin, Truck, Utensils } from "lucide-react";
import heroImage from "@/assets/hero-food-truck.jpg";

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-sunset overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                <span className="text-primary">Truck</span>Eats
                <span className="text-primary">Go</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Delicious food trucks and reliable truck services delivered right to your location. Fast, fresh, and convenient.
              </p>
            </div>

            {/* Service Icons */}
            <div className="flex justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Utensils className="w-6 h-6 text-primary" />
                <span>Food Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Truck className="w-6 h-6 text-primary" />
                <span>Truck Services</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-6 h-6 text-primary" />
                <span>Track Location</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="truck" size="lg">
                Order Food Now
              </Button>
              <Button variant="warm" size="lg">
                Book Truck Service
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto animate-float">
              <img 
                src={heroImage} 
                alt="Food Truck"
                className="w-full h-80 object-cover rounded-3xl shadow-truck"
              />
              <div className="absolute -top-4 -right-4 bg-primary text-white p-4 rounded-full shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <Utensils className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-truck-red text-white p-4 rounded-full shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                <Truck className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};