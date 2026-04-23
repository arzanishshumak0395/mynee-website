"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- 1. LOCAL SIDEBAR BACKGROUND (FIXED INDIGO BREATH & JITTER) ---

const SidebarBackground = () => {
  // Jitter Fix: Generate random particle values ONCE on mount
  const [dustParticles, setDustParticles] = useState([]);

  useEffect(() => {
    const particles = [...Array(15)].map(() => ({
      xTarget: Math.random() * 20 - 10,
      duration: 10 + Math.random() * 8,
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
    setDustParticles(particles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 bg-black">
      
      {/* --- Slow Breathing Animation CSS --- */}
      <style>{`
        @keyframes deepBreathe {
          0%, 40%   { opacity: 0.02; transform: scale(0.95); }
          /* Reduced max opacity from 0.4 to 0.15 for a much subtler glow */
          60%       { opacity: 0.15; transform: scale(1.05); }
          80%, 100% { opacity: 0.02; transform: scale(0.95); }
        }
        .pulse-core {
          opacity: 0.02;
          transform: scale(0.95);
          animation: deepBreathe 12s ease-in-out infinite;
        }
        .pulse-echo {
          opacity: 0.02;
          transform: scale(0.95);
          animation: deepBreathe 12s ease-in-out infinite;
          animation-delay: -10s; 
        }
      `}</style>

      {/* --- The Slow Indigo Hues (Reduced base opacity for subtlety) --- */}
      {/* Deep Indigo Core */}
      <div className="pulse-core absolute top-[10%] left-[-20%] w-[140%] h-[50%] bg-indigo-600/40 rounded-full blur-[50px]" />
      
      {/* Lighter Indigo Echo */}
      <div className="pulse-echo absolute bottom-[10%] right-[-20%] w-[120%] h-[60%] bg-indigo-400/30 rounded-full blur-[60px]" />

      {/* --- White Shimmering Tech Dust (Using locked state) --- */}
      {dustParticles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.1, y: 0, x: 0 }} 
          animate={{
            y: [0, -60, 0], 
            x: [0, p.xTarget, 0],
            opacity: [0.1, 0.8, 0.1] 
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: i * 0.5, 
          }}
          className="absolute w-1 h-1 bg-white rounded-full blur-[0.5px]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
        />
      ))}
    </div>
  );
};

// --- 2. THE SIDEBAR COMPONENT ---

export default function Sidebar({ activeWeek }) {
  // CONFIGURATION
  const latestPublishedWeek = 12; 
  const completedUntil = 11; // <-- Updated to 6 so Weeks 7 & 8 are just dots!

  const weeks = Array.from({ length: 12 }, (_, i) => ({ num: i + 1 }));

  return (
    <aside className="w-56 shrink-0 hidden lg:block sticky top-32 self-start z-10">       
      {/* Container with Dark Mode glass look */}
      <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-hidden relative min-h-[500px]">         
        
        {/* THE BACKGROUND LAYER */}
        <SidebarBackground />

        {/* THE CONTENT LAYER */}
        <div className="relative z-10 p-6">
          <h4 className="text-xs font-black text-indigo-300 uppercase tracking-widest mb-6">Log Index</h4>
          <div className="flex flex-col gap-4">
            
            {weeks.map((week) => {
              const isActive = week.num === activeWeek;
              const isDisabled = week.num > latestPublishedWeek;
              const isCompleted = week.num <= completedUntil;

              const Content = (
                <>
                  <div className="w-4 flex justify-center items-center">
                    {isActive ? (
                      // Glowing Pure White dot for the active week
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]"></span>
                    ) : isCompleted ? (
                      // Sharp Lime Green checkmark for completed weeks
                      <span className="text-lime-500 text-[11px] font-black italic">✓</span>
                    ) : (
                      // Subdued white/gray dots for future weeks
                      <span className={`w-1.5 h-1.5 rounded-full ${isDisabled ? 'bg-white/10' : 'bg-white/30'}`}></span>
                    )}
                  </div>
                  Week {week.num}
                </>
              );

              if (isDisabled) {
                return (
                  <div 
                    key={week.num} 
                    className="text-sm font-semibold text-gray-600 flex items-center gap-3 cursor-not-allowed select-none"
                  >
                    {Content}
                  </div>
                );
              }

              return (
                <Link 
                  key={week.num} 
                  href={`/devlog/week-${week.num}`}
                  className={`text-sm font-semibold transition-all flex items-center gap-3 ${
                    isActive 
                      ? `text-white translate-x-2 font-black` 
                      : "text-gray-400 hover:text-white hover:translate-x-1"
                  }`}
                >
                  {Content}
                </Link>
              );
            })}

          </div>
        </div>
      </div>
    </aside>
  );
}