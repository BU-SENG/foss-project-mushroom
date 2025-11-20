import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  Wrench,
  ClipboardList,
  BedDouble,
  DollarSign,
  FileText,
  Settings,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import { Button } from "./ui/index.js";
import useAuth from "../hooks/useAuth.jsx";

// Note: For a complete implementation, you might need to pass a prop like 'toggleSidebar'
// if you want to control the mobile sidebar visibility from here.

const Header = () => {
  const { user, logout } = useAuth();
  

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section: Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Burger Menu Button (Visible on mobile, hides the text below on desktop) */}
          <button
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
            // onClick={toggleSidebar} // Add implementation for mobile sidebar toggle
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            to="/"
            className="text-xl md:text-2xl font-semibold text-indigo-600 hover:text-indigo-700 transition duration-150 font-serif"
          >
            Hall Maintenance System
          </Link>
        </div>

        {/* Right Section: Icons and User Dropdown */}
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 font-semibold text-gray-800 hover:text-indigo-600 rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block truncate max-w-[100px]">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen
                        ? "rotate-180 text-indigo-600"
                        : "rotate-0 text-gray-500"
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-2xl py-1 z-50 origin-top-right">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-150"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {!user && (
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
