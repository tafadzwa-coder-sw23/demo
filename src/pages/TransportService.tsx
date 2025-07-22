import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, DollarSign, Car, Truck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TransportService = () => {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const vehicles = [
    {
      id: "taxi",
      name: "Taxi",
      description: "1-4 passengers",
      price: "$8-15",
      eta: "3-5 min",
      icon: Car,
      capacity: "4 people"
    },
    {
      id: "car",
      name: "Comfort Car",
      description: "Premium sedan",
      price: "$12-20",
      eta: "5-8 min",
      icon: Car,
      capacity: "4 people"
    },
    {
      id: "pickup",
      name: "Pickup Truck",
      description: "Small loads & furniture",
      price: "$25-45",
      eta: "8-15 min",
      icon: Truck,
      capacity: "1000 lbs"
    },
    {
      id: "truck",
      name: "Large Truck",
      description: "Moving & heavy loads",
      price: "$45-80",
      eta: "15-25 min",
      icon: Truck,
      capacity: "3000 lbs"
    }
  ];

  const handleBooking = () => {
    if (!selectedVehicle || !pickup || !destination) {
      return;
    }
    // Navigate to booking confirmation
    navigate("/booking-confirmation", { 
      state: { 
        service: "transport", 
        vehicle: selectedVehicle, 
        pickup, 
        destination 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-sunset">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="bg-white/80"
          >
            ← Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Book Transportation</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup address"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button 
                  className="w-full bg-gradient-primary"
                  onClick={handleBooking}
                  disabled={!selectedVehicle || !pickup || !destination}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Choose Your Vehicle</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {vehicles.map((vehicle) => {
                const IconComponent = vehicle.icon;
                const isSelected = selectedVehicle === vehicle.id;
                
                return (
                  <Card 
                    key={vehicle.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? "ring-2 ring-primary bg-primary/5" 
                        : "hover:shadow-warm bg-white/95 backdrop-blur"
                    }`}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                            <p className="text-muted-foreground text-sm">{vehicle.description}</p>
                          </div>
                        </div>
                        {isSelected && <Badge className="bg-primary">Selected</Badge>}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{vehicle.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{vehicle.eta}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs">{vehicle.capacity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <Navigation className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-sm text-muted-foreground">Track your driver's location live</p>
          </div>
          <div className="text-center">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Upfront Pricing</h3>
            <p className="text-sm text-muted-foreground">Know the cost before you book</p>
          </div>
          <div className="text-center">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quick Pickup</h3>
            <p className="text-sm text-muted-foreground">Fast response times guaranteed</p>
          </div>
          <div className="text-center">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Verified Drivers</h3>
            <p className="text-sm text-muted-foreground">Background checked professionals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportService;