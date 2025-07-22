import React, { useState, useMemo, useEffect } from "react";
import Modal from "../components/Modal";
import { Heart, HelpCircle, Utensils, Car, Truck as TruckIcon, CheckCircle } from "lucide-react";

const mockData = {
  Food: [
    {
      id: 1,
      name: "kwaGogo",
      distance: 0.5,
      rating: 4.7,
      desc: "Home-style meals and local favorites.",
      price: "$$",
      lat: 40.7128,
      lng: -74.006,
      image: "/assets/hero-food-truck.jpg",
      hours: "8:00 AM - 8:00 PM",
      contact: "(555) 111-2222",
      badges: ["Open Now", "Popular"],
    },
    {
      id: 2,
      name: "Chicken Inn",
      distance: 0.8,
      rating: 4.5,
      desc: "Famous for fried chicken and quick bites.",
      price: "$",
      lat: 40.7138,
      lng: -74.002,
      image: "/assets/hero-food-truck.jpg",
      hours: "10:00 AM - 10:00 PM",
      contact: "(555) 333-4444",
      badges: ["Open Now"],
    },
    {
      id: 3,
      name: "Boss Tindo Shop",
      distance: 1.2,
      rating: 4.8,
      desc: "Tindo specialties and snacks.",
      price: "$$$",
      lat: 40.7142,
      lng: -74.008,
      image: "/assets/hero-food-truck.jpg",
      hours: "9:00 AM - 9:00 PM",
      contact: "(555) 555-6666",
      badges: ["New"],
    },
    {
      id: 4,
      name: "Truck Shop Black",
      distance: 1.5,
      rating: 4.6,
      desc: "Modern eatery with a twist.",
      price: "$$",
      lat: 40.715,
      lng: -74.01,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
      hours: "11:00 AM - 11:00 PM",
      contact: "(555) 777-8888",
      badges: ["Popular"],
    },
  ],
  Taxi: [
    {
      id: 1,
      name: "Yellow Cab #23",
      distance: 0.2,
      rating: 4.9,
      desc: "4.9★ driver nearby.",
      price: "$$",
      lat: 40.7132,
      lng: -74.004,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "24/7",
      contact: "(555) 456-7890",
      badges: ["Popular"],
    },
    {
      id: 2,
      name: "City Taxi #12",
      distance: 0.7,
      rating: 4.7,
      desc: "Clean & fast.",
      price: "$",
      lat: 40.7118,
      lng: -74.008,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "24/7",
      contact: "(555) 567-8901",
      badges: ["Open Now"],
    },
    {
      id: 3,
      name: "RideNow",
      distance: 1.5,
      rating: 4.6,
      desc: "Affordable rides.",
      price: "$",
      lat: 40.715,
      lng: -74.01,
      image: "https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop",
      hours: "24/7",
      contact: "(555) 678-9012",
      badges: ["New"],
    },
  ],
  Truck: [
    {
      id: 1,
      name: "Moving Truck A",
      distance: 1.1,
      rating: 4.8,
      desc: "Spacious and reliable.",
      price: "$$$",
      lat: 40.715,
      lng: -74.01,
      image: "https://images.unsplash.com/photo-1590674899484-6c7d4e6a489a?q=80&w=1932&auto=format&fit=crop",
      hours: "8:00 AM - 8:00 PM",
      contact: "(555) 789-0123",
      badges: ["Open Now"],
    },
    {
      id: 2,
      name: "Hauler Pro",
      distance: 0.9,
      rating: 4.9,
      desc: "Professional service.",
      price: "$$$",
      lat: 40.714,
      lng: -74.007,
      image: "https://images.unsplash.com/photo-1590674899484-6c7d4e6a489a?q=80&w=1932&auto=format&fit=crop",
      hours: "8:00 AM - 8:00 PM",
      contact: "(555) 890-1234",
      badges: ["Popular"],
    },
    {
      id: 3,
      name: "Rent-a-Mover",
      distance: 2.5,
      rating: 4.5,
      desc: "DIY moving solutions.",
      price: "$$",
      lat: 40.713,
      lng: -74.005,
      image: "https://images.unsplash.com/photo-1590674899484-6c7d4e6a489a?q=80&w=1932&auto=format&fit=crop",
      hours: "8:00 AM - 8:00 PM",
      contact: "(555) 901-2345",
      badges: ["New"],
    },
  ],
};

const categories = ["Food", "Taxi", "Truck"];

export default function NearbySearch() {
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [searchTerm, setSearchTerm] = useState("");
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
        setRecentSearches(prev => {
          const newSearches = [searchTerm, ...prev.filter(s => s !== searchTerm)];
          return newSearches.slice(0, 5); // Keep last 5
        });
      }, 1000); // Debounce
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

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

  const filteredResults = useMemo(() => {
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
    return filteredResults.slice(0, visibleCount);
  }, [filteredResults, visibleCount]);

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
    setUserLocation({ lat: 40.7135, lng: -74.0065 });
  };

  // Category color/icon helpers
  const categoryStyles = {
    Food: {
      color: "bg-blue-100 text-blue-700",
      icon: <Utensils size={18} className="inline-block mr-1" />,
      action: "Order Now"
    },
    Taxi: {
      color: "bg-green-100 text-green-700",
      icon: <Car size={18} className="inline-block mr-1" />,
      action: "Book Taxi"
    },
    Truck: {
      color: "bg-purple-100 text-purple-700",
      icon: <TruckIcon size={18} className="inline-block mr-1" />,
      action: "Book Truck"
    }
  };

  return (
    <div className={
      `min-h-screen flex flex-col items-center py-6 px-2 transition-colors duration-300 ` +
      (darkMode ? "dark bg-gray-900" : "bg-gray-100")
    }>
      <div className="w-full max-w-xl relative px-2 sm:px-0">
        {/* Onboarding/Help Button */}
        <button
          onClick={() => setShowOnboarding(true)}
          className="absolute top-0 left-0 mt-2 ml-2 p-2 rounded-full border bg-white dark:bg-gray-800 dark:border-gray-700 z-20"
          aria-label="Help"
        >
          <HelpCircle size={20} className="dark:text-white" />
        </button>
        {/* Sticky Filter/Search Bar */}
        <div className="sticky top-2 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-xl px-2 py-2 mb-2 shadow flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow min-w-[120px] p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white dark:border-gray-700 text-sm sm:text-base"
          />
          <button
            onClick={handleUseLocation}
            className="px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-base bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Use My Location
          </button>
          <button
            onClick={() => setDistanceFilter(1)}
            className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-base ${
                distanceFilter === 1 ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white border dark:bg-gray-800 dark:text-white dark:border-gray-700"
            }`}
          >
            &lt; 1 mi
          </button>
          <button
            onClick={() => setDistanceFilter(Infinity)}
            className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-base ${
                distanceFilter === Infinity ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white border dark:bg-gray-800 dark:text-white dark:border-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setMinRating(4.5)}
            className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-1 text-xs sm:text-base ${
                minRating === 4.5 ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white border dark:bg-gray-800 dark:text-white dark:border-gray-700"
            }`}
          >
            4.5<span className="text-yellow-500">★</span>+
          </button>
          <button
            onClick={() => setMinRating(0)}
            className={`px-3 sm:px-4 py-2 rounded-full font-semibold text-xs sm:text-base ${
                minRating === 0 ? "bg-black text-white dark:bg-white dark:text-black" : "bg-white border dark:bg-gray-800 dark:text-white dark:border-gray-700"
            }`}
          >
            All Ratings
          </button>
          <button
            onClick={() => setShowOnlyFavorites((v) => !v)}
            className={`px-3 sm:px-4 py-2 rounded-full font-semibold flex items-center gap-1 text-xs sm:text-base transition-colors ${
                showOnlyFavorites
                    ? "bg-pink-500 text-white"
                    : "bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            }`}
          >
            <Heart size={14} className={showOnlyFavorites ? "fill-current" : ""} />
            Favorites
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-full border font-semibold text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            aria-label="Sort results"
          >
            <option value="distance-asc">Distance (Closest)</option>
            <option value="distance-desc">Distance (Farthest)</option>
            <option value="rating-desc">Rating (High-Low)</option>
            <option value="rating-asc">Rating (Low-High)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </select>
        </div>
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs text-gray-500 dark:text-gray-400 self-center">Recent:</span>
            {recentSearches.map(search => (
              <button
                key={search}
                onClick={() => setSearchTerm(search)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full"
              >
                {search}
              </button>
            ))}
          </div>
        )}
        {/* Map with background image */}
        <div
          className="w-full h-48 sm:h-64 rounded-xl mb-6 relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579583764894-1865a7682038?q=80&w=1974&auto=format&fit=crop')" }}
          onMouseLeave={() => setHoveredPin(null)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          {/* User location indicator */}
          {userLocation && (
            <div
              className="absolute z-10"
              style={{ left: "50%", top: "80%", transform: "translate(-50%, -50%)" }}
            >
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg" title="You are here"></div>
            </div>
          )}
          {/* Pins (mock, just for style) */}
          {paginatedResults.map((item, idx) => (
            <div
              key={item.id}
              className="absolute transition-transform duration-300"
              style={{
                left: `${20 + (item.lat - 40.71) * 2000}%`,
                top: `${20 + (item.lng + 74.01) * 2000}%`,
                transform: `translate(-50%, -50%) scale(${hoveredPin === item.id ? 1.5 : 1})`,
                zIndex: hoveredPin === item.id ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredPin(item.id)}
              onClick={() => handleItemClick(item)}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full border-2 border-white flex items-center justify-center dark:bg-white dark:text-black cursor-pointer">
                <span className="text-white text-xs sm:text-sm dark:text-black">{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
        {/* List of results - Redesigned with images and badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          {paginatedResults.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.03] transition-all duration-300 dark:bg-gray-800 ${hoveredPin === item.id ? 'ring-2 ring-blue-500' : ''}`}
              onMouseEnter={() => setHoveredPin(item.id)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover cursor-pointer group-hover:opacity-90 transition"
                  onClick={() => handleItemClick(item)}
                />
                <div className="absolute top-2 left-2 flex gap-1">
                  {item.badges && item.badges.map((badge, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${
                        badge === "Open Now"
                          ? "bg-green-500 text-white"
                          : badge === "Popular"
                          ? "bg-yellow-400 text-black"
                          : badge === "New"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  aria-label="Toggle Favorite"
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                >
                  <Heart
                    size={20}
                    className={
                      favorites.includes(item.id)
                        ? "fill-pink-500 text-pink-500"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>
              <div className="p-4 cursor-pointer" onClick={() => handleItemClick(item)}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center ${categoryStyles[selectedCategory].color}`}>{categoryStyles[selectedCategory].icon}{selectedCategory}</span>
                  <span className="ml-auto text-yellow-500 font-bold">{item.rating} ★</span>
                </div>
                <h3 className="font-bold text-lg dark:text-white mb-1 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2 truncate">{item.desc}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold dark:text-gray-200">{item.distance} mi</span>
                  <span className="text-green-600 font-semibold">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredResults.length > visibleCount && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Load More
            </button>
          </div>
        )}
        {filteredResults.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-300">No results found.</p>
        )}
      </div>

      {/* Onboarding Modal */}
      <Modal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} darkMode={darkMode}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">How to Use This Page</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use the filters to narrow down your search.</li>
            <li>Click on a result card or map pin to see more details.</li>
            <li>Click the heart icon to save your favorites.</li>
            <li>Use the 'Favorites' filter to see only your saved items.</li>
          </ul>
        </div>
      </Modal>

      {/* Details Modal with Booking Flow */}
      <Modal isOpen={selectedItem !== null} onClose={() => { setSelectedItem(null); setBookingSuccess(false); }} darkMode={darkMode}>
        {selectedItem && !bookingSuccess && (
          <div className="p-2 sm:p-4">
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <div className="flex gap-2 mb-2">
              {selectedItem.badges && selectedItem.badges.map((badge, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${
                    badge === "Open Now"
                      ? "bg-green-500 text-white"
                      : badge === "Popular"
                      ? "bg-yellow-400 text-black"
                      : badge === "New"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">{selectedItem.name}</h2>
            <p className="text-gray-600 mb-4 dark:text-gray-300 text-sm sm:text-base">{selectedItem.desc}</p>
            <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
              <span className="font-semibold dark:text-white">{selectedItem.distance} mi</span>
              <span className="text-yellow-500 font-bold">{selectedItem.rating} ★</span>
              <span className="text-green-600 font-semibold">{selectedItem.price}</span>
            </div>
            <div className="mb-4 text-xs sm:text-sm">
              <div><span className="font-semibold">Hours:</span> {selectedItem.hours}</div>
              <div><span className="font-semibold">Contact:</span> {selectedItem.contact}</div>
            </div>
            <button
              className={`w-full py-3 rounded-lg font-semibold transition text-lg ${categoryStyles[selectedCategory].color} hover:opacity-90`}
              onClick={() => setBookingSuccess(true)}
            >
              {categoryStyles[selectedCategory].action}
            </button>
          </div>
        )}
        {selectedItem && bookingSuccess && (
          <div className="flex flex-col items-center justify-center p-8">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-center">Success!</h2>
            <p className="text-center mb-4">Your request has been received. {selectedCategory === "Food" ? "Your order is being prepared!" : selectedCategory === "Taxi" ? "A driver will contact you soon!" : "A truck driver will contact you soon!"}</p>
            <button
              className="mt-2 px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
              onClick={() => { setSelectedItem(null); setBookingSuccess(false); }}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
} 