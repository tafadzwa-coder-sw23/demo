import React, { useState, useMemo } from "react";
import Modal from "../components/Modal";

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
      image: "/assets/hero-food-truck.jpg",
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
      image: "/assets/truck-icon.jpg",
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
      image: "/assets/truck-icon.jpg",
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
      image: "/assets/truck-icon.jpg",
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
      image: "/assets/truck-icon.jpg",
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
      image: "/assets/truck-icon.jpg",
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
      image: "/assets/truck-icon.jpg",
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
  }, [resultsWithDistance, searchTerm, distanceFilter, minRating, sortBy]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleUseLocation = () => {
    // Simulate a user location (e.g., near the center of the mock data)
    setUserLocation({ lat: 40.7135, lng: -74.0065 });
  };

  return (
    <div className={
      `min-h-screen flex flex-col items-center py-6 px-2 transition-colors duration-300 ` +
      (darkMode ? "dark bg-gray-900" : "bg-gray-100")
    }>
      <div className="w-full max-w-xl relative px-2 sm:px-0">
        {/* Dark mode toggle */}
        <button
          className="absolute top-0 right-0 mt-2 mr-2 px-2 py-1 rounded-full border font-semibold text-xs sm:text-sm shadow transition-colors duration-200 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          onClick={() => setDarkMode((d) => !d)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
        {/* Uber-style header */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center dark:text-white">Find Nearby</h1>
        {/* Category selector */}
        <div className="flex flex-wrap justify-center mb-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 sm:px-6 py-2 mx-1 rounded-full font-semibold transition-colors duration-200 text-sm sm:text-base ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-lg dark:bg-white dark:text-black"
                  : "bg-white text-black border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Search and Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
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
        {/* Map placeholder */}
        <div className="w-full h-48 sm:h-64 bg-gray-300 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden dark:bg-gray-700">
          <span className="text-gray-600 text-base sm:text-lg dark:text-gray-300">[Map Placeholder]</span>
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
          {filteredResults.map((item, idx) => (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: `${20 + (item.lat - 40.71) * 2000}%`,
                top: `${20 + (item.lng + 74.01) * 2000}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded-full border-2 border-white flex items-center justify-center dark:bg-white dark:text-black">
                <span className="text-white text-xs sm:text-sm dark:text-black">{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
        {/* List of results */}
        <div className="space-y-3 sm:space-y-4">
          {filteredResults.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-3 sm:p-4 flex items-center hover:bg-gray-50 transition cursor-pointer dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              onClick={() => handleItemClick(item)}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white flex items-center justify-center rounded-full mr-3 sm:mr-4 font-bold dark:bg-white dark:text-black text-sm sm:text-base">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base sm:text-lg truncate">{item.name}</div>
                <div className="text-gray-500 text-xs sm:text-sm dark:text-gray-300 truncate">{item.desc}</div>
              </div>
              <div className="text-right text-gray-700 font-medium dark:text-gray-200 text-xs sm:text-base">{item.distance} mi</div>
            </div>
          ))}
          {filteredResults.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-300">No results found.</p>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <Modal isOpen={selectedItem !== null} onClose={handleCloseModal} darkMode={darkMode}>
        {selectedItem && (
          <div className="p-2 sm:p-4">
            {/* Image */}
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            {/* Badges */}
            <div className="flex gap-2 mb-2">
              {selectedItem.badges && selectedItem.badges.map((badge, i) => (
                <span
                  key={i}
                  className={
                    badge === "Open Now"
                      ? "bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
                      : badge === "Popular"
                      ? "bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold"
                      : badge === "New"
                      ? "bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
                      : "bg-gray-300 text-black px-2 py-1 rounded-full text-xs font-semibold"
                  }
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
            {/* Service hours and contact */}
            <div className="mb-4 text-xs sm:text-sm">
              <div><span className="font-semibold">Hours:</span> {selectedItem.hours}</div>
              <div><span className="font-semibold">Contact:</span> {selectedItem.contact}</div>
            </div>
            <button className="w-full bg-black text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-800 transition dark:bg-white dark:text-black dark:hover:bg-gray-200 text-sm sm:text-base">
              Book / Order Now
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
} 