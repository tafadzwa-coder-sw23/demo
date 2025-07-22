import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, User, Menu, X, Car, UtensilsCrossed } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import truckIcon from "@/assets/truck-icon.jpg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const menuItems = [
    { name: "Transportation", href: "/transport", icon: Car },
    { name: "Food Delivery", href: "/food", icon: UtensilsCrossed },
    { name: "Services", href: "/#services" },
    { name: "How it Works", href: "/#how-it-works" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <img 
              src={truckIcon} 
              alt="TruckEatsGo"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-xl font-bold text-foreground">
              <span className="text-primary">Truck</span>Eats<span className="text-primary">Go</span>
            </span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            {!isHomePage && (
              <>
                <button
                  onClick={() => navigate("/transport")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Car className="h-4 w-4" />
                  Transport
                </button>
                <button
                  onClick={() => navigate("/food")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <UtensilsCrossed className="h-4 w-4" />
                  Food
                </button>
              </>
            )}
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#trucks" className="text-muted-foreground hover:text-primary transition-colors">
              Food Trucks
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How it Works
            </a>
          </nav>

          {/* Location & Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Current Location</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button 
                variant="truck" 
                size="sm"
                onClick={() => navigate("/services")}
              >
                Get Started
              </Button>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4 bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.href.startsWith("/#")) {
                        const element = document.querySelector(item.href.slice(1));
                        element?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        navigate(item.href);
                      }
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-left text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    {item.name}
                  </button>
                );
              })}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="ghost" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button variant="truck" className="justify-start">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};