"use client";

import Sidebar from "../Sidebar"; 
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// ==========================================
// REUSABLE UI BLOCKS & BACKGROUND
// ==========================================
const DataGridBackground = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles([...Array(40)].map(() => ({
      tx: `${Math.random() * 40 - 20}px`, dur: `${8 + Math.random() * 12}s`, del: `${Math.random() * 2}s`, size: `${1 + Math.random() * 2}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, color: Math.random() > 0.5 ? 'bg-teal-400' : 'bg-yellow-500'
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      <style>{`
        @keyframes scrollGrid { 0% { transform: translateY(0) rotateX(45deg); } 100% { transform: translateY(60px) rotateX(45deg); } }
        @keyframes floatData { 0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.1; } 50% { transform: translate(var(--tx), -100px) scale(1.5); opacity: 0.7; } }
        @keyframes spinGear { 100% { transform: rotate(360deg); } }
        @keyframes spinGearReverse { 100% { transform: rotate(-360deg); } }
      `}</style>
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [transform-origin:center_top]" style={{ animation: 'scrollGrid 15s linear infinite' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-teal-900/10 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-900/10 blur-[150px] rounded-full mix-blend-screen" />
      {particles.map((p, i) => (
        <div key={i} className={`absolute ${p.color} rounded-full shadow-[0_0_10px_currentColor] will-change-transform`} style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatData ${p.dur} infinite ease-in-out ${p.del}` }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)]" />
    </div>
  );
};

// --- NEW BLOCK: Interactive Motor Selection Simulator ---
const InteractiveMotorSimulator = () => {
  const [baseRpm, setBaseRpm] = useState(8000);
  const [gearRatio, setGearRatio] = useState(20);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Simplified Physics Math for Visualization
  const outputRpm = baseRpm / gearRatio;
  const outputTorque = gearRatio * (baseRpm * 0.00015); // Proxy multiplier for visual Nm

  // Logic Thresholds
  const isTorqueFail = outputTorque < 20;
  const isSpeedFail = outputRpm < 30;

  let statusState = "OPTIMAL SYSTEM BALANCE";
  let statusColor = "text-emerald-400";
  let glowColor = "shadow-[0_0_40px_rgba(16,185,129,0.3)] border-emerald-500/50";
  let barColor = "bg-emerald-500";

  if (isTorqueFail) {
    statusState = "FAILED: INSUFFICIENT LIFTING TORQUE";
    statusColor = "text-red-500";
    glowColor = "shadow-[0_0_40px_rgba(239,68,68,0.3)] border-red-500/50";
    barColor = "bg-red-500";
  } else if (isSpeedFail) {
    statusState = "FAILED: TOO SLOW FOR HUMAN GAIT";
    statusColor = "text-yellow-500";
    glowColor = "shadow-[0_0_40px_rgba(250,204,21,0.3)] border-yellow-500/50";
    barColor = "bg-yellow-500";
  }

  // Calculate dynamic animation speeds based on RPM
  // Cap speeds so the animation doesn't break the browser
  const gear1Speed = Math.max(0.1, 600 / baseRpm); 
  const gear2Speed = Math.max(0.5, 60 / outputRpm);

  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden group/board">
      {/* Live Demo Banner */}
      <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 text-black py-1.5 px-4 flex items-center justify-center gap-3 z-20">
         <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Interactive Diagnostic • Electromechanical Actuator</span>
         <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mt-8 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">The High-RPM Compromise</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Due to severe geopolitical supply chain disruptions, sourcing the highly specific 70-100 RPM high-torque DC motor locally in Dubai proved impossible. To prevent stalling the project timeline, a substitute motor with a vastly higher Base RPM but a lower planetary gear ratio was acquired.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-0">
            <strong>The Outcome:</strong> As demonstrated in the simulator below, this high-RPM substitute lacked the torque capacity to physically lift an individual, rendering it biomechanically useless. However, it was vital for validating that the Software FSM correctly signaled the hardware.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col justify-center shadow-inner relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-10" style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
          <h4 className="text-gray-300 font-bold text-sm uppercase tracking-widest mb-4 relative z-10 text-center">Simulate The Hardware Limitation</h4>
          <p className="text-gray-500 text-xs font-mono leading-relaxed text-center relative z-10">
            Slide the Base RPM higher and drop the Gear Ratio below 1:30 to trigger the exact torque failure experienced during the physical load tests.
          </p>
        </div>
      </div>

      {/* Simulator Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 border-t border-white/5 pt-8">
        
        {/* Left: Inputs */}
        <div className="space-y-8 flex flex-col justify-center">
          <h4 className="text-gray-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 mb-2">
            Actuator Input Parameters
            {!hasInteracted && <span className="ml-2 px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-full animate-pulse">Interact ↓</span>}
          </h4>
          
          <div className={`bg-white/5 border p-6 rounded-2xl transition-all duration-500 relative ${!hasInteracted ? 'border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'border-white/5'}`}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300 text-xs font-bold">Motor Base RPM</span>
              <span className="text-sky-400 text-[10px] font-mono font-bold bg-sky-500/10 px-2 py-1 rounded border border-sky-500/30">
                {baseRpm} RPM
              </span>
            </div>
            <input 
              type="range" min="1000" max="15000" step="500" value={baseRpm} 
              onChange={(e) => { setBaseRpm(parseFloat(e.target.value)); setHasInteracted(true); }}
              className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-sky-500 transition-all"
            />
          </div>

          <div className={`bg-white/5 border p-6 rounded-2xl transition-all duration-500 relative ${!hasInteracted ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-white/5'}`}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300 text-xs font-bold">Planetary Gear Ratio</span>
              <span className="text-emerald-400 text-[10px] font-mono font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                1 : {gearRatio}
              </span>
            </div>
            <input 
              type="range" min="10" max="150" step="5" value={gearRatio} 
              onChange={(e) => { setGearRatio(parseFloat(e.target.value)); setHasInteracted(true); }}
              className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Center: Animated Gear SVG */}
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-inner flex flex-col items-center justify-center p-6 relative overflow-hidden h-[350px]">
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(#4b5563 1px, transparent 1px), linear-gradient(90deg, #4b5563 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
           
           <div className="relative w-full h-full flex items-center justify-center z-10">
             {/* Small Input Pinion (Base RPM) */}
             <div className="absolute left-1/4">
               <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" style={{ animation: `spinGear ${gear1Speed}s linear infinite` }}>
                 <path d="M50,10 L55,20 A30,30 0 0,1 80,45 L90,50 L80,55 A30,30 0 0,1 55,80 L50,90 L45,80 A30,30 0 0,1 20,55 L10,50 L20,45 A30,30 0 0,1 45,20 Z" fill="#38bdf8" />
                 <circle cx="50" cy="50" r="10" fill="#0f172a" />
               </svg>
               <p className="text-sky-400 text-[8px] font-mono text-center mt-2 uppercase">Input Shaft</p>
             </div>

             {/* Large Output Gear (Final RPM / High Torque) */}
             <div className="absolute right-1/4">
               <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" style={{ animation: `spinGearReverse ${gear2Speed}s linear infinite` }}>
                 <path d="M50,5 L53,15 A40,40 0 0,1 68,20 L75,12 L80,18 L72,25 A40,40 0 0,1 85,47 L95,50 L95,55 L85,53 A40,40 0 0,1 72,75 L80,82 L75,88 L68,80 A40,40 0 0,1 53,85 L50,95 L45,95 L47,85 A40,40 0 0,1 32,80 L25,88 L20,82 L28,75 A40,40 0 0,1 15,53 L5,55 L5,50 L15,47 A40,40 0 0,1 28,25 L20,18 L25,12 L32,20 A40,40 0 0,1 47,15 L45,5 Z" fill="#10b981" />
                 <circle cx="50" cy="50" r="15" fill="#064e3b" />
                 <circle cx="50" cy="30" r="4" fill="#022c22" />
                 <circle cx="50" cy="70" r="4" fill="#022c22" />
                 <circle cx="30" cy="50" r="4" fill="#022c22" />
                 <circle cx="70" cy="50" r="4" fill="#022c22" />
               </svg>
               <p className="text-emerald-400 text-[8px] font-mono text-center mt-2 uppercase">Output Shaft</p>
             </div>
           </div>
        </div>

        {/* Right: Output Physics */}
        <div className="flex flex-col justify-center">
          <div className={`bg-[#0a0a0a] border p-8 rounded-3xl flex flex-col justify-center transition-all duration-500 h-full relative ${glowColor}`}>
            
            <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-6 text-center">Output Mechanical Reality</p>
            
            <div className="space-y-6 w-full">
              {/* Output RPM Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Final Spindle RPM</span>
                  <span className="text-white font-mono font-bold text-sm">{outputRpm.toFixed(1)}</span>
                </div>
                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${Math.min(100, (outputRpm / 150) * 100)}%` }} />
                </div>
              </div>

              {/* Output Torque Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Estimated Torque (Nm)</span>
                  <span className="text-white font-mono font-bold text-sm">{outputTorque.toFixed(1)}</span>
                </div>
                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden relative">
                  <div className="absolute left-[25%] top-0 h-full w-0.5 bg-red-500/50 z-10" /> {/* 20Nm Target Line */}
                  <div className={`h-full transition-all duration-300 ${barColor}`} style={{ width: `${Math.min(100, (outputTorque / 80) * 100)}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <h2 className={`text-[11px] md:text-xs font-black tracking-widest uppercase transition-colors duration-300 ${statusColor}`}>
                {statusState}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- BLOCK 2: Animated Latency Breakdown Visual ---
const LatencyAnalysisBoard = () => {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/5 pb-6">
        <div>
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
            <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]" /> Empirical Data (Table 5.1)
          </h3>
          <h2 className="text-2xl font-bold text-white">System Latency Breakdown</h2>
        </div>
        <div className="bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-xl mt-4 md:mt-0 flex flex-col items-end">
           <span className="text-gray-400 text-[10px] uppercase font-mono tracking-widest">Total Mean Latency</span>
           <span className="text-sky-400 font-bold font-mono text-lg">13.1 ms</span>
        </div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-8">
        The standard human neuromuscular reaction time ranges from 150 to 300 milliseconds. To ensure the mechanical assistance feels instantaneous, our non-functional requirement demanded a latency of &lt;20 ms. The breakdown of our 13.1 ms execution time proves the efficacy of edge-computed FSMs:
      </p>

      {/* Latency Stacked Bar */}
      <div className="relative w-full h-12 bg-gray-900 rounded-full overflow-hidden border border-white/10 flex mb-6">
        <motion.div initial={{ width: "0%" }} whileInView={{ width: "34%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-teal-500 flex items-center justify-center border-r border-black/50">
          <span className="text-black font-bold text-xs font-mono hidden md:block">I2C: 6.8ms</span>
        </motion.div>
        <motion.div initial={{ width: "0%" }} whileInView={{ width: "21%" }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="h-full bg-emerald-500 flex items-center justify-center border-r border-black/50">
          <span className="text-black font-bold text-xs font-mono hidden md:block">GPIO: 4.2ms</span>
        </motion.div>
        <motion.div initial={{ width: "0%" }} whileInView={{ width: "10.5%" }} transition={{ duration: 1, ease: "easeOut", delay: 0.4 }} className="h-full bg-yellow-400 flex items-center justify-center">
          <span className="text-black font-bold text-[10px] font-mono hidden md:block">FSM: 2.1ms</span>
        </motion.div>
        {/* 20ms Threshold Marker */}
        <div className="absolute top-0 left-[100%] w-0.5 h-full bg-red-500 z-10" />
      </div>

      <div className="flex flex-wrap justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-teal-500 rounded-sm" /> I2C Bus Read (MPU6050)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm" /> GPIO Polling (FSRs)</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-sm" /> FSM Logic Eval</div>
        <div className="flex items-center gap-2 text-red-400"><div className="w-0.5 h-3 bg-red-500" /> 20ms Failure Threshold</div>
      </div>
    </div>
  );
};

// --- BLOCK 3: Animated Kinematic Graph ---
const KinematicGraphBoard = () => {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[80px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/5 pb-6">
        <div>
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]" /> Empirical Data (Table 5.2)
          </h3>
          <h2 className="text-2xl font-bold text-white">Kinematic Angle Tracking</h2>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl mt-4 md:mt-0 flex flex-col items-end">
           <span className="text-gray-500 text-[10px] uppercase font-mono tracking-widest">Mean Absolute Error (MAE)</span>
           <span className="text-teal-400 font-bold font-mono">1.34° (Pass)</span>
        </div>
      </div>

      <div className="relative w-full h-64 bg-black/50 border-l border-b border-white/20 px-2 pb-2">
        <div className="absolute -left-8 top-0 text-[10px] font-mono text-gray-600">90°</div>
        <div className="absolute -left-8 top-1/3 text-[10px] font-mono text-gray-600">60°</div>
        <div className="absolute -left-8 top-2/3 text-[10px] font-mono text-gray-600">30°</div>
        <div className="absolute -left-6 bottom-0 text-[10px] font-mono text-gray-600">0°</div>
        <div className="absolute left-0 -bottom-6 text-[10px] font-mono text-gray-600">Start (0s)</div>
        <div className="absolute right-0 -bottom-6 text-[10px] font-mono text-gray-600">End Sweep (3s)</div>

        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 0 250 C 100 250, 200 10, 300 10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
            d="M 0 250 C 100 245, 200 8, 300 5" fill="none" stroke="#2dd4bf" strokeWidth="4" vectorEffect="non-scaling-stroke" 
            style={{ filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.5))' }} />
        </svg>

        <div className="absolute bottom-4 right-4 bg-black/80 border border-white/10 p-3 rounded-lg flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-white/50 border-t border-dashed border-white" />
            <span className="text-[9px] font-mono text-gray-400">Mechanical Goniometer (True)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-teal-400 rounded-full" />
            <span className="text-[9px] font-mono text-gray-400">MPU6050 Filtered (Calculated)</span>
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-xs font-light leading-relaxed mt-10 text-center px-8">
        Figure 10.1 - The Complementary Filter successfully mitigates raw accelerometer noise, tracking physical sweeping motion from full extension (0.0°) to complete sit-to-stand flexion (90.0°) with a minimal 1.34° deviation margin.
      </p>
    </div>
  );
};

// --- BLOCK 4: Market Comparison UI (Table 5.3) ---
const MarketComparisonBoard = () => (
  <div className="mb-16">
    <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" /> Economic Feasibility & Market Capability
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-8">
      The primary objective of Mynee was to bridge the massive socioeconomic gap in wearable robotics. I benchmarked our final prototype against both premium clinical orthoses and affordable recreational exosuits (Table 5.3).
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Ottobock */}
      <div className="bg-black/60 border border-white/10 p-6 rounded-3xl opacity-60 hover:opacity-100 transition-opacity">
        <h4 className="text-white font-bold mb-1">Ottobock C-Brace</h4>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-6">Clinical Rehabilitation</p>
        <div className="text-3xl font-black font-mono text-gray-300 mb-6 border-b border-white/10 pb-4">~$70,000+</div>
        <ul className="space-y-3 text-xs text-gray-400 font-mono">
          <li>Logic: <span className="text-gray-200">Proprietary ASIC</span></li>
          <li>Customizability: <span className="text-red-400">Manufacturer Only</span></li>
          <li>Latency: <span className="text-emerald-400">&lt; 10 ms</span></li>
        </ul>
      </div>

      {/* Dnsys */}
      <div className="bg-black/60 border border-white/10 p-6 rounded-3xl opacity-60 hover:opacity-100 transition-opacity">
        <h4 className="text-white font-bold mb-1">Dnsys Z1 Exosuit</h4>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-6">Recreational / Athletic</p>
        <div className="text-3xl font-black font-mono text-gray-300 mb-6 border-b border-white/10 pb-4">~$700.00</div>
        <ul className="space-y-3 text-xs text-gray-400 font-mono">
          <li>Logic: <span className="text-gray-200">Pre-Set Rigid Profile</span></li>
          <li>Customizability: <span className="text-red-400">None</span></li>
          <li>Latency: <span className="text-gray-500">Unknown</span></li>
        </ul>
      </div>

      {/* Mynee */}
      <div className="bg-emerald-900/20 border border-emerald-500/50 p-6 rounded-3xl shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-[40px] pointer-events-none" />
        <h4 className="text-white font-bold mb-1 relative z-10">Mynee Prototype</h4>
        <p className="text-emerald-400 text-[10px] uppercase tracking-widest mb-6 relative z-10">Frugal Edge-AI Rehab</p>
        <div className="text-3xl font-black font-mono text-emerald-400 mb-6 border-b border-emerald-500/20 pb-4 relative z-10">$85.00 <span className="text-xs text-emerald-500 uppercase">(BOM)</span></div>
        <ul className="space-y-3 text-xs text-gray-300 font-mono relative z-10">
          <li>Logic: <span className="text-white font-bold">Open Python FSM</span></li>
          <li>Customizability: <span className="text-emerald-400 font-bold">High (Programmable)</span></li>
          <li>Latency: <span className="text-emerald-400 font-bold">13.1 ms</span></li>
        </ul>
      </div>
    </div>
  </div>
);

// --- NEW BLOCK: The "Full Journey" Project Lifecycle Board ---
const LifecycleBoard = () => {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
      <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-10 text-center">Project Lifecycle Review</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        {/* Phase 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center font-black mb-4 border border-white/10 z-10">1</div>
          <h4 className="text-white font-bold text-sm mb-2">Planning & Research</h4>
          <p className="text-gray-500 text-[10px] font-mono leading-relaxed">Identified the socioeconomic gap in wearable tech. Conducted literature reviews on QDD actuators and FSM logic.</p>
        </div>
        
        {/* Phase 2 */}
        <div className="flex flex-col items-center text-center relative">
          <div className="hidden md:block absolute top-5 -left-[50%] w-full h-0.5 bg-gray-800 z-0" />
          <div className="w-10 h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center font-black mb-4 border border-white/10 z-10">2</div>
          <h4 className="text-white font-bold text-sm mb-2">System Design</h4>
          <p className="text-gray-500 text-[10px] font-mono leading-relaxed">Drafted the White Box data architecture, selected the Agile-Waterfall hybrid methodology, and mapped the UML FSM logic.</p>
        </div>
        
        {/* Phase 3 */}
        <div className="flex flex-col items-center text-center relative">
          <div className="hidden md:block absolute top-5 -left-[50%] w-full h-0.5 bg-gray-800 z-0" />
          <div className="w-10 h-10 rounded-full bg-gray-800 text-gray-400 flex items-center justify-center font-black mb-4 border border-white/10 z-10">3</div>
          <h4 className="text-white font-bold text-sm mb-2">Implementation</h4>
          <p className="text-gray-500 text-[10px] font-mono leading-relaxed">Fabricated the iron frame, procured motors internationally, and integrated the Pi Zero with the IBT-2 dual power topology.</p>
        </div>

        {/* Phase 4 */}
        <div className="flex flex-col items-center text-center relative">
          <div className="hidden md:block absolute top-5 -left-[50%] w-full h-0.5 bg-emerald-500/30 z-0" />
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black mb-4 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] z-10">4</div>
          <h4 className="text-emerald-400 font-bold text-sm mb-2">Evaluation</h4>
          <p className="text-gray-400 text-[10px] font-mono leading-relaxed">Stress-tested the logic under load. Validated the 13.1ms latency and verified economic viability at $85.00.</p>
        </div>
      </div>
    </div>
  );
};


const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week10Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={10} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 4</span>
                <span className="text-gray-500 text-xs font-mono">8 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 10: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">Results & Empirical Analysis.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Engineering is a discipline of proof. Building a functional smart exoskeleton is an achievement, but validating its performance against established biomechanical baselines is what transitions this project into a true medical technology study.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <p>This week, I executed the rigorous bench-test scenarios established in Week 9. The objective was to generate the empirical data necessary to draft Chapter 5 of my dissertation, focusing on system effectiveness, hard engineering limitations, and market viability.</p>

              <h2 className="text-3xl text-white mt-12 mb-8">Resolving the Final Hardware Constraint</h2>
              <InteractiveMotorSimulator />

              <h2 className="text-3xl text-white mt-16 mb-8">Performance Analysis: System Latency</h2>
              <LatencyAnalysisBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">Performance Analysis: Sensor Fusion</h2>
              <p>Typical clinical gait analysis accepts a margin of error between ±2.0° to ±5.0°. To evaluate our software, we benchmarked the MPU6050 against a physical goniometer across a standard 0° to 90° sit-to-stand sweep.</p>
              
              <KinematicGraphBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">Economic Feasibility (Bridging the Gap)</h2>
              <p>The results decisively prove that the prohibitive costs of current medical orthoses are a product of proprietary, closed-loop business models rather than strict engineering necessities. Mynee successfully replicates the threshold-based reactive control of a $70,000 clinical device using an $85 hardware stack and open-source Python logic.</p>

              <MarketComparisonBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">Project Lifecycle Review</h2>
              <p>Looking back, the development of the Mynee exoskeleton followed a strict, methodical pipeline. Transitioning from abstract conceptualization into a functioning cyber-physical system required relentless debugging and testing.</p>

              <LifecycleBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Overall Project Reflection</h2>
              <p>Reviewing the full lifecycle of this project—from the initial Planning and Design phases to the ultimate Implementation and Evaluation—has been incredibly rewarding.</p>
              <p>This project taught me that building a robotic system is not just about writing code; it is about managing power topologies, overcoming intense supply chain failures, routing sensor noise through Kalman filters, and constantly validating against physical realities.</p>
              <p>Next week (Week 11), we enter the final phase: compiling the final dissertation, assembling the appendices, and preparing the final presentation slides for the defense.</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-9">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 9
                </button>
              </Link>
              <Link href="/devlog/week-11">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 11 <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </Link>
            </div>

          </motion.div>
        </article>
      </div>

      {/* MEGA FOOTER */}
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
                <li><Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link></li>
                <li><Link href="/devlog" className="hover:text-teal-400 transition-colors">Dev Log</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Results Analysis</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">System Limitations</span></li>
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