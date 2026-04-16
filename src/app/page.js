"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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

// --- GPU-ACCELERATED FOOTER DUST ---
const FooterDust = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(30)].map(() => ({
      tx: `${Math.random() * 30 - 15}px`,
      dur: `${5 + Math.random() * 7}s`,
      del: `${Math.random() * 1}s`,
      size: `${1 + Math.random() * 1.5}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <style>{`
        @keyframes floatFooterDust {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.1; }
          50% { transform: translate(var(--tx), -30px); opacity: 0.8; }
        }
      `}</style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)] will-change-transform"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            '--tx': p.tx,
            animation: `floatFooterDust ${p.dur} infinite ease-in-out ${p.del}`
          }}
        />
      ))}
    </div>
  );
};

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

  const scrollToHardware = () => {
    document.getElementById('hardware')?.scrollIntoView({ behavior: 'smooth' });
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
        className="z-10 min-h-screen w-full max-w-5xl flex flex-col items-center justify-center font-sans p-8 md:p-24 text-center relative"
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
        
        <motion.button 
          onClick={scrollToHardware}
          variants={fadeUpVariant} 
          className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full font-bold transition-all shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95"
        >
          Explore Hardware
        </motion.button>
      </motion.div>

      {/* --- VISION & PROTOTYPE SECTION --- */}
      <motion.div id="vision" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="z-10 w-full max-w-6xl py-32 px-12 border-t border-gray-100">
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
          <motion.div variants={fadeUpVariant} className="aspect-video bg-white rounded-[40px] shadow-2xl border border-gray-100 p-2 overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02]">
             {/* Dynamic color overlay on hover */}
             <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-transparent transition-all z-20 rounded-[38px]"></div>
             
             {/* Standard HTML Img Tag for flawless rendering */}
             <img 
                src="/prototype.jpg" 
                alt="Mynee Smart Knee Brace Prototype"
                className="w-full h-full object-cover rounded-[38px] relative z-10" 
             />
          </motion.div>
        </div>
      </motion.div>

      {/* --- LIVE TELEMETRY DASHBOARD --- */}
      <motion.div id="telemetry" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="z-10 w-full max-w-5xl py-20 px-8">
        <motion.h3 variants={fadeUpVariant} className="text-3xl font-bold mb-2 text-gray-800">Live Telemetry Simulation</motion.h3>
        <motion.p variants={fadeUpVariant} className="text-gray-500 mb-8">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={fadeUpVariant} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Flexion Angle</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black ${flexColors.text}`}>{sensorData.flexionAngle}°</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={`h-3 rounded-full ${flexColors.bg}`} style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}></div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Impact Force (IMU)</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black ${impactColors.text}`}>{sensorData.gForce}</span>
              <span className="text-xl font-bold text-gray-400 mb-1">G</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={`h-3 rounded-full ${impactColors.bg}`} style={{ width: `${(sensorData.gForce / 3) * 100}%` }}></div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Material Strain</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black ${strainColors.text}`}>{sensorData.strainLevel}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={`h-3 rounded-full ${strainColors.bg}`} style={{ width: `${sensorData.strainLevel}%` }}></div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- OVERHAULED CORE ENGINEERING --- */}
      <motion.div 
        id="hardware" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-100px" }} 
        variants={staggerContainer} 
        className="z-10 w-full max-w-6xl py-32 px-8 mb-10"
      >
        <motion.div variants={fadeUpVariant} className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-black text-gray-800 tracking-tight">Core Engineering</h3>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">The hardware architecture powering the Mynee exoskeleton. Shifting away from bulky pneumatic systems in favor of accessible, high-torque electromechanical components.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Compute Node */}
          <motion.div variants={fadeUpVariant} className="relative overflow-hidden p-10 bg-gray-950 border border-white/10 rounded-[40px] hover:border-yellow-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-colors">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Compute Unit</h3>
              <p className="text-yellow-500 font-mono text-sm mb-4 tracking-wider uppercase">Raspberry Pi Node</p>
              <p className="text-gray-400 leading-relaxed font-light">Serves as the central brain of the exoskeleton. Executes complex local Python processing, sensor fusion via Kalman filtering, and manages the real-time PID control loops without relying on cloud computing latency.</p>
            </div>
          </motion.div>

          {/* 2. Actuation */}
          <motion.div variants={fadeUpVariant} className="relative overflow-hidden p-10 bg-gray-950 border border-white/10 rounded-[40px] hover:border-yellow-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-colors">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Actuation</h3>
              <p className="text-yellow-500 font-mono text-sm mb-4 tracking-wider uppercase">PG36-555 Gear Motors</p>
              <p className="text-gray-400 leading-relaxed font-light">High-torque planetary gear DC motors driven by heavy-duty IBT-2 H-Bridges. Designed to deliver 5-10 Nm of active torque directly to the knee joint to assist specifically during sit-to-stand motions.</p>
            </div>
          </motion.div>

          {/* 3. Kinematics */}
          <motion.div variants={fadeUpVariant} className="relative overflow-hidden p-10 bg-gray-950 border border-white/10 rounded-[40px] hover:border-yellow-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-colors">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2-1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Kinematics</h3>
              <p className="text-yellow-500 font-mono text-sm mb-4 tracking-wider uppercase">MPU6050 IMU</p>
              <p className="text-gray-400 leading-relaxed font-light">A highly responsive 6-axis accelerometer and gyroscope module. It provides real-time spatial orientation data, allowing the system to continuously calculate the user's exact knee flexion angle.</p>
            </div>
          </motion.div>

          {/* 4. Gait Detection */}
          <motion.div variants={fadeUpVariant} className="relative overflow-hidden p-10 bg-gray-950 border border-white/10 rounded-[40px] hover:border-yellow-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/30 transition-colors">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Gait Detection</h3>
              <p className="text-yellow-500 font-mono text-sm mb-4 tracking-wider uppercase">Analog FSRs</p>
              <p className="text-gray-400 leading-relaxed font-light">Force Sensitive Resistors embedded within the footwear. These sensors monitor foot-strike pressure, enabling the control algorithm to definitively differentiate between the swing and stance phases of walking.</p>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* --- MEGA FOOTER WITH DUST --- */}
      <footer className="relative z-10 w-full bg-gray-950 border-t border-white/10 pt-20 pb-10 overflow-hidden">
        
        {/* The Animated Dust Layer */}
        <FooterDust />

        {/* Ensure footer content sits strictly above the dust */}
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-yellow-500 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
                <a href="mailto:syedarzanish@gmail.com" className="hover:text-yellow-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                <li><Link href="/sessions" className="hover:text-yellow-500 transition-colors">Sessions</Link></li>
                <li><Link href="/devlog" className="hover:text-yellow-500 transition-colors">Dev Log</Link></li>
                <li><button onClick={scrollToHardware} className="hover:text-yellow-500 transition-colors">Core Engineering</button></li>
              </ul>
            </div>

            {/* Topics Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Biomechanics</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Edge Computing</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">PID Control</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Sensor Fusion</span></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">GitHub ↗</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">LinkedIn ↗</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">University ↗</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 MYNEE | Syed Arzanish - Final Year Project.</p>
            <p>Built with <span className="text-gray-300 font-medium">Next.js</span> & <span className="text-gray-300 font-medium">Tailwind CSS</span>.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}