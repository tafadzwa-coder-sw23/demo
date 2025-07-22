import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Clock, Truck, MapPin, Filter, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FoodService = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [activeCategory, setActiveCategory] = useState("all");

  const restaurants = [
    {
      id: "1",
      name: "Bella's Italian Kitchen",
      type: "restaurant",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: "$2.99",
      image: "photo-1565299624946-b28f40a0ca4b",
      categories: ["pasta", "pizza"],
      items: [
        { id: "1", name: "Margherita Pizza", price: 18.99, description: "Fresh tomatoes, mozzarella, basil" },
        { id: "2", name: "Spaghetti Carbonara", price: 16.99, description: "Creamy pasta with pancetta" }
      ]
    },
    {
      id: "2",
      name: "Taco Libre Food Truck",
      type: "truck",
      cuisine: "Mexican",
      rating: 4.6,
      deliveryTime: "15-25 min",
      deliveryFee: "$1.99",
      image: "photo-1565299507177-b0ac66763f30",
      categories: ["mexican"],
      items: [
        { id: "3", name: "Street Tacos (3)", price: 12.99, description: "Authentic Mexican street tacos" },
        { id: "4", name: "Burrito Bowl", price: 14.99, description: "Rice, beans, meat, veggies" }
      ]
    },
    {
      id: "3",
      name: "Dragon Wok Express",
      type: "restaurant",
      cuisine: "Chinese",
      rating: 4.7,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.49",
      image: "photo-1582878826629-29b7ad1cdc43",
      categories: ["chinese"],
      items: [
        { id: "5", name: "Sweet & Sour Chicken", price: 15.99, description: "Crispy chicken with sauce" },
        { id: "6", name: "Beef Lo Mein", price: 16.99, description: "Stir-fried noodles with beef" }
      ]
    },
    {
      id: "4",
      name: "Burger Paradise Truck",
      type: "truck",
      cuisine: "American",
      rating: 4.5,
      deliveryTime: "10-20 min",
      deliveryFee: "$1.49",
      image: "photo-1571019613454-1cb2f99b2d8b",
      categories: ["burgers"],
      items: [
        { id: "7", name: "Classic Cheeseburger", price: 13.99, description: "Beef patty, cheese, lettuce, tomato" },
        { id: "8", name: "BBQ Bacon Burger", price: 16.99, description: "BBQ sauce, bacon, onion rings" }
      ]
    }
  ];

  const categories = [
    { id: "all", name: "All", icon: "🍽️" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "burgers", name: "Burgers", icon: "🍔" },
    { id: "mexican", name: "Mexican", icon: "🌮" },
    { id: "chinese", name: "Chinese", icon: "🥡" },
    { id: "pasta", name: "Pasta", icon: "🍝" }
  ];

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || 
                           restaurant.categories.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gradient-sunset">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="bg-white/80"
            >
              ← Back
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Order Food</h1>
          </div>
          {cartItemsCount > 0 && (
            <Button 
              className="bg-gradient-primary relative"
              onClick={() => navigate("/cart")}
            >
              Cart ({cartItemsCount})
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants, cuisine, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/95"
              />
            </div>
            <Button variant="outline" className="bg-white/80">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  activeCategory === category.id 
                    ? "bg-gradient-primary" 
                    : "bg-white/80"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden bg-white/95 backdrop-blur hover:shadow-warm transition-all duration-300">
              <div className="relative">
                <img
                  src={`https://images.unsplash.com/${restaurant.image}?auto=format&fit=crop&w=400&q=80`}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={restaurant.type === "truck" ? "default" : "secondary"}>
                    {restaurant.type === "truck" ? (
                      <><Truck className="h-3 w-3 mr-1" /> Food Truck</>
                    ) : (
                      <><MapPin className="h-3 w-3 mr-1" /> Restaurant</>
                    )}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {restaurant.rating}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                  <p className="text-muted-foreground text-sm">{restaurant.cuisine} cuisine</p>
                </div>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {restaurant.deliveryTime}
                  </div>
                  <div>Delivery: {restaurant.deliveryFee}</div>
                </div>

                {/* Menu Items */}
                <div className="space-y-3">
                  {restaurant.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="font-semibold text-primary mt-1">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          {cart[item.id] ? (
                            <>
                              <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{cart[item.id]}</span>
                              <Button size="sm" variant="outline" onClick={() => addToCart(item.id)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" onClick={() => addToCart(item.id)}>
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No restaurants found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodService;