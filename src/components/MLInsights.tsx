import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, MapPin, Users, Brain, Zap } from "lucide-react";

const MLInsights = () => {
  const insights = [
    {
      title: "Demand Prediction",
      description: "Peak hours: 12-2 PM, 6-8 PM",
      confidence: 92,
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "Optimal Routes",
      description: "15% faster delivery times",
      confidence: 88,
      icon: MapPin,
      color: "text-truck-red"
    },
    {
      title: "Driver Matching",
      description: "99.2% successful matches",
      confidence: 96,
      icon: Users,
      color: "text-truck-yellow"
    },
    {
      title: "Wait Time Estimate",
      description: "Average: 4.2 minutes",
      confidence: 85,
      icon: Clock,
      color: "text-secondary-foreground"
    }
  ];

  const recommendations = [
    "Consider ordering from Pizza Palace - 20% faster delivery in your area",
    "Book a ride now - demand is low, prices reduced by 15%",
    "Truck availability is high - perfect time for moving services"
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-warm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI-Powered Insights
            <Badge variant="secondary" className="ml-auto">
              <Zap className="h-3 w-3 mr-1" />
              Live
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className="p-4 bg-white/60 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className={`h-5 w-5 ${insight.color}`} />
                    <h4 className="font-semibold text-sm">{insight.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Confidence</span>
                      <span>{insight.confidence}%</span>
                    </div>
                    <Progress value={insight.confidence} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/95 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Smart Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { MLInsights };