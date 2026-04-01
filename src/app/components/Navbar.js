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
    // 1. Sped up the drop-down transition from duration-500 to duration-300
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

      {/* 2. Sped up shape morph from duration-700 to duration-300 */}
      {/* 3. Removed the shadow-[0_20px...] class completely */}
      <div className={`mx-auto max-w-7xl flex justify-between items-center transition-all duration-300 relative overflow-hidden ${
        scrolled 
          ? "bg-black border border-white/10 rounded-full py-4 px-8" 
          : "bg-transparent py-8 px-8 md:px-12"
      }`}>

        {/* --- STEALTH BACKGROUND ENGINE --- */}
        {/* 4. Sped up background fade-in from duration-1000 to duration-500 */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}>
          
          <div className="nav-pulse-hue absolute top-1/2 left-1/2 w-[70%] h-[130%] bg-indigo-500/20 rounded-full blur-[40px] z-0" />
          
          {scrolled && [...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.1, y: 0, x: 0 }}
              animate={{
                y: [0, -40, 0], 
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.1, 0.8, 0.1] 
              }}
              transition={{
                duration: 6 + Math.random() * 5,
                repeat: Infinity,
                delay: i * 0.3, 
              }}
              className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* --- NAVBAR CONTENT --- */}
        <Link href="/" className="relative z-10 text-2xl font-black text-yellow-500 tracking-tighter shrink-0 hover:scale-105 transition-transform">
          MYNEE
        </Link>
        
        {/* 5. Sped up text color change from duration-500 to duration-300 */}
        <div className={`hidden md:flex gap-8 items-center text-xs font-bold uppercase tracking-[0.2em] shrink-0 relative z-10 transition-colors duration-300 ${scrolled ? "text-gray-100" : "text-gray-500"}`}>
          <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <Link href="/sessions" className="hover:text-yellow-500 transition-colors">Sessions</Link>
          <Link href="/devlog" className="text-yellow-500 transition-colors">Dev Log</Link>
        </div>
      </div>
    </nav>
  );
}