import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import { ChevronDown } from "lucide-react";

export default function Navbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-lg fixed top-0 z-50 py-3">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-2xl font-semibold text-indigo-600 hover:text-indigo-700 transition duration-150 font-serif"
          >
            Hall Maintenance System
          </Link>

          {!user ? (
            <div className="flex gap-4 items-center">
              <Link to="/register">
                <Button size="md">Sign Up</Button>
              </Link>

              <Link to="/login">
                <Button variant="secondary" size="md">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 font-semibold text-gray-800 hover:text-indigo-600 p-2 rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="truncate max-w-[100px]">{user.name}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    dropdownOpen
                      ? "rotate-180 text-indigo-600"
                      : "rotate-0 text-gray-500"
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-2xl py-1 z-50 origin-top-right animate-in fade-in-0 zoom-in-95">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      console.log("Sign out clicked");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
