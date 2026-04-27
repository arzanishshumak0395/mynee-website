"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "top-6 px-4 md:px-8" : "top-0 px-0"}`}>
      <style>{`
        @keyframes deepBreathe {
          0%, 40%   { opacity: 0.1; transform: translate(-50%, -50%) scale(0.95); }
          60%       { opacity: 0.3; transform: translate(-50%, -50%) scale(1.1); }
          80%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(0.95); }
        }
        .nav-pulse-hue {
          animation: deepBreathe 8s ease-in-out infinite;
        }
      `}</style>

      {/* LOCKED: Always Dark, Always Stealthy */}
      <div className={`mx-auto max-w-7xl flex justify-between items-center transition-all duration-300 relative overflow-hidden ${
        scrolled 
          ? "bg-[#0a0a0a]/95 border border-white/10 rounded-full py-4 px-8 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent py-8 px-8 md:px-12"
      }`}>

        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}>
          <div className="nav-pulse-hue absolute top-1/2 left-1/2 w-[70%] h-[130%] bg-teal-500/20 rounded-full blur-[40px] z-0" />
          
          {scrolled && [...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1, y: 0, x: 0 }}
              animate={{ y: [0, -40, 0], x: [0, Math.random() * 20 - 10, 0], opacity: [0.1, 0.8, 0.1] }}
              transition={{ duration: 6 + Math.random() * 5, repeat: Infinity, delay: i * 0.3 }}
              className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        {/* UPDATED LOGO GRADIENT */}
        <Link href="/" className="relative z-10 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 tracking-tighter shrink-0 hover:scale-105 transition-transform pb-1">
          MYNEE
        </Link>
        
        {/* UPDATED HOVER COLORS */}
        <div className={`hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-[0.2em] shrink-0 relative z-10 transition-colors duration-300 ${scrolled ? "text-gray-200" : "text-gray-500"}`}>
          <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
          <Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link>
          <Link href="/devlog" className="hover:text-teal-400 transition-colors">Dev Log</Link>
          <Link href="/documents" className="hover:text-teal-400 transition-colors">Documents</Link>
          <Link href="/about" className="hover:text-teal-400 transition-colors">The Architect</Link>
          
          <div className="flex items-center pl-4 border-l border-white/10">
            <Link href="/contact">
              {/* UPDATED BUTTON */}
              <button className="bg-gradient-to-r from-teal-400 to-emerald-400 text-black px-6 py-2.5 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)]">
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}