"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- 1. DARK DUST FOR PUBLISHED LOGS (Jitter-Fixed, No Purple Hue) ---
const DarkCardTechDust = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(45)].map(() => ({
      xTarget: Math.random() * 20 - 10,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 0.5,
      size: 1.5 + Math.random() * 1.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[30px]">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            y: [0, -40, 0],
            x: [0, p.xTarget, 0],
            opacity: [0.3, 1, 0.3] 
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
          className="absolute bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
        />
      ))}
    </div>
  );
};

// --- 2. SUBTLE LOCK WATERMARK FOR UPCOMING LOGS ---
const LockedWatermark = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden rounded-[30px] opacity-[0.03]">
    <svg className="w-56 h-56 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
    </svg>
  </div>
);

// --- BACKGROUND ANIMATION COMPONENTS ---
const BouncingOrb = () => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const vel = useRef({ x: 1.2, y: 1 }); 
  const requestRef = useRef();

  const animate = () => {
    setPos((prev) => {
      let nextX = prev.x + vel.current.x;
      let nextY = prev.y + vel.current.y;

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
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="fixed pointer-events-none z-0"
      style={{
        left: pos.x,
        top: pos.y,
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180, 83, 9, 0.8) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }}
    />
  );
};

const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-[-15%] left-[-5%] w-[60%] h-[60%] bg-yellow-500/35 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-sky-500/30 rounded-full blur-[120px]" />
      <BouncingOrb />
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -120, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 0.5,
          }}
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

  // --- UPDATED WEEKS DATA ---
  const weeksData = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    
    if (num === 1) return { num, title: "The First Step.", desc: "Transitioning from broad concepts to zeroing in on a solvable engineering problem.", isDarkTheme: true };
    if (num === 2) return { num, title: "Formalizing the Blueprint.", desc: "Defining the multi-tiered system architecture, establishing ethical guardrails, and mapping the timeline.", isDarkTheme: true };
    if (num === 3) return { num, title: "Kinetic Intelligence.", desc: "Grounding the project in biomechanical literature, quasi-direct drive theory, and sensor fusion.", isDarkTheme: true };
    if (num === 4) return { num, title: "The Architecture of Execution.", desc: "Establishing the Work Breakdown Structure, Gantt scheduling, and hardware agile methodology.", isDarkTheme: true };
    if (num === 5) return { num, title: "Methodologies & The MVP.", desc: "Selecting Agile frameworks and bench-testing the Sense-Compute-Actuate hardware loop.", isDarkTheme: true };
    if (num === 6) return { num, title: "Stress-Testing & Architecture.", desc: "Evaluating the MVP, fixing sensor jitter, and generating UML flow diagrams.", isDarkTheme: true };

    // Default for Upcoming Weeks
    return {
      num,
      title: "Upcoming Log",
      desc: "🔒 Work in Progress", // Added a tiny lock emoji here
      isDarkTheme: false
    };
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 font-sans overflow-x-hidden">
      
      <AmbientBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        
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
              Documenting the 12-week journey of building the Mynee smart knee exoskeleton. Exploring hardware integration, design, and software architecture.
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
          {weeksData.map((week) => (
            <Link key={week.num} href={`/devlog/week-${week.num}`}>
              <motion.div 
                variants={fadeUpVariant} 
                className={`relative overflow-hidden p-8 backdrop-blur-md rounded-[30px] transition-all duration-300 group cursor-pointer h-full flex flex-col justify-between
                  ${week.isDarkTheme 
                    ? "bg-black border border-white/10 hover:border-yellow-500/50 shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:-translate-y-2" 
                    : "bg-white/70 border border-gray-100 hover:bg-white/90"
                  }
                `}
              >
                {/* Dynamically render dark dust or locked watermark */}
                {week.isDarkTheme ? <DarkCardTechDust /> : <LockedWatermark />}

                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black mb-6 transition-colors
                    ${week.isDarkTheme 
                      ? "bg-white/10 text-yellow-500 group-hover:bg-yellow-500/20" 
                      : "bg-slate-50 text-gray-400"
                    }
                  `}>
                    {week.num}
                  </div>
                  
                  <h4 className={`text-xl font-bold mb-1 ${week.isDarkTheme ? "text-white" : "text-gray-800"}`}>
                    Week {week.num}
                  </h4>
                  
                  <h5 className={`text-sm font-bold mb-3 ${week.isDarkTheme ? "text-yellow-500" : "text-gray-400"}`}>
                    {week.title}
                  </h5>
                  
                  <p className={`text-xs leading-relaxed mb-6 ${week.isDarkTheme ? "text-gray-400" : "text-gray-400"}`}>
                    {week.desc}
                  </p>
                </div>

                {/* Only show "Read Log ->" if the week is published */}
                {week.isDarkTheme && (
                  <div className="relative z-10 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform text-yellow-500 mt-auto pt-6">
                    Read Log →
                  </div>
                )}
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