import { Truck, Utensils, MapPin, Phone, Mail } from "lucide-react";
import truckIcon from "@/assets/truck-icon.jpg";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={truckIcon} 
                alt="TruckEatsGo"
                className="w-10 h-10 rounded-lg"
              />
              <span className="text-xl font-bold">
                TruckEatsGo
              </span>
            </div>
            <p className="text-background/80 text-sm">
              Your go-to platform for food truck delivery and truck services. Fast, reliable, and convenient.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Services</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-background/80 hover:text-background cursor-pointer">
                <Utensils className="w-4 h-4" />
                <span>Food Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-background/80 hover:text-background cursor-pointer">
                <Truck className="w-4 h-4" />
                <span>Moving Services</span>
              </div>
              <div className="flex items-center gap-2 text-background/80 hover:text-background cursor-pointer">
                <MapPin className="w-4 h-4" />
                <span>Track Orders</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2 text-sm text-background/80">
              <a href="#" className="block hover:text-background">About Us</a>
              <a href="#" className="block hover:text-background">Careers</a>
              <a href="#" className="block hover:text-background">Partner with Us</a>
              <a href="#" className="block hover:text-background">Help Center</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="space-y-2 text-sm text-background/80">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-TRUCK-GO</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@truckeatsgo.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center text-sm text-background/60">
          <p>&copy; 2024 TruckEatsGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};