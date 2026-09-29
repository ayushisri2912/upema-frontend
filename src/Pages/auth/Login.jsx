import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend authentication baad mein connect karenge
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl min-h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#E7E1D5] grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden md:flex relative bg-[#0F2742] p-12 flex-col justify-between overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-[#C9A45C]/20" />
          <div className="absolute -bottom-32 -right-24 w-80 h-80 rounded-full border border-[#C9A45C]/20" />
          <div className="absolute top-1/2 -right-20 w-40 h-40 rounded-full bg-[#C9A45C]/5" />

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-[#C9A45C] flex items-center justify-center">
                <span className="text-[#C9A45C] text-xl font-serif font-bold">
                  U
                </span>
              </div>

              <div>
                <h1 className="text-white text-2xl font-serif tracking-wide">
                  UPEMA
                </h1>
                <p className="text-[#C9A45C] text-[10px] tracking-[0.3em] uppercase">
                  Admin Portal
                </p>
              </div>
            </div>

            {/* Main text */}
            <div className="mt-28">
              <p className="text-[#C9A45C] text-sm tracking-[0.25em] uppercase mb-5">
                Management System
              </p>

              <h2 className="text-white text-4xl lg:text-5xl font-serif leading-tight">
                Welcome to the
                <br />
                <span className="text-[#C9A45C]">
                  UPEMA Admin Panel
                </span>
              </h2>

              <p className="text-white/60 mt-6 max-w-md leading-7 text-sm">
                Manage memberships, events, blogs, galleries, notices and
                website content from one secure administration portal.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center gap-2 text-white/40 text-xs">
            <ShieldCheck size={15} />
            <span>Secure Administration Portal</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-7 sm:p-12 lg:p-16">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-10">
              <div className="inline-flex w-16 h-16 rounded-full bg-[#0F2742] items-center justify-center mb-4">
                <span className="text-[#C9A45C] text-2xl font-serif font-bold">
                  U
                </span>
              </div>

              <h1 className="text-[#0F2742] text-3xl font-serif">
                UPEMA
              </h1>

              <p className="text-[#C9A45C] text-xs tracking-[0.3em] uppercase mt-1">
                Admin Portal
              </p>
            </div>

            {/* Heading */}
            <div className="mb-9">
              <p className="text-[#C9A45C] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Administrator Access
              </p>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#0F2742]">
                Sign In
              </h2>

              <p className="text-gray-500 text-sm mt-3">
                Enter your credentials to access the admin dashboard.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#172333] mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="admin@upema.org"
                    required
                    className="w-full h-13 pl-11 pr-4 rounded-xl border border-gray-200 bg-[#FAFAF8] outline-none text-sm text-[#172333] placeholder:text-gray-400 transition-all focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-[#172333]">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#C9A45C] hover:text-[#0F2742] transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className="w-full h-13 pl-11 pr-12 rounded-xl border border-gray-200 bg-[#FAFAF8] outline-none text-sm text-[#172333] placeholder:text-gray-400 transition-all focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0F2742] transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-[#0F2742]"
                />

                <label
                  htmlFor="remember"
                  className="text-sm text-gray-500 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full h-13 rounded-xl bg-[#0F2742] text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-[#081A2B] transition-all duration-300 shadow-lg shadow-[#0F2742]/15"
              >
                Sign In
              </button>
            </form>

            {/* Bottom */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                UPEMA Administration • Authorized Personnel Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;