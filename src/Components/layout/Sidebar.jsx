import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Images,
  Bell,
  Mail,
  UserRound,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Memberships",
    path: "/memberships",
    icon: Users,
  },
  {
    title: "Events",
    path: "/events",
    icon: CalendarDays,
  },
  {
    title: "Blogs",
    path: "/blogs",
    icon: FileText,
  },
  {
    title: "Gallery",
    path: "/gallery",
    icon: Images,
  },
  {
    title: "Notices",
    path: "/notices",
    icon: Bell,
  },
  {
    title: "Enquiries",
    path: "/enquiries",
    icon: Mail,
  },
  {
    title: "Team",
    path: "/team",
    icon: UserRound,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#0F2742] text-white shadow-xl">

      {/* Logo */}
      <div className="h-20 border-b border-white/10 flex items-center px-6">
        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-full border border-[#C9A45C] flex items-center justify-center">
            <span className="font-serif text-xl text-[#C9A45C]">
              U
            </span>
          </div>

          <div>
            <h1 className="font-serif text-xl tracking-wide">
              UPEMA
            </h1>

            <p className="text-[9px] uppercase tracking-[0.25em] text-[#C9A45C]">
              Admin Portal
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6">

        <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Main Menu
        </p>

        <nav className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#C9A45C] text-[#0F2742] font-semibold shadow-lg"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={18} />

                <span>{item.title}</span>
              </NavLink>
            );
          })}

        </nav>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
              isActive
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

        <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 transition hover:bg-red-500/10 hover:text-red-300">
          <LogOut size={18} />
          Logout
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;