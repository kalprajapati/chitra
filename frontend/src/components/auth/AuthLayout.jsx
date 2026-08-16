import React from "react";
import { Link } from "react-router-dom";

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#fbf9f4] text-[#1b1c19] flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-[#e4e2dd] py-5 px-6 lg:px-16 flex justify-between items-center bg-[#fbf9f4]/90 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 group text-decoration-none">
          <span className="text-[#d4af37] text-xl font-serif">✧</span>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.15em] font-medium text-[#1b1c19] group-hover:text-[#735c00] transition-colors">
              CHITRA
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#757873] uppercase font-sans -mt-1">
              Fine Jewellery
            </span>
          </div>
        </Link>
        <div className="text-xs font-medium tracking-[0.1em] text-[#757873] uppercase">
          Private Concierge
        </div>
      </header>

      {/* Main Content Split Layout */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* Left Editorial Visual Section (Hidden on Mobile) */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-center px-12 xl:px-20 py-12 relative min-h-[600px] border-r border-[#e4e2dd]/60">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#735c00] mb-4">
            Bespoke Craftsmanship & Heritage
          </span>
          <h2 className="font-serif text-4xl xl:text-5xl leading-[1.15] text-[#1b1c19] mb-6 font-normal">
            Wear Your Own <br />
            <span className="italic font-serif text-[#735c00]">Statement</span>
          </h2>
          <p className="text-[#454843] text-base leading-relaxed font-light max-w-lg mb-8">
            Enter the private world of Chitra Fine Jewellery. Access exclusive high-jewellery collections, personalized concierge services, and bespoke artisanal commissions.
          </p>

          <div className="border-t border-[#e4e2dd] pt-6 grid grid-cols-3 gap-6 max-w-md text-left">
            <div>
              <span className="block font-serif text-lg text-[#1b1c19]">22K & 18K</span>
              <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873]">Certified Gold</span>
            </div>
            <div>
              <span className="block font-serif text-lg text-[#1b1c19]">Handcrafted</span>
              <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873]">Master Artisans</span>
            </div>
            <div>
              <span className="block font-serif text-lg text-[#1b1c19]">Insured</span>
              <span className="text-[11px] uppercase tracking-[0.1em] text-[#757873]">Global Courier</span>
            </div>
          </div>
        </div>

        {/* Right Form Container */}
        <div className="col-span-1 lg:col-span-6 px-6 sm:px-12 lg:px-16 xl:px-24 py-12 flex flex-col justify-center max-w-xl mx-auto lg:max-w-none w-full">
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1b1c19] mb-2 font-normal">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-[#454843] font-light tracking-wide">
                {subtitle}
              </p>
            )}
          </div>

          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e4e2dd] py-6 px-6 lg:px-16 text-center lg:flex lg:justify-between items-center text-xs text-[#757873] font-sans">
        <p>© 2026 CHITRA Fine Jewellery. All rights reserved.</p>
        <p className="mt-2 lg:mt-0 tracking-widest uppercase text-[10px]">
          🔒 Secure HTTP-Only Session Authentication
        </p>
      </footer>
    </div>
  );
};
