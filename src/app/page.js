"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- ADVANCED CYBER-GRID & ECG BACKGROUND ---
const HomeBackground = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles([...Array(40)].map(() => ({
      tx: `${Math.random() * 40 - 20}px`, dur: `${8 + Math.random() * 12}s`,
      del: `${Math.random() * 2}s`, size: `${1 + Math.random() * 2}px`,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? 'bg-teal-400' : 'bg-yellow-500'
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      <style>{`
        @keyframes scrollGrid {
          0% { transform: translateY(0) rotateX(45deg); }
          100% { transform: translateY(60px) rotateX(45deg); }
        }
        @keyframes floatData {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.1; }
          50% { transform: translate(var(--tx), -100px) scale(1.5); opacity: 0.7; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
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
      
      {/* 3D Tilted Grid */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [transform-origin:center_top]" style={{ animation: 'scrollGrid 15s linear infinite' }} />
      <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent shadow-[0_0_15px_rgba(20,184,166,0.5)]" style={{ animation: 'scanline 8s linear infinite' }} />
      
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-teal-900/10 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-900/10 blur-[150px] rounded-full mix-blend-screen" />

      {particles.map((p, i) => (
        <div key={i} className={`absolute ${p.color} rounded-full shadow-[0_0_10px_currentColor] will-change-transform`}
          style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatData ${p.dur} infinite ease-in-out ${p.del}` }} />
      ))}

      {/* The Heartbeat Trace integrated into Dark Mode */}
      <div className="absolute top-[60%] h-[150px] w-full -translate-y-1/2 z-0 ecg-line flex items-center justify-center opacity-40">
        <svg viewBox="0 0 2000 100" className="w-[2000px] h-full drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]" preserveAspectRatio="xMidYMid slice">
          <path d="M0,50 L400,50 C410,35 430,35 440,50 L460,50 L470,65 L490,10 L510,90 L520,50 L550,50 C570,30 600,30 620,50 L1200,50 C1210,35 1230,35 1240,50 L1260,50 L1270,65 L1290,10 L1310,90 L1320,50 L1350,50 C1370,30 1400,30 1420,50 L2000,50" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)]" />
    </div>
  );
};

const fadeUpVariant = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

export default function Home() {
  const [sensorData, setSensorData] = useState({ flexionAngle: 120, gForce: "0.00", strainLevel: 50 });

  const scrollToHardware = () => {
    document.getElementById('hardware')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.04; 
      setSensorData({
        flexionAngle: Math.floor(((Math.cos(t) + 1) / 2) * 120),
        gForce: (((-Math.cos(t) + 1) / 2) * 3.0).toFixed(2),
        strainLevel: Math.floor(((Math.sin(t) + 1) / 2) * 100),
      });
    }, 50); 
    return () => clearInterval(interval);
  }, []);

  const getDynamicColor = (val, max) => {
    const ratio = val / max;
    if (ratio < 0.30) return { text: "text-gray-500", bg: "bg-gray-700" };          
    if (ratio < 0.60) return { text: "text-teal-400", bg: "bg-teal-500" }; 
    if (ratio < 0.85) return { text: "text-yellow-400", bg: "bg-yellow-500" };
    return { text: "text-red-500", bg: "bg-red-500" };                        
  };

  const flexColors = getDynamicColor(sensorData.flexionAngle, 120);
  const impactColors = getDynamicColor(sensorData.gForce, 3.0);
  const strainColors = getDynamicColor(sensorData.strainLevel, 100);

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#030305] text-gray-100 overflow-x-hidden selection:bg-teal-500/30">
      <HomeBackground />

      {/* --- HERO SECTION --- */}
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="z-10 min-h-screen w-full max-w-5xl flex flex-col items-center justify-center font-sans p-8 md:p-24 text-center relative">
        <motion.div variants={fadeUpVariant} className="inline-block mb-6 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(20,184,166,0.2)] mt-28">
          Project In Development
        </motion.div>
        <motion.h1 variants={fadeUpVariant} className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 drop-shadow-md">
            Mynee
          </span>
        </motion.h1>
        <motion.h2 variants={fadeUpVariant} className="text-xl md:text-2xl mb-8 text-gray-400 font-light tracking-wide max-w-3xl">
          Smart Knee Brace Technology & Intelligent Sensing
        </motion.h2>
        <motion.p variants={fadeUpVariant} className="text-base md:text-lg max-w-xl mx-auto mb-12 text-gray-500 leading-relaxed font-light">
          A device designed to provide real-time monitoring and physical support to improve daily mobility.
        </motion.p>
        
        <motion.button onClick={scrollToHardware} variants={fadeUpVariant} className="px-10 py-4 bg-white hover:bg-gradient-to-r hover:from-teal-400 hover:to-emerald-400 text-black rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.6)] hover:scale-105 active:scale-95">
          Explore Hardware
        </motion.button>
      </motion.div>

      {/* --- VISION & PROTOTYPE SECTION --- */}
      <motion.div id="vision" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="z-10 w-full max-w-7xl py-32 px-8 md:px-12 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 lg:col-span-5">
            <motion.h3 variants={fadeUpVariant} className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
              Engineering for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Human Form.</span>
            </motion.h3>
            <motion.p variants={fadeUpVariant} className="text-gray-400 text-lg leading-relaxed font-light">
              Integrating high-torque actuators within a rigid structural chassis. The electromechanical framework is precisely aligned with the knee's axis of rotation, delivering deterministic power without compromising kinematic freedom.
            </motion.p>
            <motion.div variants={fadeUpVariant} className="grid grid-cols-1 gap-4">
               {['High-Torque Planetary Gear Motors', 'Multi-Modal Sensor Fusion (IMU + FSR)', 'Deterministic Local Edge Processing'].map((item) => (
                 <div key={item} className="flex items-center gap-4 text-gray-300 font-medium">
                   <div className="w-6 h-6 shrink-0 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center text-teal-400 text-xs shadow-[0_0_10px_rgba(45,212,191,0.3)]">✓</div>
                   {item}
                 </div>
               ))}
            </motion.div>

            {/* DARK MODE DEVELOPER'S NOTE */}
            <motion.div variants={fadeUpVariant} className="mt-8 p-6 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-3xl flex items-start gap-4 shadow-2xl">
              <div className="text-teal-400 mt-0.5 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <strong className="text-teal-500 font-black uppercase tracking-widest text-[10px] block mb-2">Developer's Note</strong>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Visual assets and 3D renderings displayed on this platform represent the envisioned commercial-grade architecture. The physical proof-of-concept developed for this project prioritizes functional engineering, core mechanics, and sensor telemetry over final aesthetic finishing.
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeUpVariant} className="lg:col-span-7 aspect-video w-full bg-black rounded-[40px] shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden relative group transition-transform duration-700 hover:scale-[1.02]">
             <div className="absolute inset-0 bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 rounded-[40px] pointer-events-none"></div>
             <img src="/prototype.jpg" alt="Mynee Smart Knee Brace Prototype" className="w-full h-full object-cover relative z-10" />
          </motion.div>
        </div>
      </motion.div>

      {/* --- LIVE TELEMETRY DASHBOARD --- */}
      <motion.div id="telemetry" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="z-10 w-full max-w-5xl py-20 px-8">
        <motion.h3 variants={fadeUpVariant} className="text-3xl font-bold mb-2 text-white">Live Telemetry Simulation</motion.h3>
        <motion.p variants={fadeUpVariant} className="text-gray-400 mb-8">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div variants={fadeUpVariant} className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10 hover:border-teal-500/50 transition-colors">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Flexion Angle</h4>
            <div className="flex items-end gap-2 mb-4"><span className={`text-6xl font-black ${flexColors.text}`}>{sensorData.flexionAngle}°</span></div>
            <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden"><div className={`h-3 rounded-full ${flexColors.bg}`} style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}></div></div>
          </motion.div>
          {/* Card 2 */}
          <motion.div variants={fadeUpVariant} className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10 hover:border-teal-500/50 transition-colors">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Impact Force (IMU)</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black ${impactColors.text}`}>{sensorData.gForce}</span><span className="text-xl font-bold text-gray-500 mb-1">G</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden"><div className={`h-3 rounded-full ${impactColors.bg}`} style={{ width: `${(sensorData.gForce / 3) * 100}%` }}></div></div>
          </motion.div>
          {/* Card 3 */}
          <motion.div variants={fadeUpVariant} className="bg-[#0a0a0a]/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10 hover:border-teal-500/50 transition-colors">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Material Strain</h4>
            <div className="flex items-end gap-2 mb-4"><span className={`text-6xl font-black ${strainColors.text}`}>{sensorData.strainLevel}%</span></div>
            <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden"><div className={`h-3 rounded-full ${strainColors.bg}`} style={{ width: `${sensorData.strainLevel}%` }}></div></div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- OVERHAULED CORE ENGINEERING --- */}
      <motion.div id="hardware" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="z-10 w-full max-w-6xl py-32 px-8 mb-10 border-t border-white/5">
        <motion.div variants={fadeUpVariant} className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Core Engineering</h3>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The hardware architecture powering the Mynee exoskeleton. Shifting away from bulky pneumatic systems in favor of accessible, high-torque electromechanical components.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>, title: "Compute Unit", spec: "Raspberry Pi Node", desc: "Serves as the central brain of the exoskeleton. Executes complex local Python processing, sensor fusion via Kalman filtering, and manages real-time PID control loops." },
            { icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></>, title: "Actuation", spec: "PG36-555 Gear Motors", desc: "High-torque planetary gear DC motors driven by heavy-duty IBT-2 H-Bridges. Designed to deliver 5-10 Nm of active torque directly to the knee joint." },
            { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2-1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>, title: "Kinematics", spec: "MPU6050 IMU", desc: "A highly responsive 6-axis accelerometer and gyroscope module providing real-time spatial orientation data to calculate the exact knee flexion angle." },
            { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>, title: "Gait Detection", spec: "Analog FSRs", desc: "Force Sensitive Resistors embedded within the footwear. These sensors monitor foot-strike pressure, differentiating between the swing and stance phases of walking." }
          ].map((block, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} className="relative overflow-hidden p-10 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[40px] hover:border-teal-500/50 hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)] transition-all duration-300 group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-colors">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">{block.icon}</svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{block.title}</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-mono text-sm mb-4 tracking-wider uppercase">{block.spec}</p>
                <p className="text-gray-400 leading-relaxed font-light">{block.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-[#020202] border-t border-white/10 pt-20 pb-10 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-teal-400 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                <li><Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link></li>
                <li><Link href="/documents" className="hover:text-teal-400 transition-colors">Documents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="cursor-default">Biomechanics</span></li>
                <li><span className="cursor-default">Edge Computing</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-gray-500 font-mono tracking-widest uppercase">
            <p>© 2026 MYNEE | Syed Arzanish.</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}