"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes"; // <-- Switched to the official package!

const SunIcon = () => (
  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
);
const MoonIcon = () => (
  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // next-themes provides resolvedTheme to know exactly what mode we are in
  const { resolvedTheme, setTheme } = useTheme(); 

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "top-6 px-4 md:px-8" : "top-0 px-0"}`}>
      <style>{`
        @keyframes driftDust {
          from { background-position: 0px 0px; }
          to { background-position: 100px 100px; }
        }
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
          <div className="nav-pulse-hue absolute top-1/2 left-1/2 w-[70%] h-[130%] bg-indigo-500/20 rounded-full blur-[40px] z-0" />
          
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

        <Link href="/" className="relative z-10 text-2xl font-black text-yellow-500 tracking-tighter shrink-0 hover:scale-105 transition-transform">
          MYNEE
        </Link>
        
        <div className={`hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-[0.2em] shrink-0 relative z-10 transition-colors duration-300 ${scrolled ? "text-gray-200" : "text-gray-500"}`}>
          <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <Link href="/sessions" className="hover:text-yellow-500 transition-colors">Sessions</Link>
          <Link href="/devlog" className="hover:text-yellow-500 transition-colors">Dev Log</Link>
          <Link href="/about" className="hover:text-yellow-500 transition-colors">The Architect</Link>
          
          <div className="flex items-center gap-4 pl-4 border-l border-white/10">
            <Link href="/contact">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)]">
                Contact
              </button>
            </Link>

            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              {/* Only render icon after mount to avoid hydration errors */}
              {mounted && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={resolvedTheme}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
                  </motion.div>
                </AnimatePresence>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}