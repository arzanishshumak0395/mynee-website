"use client";

import Sidebar from "../Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// --- CUSTOM ANIMATIONS ---
const floatAnimation = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, -5, 5, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

const pulseGlow = {
  animate: {
    opacity: [0.3, 0.8, 0.3],
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

const loadingBar = {
  hidden: { width: "0%" },
  visible: { 
    width: "100%", 
    transition: { duration: 2.5, repeat: Infinity, ease: "linear" } 
  }
};

export default function Week11Log() {
  const [dots, setDots] = useState("");

  // Simple typing effect for the loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      {/* MAIN LAYOUT GRID */}
      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative z-10">
        
        {/* --- DYNAMIC LEFT SIDEBAR --- */}
        <Sidebar activeWeek={11} />

        {/* --- RIGHT COLUMN: UNDER CONSTRUCTION --- */}
        <article className="flex-1 max-w-3xl flex flex-col items-center justify-center min-h-[60vh]">
          
          <div className="w-full relative overflow-hidden bg-gray-950 border border-white/10 rounded-[40px] p-12 md:p-20 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
            
            {/* Background Glow */}
            <motion.div 
              variants={pulseGlow} 
              animate="animate" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/20 blur-[80px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Floating Emoji Character */}
              <motion.div 
                variants={floatAnimation} 
                animate="animate" 
                className="text-7xl md:text-8xl mb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              >
                👷‍♂️⚙️
              </motion.div>

              {/* Status Badge */}
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-black tracking-[0.3em] uppercase">
                Status: Work In Progress
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Hardware Assembly<br />Underway.
              </h1>
              
              {/* Description */}
              <p className="text-lg text-gray-400 font-light max-w-md mx-auto mb-12">
                This section of the engineering log is currently being compiled. The exoskeleton logic is being routed and tested.
              </p>

              {/* Fake Terminal / Loading Bar */}
              <div className="w-full max-w-sm bg-black/50 border border-white/5 rounded-2xl p-4 text-left mb-10 shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  <span className="text-[10px] text-gray-500 font-mono ml-2 uppercase tracking-widest">System_Terminal</span>
                </div>
                <div className="text-yellow-500 font-mono text-xs mb-3 flex">
                  <span>&gt; Compiling Week 11 log data{dots}</span>
                </div>
                {/* Animated Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    variants={loadingBar} 
                    initial="hidden" 
                    animate="visible" 
                    className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                  />
                </div>
              </div>

              {/* Back Button */}
              <Link href="/devlog">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white hover:bg-yellow-500 text-gray-900 hover:text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/30 active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Return to Index
                </button>
              </Link>

            </div>
          </div>

        </article>
      </div>

      <footer className="w-full py-16 bg-white border-t border-gray-100 text-center relative z-10 mt-auto">
        <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Syed Arzanish.</p>
      </footer>
    </main>
  );
}