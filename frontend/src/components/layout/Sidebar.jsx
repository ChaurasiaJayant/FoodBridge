import {
  LayoutDashboard,
  UserPlus,
  PackagePlus,
  PackageOpen,
  Building2,
  UsersRound,
  ClipboardList,
  LogOut,
  BarChart2,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    roles: ["donor", "ngo", "admin"],
  },
  {
    label: "Donor Registration",
    path: "/donor/register",
    icon: UserPlus,
    roles: ["donor", "admin"],
  },
  {
    label: "Create Donation",
    path: "/donation/create",
    icon: PackagePlus,
    roles: ["donor", "admin"],
  },
  {
    label: "View Donations",
    path: "/donations",
    icon: PackageOpen,
    roles: ["donor", "ngo", "admin"],
  },
  {
    label: "NGO Registration",
    path: "/ngo/register",
    icon: Building2,
    roles: ["ngo", "admin"],
  },
  {
    label: "View NGOs",
    path: "/ngos",
    icon: UsersRound,
    roles: ["ngo", "admin"],
  },
  {
    label: "Claims",
    path: "/claims",
    icon: ClipboardList,
    roles: ["ngo", "admin"],
  },
  {
    label: "DA Output",
    path: "/da-output",
    icon: BarChart2,
    roles: ["admin"],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role?.toLowerCase();

  const filteredNavigationItems = navigationItems.filter((item) =>
    item.roles.includes(userRole),
  );

  const handleLogout = () => {
    logout();
    navigate("/login/donor");
  };

  const handleNavigation = () => {
    onClose?.();
  };

  const getRoleBadgeClass = () => {
    if (userRole === "donor") {
      return "bg-green-100 text-green-700";
    }

    if (userRole === "ngo") {
      return "bg-blue-100 text-blue-700";
    }

    if (userRole === "admin") {
      return "bg-purple-100 text-purple-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200/60 bg-white/80 p-4 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Header */}
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
            <PackageOpen size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              HelpingHands Kitchen
            </h1>
            <p className="text-xs text-gray-500">Food Redistribution</p>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {filteredNavigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="mb-3 rounded-2xl border border-gray-200/60 bg-white/80 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 font-semibold text-green-700">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user?.name || "User"}
              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${getRoleBadgeClass()}`}
              >
                {userRole || "user"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Card / Logout */}
        <div className="rounded-2xl bg-green-50 p-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
