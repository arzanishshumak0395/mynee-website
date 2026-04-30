"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

// ==========================================
// GLOBAL BACKGROUND SYSTEM
// ==========================================
const DataGridBackground = () => {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles([...Array(40)].map(() => ({
      tx: `${Math.random() * 40 - 20}px`, dur: `${8 + Math.random() * 12}s`,
      del: `${Math.random() * 2}s`, size: `${1 + Math.random() * 2}px`,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? 'bg-teal-400/30' : 'bg-fuchsia-500/30'
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      <style>{`
        @keyframes scrollGrid { 0% { transform: translateY(0) rotateX(45deg); } 100% { transform: translateY(60px) rotateX(45deg); } }
        @keyframes floatData { 0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.1; } 50% { transform: translate(var(--tx), -100px) scale(1.5); opacity: 0.7; } }
        
        /* Cinematic Chapter Animations */
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }
        @keyframes spinSlowReverse { 100% { transform: rotate(-360deg); } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes radarSweep { 0% { transform: translateY(-100%) scaleY(0.5); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(200%) scaleY(1.5); opacity: 0; } }
        @keyframes riseEmber { 0% { transform: translateY(50px) translateX(0px) scale(0.5); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(-300px) translateX(30px) scale(1.5); opacity: 0; } }
        @keyframes slideHazard { to { background-position: 40px 40px; } }
        @keyframes circuitPulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; filter: drop-shadow(0 0 10px #a3e635); } }
        @keyframes spotlight { 0%, 100% { opacity: 0.5; transform: scale(1) translate(-50%, 0); } 50% { opacity: 0.8; transform: scale(1.2) translate(-50%, 10%); } }
      `}</style>
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [transform-origin:center_top]" style={{ animation: 'scrollGrid 20s linear infinite' }} />
      {mounted && particles.map((p, i) => (
        <div key={i} className={`absolute ${p.color} rounded-full shadow-[0_0_10px_currentColor]`} style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatData ${p.dur} infinite ease-in-out ${p.del}` }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)]" />
    </div>
  );
};

// ==========================================
// ELITE CINEMATIC BACKGROUNDS
// ==========================================
const GenesisCinematic = () => {
  const [dust, setDust] = useState([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setDust([...Array(20)].map(() => ({ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, dur: `${4 + Math.random() * 4}s` })));
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.1),transparent_70%)]">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] border-[1px] border-amber-500/20 border-dashed rounded-full" style={{ animation: 'spinSlow 40s linear infinite' }} />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] border-[2px] border-amber-500/10 rounded-full" style={{ animation: 'pulseGlow 5s ease-in-out infinite' }} />
      {mounted && dust.map((d, i) => (
        <div key={i} className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full blur-[1px] opacity-40" style={{ top: d.top, left: d.left, animation: `floatData ${d.dur} infinite alternate` }} />
      ))}
    </div>
  );
};

const BreadboardCinematic = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/10 blur-[100px]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute top-0 left-0 w-full h-[4px] bg-teal-400/50 shadow-[0_0_20px_#2dd4bf]" style={{ animation: 'radarSweep 5s linear infinite' }} />
  </div>
);

const FireCinematic = () => {
  const [embers, setEmbers] = useState([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setEmbers([...Array(30)].map(() => ({ left: `${Math.random() * 100}%`, dur: `${2 + Math.random() * 3}s`, del: `${Math.random() * 2}s` })));
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.2),transparent_70%)]">
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-orange-600/50 via-red-600/30 to-transparent blur-[80px] rounded-full" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />
      {mounted && embers.map((e, i) => (
        <div key={i} className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-gradient-to-t from-yellow-300 to-red-500 blur-[1px] mix-blend-screen" 
             style={{ left: e.left, animation: `riseEmber ${e.dur} ease-in infinite`, animationDelay: e.del }} />
      ))}
    </div>
  );
};

const AluminumCinematic = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.1),transparent_70%)]">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
    <div className="absolute -top-20 -right-20 w-[400px] h-[400px] border-[2px] border-blue-500/30 rounded-full border-dashed" style={{ animation: 'spinSlow 25s linear infinite' }} />
    <div className="absolute top-10 right-10 w-[250px] h-[250px] border-[4px] border-blue-400/20 rounded-full border-dotted" style={{ animation: 'spinSlowReverse 15s linear infinite' }} />
  </div>
);

const TorqueCinematic = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #a3e635 25%, transparent 25%, transparent 50%, #a3e635 50%, #a3e635 75%, transparent 75%, transparent)', backgroundSize: '40px 40px', animation: 'slideHazard 2s linear infinite' }} />
    <div className="absolute top-0 right-0 w-96 h-96 bg-lime-500/10 blur-[100px]" />
    <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] text-lime-500/10" style={{ animation: 'spinSlow 50s linear infinite' }}>
      <svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 5 L55 15 A35 35 0 0 1 85 45 L95 50 L85 55 A35 35 0 0 1 55 85 L50 95 L45 85 A35 35 0 0 1 15 55 L5 50 L15 45 A35 35 0 0 1 45 15 Z" />
        <circle cx="50" cy="50" r="20" fill="#030305" />
      </svg>
    </div>
    <div className="absolute top-[20%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-lime-400 to-transparent" style={{ animation: 'circuitPulse 1.5s ease-in-out infinite' }} />
    <div className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lime-300 to-transparent" style={{ animation: 'circuitPulse 1s ease-in-out infinite 0.5s' }} />
  </div>
);

const LogicCinematic = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15),transparent_70%)]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]" style={{ animation: 'spinSlow 60s linear infinite' }}>
      <svg className="w-full h-full text-fuchsia-500/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
        <polygon points="50,5 95,50 50,95 5,50" />
        <polygon points="50,5 95,50 50,95 5,50" style={{ transformOrigin: '50% 50%', transform: 'rotate(45deg)' }} />
        <circle cx="50" cy="50" r="45" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="15" fill="rgba(217,70,239,0.1)" />
      </svg>
    </div>
  </div>
);

const FinalCinematic = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 blur-[80px] rounded-full" style={{ animation: 'spotlight 4s ease-in-out infinite' }} />
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-teal-900/20 to-transparent" />
  </div>
);

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function PrototypingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map scroll progress to timeline milestones (Updated for 7 items)
  const y1 = useTransform(scrollYProgress, [0, 0.12], ["0%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0.12, 0.28], ["0%", "100%"]);
  const y3 = useTransform(scrollYProgress, [0.28, 0.44], ["0%", "100%"]);
  const y4 = useTransform(scrollYProgress, [0.44, 0.60], ["0%", "100%"]);
  const y5 = useTransform(scrollYProgress, [0.60, 0.76], ["0%", "100%"]);
  const y6 = useTransform(scrollYProgress, [0.76, 0.92], ["0%", "100%"]);

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-white origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      {/* TOP NAVIGATION BAR */}
      <nav className="absolute top-10 md:top-28 w-full px-6 md:px-12 z-50 pointer-events-none">
        <div className="max-w-[90rem] mx-auto flex justify-between items-center pointer-events-auto">
          <Link href="/devlog" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-teal-400 transition-colors drop-shadow-md bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">Back to Logs</span>
          </Link>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 bg-teal-500/10 px-4 py-1.5 rounded-full border border-teal-500/30 shadow-[0_0_20px_rgba(20,184,166,0.3)] backdrop-blur-md">
            Hardware Masterfile
          </div>
        </div>
      </nav>

      {/* CRITICAL FIX: items-start allows sticky children to work */}
      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-4 md:px-8 pt-40 md:pt-48 pb-32 gap-12 relative z-10 items-start">
        
        {/* --- DYNAMIC STICKY TIMELINE (LEFT COLUMN) --- */}
        <div className="hidden lg:block w-48 shrink-0 sticky top-40">
          <div className="flex flex-col gap-12 text-right pr-8 border-r border-white/10 py-10 relative">
            
            <div className="absolute right-[-1px] top-0 bottom-0 w-[2px] bg-white/5" />
            <motion.div className="absolute right-[-1px] top-0 w-[2px] bg-gradient-to-b from-amber-400 to-teal-400 origin-top" style={{ height: y1 }} />
            <motion.div className="absolute right-[-1px] top-[16.6%] w-[2px] bg-gradient-to-b from-teal-400 to-red-500 origin-top" style={{ height: y2 }} />
            <motion.div className="absolute right-[-1px] top-[33.3%] w-[2px] bg-gradient-to-b from-red-500 to-blue-400 origin-top" style={{ height: y3 }} />
            <motion.div className="absolute right-[-1px] top-[50%] w-[2px] bg-gradient-to-b from-blue-400 to-lime-400 origin-top" style={{ height: y4 }} />
            <motion.div className="absolute right-[-1px] top-[66.6%] w-[2px] bg-gradient-to-b from-lime-400 to-fuchsia-500 origin-top" style={{ height: y5 }} />
            <motion.div className="absolute right-[-1px] top-[83.3%] w-[2px] bg-gradient-to-b from-fuchsia-500 to-white origin-top" style={{ height: y6 }} />

            <div className="relative">
              <div className="absolute -right-[37px] top-1 w-3 h-3 bg-[#030305] border-2 border-amber-400 rounded-full z-10 shadow-[0_0_10px_#fbbf24]" />
              <h4 className="text-[10px] font-black tracking-widest text-amber-400 uppercase mb-1">Genesis</h4>
              <p className="text-[9px] text-gray-500 font-mono">Dubai Market Sweep</p>
            </div>
            
            <div className="relative">
              <div className="absolute -right-[37px] top-1 w-3 h-3 bg-[#030305] border-2 border-teal-400 rounded-full z-10 shadow-[0_0_10px_#2dd4bf]" />
              <h4 className="text-[10px] font-black tracking-widest text-teal-400 uppercase mb-1">Mar 18 - 31</h4>
              <p className="text-[9px] text-gray-500 font-mono">The Breadboard</p>
            </div>

            <div className="relative">
              <div className="absolute -right-[37px] top-1 w-3 h-3 bg-[#030305] border-2 border-red-500 rounded-full z-10 shadow-[0_0_10px_#ef4444]" />
              <h4 className="text-[10px] font-black tracking-widest text-red-500 uppercase mb-1">Mar 19 - 25</h4>
              <p className="text-[9px] text-gray-500 font-mono">Baptism by Fire</p>
            </div>

            <div className="relative">
              <div className="absolute -right-[37px] top-1 w-3 h-3 bg-[#030305] border-2 border-blue-400 rounded-full z-10 shadow-[0_0_10px_#60a5fa]" />
              <h4 className="text-[10px] font-black tracking-widest text-blue-400 uppercase mb-1">Apr 01 - 15</h4>
              <p className="text-[9px] text-gray-500 font-mono">Aluminum Pivot</p>
            </div>

            <div className="relative">
              <div className="absolute -right-[37px] top-1 w-3 h-3 bg-[#030305] border-2 border-lime-400 rounded-full z-10 shadow-[0_0_10px_#a3e635]" />
              <h4 className="text-[10px] font-black tracking-widest text-lime-400 uppercase mb-1">Mid-April</h4>
              <p className="text-[9px] text-gray-500 font-mono">High-Torque Shift</p>
            </div>

            <div className="relative">
              <div className="absolute -right-[37px] top-1 w-3 h-3 bg-[#030305] border-2 border-fuchsia-500 rounded-full z-10 shadow-[0_0_15px_#d946ef]" />
              <h4 className="text-[10px] font-black tracking-widest text-fuchsia-400 uppercase mb-1">Late April</h4>
              <p className="text-[9px] text-gray-500 font-mono">Deterministic Logic</p>
            </div>

            <div className="relative">
              <div className="absolute -right-[37px] top-1 w-3 h-3 bg-[#030305] border-2 border-white rounded-full z-10 shadow-[0_0_15px_#ffffff] animate-pulse" />
              <h4 className="text-[10px] font-black tracking-widest text-white uppercase mb-1">The Result</h4>
              <p className="text-[9px] text-gray-500 font-mono">Hardware Demo</p>
            </div>

          </div>
        </div>

        {/* --- MAIN CONTENT (RIGHT COLUMN) --- */}
        <div className="flex-1 flex flex-col gap-24 max-w-4xl w-full">
          
          {/* TITLE SECTION */}
          <div className="mb-4">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6 drop-shadow-lg">
              The Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-fuchsia-500">Crucible.</span>
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              An exhaustive documentation of the physical engineering journey. From the pristine idealism of digital breadboards to the harsh, unforgiving reality of molten iron, thermal failures, and 43-amp current limits.
            </p>
          </div>

          {/* CH 1: GENESIS (GOLD THEME) */}
          <section className="relative">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-amber-500/30 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(245,158,11,0.15)] overflow-hidden group">
              <GenesisCinematic />
              
              <h2 className="text-amber-400 text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-[0_0_10px_#fbbf24]" /> Chapter 1: Genesis
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10">The Gold Standard vs. The Supply Chain Reality.</h3>
              
              <p className="text-gray-300 text-sm leading-relaxed font-light mb-8 relative z-10">
                The journey of the Mynee Smart Exoskeleton began not with soldering irons, but with an extensive market sweep from Dubai. When evaluating actuators, the undeniable gold standard was the <strong>CubeMars AK80</strong>. With its highly integrated planetary gearsets and immense peak torque, it represented the absolute pinnacle of wearable robotics. 
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                <div className="bg-black/60 border border-amber-500/40 p-6 rounded-3xl relative shadow-[0_0_30px_rgba(245,158,11,0.15)] backdrop-blur-md">
                  <div className="absolute top-2 right-4 text-amber-500/20 text-6xl font-black italic">1</div>
                  <h4 className="text-amber-400 font-bold mb-2 uppercase tracking-widest text-xs">The Ideal: AK80</h4>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">The ultimate benchmark. However, at hundreds of dollars per unit, it completely violated the core philosophy of this project: <em>radical affordability and socioeconomic accessibility</em>.</p>
                </div>
                <div className="bg-black/60 border border-white/10 p-6 rounded-3xl relative backdrop-blur-md">
                  <div className="absolute top-2 right-4 text-white/5 text-6xl font-black italic">2</div>
                  <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">The Reality: PG36-555</h4>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">A cost-effective DC gear motor alternative. Yet, severe geopolitical supply chain disruptions in Dubai meant it simply could not be procured locally.</p>
                </div>
              </div>

              <div className="bg-amber-950/40 border-l-4 border-amber-500 p-6 rounded-r-3xl relative z-10 shadow-inner backdrop-blur-md">
                <p className="text-amber-200/90 text-sm italic font-medium leading-relaxed">
                  The project required a drastic pivot. On March 18th, 2026, the operation moved to Pakistan. I put boots on the ground, navigating the dense electronics hubs of College Road and Gowalmandi to physically source viable alternatives.
                </p>
              </div>
            </div>
          </section>

          {/* CH 2: BREADBOARD CRUCIBLE (TEAL THEME) */}
          <section className="relative">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-teal-500/30 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(20,184,166,0.15)] overflow-hidden group">
              <BreadboardCinematic />
              
              <h2 className="text-teal-400 text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10 drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]" /> Chapter 2: March 18 – 31
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10">The Breadboard Crucible.</h3>
              
              <p className="text-gray-300 text-sm leading-relaxed font-light mb-8 relative z-10">
                With components secured, the first phase was building an unhoused proof-of-concept. This breadboard circuit was strictly engineered to validate the Python architecture and ensure safe component telemetry before mechanical load was introduced. A substitute high-RPM 12V DC motor was used solely to verify the logic.
              </p>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="bg-black/60 border border-teal-500/20 p-5 rounded-2xl flex items-start gap-4 hover:bg-teal-950/40 transition-colors shadow-inner backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">The Brain (Pi Zero) & Signal Integrity</h4>
                    <p className="text-gray-400 text-[11px] font-mono leading-relaxed">
                      Mounted to a common ground via GPIO Pin 6. The <span className="text-teal-300">FSR</span> prongs were slotted into rows 10 & 11, routed to GPIO 1 & 11. To prevent "phantom" heel strikes from ambient floating voltages, a <span className="text-teal-300">10kΩ pull-down resistor</span> forced the signal to absolute zero (LOW) until physical pressure was applied.
                    </p>
                  </div>
                </div>

                <div className="bg-black/60 border border-teal-500/20 p-5 rounded-2xl flex items-start gap-4 hover:bg-teal-950/40 transition-colors shadow-inner backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Spatial Kinematics (MPU6050)</h4>
                    <p className="text-gray-400 text-[11px] font-mono leading-relaxed">
                      Relies on the I2C protocol. Using male-to-female routing, the SCL (clock), SDA (data), and VCC (power) were tied to <span className="text-blue-300">GPIO Pins 5, 3, and 17</span> respectively, ensuring a high-speed digital handshake.
                    </p>
                  </div>
                </div>

                <div className="bg-black/60 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4 hover:bg-red-950/40 transition-colors shadow-inner backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">The Muscle & Safety Architecture</h4>
                    <p className="text-gray-400 text-[11px] font-mono leading-relaxed">
                      The L298N ENA, IN1, and IN2 were routed to GPIO 18, 22, and 23. To prevent motor current draw from browning out the Pi, <span className="text-red-300 font-bold">dual-power isolation</span> was used. Crucially, the 12V live line was interrupted by an <span className="text-red-300 font-bold">inline fuse and hard-stop killswitch</span> before hitting the driver.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-teal-500/30 pt-6 flex items-center justify-center text-center relative z-10">
                <p className="text-teal-300 font-bold tracking-wide uppercase text-xs drop-shadow-md">
                  Outcome: Logic Validated. The FSM successfully commanded precise PWM delivery.
                </p>
              </div>
            </div>
          </section>

          {/* CH 3: BAPTISM BY FIRE (RED/ORANGE THEME) */}
          <section className="relative">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-red-500/40 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(239,68,68,0.2)] overflow-hidden group">
              <FireCinematic />

              <h2 className="text-red-400 text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_#ef4444]" /> Chapter 3: March 19 – 25
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">Baptism by Fire.</h3>
              
              <p className="text-gray-200 text-sm leading-relaxed font-medium mb-6 relative z-10">
                With the breadboard functional, the project demanded a transition into physical metal. A heavy-duty iron brace was fabricated to house the motor and align with the human knee pivot. However, the reality of physical manufacturing introduced a devastating variable: thermal transfer.
              </p>
              <p className="text-gray-300 text-sm leading-relaxed font-light mb-8 relative z-10">
                During the welding process, the second-hand high-RPM motor was inadvertently exposed to intense, direct heat. The structural integrity was compromised; the internal magnetic components warped, and the gear assembly fell apart. <span className="text-yellow-400 font-black drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] px-1 bg-red-900/40 rounded">While I walked away with minor burns on my hand from handling the molten assembly</span>, the motor completely seized and failed to lift the iron rod.
              </p>
            </div>
          </section>

          {/* CH 4: ALUMINUM PIVOT (BLUE THEME) */}
          <section className="relative">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-blue-500/30 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(59,130,246,0.15)] overflow-hidden group">
              <AluminumCinematic />

              <h2 className="text-blue-400 text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-[0_0_10px_#60a5fa]" /> Chapter 4: April 1 – 15
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10">The Aluminum Pivot & The Gravity Problem.</h3>
              
              <p className="text-gray-300 text-sm leading-relaxed font-light mb-6 relative z-10">
                The destruction of the first motor forced another pivot. With ideal replacements unavailable, a slightly lower-RPM DC gear motor (used in pedestal fans) was sourced. Because it was weaker, the heavy iron frame was entirely scrapped for a lightweight, hollow aluminum rod.
              </p>
              
              <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-6 mb-6 shadow-inner relative z-10 backdrop-blur-md">
                <p className="text-gray-300 text-xs leading-relaxed font-mono">
                  The second framework was fabricated with extreme caution. The aluminum brace, featuring a custom flange coupling and U-bracket, was welded with strict thermal isolation protocols. Once assembled, the second prototype proved the intelligence of the system: the motor definitively responded <em>only</em> when the MPU6050 crossed the programmed angle and the FSR registered a load.
                </p>
              </div>

              <div className="bg-black/60 border-l-4 border-blue-500 p-6 rounded-r-2xl relative z-10 shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-md">
                <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">The Mechanical Limitation</h4>
                <p className="text-gray-300 text-xs font-light leading-relaxed">
                  The fan motor could successfully spin the rod only when laid flat, parallel to the ground. When stood upright, fighting the perpendicular force of gravity, it could only manage a slight jerk. It was physically incapable of lifting a 3kg aluminum tube, let alone a human being. The control logic was perfect, but the mechanical objective failed.
                </p>
              </div>
            </div>
          </section>

          {/* CH 5: THE WORM GEAR (GREEN/INDUSTRIAL THEME) */}
          <section className="relative">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(163,230,53,0.1)] overflow-hidden group">
              <TorqueCinematic />

              <h2 className="text-lime-400 text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10 drop-shadow-[0_0_8px_rgba(163,230,53,0.8)]">
                <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_10px_#a3e635]" /> Chapter 5: Mid-April
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]">The High-Torque Shift.</h3>
              
              <p className="text-gray-200 text-sm leading-relaxed font-light mb-8 relative z-10 max-w-2xl">
                To achieve the ultimate goal—assisting a human in a sit-to-stand motion—the entire actuation strategy had to be re-evaluated. Between April 15th and 27th, heavy alternatives like RC car and wheelchair motors were considered, but their sheer bulk defeated the wearable orthosis concept. The breakthrough was a <strong>Sliding Gate 12V DC Worm Gear Motor</strong> (used in car windows). It was cheap, sleek, and delivered immense lifting torque.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="bg-black/60 border border-lime-500/40 p-6 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4 border-b border-lime-500/20 pb-3">
                    <h4 className="text-lime-400 text-[10px] font-black uppercase tracking-widest">The Current Upgrade</h4>
                    <span className="text-red-400 font-mono text-[10px] font-bold bg-red-500/10 px-2 py-1 rounded border border-red-500/30">2A ➔ 43A</span>
                  </div>
                  <p className="text-gray-300 text-[11px] font-mono leading-relaxed">
                    The L298N was biologically incompatible. A worm gear under stall load pulls high amperage; anything over 3 amps would instantly vaporize the L298N. The architecture was overhauled to the industrial-grade <strong>IBT-2 (BTS7960)</strong> driver, capable of handling 43A.
                  </p>
                </div>
                
                <div className="bg-black/60 border border-lime-500/40 p-6 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4 border-b border-lime-500/20 pb-3">
                    <h4 className="text-lime-400 text-[10px] font-black uppercase tracking-widest">The Mechanical Lock</h4>
                    <span className="text-orange-400 font-mono text-[10px] font-bold bg-orange-500/10 px-2 py-1 rounded border border-orange-500/30">NON-BACKDRIVABLE</span>
                  </div>
                  <p className="text-gray-300 text-[11px] font-mono leading-relaxed">
                    Worm gears cannot be backdriven. The motor could lift a patient, but could never freely swing to allow for a natural walking gait. The exoskeleton evolved from a dynamic walking aid into a highly specialized, high-torque sit-to-stand assistive device.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CH 6: DETERMINISTIC LOGIC (FUCHSIA THEME) */}
          <section className="relative">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border-t-4 border-fuchsia-500 rounded-[40px] p-8 md:p-12 shadow-[0_30px_80px_rgba(217,70,239,0.2)] overflow-hidden group">
              <LogicCinematic />

              <h2 className="text-fuchsia-400 text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]">
                <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse shadow-[0_0_15px_#d946ef]" /> Chapter 6: Late April
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">Engineering Deterministic Logic.</h3>
              
              <p className="text-gray-200 text-sm leading-relaxed font-light mb-8 relative z-10 max-w-2xl">
                The non-backdrivable nature of the worm gear created a massive software paradox. If a user stands up (Angle &gt; 180°), the motor cuts power. But because the gear cannot be forced backward, the user is physically locked standing up. To solve this elegantly without a simple "push-button" remote, a brilliantly complex, deterministic three-state Finite State Machine was coded.
              </p>

              {/* FSM VISUALIZATION */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-4 bg-black/60 p-8 rounded-3xl border border-fuchsia-500/20 shadow-2xl backdrop-blur-md">
                
                {/* STATE 1 */}
                <div className="bg-fuchsia-950/40 border border-fuchsia-500/50 p-4 rounded-xl text-center w-48 shadow-[0_0_20px_rgba(217,70,239,0.2)] relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-fuchsia-500 rounded-full animate-pulse" />
                  <h4 className="text-white text-xs font-black uppercase tracking-widest mb-2">State 1: The Lift</h4>
                  <p className="text-fuchsia-200 text-[9px] font-mono leading-relaxed">FSR == HIGH<br/>MPU == 88° to 180°<br/>Motor Drives Forward</p>
                </div>

                {/* ARROW */}
                <div className="hidden md:flex flex-col items-center">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">Angle &gt; 180°</span>
                  <svg className="w-6 h-6 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>

                {/* STATE 2 */}
                <div className="bg-gray-900 border border-white/20 p-4 rounded-xl text-center w-48 shadow-inner">
                  <h4 className="text-white text-xs font-black uppercase tracking-widest mb-2">State 2: The Lock</h4>
                  <p className="text-gray-400 text-[9px] font-mono leading-relaxed">MPU == 181°<br/>Power Cut.<br/>Worm Friction Holds</p>
                </div>

                {/* ARROW */}
                <div className="hidden md:flex flex-col items-center">
                  <span className="text-[8px] text-gray-400 uppercase tracking-widest mb-1">FSR == LOW</span>
                  <svg className="w-6 h-6 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>

                {/* STATE 3 */}
                <div className="bg-fuchsia-950/40 border border-fuchsia-500/50 p-4 rounded-xl text-center w-48 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                  <h4 className="text-white text-xs font-black uppercase tracking-widest mb-2">State 3: Latched Descent</h4>
                  <p className="text-fuchsia-200 text-[9px] font-mono leading-relaxed">Motor Reverses<br/><span className="text-white font-bold">Ignores FSR Bounce</span><br/>Until MPU == 90°</p>
                </div>
              </div>

              <p className="text-gray-300 text-xs mt-8 font-light italic text-center relative z-10 px-4">
                The inescapable "latched" loop guarantees that once the sitting motion is triggered by lifting the foot (FSR Low), the system drives the leg downward to a safe 90° seated position, completely ignoring any subsequent erratic FSR spikes mid-descent.
              </p>
            </div>
          </section>

          {/* FINAL DEMO (VIDEO SECTION) */}
          <section className="relative">
            <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border-t-4 border-white rounded-[40px] p-8 md:p-12 shadow-[0_30px_80px_rgba(255,255,255,0.1)] overflow-hidden group">
              <FinalCinematic />

              <h2 className="text-white text-sm font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_15px_#ffffff]" /> The Final Result
              </h2>
              <h3 className="text-3xl font-bold text-white mb-6 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Hardware Demonstration.</h3>

              <p className="text-gray-300 text-sm leading-relaxed font-light mb-8 relative z-10">
                After navigating the crucible of supply chain failures, thermal destruction, and amperage limits, the final exoskeleton architecture was successfully assembled. Here is the physical demonstration of the system executing the deterministic logic in real-time.
              </p>

              {/* Responsive YouTube Embed Wrapper */}
              <div className="relative z-10 w-full aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] transition-shadow duration-500 bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/5EpfVZZaEpE"
                  title="Mynee Smart Knee Exoskeleton Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-[#020202] border-t border-white/5 pt-20 pb-10 mt-auto overflow-hidden">
        <div className="relative z-10 max-w-[90rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 xl:px-8">
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-teal-400 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                <li><Link href="/devlog" className="hover:text-teal-400 transition-colors">Dev Log</Link></li>
                <li><Link href="/documents" className="hover:text-teal-400 transition-colors">Documents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Hardware Architecture</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Deterministic Logic</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="https://github.com/arzanishshumak0395" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-400 transition-colors">GitHub ↗</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono tracking-widest uppercase xl:px-8">
            <p>© 2026 MYNEE | Syed Arzanish - Capstone Project.</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}