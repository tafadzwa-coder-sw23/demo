import { Button } from "@/components/ui/button";
import { Smartphone, Apple, PlayCircle } from "lucide-react";
import truckIcon from "@/assets/truck-icon.jpg";

export const DownloadApp = () => {
  return (
    <section className="py-20 bg-gradient-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Get the TruckEatsGo App
              </h2>
              <p className="text-xl opacity-90 max-w-lg">
                Download our mobile app for the best experience. Order food trucks, book services, and track everything on the go.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Real-time GPS tracking</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Push notifications for updates</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Exclusive app-only deals</span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="secondary" size="lg" className="flex items-center gap-2">
                <Apple className="w-5 h-5" />
                Download for iOS
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2 border-white text-white hover:bg-white hover:text-primary">
                <PlayCircle className="w-5 h-5" />
                Get on Android
              </Button>
            </div>
          </div>

          {/* Right Column - Phone Mockup */}
          <div className="relative">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Phone Frame */}
              <div className="bg-gray-800 rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Phone Screen Content */}
                  <div className="p-6 bg-gradient-sunset h-96 flex flex-col justify-between">
                    {/* Header */}
                    <div className="text-center">
                      <img 
                        src={truckIcon} 
                        alt="TruckEatsGo"
                        className="w-16 h-16 mx-auto rounded-2xl mb-4"
                      />
                      <h3 className="text-xl font-bold text-foreground">TruckEatsGo</h3>
                      <p className="text-sm text-muted-foreground">Food & Services</p>
                    </div>

                    {/* Mock Interface */}
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-3 backdrop-blur">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <Smartphone className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Order Tracking</div>
                            <div className="text-xs text-muted-foreground">Your food is on the way!</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground">Find nearby trucks...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-truck-yellow text-white p-3 rounded-full shadow-lg animate-float">
                <Smartphone className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};