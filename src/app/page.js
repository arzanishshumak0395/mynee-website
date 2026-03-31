"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- THE "LIVE MONITOR & PULSING BLUEPRINT" BACKGROUND ---
const HomeBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black overflow-hidden">
      
      {/* --- CSS Animations --- */}
      <style>{`
        /* 1. The Deep Breathing Atmosphere */
        @keyframes gentleBreathe {
          0%, 40%   { opacity: 0.01; transform: scale(0.98); }
          60%       { opacity: 0.08; transform: scale(1.02); }
          80%, 100% { opacity: 0.01; transform: scale(0.98); }
        }
        
        /* 2. The Expanding Grid Pulse (Light source behind the grid) */
        @keyframes gridPulse {
          0% { transform: scale(0.1); opacity: 0; }
          30% { opacity: 0.3; } 
          100% { transform: scale(2); opacity: 0; }
        }

        /* 3. The Authentic Monitor Draw Effect */
        @keyframes monitorDraw {
          0% { -webkit-mask-position: 200% 0; opacity: 1; }
          25% { -webkit-mask-position: -100% 0; opacity: 1; } 
          26% { opacity: 0; } 
          100% { -webkit-mask-position: 200% 0; opacity: 0; }
        }

        .pulse-core { animation: gentleBreathe 16s ease-in-out infinite; }
        
        /* FLASHBANG FIX: Added base opacity: 0 and negative delay */
        .grid-pulse-1 { 
          opacity: 0; 
          transform: scale(0.1);
          animation: gridPulse 8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite; 
        }
        .grid-pulse-2 { 
          opacity: 0;
          transform: scale(0.1);
          animation: gridPulse 8s cubic-bezier(0.2, 0.8, 0.4, 1) infinite; 
          animation-delay: -4s; /* Starts instantly, but shifted in time */
        }

        .ecg-line {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,1) 95%, transparent 100%);
          -webkit-mask-size: 200% 100%;
          -webkit-mask-repeat: no-repeat;
          animation: monitorDraw 14s linear infinite;
        }
      `}</style>

      {/* 1. The Ultra-Dim Indigo Atmosphere */}
<div className="pulse-core absolute top-[10%] left-[-10%] w-[80vw] h-[80vh] bg-lime-950/40 rounded-full blur-[150px] opacity-10" />
      {/* 2. The Grid Illuminators (These expand BEHIND the grid to make it pulse) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[800px] h-[800px] bg-lime-500/20 rounded-full blur-[60px] grid-pulse-1" />
        <div className="absolute w-[800px] h-[800px] bg-lime-500/20 rounded-full blur-[60px] grid-pulse-2" />      </div>

      {/* 3. The Micro-Grid (Opacity returned to 7%) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 95%)'
        }}
      />

      {/* 4. The Authentic Heartbeat Trace */}
      <div className="absolute top-[60%] h-[150px] w-full -translate-y-1/2 z-10 ecg-line flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 2000 100" className="w-[2000px] h-full drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]" preserveAspectRatio="xMidYMid slice">
          <path 
            d="M0,50 L400,50 C410,35 430,35 440,50 L460,50 L470,65 L490,10 L510,90 L520,50 L550,50 C570,30 600,30 620,50 L1200,50 C1210,35 1230,35 1240,50 L1260,50 L1270,65 L1290,10 L1310,90 L1320,50 L1350,50 C1370,30 1400,30 1420,50 L2000,50" 
            fill="none" 
            stroke="#39ff14" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
    </div>
  );
};

// --- MAIN PAGE ANIMATION VARIANTS ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  
  const [sensorData, setSensorData] = useState({
    flexionAngle: 120,
    gForce: "0.00",
    strainLevel: 50,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    let t = 0;
    const speed = 0.04; 
    const interval = setInterval(() => {
      t += speed; 
      const flexVal = ((Math.cos(t) + 1) / 2) * 120; 
      const impactVal = ((-Math.cos(t) + 1) / 2) * 3.0; 
      const strainVal = ((Math.sin(t) + 1) / 2) * 100;

      setSensorData({
        flexionAngle: Math.floor(flexVal),
        gForce: impactVal.toFixed(2),
        strainLevel: Math.floor(strainVal),
      });
    }, 50); 
    return () => clearInterval(interval);
  }, []);

  // --- NEON GLOW COLOR LOGIC ---
  const getDynamicColor = (val, max) => {
    const ratio = val / max;
    if (ratio < 0.30) return { 
      text: "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]", 
      bg: "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
    };          
    if (ratio < 0.60) return { 
      text: "text-[#39ff14] drop-shadow-[0_0_12px_rgba(57,255,20,0.7)]", 
      bg: "bg-[#39ff14] shadow-[0_0_12px_rgba(57,255,20,0.7)]" 
    }; 
    if (ratio < 0.85) return { 
      text: "text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.7)]", 
      bg: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]" 
    };
    return { 
      text: "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]", 
      bg: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.9)]" 
    };                        
  };

  const flexColors = getDynamicColor(sensorData.flexionAngle, 120);
  const impactColors = getDynamicColor(sensorData.gForce, 3.0);
  const strainColors = getDynamicColor(sensorData.strainLevel, 100);

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center bg-black text-white overflow-x-hidden"
    >
      {/* 1. THE BIOMETRIC BLUEPRINT BACKGROUND */}
      <HomeBackground />

      {/* 2. THE INTERACTIVE MOUSE SPOTLIGHT */}
      <div 
        className="pointer-events-none fixed z-[2] transition-all duration-1000 ease-out animate-pulse" 
        style={{
          width: "600px", height: "600px",
          left: `${mousePosition.x}px`, top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(132, 204, 22, 0.08) 0%, transparent 60%)" 
        }}
      />

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* --- SEARCH BAR --- */}
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[60] w-full max-w-3xl px-4 pointer-events-none">
          <div className="pointer-events-auto relative group">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-full transition-all group-hover:bg-white/10 group-hover:border-white/20"></div>
            <input 
              type="text" 
              placeholder="Search project documentation..." 
              className="relative w-full py-5 pl-10 pr-20 bg-transparent rounded-full text-xl font-medium text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all"
            />
            <svg className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-500 group-hover:text-[#39ff14] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* --- NAVIGATION MENU --- */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/50 backdrop-blur-2xl border-b border-white/10 shadow-lg py-4" : "bg-transparent py-8"}`}>
          <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center gap-8">
            <Link href="/" className="text-2xl font-black text-white tracking-tighter shrink-0">MYNEE</Link>
            <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] shrink-0">
              <Link href="/" className="text-white hover:text-lime-400 transition-colors">Home</Link>
              <Link href="/sessions" className="hover:text-lime-400 transition-colors">Sessions</Link>  
              <Link href="/devlog">
                <button className="ml-2 px-6 py-2 bg-lime-500 text-black font-black rounded-full hover:bg-lime-400 transition-all shadow-[0_0_15px_rgba(132,204,22,0.3)]">Dev Log</button>
              </Link>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="min-h-screen w-full max-w-5xl flex flex-col items-center justify-center font-sans p-8 md:p-24 text-center">
          <motion.div variants={fadeUpVariant} className="inline-block mb-6 px-5 py-1.5 rounded-full bg-white/5 border border-white/10 text-lime-300 text-[10px] font-bold tracking-[0.3em] uppercase mt-28 shadow-sm">
            Project In Development
          </motion.div>
          <motion.h1 variants={fadeUpVariant} className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
              Mynee
            </span>
          </motion.h1>
          <motion.h2 variants={fadeUpVariant} className="text-xl md:text-2xl mb-8 text-gray-300 font-medium tracking-wide max-w-3xl">
            Smart Knee Brace Technology & Intelligent Sensing
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-base md:text-lg max-w-xl mx-auto mb-12 text-gray-500 leading-relaxed font-light">
            A device designed to provide real-time monitoring and physical support to improve daily mobility.
          </motion.p>
          <motion.button variants={fadeUpVariant} className="px-10 py-4 bg-lime-500 hover:bg-lime-400 text-black rounded-full font-black transition-all shadow-[0_10px_30px_rgba(132,204,22,0.15)] hover:scale-105 active:scale-95">
            Explore Hardware
          </motion.button>
        </motion.div>

        {/* --- VISION & PROTOTYPE SECTION --- */}
        <motion.div id="vision" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="w-full max-w-6xl py-32 px-12 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <motion.h3 variants={fadeUpVariant} className="text-5xl font-black text-white tracking-tight leading-none">Engineering for the <span className="text-lime-400">Human Form.</span></motion.h3>
              <motion.p variants={fadeUpVariant} className="text-gray-400 text-lg leading-relaxed font-light">
                Combining 3D-printed lightweight structures with flexible sensor arrays. Our prototype focuses on the pivot point of the knee, ensuring zero restriction in natural gait.
              </motion.p>
              <motion.div variants={fadeUpVariant} className="grid grid-cols-1 gap-4">
                 {['Ergonomic 3D Mesh Housing', 'Breathable Bio-compatible Material', 'Low-Latency Bluetooth 5.0'].map((item) => (
                   <div key={item} className="flex items-center gap-4 text-gray-300 font-medium">
                     <div className="w-6 h-6 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center text-xs font-black border border-lime-500/30">✓</div>
                     {item}
                   </div>
                 ))}
              </motion.div>
            </div>
            <motion.div variants={fadeUpVariant} className="aspect-video bg-white/5 backdrop-blur-md rounded-[40px] shadow-2xl border border-white/10 flex items-center justify-center text-gray-500 font-mono text-xs uppercase tracking-widest p-12 text-center overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02]">
               <div className="absolute inset-0 bg-lime-500/5 group-hover:bg-transparent transition-all"></div>
               <video src="/prototype.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover relative z-10 opacity-80 mix-blend-screen" />
               <span className="absolute z-0 text-gray-600">Prototype Visual</span>
            </motion.div>
          </div>
        </motion.div>

        {/* --- LIVE TELEMETRY DASHBOARD --- */}
        <motion.div id="telemetry" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="w-full max-w-5xl py-20 px-8">
          <motion.h3 variants={fadeUpVariant} className="text-3xl font-bold mb-2 text-white">Live Telemetry Simulation</motion.h3>
          <motion.p variants={fadeUpVariant} className="text-gray-400 mb-8">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUpVariant} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/10 hover:border-[#39ff14]/30 transition-colors">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Flexion Angle</h4>
              <div className="flex items-end gap-2 mb-4">
                <span className={`text-6xl font-black ${flexColors.text}`}>{sensorData.flexionAngle}°</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div className={`h-3 rounded-full ${flexColors.bg}`} style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/10 hover:border-[#39ff14]/30 transition-colors">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Impact Force (IMU)</h4>
              <div className="flex items-end gap-2 mb-4">
                <span className={`text-6xl font-black ${impactColors.text}`}>{sensorData.gForce}</span>
                <span className="text-xl font-bold text-gray-500 mb-1">G</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div className={`h-3 rounded-full ${impactColors.bg}`} style={{ width: `${(sensorData.gForce / 3) * 100}%` }}></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-white/10 hover:border-[#39ff14]/30 transition-colors">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Material Strain</h4>
              <div className="flex items-end gap-2 mb-4">
                <span className={`text-6xl font-black ${strainColors.text}`}>{sensorData.strainLevel}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div className={`h-3 rounded-full ${strainColors.bg}`} style={{ width: `${sensorData.strainLevel}%` }}></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* --- CORE ENGINEERING --- */}
        <motion.div id="hardware" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="w-full max-w-5xl py-32 px-8 mb-10">
          <motion.h3 variants={fadeUpVariant} className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">Core Engineering</motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Microcontroller', 'Flex Sensors', 'IMU Module', 'Software'].map((tech, i) => (
              <motion.div key={tech} variants={fadeUpVariant} className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-[#39ff14]/50 hover:bg-white/10 transition-all duration-300">
                <p className="font-bold text-white">{tech}</p>
                <p className="text-xs text-gray-500 mt-2 font-mono">{['ESP32', 'Analog', 'MPU6050', 'C++/Python'][i]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- FOOTER --- */}
        <footer className="w-full py-20 bg-black/50 backdrop-blur-md border-t border-white/10 text-center">
          <div className="text-xl font-black text-lime-500 mb-4 tracking-tighter">MYNEE</div>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">© 2026 Mynee Smart Tech. Developed by Syed Arzanish.</p>
        </footer>
      </div>
    </main>
  );
}