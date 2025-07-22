import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Navigation, Clock, Phone, MessageCircle, Star, Car } from "lucide-react";

interface LiveTrackingProps {
  type: "transport" | "food";
  orderId?: string;
}

const LiveTracking = ({ type, orderId = "TR-2024-001" }: LiveTrackingProps) => {
  const [progress, setProgress] = useState(65);
  const [eta, setEta] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
      
      setEta(prev => {
        const newEta = prev - 0.1;
        return newEta <= 0 ? 0 : Math.max(0, newEta);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const driver = {
    name: "Mike Rodriguez",
    rating: 4.9,
    vehicle: type === "transport" ? "Honda Civic - XYZ 789" : "Delivery Bike - DEL 456",
    phone: "+1 (555) 987-6543",
    photo: "photo-1507003211169-0a1dd7228f2d",
    currentLocation: "Main St & 5th Ave"
  };

  const statusSteps = type === "transport" 
    ? ["Booking Confirmed", "Driver Assigned", "Driver En Route", "Arrived", "Trip Started", "Completed"]
    : ["Order Confirmed", "Preparing", "Driver Assigned", "Picked Up", "On The Way", "Delivered"];

  const currentStep = Math.floor((progress / 100) * statusSteps.length);

  return (
    <div className="space-y-6">
      {/* Live Map */}
      <Card className="bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            Live Tracking - {orderId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/20 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Map placeholder with animated elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full opacity-30 bg-muted/20"></div>
            </div>
            
            {/* Driver location indicator */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping"></div>
            </div>
            
            {/* Destination indicator */}
            <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
              <div className="w-4 h-4 bg-destructive rounded-full border-2 border-white shadow-lg"></div>
            </div>
            
            {/* Route line */}
            <div className="absolute top-1/3 left-1/2 w-24 h-0.5 bg-primary transform rotate-45 origin-left"></div>
            
            <div className="text-center z-10">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground font-medium">Interactive Map</p>
              <p className="text-sm text-muted-foreground">Real-time GPS tracking</p>
            </div>
          </div>
          
          {/* ETA and Progress */}
          <div className="mt-4 p-4 bg-primary/5 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Estimated Arrival</span>
              <Badge variant="secondary">
                <Clock className="h-3 w-3 mr-1" />
                {Math.ceil(eta)} min
              </Badge>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Driver Info */}
      <Card className="bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Your {type === "transport" ? "Driver" : "Delivery Partner"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={`https://images.unsplash.com/${driver.photo}?auto=format&fit=crop&w=60&q=80`}
              alt={driver.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{driver.name}</h4>
              <p className="text-sm text-muted-foreground">{driver.vehicle}</p>
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{driver.rating}</span>
                <span className="text-sm text-muted-foreground">(328 trips)</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p><strong>Current Location:</strong> {driver.currentLocation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card className="bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  index <= currentStep 
                    ? "bg-primary border-primary" 
                    : index === currentStep + 1
                    ? "border-primary animate-pulse"
                    : "border-muted"
                }`}></div>
                <span className={`text-sm ${
                  index <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {step}
                </span>
                {index === currentStep && (
                  <Badge variant="default" className="ml-auto">
                    Current
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { LiveTracking };