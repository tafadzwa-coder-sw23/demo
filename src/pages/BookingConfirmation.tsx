import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, DollarSign, Star, Phone, MessageCircle, Navigation } from "lucide-react";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("searching");

  const statuses = {
    searching: "Finding your driver...",
    found: "Driver found!",
    pickup: "Driver is on the way",
    arrived: "Driver has arrived",
    inProgress: "Trip in progress",
    completed: "Trip completed"
  };

  useEffect(() => {
    if (!bookingData) {
      navigate("/");
      return;
    }

    // Simulate booking progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatus("found");
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const mockDriver = {
    name: "John Smith",
    rating: 4.9,
    vehicle: "Toyota Camry - ABC 123",
    phone: "+1 (555) 123-4567",
    eta: "3 minutes",
    photo: "photo-1507003211169-0a1dd7228f2d"
  };

  return (
    <div className="min-h-screen bg-gradient-sunset">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/transport")}
            className="bg-white/80"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Booking Confirmation</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Status */}
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Booking Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{statuses[status]}</span>
                    <Badge variant={status === "found" ? "default" : "secondary"}>
                      {status === "searching" ? "Searching..." : "Confirmed"}
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {status === "found" && (
                  <div className="border rounded-lg p-4 bg-primary/5">
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://images.unsplash.com/${mockDriver.photo}?auto=format&fit=crop&w=60&q=80`}
                        alt={mockDriver.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{mockDriver.name}</h4>
                        <p className="text-sm text-muted-foreground">{mockDriver.vehicle}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{mockDriver.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">ETA: {mockDriver.eta}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trip Details */}
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2"></div>
                    <div>
                      <p className="font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground">{bookingData.pickup}</p>
                    </div>
                  </div>
                  <div className="ml-6 border-l-2 border-dashed border-muted h-6"></div>
                  <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-destructive mt-2"></div>
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-sm text-muted-foreground">{bookingData.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Vehicle Type</span>
                    <span className="font-medium capitalize">{bookingData.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time</span>
                    <span className="font-medium">15-20 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Fare</span>
                    <span className="font-medium text-primary">$18.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Live Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive map would appear here</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Real-time driver location & route
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-gradient-primary"
                onClick={() => navigate("/trip-tracking")}
                disabled={status === "searching"}
              >
                {status === "searching" ? "Searching for Driver..." : "View Live Tracking"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-white/80"
                onClick={() => navigate("/transport")}
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;