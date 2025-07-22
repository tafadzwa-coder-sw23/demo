import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-xl w-full px-4 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
          Find What You Need, Nearby
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Search for restaurants, taxis, and trucks around you. Fast, easy, and modern—just like you’d expect.
        </p>
        <Link
          to="/nearby"
          className="inline-block px-8 py-4 bg-black text-white rounded-full font-bold text-lg shadow-lg hover:bg-gray-800 transition"
        >
          Start Searching
        </Link>
        <div className="mt-10 text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} Truck Eats Go. All rights reserved.
        </div>
      </div>
    </div>
  );
}
