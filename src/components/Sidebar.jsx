import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  Home,
  User,
  Users,
  Bed,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ role }) => {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [activeItem, setActiveItem] = useState("dashboard");

  // Define navigation links based on user role
  const menuItems = [
    {
      id: "dashboard",
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      roles: ["student", "admin"],
    },
  ];

  if (role === "admin") {
    menuItems.push(
      {
        id: "maintenance",
        path: "/admin/maintenance",
        icon: Wrench,
        label: "Maintenance",
        roles: ["admin"],
      },
      {
        id: "reports",
        path: "/admin/reports",
        icon: FileText,
        label: "Reports",
        roles: ["admin"],
      }
    );
  }

  if (role === "student") {
    menuItems.push({
      id: "requests",
      path: "/student/requests",
      icon: Users,
      label: "Requests",
      roles: ["student"],
    });
  }

  menuItems.push({
    id: "settings",
    path: "/settings",
    icon: Settings,
    label: "Settings",
    roles: ["student", "admin"],
  });

  const toggleSubmenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive =
      activeItem === item.id ||
      item.submenu?.some((sub) => sub.id === activeItem);
    const isExpanded = expandedMenus[item.id];

    if (item.submenu) {
      return (
        <div>
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-180" : ""
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
                      ? "text-blue-600 bg-blue-50 font-medium"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
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
            ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{item.label}</span>
      </Link>
    );
  };

  // The sidebar is fixed and hidden on mobile by default (controlled by external state if implemented)
  return (
    <>
      {/* Mobile Backdrop - Assuming a mobile menu state exists in Header or Layout */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
        aria-hidden="true"
      ></div>

      {/* Sidebar Content */}
      <aside
        className={`fixed top-16 left-0 bottom-0 z-40 w-64 bg-white border-r border-gray-200 shadow-xl transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </nav>

          {/* Logout Button (Fixed and Functioning) */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => logout()}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
