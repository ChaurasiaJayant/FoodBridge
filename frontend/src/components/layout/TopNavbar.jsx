import { Menu, Plus, Bell, ChevronDown, UserRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const pageConfig = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of your food rescue network",
    action: "New Donation",
    actionPath: "/donation/create",
  },

  "/donor/register": {
    title: "Donor Registration",
    subtitle: "Register a new food donor",
    action: "Add Donor",
    actionPath: "/donor/register",
  },

  "/donation/create": {
    title: "Create Donation",
    subtitle: "Share surplus food with the community",
    action: "Add Donation",
    actionPath: "/donation/create",
  },

  "/donations": {
    title: "Donations",
    subtitle: "Manage and monitor food donations",
    action: "New Donation",
    actionPath: "/donation/create",
  },

  "/ngo/register": {
    title: "NGO Registration",
    subtitle: "Register a new NGO partner",
    action: "Add NGO",
    actionPath: "/ngo/register",
  },

  "/ngos": {
    title: "NGOs",
    subtitle: "View and manage NGO partners",
    action: "Add NGO",
    actionPath: "/ngo/register",
  },

  "/claims": {
    title: "Claims",
    subtitle: "Track food collection and delivery",
    action: "View Donations",
    actionPath: "/donations",
  },
};

const TopNavbar = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const config = pageConfig[location.pathname] || pageConfig["/"];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <div className="flex h-[88px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onMenuClick}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-green-200 hover:text-green-600 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {config.title}
            </h2>

            <p className="hidden truncate text-sm text-slate-500 sm:block">
              {config.subtitle}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Action button */}
          <button
            onClick={() => navigate(config.actionPath)}
            className="group flex h-11 items-center gap-2 rounded-xl bg-green-500 px-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-green-500/30 sm:px-4"
          >
            <Plus
              size={18}
              className="transition-transform group-hover:rotate-90"
            />

            <span className="hidden sm:inline">{config.action}</span>
          </button>

          {/* Notification */}
          <button
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-green-200 hover:text-green-600"
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
          </button>

          {/* User */}
          <button className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-3 shadow-sm transition hover:border-green-200 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
              <UserRound size={16} />
            </span>

            <div className="text-left">
              <p className="text-xs font-bold text-slate-800">
                FoodBridge Admin
              </p>
              <p className="text-[10px] text-slate-400">Administrator</p>
            </div>

            <ChevronDown size={15} className="text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
