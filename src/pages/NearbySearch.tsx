import React, { useState, useMemo, useEffect } from "react";
import Modal from "../components/Modal";
import { Heart, HelpCircle, Utensils, Car, Truck as TruckIcon, CheckCircle, Sun, Search, Star } from "lucide-react";

const mockData = {
  Food: [
    {
      id: 1,
      name: "Mama Africa's Kitchen",
      distance: 0.5,
      rating: 4.7,
      desc: "Traditional Zimbabwean cuisine with a modern twist.",
      price: "$",
      lat: -17.8252, // Harare CBD
      lng: 31.0264,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "8:00 AM - 8:00 PM",
      contact: "+263 77 123 4567",
      badges: ["Popular", "Open Now"],
    },
    {
      id: 2,
      name: "Chesa Nyama House",
      distance: 1.2,
      rating: 4.5,
      desc: "Authentic chesa nyama with sides.",
      price: "$",
      lat: -17.8275, // Avondale
      lng: 31.0310,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "10:00 AM - 10:00 PM",
      contact: "+263 78 987 6543",
      badges: ["New"],
    },
    {
      id: 3,
      name: "Mugabe Street Eats",
      distance: 2.5,
      rating: 4.8,
      desc: "Street food favorites in the CBD.",
      price: "$",
      lat: -17.8235, // CBD
      lng: 31.0285,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "9:00 AM - 9:00 PM",
      contact: "+263 77 456 7890",
      badges: ["Popular"],
    },
  ],
  Taxi: [
    {
      id: 1,
      name: "Harare Express",
      distance: 0.3,
      rating: 4.9,
      desc: "4.9★ driver nearby in CBD.",
      price: "$",
      lat: -17.8255, // CBD
      lng: 31.0260,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "24/7",
      contact: "+263 77 123 4567",
      badges: ["Popular"],
    },
    {
      id: 2,
      name: "Avenues Taxis",
      distance: 1.5,
      rating: 4.7,
      desc: "Clean & fast service in Avenues.",
      price: "$",
      lat: -17.8280, // Avenues
      lng: 31.0320,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "24/7",
      contact: "+263 78 987 6543",
      badges: ["Open Now"],
    },
    {
      id: 3,
      name: "Harare City Cabs",
      distance: 2.0,
      rating: 4.6,
      desc: "Affordable rides across Harare.",
      price: "$",
      lat: -17.8245, // CBD
      lng: 31.0275,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "24/7",
      contact: "+263 77 456 7890",
      badges: ["New"],
    },
  ],
  Truck: [
    {
      id: 1,
      name: "Harare Movers",
      distance: 1.1,
      rating: 4.8,
      desc: "Spacious and reliable moving services.",
      price: "$$$",
      lat: -17.8260, // CBD
      lng: 31.0270,
      image: "https://images.unsplash.com/photo-1590674899484-6c7d4e6a489a?q=80&w=1932&auto=format&fit=crop",
      hours: "8:00 AM - 8:00 PM",
      contact: "+263 77 123 4567",
      badges: ["Open Now"],
    },
    {
      id: 2,
      name: "Quick Move",
      distance: 1.8,
      rating: 4.9,
      desc: "Professional moving services in Harare.",
      price: "$$$",
      lat: -17.8275, // Avenues
      lng: 31.0305,
      image: "https://images.unsplash.com/photo-1590674899484-6c7d4e6a489a?q=80&w=1932&auto=format&fit=crop",
      hours: "8:00 AM - 8:00 PM",
      contact: "+263 78 987 6543",
      badges: ["Popular"],
    },
    {
      id: 3,
      name: "Harare Haulers",
      distance: 3.5,
      rating: 4.5,
      desc: "DIY moving solutions in Harare.",
      price: "$",
      lat: -17.8240, // CBD
      lng: 31.0290,
      image: "https://images.unsplash.com/photo-1590674899484-6c7d4e6a489a?q=80&w=1932&auto=format&fit=crop",
      hours: "8:00 AM - 8:00 PM",
      contact: "+263 77 456 7890",
      badges: ["New"],
    },
  ],
};

const categories = ["Food", "Taxi", "Truck"];

const MapBackground = () => {
  return (
    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900">
      {/* Simulate map grid */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute h-full w-1 bg-gray-200 dark:bg-gray-800"
          style={{ left: `${i * 5}%` }}
        />
      ))}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-1 bg-gray-200 dark:bg-gray-800"
          style={{ top: `${i * 5}%` }}
        />
      ))}
      
      {/* Simulate map markers */}
      {mockData[categories[0]].map((item, idx) => (
        <div
          key={item.id}
          className="absolute w-4 h-4 rounded-full bg-red-500 dark:bg-red-400 shadow-lg cursor-pointer"
          style={{
            left: `${(item.lng + 17.8252) * 100}%`,
            top: `${(item.lat - 31.0264) * 100}%`,
          }}
          onClick={() => console.log(item)}
        />
      ))}
    </div>
  );
};

export default function NearbySearch() {
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState(Infinity); // Infinity means "All"
  const [selectedItem, setSelectedItem] = useState(null); // For modal
  const [darkMode, setDarkMode] = useState(false);
  const [minRating, setMinRating] = useState(0); // 0 means no filter
  const [userLocation, setUserLocation] = useState(null); // { lat, lng }
  const [sortBy, setSortBy] = useState("distance-asc"); // default sort
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [hoveredPin, setHoveredPin] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // For pagination
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Add to recent searches
  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        setRecentSearches((prev) => {
          const newSearches = [searchTerm, ...prev.filter((s) => s !== searchTerm)];
          return newSearches.slice(0, 5); // Keep last 5
        });
      }, 1000); // Debounce
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  // Get autocomplete suggestions
  useEffect(() => {
    if (searchTerm.length > 0) {
      const suggestions = mockData[selectedCategory]
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, selectedCategory]);

  // Helper to calculate distance between two lat/lng points (Haversine formula, miles)
  function calcDistance(lat1, lng1, lat2, lng2) {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 3958.8; // Radius of Earth in miles
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  // When userLocation is set, recalculate distances
  const resultsWithDistance = useMemo(() => {
    if (!userLocation) return mockData[selectedCategory];
    return mockData[selectedCategory].map((item) => ({
      ...item,
      distance: calcDistance(userLocation.lat, userLocation.lng, item.lat, item.lng),
    }));
  }, [selectedCategory, userLocation]);

  const filteredItems = useMemo(() => {
    let results = resultsWithDistance
      .filter((item) => (showOnlyFavorites ? favorites.includes(item.id) : true))
      .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((item) => item.distance < distanceFilter)
      .filter((item) => item.rating >= minRating);
    // Sorting
    if (sortBy === "distance-asc") results = results.sort((a, b) => a.distance - b.distance);
    if (sortBy === "distance-desc") results = results.sort((a, b) => b.distance - a.distance);
    if (sortBy === "rating-desc") results = results.sort((a, b) => b.rating - a.rating);
    if (sortBy === "rating-asc") results = results.sort((a, b) => a.rating - b.rating);
    if (sortBy === "price-asc") results = results.sort((a, b) => (a.price.length - b.price.length));
    if (sortBy === "price-desc") results = results.sort((a, b) => (b.price.length - a.price.length));
    return results;
  }, [resultsWithDistance, searchTerm, distanceFilter, minRating, sortBy, favorites, showOnlyFavorites]);

  const paginatedResults = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleUseLocation = () => {
    // Simulate a user location (e.g., near the center of the mock data)
    setUserLocation({ lat: -17.8252, lng: 31.0264 });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
  };

  // Category color/icon helpers
  const categoryStyles = {
    Food: {
      color: "bg-blue-100 text-blue-700",
      icon: <Utensils size={18} className="inline-block mr-1" />,
      action: "Order Now",
    },
    Taxi: {
      color: "bg-green-100 text-green-700",
      icon: <Car size={18} className="inline-block mr-1" />,
      action: "Book Taxi",
    },
    Truck: {
      color: "bg-purple-100 text-purple-700",
      icon: <TruckIcon size={18} className="inline-block mr-1" />,
      action: "Book Truck",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Nearby Services</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Sun className="w-6 h-6 text-yellow-500" />
              </button>
              <button
                onClick={() => setShowOnboarding(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <HelpCircle className="w-6 h-6 text-blue-500" />
              </button>
            </div>
          </div>

          {/* Search Bar with Autocomplete */}
          <div className="mt-4 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for services..."
              className="w-full px-4 py-3 pr-12 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute w-full mt-1 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
                <ul className="max-h-60 overflow-auto">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-800 dark:text-white">{suggestion.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{suggestion.distance} miles</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{suggestion.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Background */}
      <MapBackground />
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-24 relative z-10">
        {/* Category Tabs */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 ${
                  selectedCategory === category
                    ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                    : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">Distance:</label>
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(Number(e.target.value))}
                className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              >
                <option value={Infinity}>All</option>
                <option value={1}>1 mile</option>
                <option value={3}>3 miles</option>
                <option value={5}>5 miles</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600 dark:text-gray-300">Min Rating:</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              >
                <option value={0}>Any</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            <option value="distance-asc">Distance (nearest first)</option>
            <option value="rating-desc">Rating (highest first)</option>
            <option value="price-asc">Price (lowest first)</option>
          </select>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedResults.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.distance} miles</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        item.badges.includes("Popular")
                          ? "bg-blue-100 text-blue-800"
                          : item.badges.includes("New")
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.badges[0]}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.price}</span>
                  </div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredItems.length > visibleCount && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.name}
        >
          <div className="space-y-4">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">{selectedItem.desc}</p>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-300">Hours: {selectedItem.hours}</span>
                <span className="text-gray-600 dark:text-gray-300">Contact: {selectedItem.contact}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-300">Distance: {selectedItem.distance} miles</span>
                <span className="text-gray-600 dark:text-gray-300">Rating: {selectedItem.rating}</span>
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setFavorites((prev) => [...prev, selectedItem]);
                  setSelectedItem(null);
                }}
                className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Add to Favorites
              </button>
              <button
                onClick={() => {
                  setBookingSuccess(true);
                  setSelectedItem(null);
                }}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Onboarding Modal */}
      <Modal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        title="Welcome to Nearby Services"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Find nearby food trucks, taxis, and trucks with ease. Use the filters to find what you need!
          </p>
          <div className="space-y-2">
            <button
              onClick={() => setShowOnboarding(false)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </Modal>

      {/* Success Toast */}
      {bookingSuccess && (
        <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded-lg shadow-lg">
          Booking successful!
        </div>
      )}
    </div>
  );
}