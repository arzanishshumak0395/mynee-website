"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- THE 5-SECOND HEARTBEAT BACKGROUND ---
const HomeBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        @keyframes monitorDraw {
          0% { -webkit-mask-position: 200% 0; opacity: 1; }
          60% { -webkit-mask-position: -100% 0; opacity: 1; }
          61% { opacity: 0; }
          100% { -webkit-mask-position: 200% 0; opacity: 0; }
        }
        .ecg-line {
          -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,1) 95%, transparent 100%);
          -webkit-mask-size: 200% 100%;
          -webkit-mask-repeat: no-repeat;
          animation: monitorDraw 5s linear infinite;
        }
      `}</style>

      {/* The Heartbeat Trace */}
      <div className="absolute top-[60%] h-[150px] w-full -translate-y-1/2 z-0 ecg-line flex items-center justify-center opacity-30">
        <svg viewBox="0 0 2000 100" className="w-[2000px] h-full drop-shadow-[0_0_5px_rgba(57,255,20,0.4)]" preserveAspectRatio="xMidYMid slice">
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

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
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

  const getDynamicColor = (val, max) => {
    const ratio = val / max;
    if (ratio < 0.30) return { text: "text-gray-800", bg: "bg-gray-800" };          
    if (ratio < 0.60) return { text: "text-green-500", bg: "bg-green-500" }; 
    if (ratio < 0.85) return { text: "text-yellow-500", bg: "bg-yellow-500" };
    return { text: "text-red-500", bg: "bg-red-500" };                        
  };

  const flexColors = getDynamicColor(sensorData.flexionAngle, 120);
  const impactColors = getDynamicColor(sensorData.gForce, 3.0);
  const strainColors = getDynamicColor(sensorData.strainLevel, 100);

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 overflow-x-hidden"
    >
      <HomeBackground />

      {/* --- BACKGROUND ORBS --- */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)` }}
      />
      <div 
        className="absolute bottom-40 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)` }}
      />

      {/* --- SPOTLIGHT EFFECT --- */}
      <div 
        className="pointer-events-none fixed z-0 transition-all duration-1000 ease-out animate-pulse" 
        style={{
          width: "400px",
          height: "400px",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(226, 238, 67, 0.45) 0%, transparent 70%)"
        }}
      />

      {/* --- HERO SECTION --- */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="z-10 min-h-screen w-full max-w-5xl flex flex-col items-center justify-center font-sans p-8 md:p-24 text-center"
      >
        <motion.div variants={fadeUpVariant} className="inline-block mb-6 px-5 py-1.5 rounded-full bg-yellow-100/50 border border-yellow-200 text-yellow-700 text-[10px] font-bold tracking-[0.3em] uppercase mt-28">
          Project In Development
        </motion.div>
        <motion.h1 variants={fadeUpVariant} className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-600">
            Mynee
          </span>
        </motion.h1>
        <motion.h2 variants={fadeUpVariant} className="text-xl md:text-2xl mb-8 text-gray-500 font-light tracking-wide max-w-3xl">
          Smart Knee Brace Technology & Intelligent Sensing
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-base md:text-lg max-w-xl mx-auto mb-12 text-gray-400 leading-relaxed font-light">
          A device designed to provide real-time monitoring and physical support to improve daily mobility.
        </motion.p>
        <motion.button variants={fadeUpVariant} className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full font-bold transition-all shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95">
          Explore Hardware
        </motion.button>
      </motion.div>

      {/* --- VISION & PROTOTYPE SECTION --- */}
      <motion.div 
        id="vision" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="z-10 w-full max-w-6xl py-32 px-12 border-t border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <motion.h3 variants={fadeUpVariant} className="text-5xl font-black text-gray-800 tracking-tight leading-none">Engineering for the <span className="text-yellow-500">Human Form.</span></motion.h3>
            <motion.p variants={fadeUpVariant} className="text-gray-500 text-lg leading-relaxed font-light">
              Combining 3D-printed lightweight structures with flexible sensor arrays. Our prototype focuses on the pivot point of the knee, ensuring zero restriction in natural gait.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 gap-4">
               {['Ergonomic 3D Mesh Housing', 'Breathable Bio-compatible Material', 'Low-Latency Bluetooth 5.0'].map((item) => (
                 <div key={item} className="flex items-center gap-4 text-gray-700 font-medium">
                   <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">✓</div>
                   {item}
                 </div>
               ))}
            </motion.div>
          </div>
          <motion.div variants={fadeUpVariant} className="aspect-video bg-white rounded-[40px] shadow-2xl border border-gray-100 flex items-center justify-center text-gray-300 font-mono text-xs uppercase tracking-widest p-12 text-center overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02]">
             <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-transparent transition-all"></div>
             <video src="/prototype.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover relative z-10" />
             <span className="absolute z-0">Prototype Visual</span>
          </motion.div>
        </div>
      </motion.div>

      {/* --- LIVE TELEMETRY DASHBOARD --- */}
      <motion.div 
        id="telemetry" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="z-10 w-full max-w-5xl py-20 px-8"
      >
        <motion.h3 variants={fadeUpVariant} className="text-3xl font-bold mb-2 text-gray-800">Live Telemetry Simulation</motion.h3>
        <motion.p variants={fadeUpVariant} className="text-gray-500 mb-8">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUpVariant} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Flexion Angle</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black ${flexColors.text}`}>
                {sensorData.flexionAngle}°
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full ${flexColors.bg}`} 
                style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Impact Force (IMU)</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black ${impactColors.text}`}>
                {sensorData.gForce}
              </span>
              <span className="text-xl font-bold text-gray-400 mb-1">G</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full ${impactColors.bg}`} 
                style={{ width: `${(sensorData.gForce / 3) * 100}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Material Strain</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black ${strainColors.text}`}>
                {sensorData.strainLevel}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full ${strainColors.bg}`} 
                style={{ width: `${sensorData.strainLevel}%` }}
              ></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- CORE ENGINEERING --- */}
      <motion.div 
        id="hardware" 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="z-10 w-full max-w-5xl py-32 px-8 mb-10"
      >
        <motion.h3 variants={fadeUpVariant} className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Core Engineering</motion.h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { title: 'Compute Unit', spec: 'Raspberry Pi' }, 
            { title: 'Actuation', spec: 'PG36-555 Gear Motors' }, 
            { title: 'Kinematics', spec: 'MPU6050 IMU' }, 
            { title: 'Gait Detection', spec: 'Analog FSRs' }
          ].map((item, i) => (
            <motion.div key={item.title} variants={fadeUpVariant} className="p-8 bg-white border border-gray-100 rounded-[30px] hover:border-yellow-400 hover:bg-yellow-50 hover:shadow-[0_10px_30px_rgba(234,179,8,0.15)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center">
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 font-mono font-medium">{item.spec}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- FOOTER --- */}
      <footer className="z-10 w-full py-20 bg-white border-t border-gray-100 text-center">
        <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Mynee Smart Tech. Developed by Syed Arzanish.</p>
      </footer>
    </main>
  );
}