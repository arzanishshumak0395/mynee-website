"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- BACKGROUND ANIMATION COMPONENTS ---

const BouncingOrb = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const vel = useRef({ x: 1.2, y: 1 }); // Smooth, pro-velocity speed
  const requestRef = useRef();

  const animate = () => {
    setPos((prev) => {
      let nextX = prev.x + vel.current.x;
      let nextY = prev.y + vel.current.y;

      // Bounce off viewport edges
      if (nextX <= 0 || nextX >= window.innerWidth - 200) vel.current.x *= -1;
      if (nextY <= 0 || nextY >= window.innerHeight - 200) vel.current.y *= -1;

      return { x: nextX, y: nextY };
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <motion.div
      // --- VISUAL FIX 1: Maxed Opacity Range ---
      // We’re now pulsating from a bright 60% to an intense 90% opacity.
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="fixed pointer-events-none z-0"
      style={{
        left: pos.x,
        top: pos.y,
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        // --- VISUAL FIX 2: Darker, Saturated Amber ---
        // Switched to a deep, intense amber with a very high (0.8) alpha channel.
        background: 'radial-gradient(circle, rgba(180, 83, 9, 0.8) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }}
    />
  );
};

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* --- VISUAL FIX 3: Intensified Deep Background Glows --- */}
      {/* Saturated colors (yellow-500 and sky-500) at higher opacity (35% & 30%). */}
      <div className="absolute top-[-15%] left-[-5%] w-[60%] h-[60%] bg-yellow-500/35 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-sky-500/30 rounded-full blur-[120px]" />
      
      <BouncingOrb />
      
      {/* --- ENHANCED PARTICLE FIELD --- */}
      {/* User Request: Significantly increased count from 6 to 25. */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 40 - 20, 0],
            // Particles are now brilliant, shimmering points of light (30% to 80% opacity).
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 0.5, // Tighter delays for a continuous shimmering effect
          }}
          // Darker amber for better saturation against the gray grid lines.
          className="absolute w-1.5 h-1.5 bg-amber-700 rounded-full blur-[0.5px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// --- MAIN PAGE VARIANTS ---

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function DevLog() {
  const [scrolled, setScrolled] = useState(false);
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 font-sans overflow-x-hidden">
      
      {/* 1. ADD DENSE PARTICLE FIELD LAYER */}
      <AmbientBackground />

      {/* 2. WRAP CONTENT IN Z-10 TO STAY ABOVE ANIMATIONS */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* NAVIGATION MENU */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/30 backdrop-blur-2xl border-b border-white/40 shadow-sm py-4 saturate-200" : "bg-transparent py-8"}`}>
          <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center gap-8">
            <Link href="/" className="text-2xl font-black text-yellow-600 tracking-tighter shrink-0">MYNEE</Link>
            <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em] shrink-0">
              <Link href="/" className="hover:text-yellow-600 transition-colors">Home</Link>
              <Link href="/sessions" className="hover:text-yellow-600 transition-colors">Sessions</Link>
              <Link href="/devlog" className="text-yellow-600 transition-colors">Dev Log</Link>
            </div>
          </div>
        </nav>

        {/* HEADER SECTION */}
        <div className="w-full max-w-5xl px-8 pt-40 pb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            <motion.div variants={fadeUpVariant} className="inline-block mb-6 px-5 py-1.5 rounded-full bg-yellow-100/50 border border-yellow-200 text-yellow-700 text-[10px] font-bold tracking-[0.3em] uppercase">
              Development Journal
            </motion.div>
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-gray-800">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Logs.</span>
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Documenting the 12-week journey of building the Mynee smart knee brace. Exploring hardware integration, UX/UI design, and software architecture.
            </motion.p>
          </motion.div>
        </div>

        {/* 12-WEEK GRID */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-6xl px-8 pb-32 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {weeks.map((week) => (
            <Link key={week} href={`/devlog/week-${week}`}>
              {/* Cards retain glassmorphism to show the dense particle field passing behind. */}
              <motion.div variants={fadeUpVariant} className="p-8 bg-white/70 backdrop-blur-md border border-gray-100 rounded-[30px] hover:border-yellow-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-yellow-600 font-black mb-6 group-hover:bg-yellow-100 transition-colors">
                    {week}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Week {week}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">Documentation covering milestones, GitHub commits, and design iterations.</p>
                </div>
                <div className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Read Log →
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* FOOTER */}
        <footer className="w-full py-16 bg-white/80 backdrop-blur-md border-t border-gray-100 text-center">
          <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Syed Arzanish.</p>
        </footer>
      </div>
    </main>
  );
}