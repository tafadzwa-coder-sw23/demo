import { Link } from "react-router-dom";
import { Search, MapPin, Truck } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 bg-opacity-80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">TruckEatsGo</h1>
          <Link
            to="/nearby"
            className="px-4 py-2 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition"
          >
            Find Nearby
          </Link>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section 
        className="relative py-20 text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-food-truck.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4">
          <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 text-white">
            Find What You Need, Nearby
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Search for restaurants, taxis, and trucks around you. Fast, easy, and modern—just like you’d expect.
          </p>
          <Link
            to="/nearby"
            className="inline-block px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-lg hover:bg-gray-200 transition"
          >
            Start Searching Now
          </Link>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 dark:text-white">What We Offer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="/assets/hero-food-truck.jpg" alt="Food" className="w-full h-40 object-cover mb-4"/>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">Find Food</h4>
              <p className="text-gray-600 dark:text-gray-300">Discover local restaurants and cuisines near you.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="/assets/truck-icon.jpg" alt="Taxis" className="w-full h-40 object-cover mb-4"/>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">Book Taxis</h4>
              <p className="text-gray-600 dark:text-gray-300">Get a ride in minutes from reliable local drivers.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="/assets/truck-icon.jpg" alt="Trucks" className="w-full h-40 object-cover mb-4"/>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">Rent Trucks</h4>
              <p className="text-gray-600 dark:text-gray-300">Rent moving or commercial trucks with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section with Images */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-12 dark:text-white">How It Works</h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            <div className="flex-1 max-w-xs text-center">
              <img src="/assets/hero-food-truck.jpg" alt="Search" className="w-full h-32 object-cover rounded-lg mb-4"/>
              <h4 className="text-2xl font-bold mb-2 text-blue-500">1. Search</h4>
              <p className="dark:text-gray-300">Choose a category and see what's nearby.</p>
            </div>
            <div className="text-2xl text-gray-300 dark:text-gray-500">&rarr;</div>
            <div className="flex-1 max-w-xs text-center">
              <img src="/assets/truck-icon.jpg" alt="Select" className="w-full h-32 object-cover rounded-lg mb-4"/>
              <h4 className="text-2xl font-bold mb-2 text-green-500">2. Select</h4>
              <p className="dark:text-gray-300">Pick the best option based on your needs.</p>
            </div>
            <div className="text-2xl text-gray-300 dark:text-gray-500">&rarr;</div>
            <div className="flex-1 max-w-xs text-center">
              <img src="/assets/hero-food-truck.jpg" alt="Book" className="w-full h-32 object-cover rounded-lg mb-4"/>
              <h4 className="text-2xl font-bold mb-2 text-purple-500">3. Book</h4>
              <p className="dark:text-gray-300">Confirm your booking or order in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-4 dark:text-white">Ready to Get Started?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Click the button below to find services near you.</p>
          <Link
            to="/nearby"
            className="inline-block px-10 py-5 bg-black text-white rounded-full font-bold text-lg shadow-lg hover:bg-gray-800 transition"
          >
            Find Nearby Services
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-6 bg-gray-800 dark:bg-black text-white text-center">
        <div className="container mx-auto px-4">
          &copy; {new Date().getFullYear()} TruckEatsGo. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
