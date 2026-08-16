import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck, User, Mail, Phone, MapPin, Calendar } from "lucide-react";

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-[#e4e2dd] py-5 px-6 lg:px-16 flex justify-between items-center bg-[#fbf9f4]/90 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-[#d4af37] text-xl font-serif">✧</span>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.15em] font-medium text-[#1b1c19]">
              CHITRA
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#757873] uppercase font-sans -mt-1">
              Private Concierge
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#757873]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>Active Session</span>
          </div>

          <button
            onClick={handleLogout}
            className="stitch-btn-secondary py-2 px-4 text-xs flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 lg:px-16 py-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#e4e2dd] pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#735c00] block mb-1">
              Member Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c19] font-normal">
              Welcome, {user.name}
            </h1>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] bg-[#f0eee9] text-[#1b1c19] border border-[#e4e2dd] px-3 py-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-[#735c00]" />
            <span>{user.role} Tier</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* User Account Details Card */}
          <div className="lg:col-span-7 bg-[#ffffff] border border-[#e4e2dd] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h2 className="font-serif text-xl text-[#1b1c19] mb-6 font-normal border-b border-[#e4e2dd] pb-3">
              Account Credentials & Profile
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <User className="w-5 h-5 text-[#735c00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873] block">
                    Full Name
                  </span>
                  <span className="text-base text-[#1b1c19] font-medium">
                    {user.name}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#735c00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873] block">
                    Email Address
                  </span>
                  <span className="text-base text-[#1b1c19] font-medium">
                    {user.email}
                  </span>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#735c00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873] block">
                      Phone Number
                    </span>
                    <span className="text-base text-[#1b1c19]">
                      {user.phone}
                    </span>
                  </div>
                </div>
              )}

              {user.address && (
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#735c00] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873] block">
                      Shipping Address
                    </span>
                    <span className="text-base text-[#1b1c19] font-light leading-relaxed">
                      {user.address}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-[#735c00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873] block">
                    Member Since
                  </span>
                  <span className="text-sm text-[#454843]">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Recently Joined"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Concierge Info Card */}
          <div className="lg:col-span-5 bg-[#f0eee9] border border-[#e4e2dd] p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg text-[#1b1c19] mb-3">
                Security Architecture
              </h3>
              <p className="text-xs text-[#454843] leading-relaxed mb-6 font-light">
                Your session is secured via server-side HTTP-Only cookies persisted directly in MySQL database. No sensitive tokens are stored in unencrypted browser storage.
              </p>

              <ul className="space-y-3 text-xs text-[#1b1c19] border-t border-[#e4e2dd] pt-4">
                <li className="flex items-center justify-between">
                  <span className="text-[#757873]">Session Cookie:</span>
                  <span className="font-mono text-[11px] bg-[#ffffff] px-2 py-0.5 border border-[#e4e2dd]">
                    `sid` (HTTP-Only)
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[#757873]">Password Storage:</span>
                  <span className="font-mono text-[11px] bg-[#ffffff] px-2 py-0.5 border border-[#e4e2dd]">
                    bcrypt (12 rounds)
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[#757873]">Session Store:</span>
                  <span className="font-mono text-[11px] bg-[#ffffff] px-2 py-0.5 border border-[#e4e2dd]">
                    MySQL `sessions` Table
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e4e2dd]">
              <button
                onClick={handleLogout}
                className="stitch-btn-secondary w-full text-xs"
              >
                Sign Out of Concierge
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e4e2dd] py-6 px-6 lg:px-16 text-center text-xs text-[#757873]">
        <p>© 2026 CHITRA Fine Jewellery. Private Concierge Dashboard.</p>
      </footer>
    </div>
  );
};
