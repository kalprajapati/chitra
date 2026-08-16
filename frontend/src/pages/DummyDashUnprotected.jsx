import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Sparkles, ArrowRight, Compass, Lock, Gem, Award, Users } from "lucide-react";

export function DummyDashUnprotected() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] flex flex-col justify-between selection:bg-[#d4af37]/20">
      {/* Navigation Bar */}
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

        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.15em] text-[#757873]">
          <a href="#about" className="hover:text-[#1b1c19] transition-colors">About</a>
          <a href="#services" className="hover:text-[#1b1c19] transition-colors">Services</a>
          <a href="#security" className="hover:text-[#1b1c19] transition-colors">Security</a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-[#1b1c19] text-[#fbf9f4] hover:bg-[#333430] px-5 py-2.5 rounded-sm text-xs tracking-[0.15em] uppercase font-medium transition-all shadow-sm flex items-center gap-2"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs uppercase tracking-[0.15em] font-medium text-[#1b1c19] hover:text-[#735c00] px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-[#1b1c19] text-[#fbf9f4] hover:bg-[#333430] px-5 py-2.5 rounded-sm text-xs tracking-[0.15em] uppercase font-medium transition-all shadow-sm"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 py-20 lg:py-28 max-w-[1280px] w-full mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/5 text-[#735c00] text-xs uppercase tracking-[0.2em] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Public Access Portal</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#1b1c19] max-w-4xl leading-[1.15]">
          Curated Private Concierge & Exclusive Art Portfolios
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#52544e] max-w-2xl font-sans font-light leading-relaxed">
          Welcome to <strong className="font-medium text-[#1b1c19]">Chitra</strong>. Discover a world of luxury asset management, bespoke art advisory, and secure private collection services crafted for discerning members.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {user ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto bg-[#735c00] hover:bg-[#5a4800] text-white px-8 py-3.5 rounded-sm text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Access Member Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="w-full sm:w-auto bg-[#1b1c19] hover:bg-[#333430] text-[#fbf9f4] px-8 py-3.5 rounded-sm text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Join Concierge</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto border border-[#1b1c19]/30 hover:border-[#1b1c19] text-[#1b1c19] px-8 py-3.5 rounded-sm text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center"
              >
                Member Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section id="services" className="border-t border-[#e4e2dd] bg-[#f5f3ec] py-20 px-6 lg:px-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#735c00] block mb-2">
              Our Capabilities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1b1c19]">
              Designed for Discerning Collectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#fbf9f4] p-8 border border-[#e4e2dd] rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 text-[#735c00]">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#1b1c19] mb-3">Fine Art Acquisition</h3>
              <p className="text-sm text-[#52544e] font-light leading-relaxed">
                Direct access to private auctions, verified provenance records, and international fine art logistics.
              </p>
            </div>

            <div className="bg-[#fbf9f4] p-8 border border-[#e4e2dd] rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 text-[#735c00]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#1b1c19] mb-3">Bank-Grade Privacy</h3>
              <p className="text-sm text-[#52544e] font-light leading-relaxed">
                Your portfolio and personal authentication details are protected using enterprise session isolation.
              </p>
            </div>

            <div className="bg-[#fbf9f4] p-8 border border-[#e4e2dd] rounded-sm shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-6 text-[#735c00]">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-[#1b1c19] mb-3">Personal Advisory</h3>
              <p className="text-sm text-[#52544e] font-light leading-relaxed">
                Dedicated concierge advisors available around the clock for portfolio valuation and curation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unprotected Access Notice */}
      <section id="security" className="py-16 px-6 lg:px-16 max-w-[1280px] w-full mx-auto">
        <div className="bg-[#1b1c19] text-[#fbf9f4] p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37] text-xs uppercase tracking-[0.2em] mb-2 font-medium">
              <Lock className="w-4 h-4" />
              <span>Open Public Page</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal mb-2">
              No Authentication Required
            </h3>
            <p className="text-sm text-[#a3a59e] font-light max-w-xl">
              This landing page is completely open and accessible to all visitors. Sign up or log in only when you are ready to view your protected member dashboard.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/signup"
              className="bg-[#d4af37] hover:bg-[#b8952b] text-[#1b1c19] px-6 py-3 rounded-sm text-xs font-semibold uppercase tracking-[0.15em] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e4e2dd] py-8 px-6 lg:px-16 text-center text-xs text-[#757873] uppercase tracking-[0.15em] bg-[#fbf9f4]">
        <p>© {new Date().getFullYear()} CHITRA Private Concierge. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default DummyDashUnprotected;
