import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  User
} from 'lucide-react';
import { Button } from "./ui/index.js";

export default function Nav({ children, user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeItem, setActiveItem] = useState('dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hasUser = Boolean(user);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      submenu: [
        { id: 'all-students', label: 'All Students', path: '/students' },
        { id: 'add-student', label: 'Add Student', path: '/students/add' },
        { id: 'student-requests', label: 'Requests', path: '/students/requests' }
      ]
    },
    {
      id: 'rooms',
      label: 'Room Management',
      icon: BedDouble,
      submenu: [
        { id: 'all-rooms', label: 'All Rooms', path: '/rooms' },
        { id: 'room-allocation', label: 'Allocations', path: '/rooms/allocations' },
        { id: 'room-availability', label: 'Availability', path: '/rooms/availability' }
      ]
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      icon: Wrench,
      submenu: [
        { id: 'maintenance-requests', label: 'Requests', path: '/maintenance/requests' },
        { id: 'maintenance-history', label: 'History', path: '/maintenance/history' },
        { id: 'maintenance-schedule', label: 'Schedule', path: '/maintenance/schedule' }
      ]
    },
    {
      id: 'complaints',
      label: 'Complaints',
      icon: ClipboardList,
      path: '/complaints'
    },
    {
      id: 'payments',
      label: 'Payments',
      icon: DollarSign,
      submenu: [
        { id: 'all-payments', label: 'All Payments', path: '/payments' },
        { id: 'pending-payments', label: 'Pending', path: '/payments/pending' },
        { id: 'payment-history', label: 'History', path: '/payments/history' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      path: '/reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id || item.submenu?.some(sub => sub.id === activeItem);
    const isExpanded = expandedMenus[item.id];

    if (item.submenu) {
      return (
          <div>
            <button
                onClick={() => toggleSubmenu(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                  }`}
              />
            </button>
            {isExpanded && (
                <div className="bg-gray-50">
                  {item.submenu.map((subItem) => (
                      <Link
                          key={subItem.id}
                          to={subItem.path}
                          onClick={() => handleItemClick(subItem.id)}
                          className={`w-full flex items-center px-4 py-2.5 pl-14 text-sm transition-colors ${
                              activeItem === subItem.id
                                  ? 'text-blue-600 bg-blue-50 font-medium'
                                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                          }`}
                      >
                        {subItem.label}
                      </Link>
                  ))}
                </div>
            )}
          </div>
      );
    }

    return (
        <Link
            to={item.path}
            onClick={() => handleItemClick(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                    ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
            }`}
        >
          <Icon className="w-5 h-5" />
          <span>{item.label}</span>
        </Link>
    );
  };

  return (
      <div className="bg-gray-50">
        {/* Top Navbar */}
        <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-lg z-50">
          <div className="h-full flex items-center justify-between px-4">
            {/* Left side - Logo and Menu button */}
            <div className="flex items-center gap-4">
              {hasUser && (
                  <button
                      onClick={toggleSidebar}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
                  >
                    <Menu className="w-6 h-6 text-gray-600" />
                  </button>
              )}

              <Link
                  to="/"
                  className="text-xl md:text-2xl font-semibold text-indigo-600 hover:text-indigo-700 transition duration-150 font-serif"
              >
                Hall Maintenance System
              </Link>
            </div>

            {/* Right side - User dropdown and notifications / auth buttons */}
            <div className="flex items-center gap-2">
              {!hasUser && (
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

              {hasUser && (
                  <>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="relative">
                      <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="flex items-center gap-2 px-3 py-2 font-semibold text-gray-800 hover:text-indigo-600 rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="hidden sm:block truncate max-w-[100px]">{user.name}</span>
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
                              <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                              <p className="text-xs text-gray-500 truncate">{user.email}</p>
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
                                  if (onLogout) onLogout();
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
            </div>
          </div>
        </nav>

        {/* Overlay for mobile sidebar – only when logged in */}
        {hasUser && isSidebarOpen && (
            <div
                className="fixed inset-0 bg-black/30 z-40 md:hidden mt-16"
                onClick={toggleSidebar}
            />
        )}

        {/* Sidebar – only when logged in */}
        {hasUser && (
            <aside
                className={`fixed top-16 left-0 bottom-0 bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 w-64 flex flex-col`}
            >
              {/* Navigation Menu */}
              <nav className="flex-1 overflow-y-auto py-4">
                {menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
              </nav>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-200">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </aside>
        )}

        {/* Main Content Area */}
        <div className={`${hasUser ? 'md:ml-64' : ''} mt-16`}>
          {/* If content ends up under the navbar for you, change mt-0 to mt-16 */}
          {children}
        </div>
      </div>
  );
}
