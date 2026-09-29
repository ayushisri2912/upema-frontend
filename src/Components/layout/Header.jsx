import {
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-[#E5E0D6] bg-white/95 backdrop-blur">

      <div className="flex h-full items-center justify-between px-6 lg:px-8">

        {/* Search */}
        <div className="relative hidden w-80 md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] pl-11 pr-4 text-sm outline-none transition focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10"
          />

        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-5">

          {/* Notification */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-[#F7F5F0] hover:text-[#0F2742]">
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#C9A45C]" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 sm:block" />

          {/* Profile */}
          <button className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F2742] text-sm font-semibold text-[#C9A45C]">
              A
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-[#172333]">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-gray-400 sm:block"
            />

          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;