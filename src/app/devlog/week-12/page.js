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
        @keyframes twinkleDark { 0%, 100% { opacity: 0.1; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }
        @keyframes twinkleStar { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
        
        /* Card Animations */
        @keyframes riseEmber { 0% { transform: translateY(100px) scale(0.5); opacity: 0; } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { transform: translateY(-100px) scale(1.2); opacity: 0; } }
        @keyframes scannerSweep { 0% { top: -10%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 110%; opacity: 0; } }
        @keyframes petalFall { 0% { transform: translateY(-50px) rotate3d(1, 1, 1, 0deg); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(350px) rotate3d(1, 1, 1, 360deg); opacity: 0; } }
        @keyframes petalSway { 0%, 100% { transform: translateX(-15px); } 50% { transform: translateX(15px); } }
        @keyframes circuitDraw { 0% { stroke-dashoffset: 150; opacity: 0; } 10% { opacity: 1; } 80% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
        @keyframes nodePulse { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 0.8; transform: scale(1.1); } }
        
        /* Day/Night Cycle Animations */
        @keyframes skyCycle { 
          0%, 100% { background: #020617; } /* Night */
          20% { background: #1e1b4b; } /* Dawn */
          30% { background: #ea580c; } /* Sunrise */
          40%, 60% { background: #0284c7; } /* Bright Day */
          70% { background: #db2777; } /* Sunset */
          80% { background: #1e1b4b; } /* Dusk */
        }
        @keyframes celestialSpin { 0% { transform: translateX(-50%) translateY(-50%) rotate(0deg); } 100% { transform: translateX(-50%) translateY(-50%) rotate(360deg); } }
        @keyframes flyRight { 0% { transform: translateX(-10vw) translateY(20px) scale(0.5); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100vw) translateY(-40px) scale(1); opacity: 0; } }
        @keyframes dayFade { 0%, 25%, 75%, 100% { opacity: 0; } 40%, 60% { opacity: 1; } }
        @keyframes nightFade { 0%, 20%, 80%, 100% { opacity: 1; } 35%, 65% { opacity: 0; } }
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

// --- THE HARDWARE CRUCIBLE (UPDATED WITH FAMILY) ---
const HardwareCrucibleBoard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border-t-2 border-t-orange-500/50 border-white/5 p-8 md:p-10 rounded-[30px] shadow-[0_15px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-t-orange-400 transition-all">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] pointer-events-none transition-colors" />
        <h4 className="text-orange-400 font-black text-sm uppercase tracking-widest mb-6 relative z-10 flex items-center gap-3">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_#f97316]" />
          The Supply Chain Crisis
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 relative z-10 font-light">
          The most daunting initial challenge was procurement. Due to severe supply chain disruptions caused by ongoing geopolitical conflicts, sourcing specific high-torque electromechanical actuators and microcomputing modules locally within Dubai proved nearly impossible. 
        </p>
        <p className="text-gray-300 text-sm leading-relaxed relative z-10 font-medium">
          Overcoming this required traveling to Pakistan to personally source the necessary materials from College Road and Gowalmandi. I did not do this alone. My father and mother were right beside me, walking the streets, adding their unwavering strength to overcome the immense logistical complexity and physical strain of the prototyping phase.
        </p>
      </div>

      <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border-t-2 border-t-red-500/50 border-white/5 p-8 md:p-10 rounded-[30px] shadow-[0_15px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-t-red-400 transition-all">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 blur-[80px] pointer-events-none transition-colors" />
        <h4 className="text-red-400 font-black text-sm uppercase tracking-widest mb-6 relative z-10 flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" />
          Theory vs. Physical Metal
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 relative z-10 font-light">
          Theoretical physics rarely translates perfectly to physical metal. The harsh reality of hardware engineering became apparent when the entire mechanical assembly had to be torn down and rebuilt from scratch to properly align the biomechanical pivot points.
        </p>
        <blockquote className="border-l-2 border-red-500 pl-6 py-3 my-5 bg-red-500/5 text-gray-200 italic text-sm relative z-10 font-medium shadow-inner rounded-r-xl">
          "Accompanied by my father, I had to deal with nearly 20 different welders until I was finally able to complete the bracket, which didn't work and I had to repeat the process all over again the second time because the motor fried".
        </blockquote>
      </div>
    </div>
  );
};

// --- FINAL DEMO READINESS ---
const FinalReadinessBoard = () => {
  return (
    <div className="bg-[#050505] border-l-4 border-emerald-500 border-white/5 rounded-[40px] p-8 md:p-12 mb-16 shadow-[0_20px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/5 pb-6 relative z-10">
        <div>
          <h3 className="text-sm font-black text-emerald-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" /> Final Project Status
          </h3>
          <h2 className="text-2xl font-bold text-white">Demonstration Readiness</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            The Mynee Exoskeleton framework has reached functional completion. The Python Finite State Machine perfectly commands the driver, achieving our <strong>13.1ms latency target</strong> and our <strong>1.34° kinematic accuracy</strong>. We have empirically proven that an affordable edge-computed device can power a smart orthosis.
          </p>
          <div className="bg-[#0a0a0a] border border-orange-500/30 p-6 rounded-2xl mt-6 shadow-inner">
            <p className="text-orange-400 text-xs font-bold mb-3 uppercase tracking-widest">Hardware Sourcing Update</p>
            <p className="text-gray-400 text-xs font-mono leading-relaxed">
              As the original high-torque motor fried under thermal stress, a temporary high-RPM substitute was acquired to empirically validate the system architecture. While this motor successfully demonstrates the logic responding to FSR/MPU triggers, we are actively hunting for the perfect replacement high-torque motor up until the final presentation day to fully validate the physical lift.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-5 bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl shadow-inner">
          <div className="flex items-center gap-4 border-b border-white/5 pb-5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(16,185,129,0.5)]">✓</div>
            <span className="text-gray-200 font-bold text-sm">FSM Code & Logic Validation</span>
          </div>
          <div className="flex items-center gap-4 border-b border-white/5 pb-5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(16,185,129,0.5)]">✓</div>
            <span className="text-gray-200 font-bold text-sm">Chassis & U-Bracket Fabrication</span>
          </div>
          <div className="flex items-center gap-4 border-b border-white/5 pb-5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shadow-[0_0_10px_rgba(16,185,129,0.5)]">✓</div>
            <span className="text-gray-200 font-bold text-sm">Final Report & Appendices</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(234,179,8,0.5)] animate-pulse">!</div>
            <span className="text-gray-200 font-bold text-sm">Final Motor Swap (Pending Arrival)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- THE ULTIMATE WALL OF GRATITUDE ---
const GratitudeBoard = () => {
  return (
    <div className="mb-16 mt-32">
      <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-[0.3em] mb-16 text-center flex items-center justify-center gap-6">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/50" />
        Tokens of Gratitude
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/50" />
      </h3>
      
      {/* ROW 1: ALLAH (Pure Blinding White + Cosmic Stars) */}
      <div className="w-full bg-white border border-white p-12 md:p-16 rounded-[40px] relative overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.6)] flex flex-col items-center text-center mb-10 z-20 transition-transform duration-500 hover:scale-[1.02]">
        {/* Dark twinkling stars inside the white card */}
        {[...Array(25)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-black rounded-full" 
            style={{ 
              width: Math.random() * 4 + 2 + 'px', 
              height: Math.random() * 4 + 2 + 'px', 
              top: Math.random() * 100 + '%', 
              left: Math.random() * 100 + '%',
              animation: `twinkleDark ${2 + Math.random() * 3}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }} 
          />
        ))}
        
        <h4 className="text-black text-4xl md:text-5xl font-black mb-6 tracking-[0.3em] relative z-10 drop-shadow-sm">Alhamdulillah</h4>
        <div className="w-16 h-1 bg-black mb-6 relative z-10" />
        <p className="text-gray-900 text-sm md:text-base leading-relaxed font-bold relative z-10 max-w-3xl">
          Allah is the best of planners. All praise and gratitude to the Almighty for granting me the perseverance, wisdom, and strength to undertake and complete this 11-year journey. The incredible experiences, the resilience forged, and the ultimate victory of this graduation would not have been possible without His profound, unmatched blessings.
        </p>
      </div>

      {/* ROW 2: PARENTS & DR JUDHI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {/* Dad (Golden/Amber + Rising Embers) */}
        <div className="bg-[#050505] border-t-4 border-amber-500 p-8 rounded-3xl flex flex-col items-center text-center shadow-[0_15px_40px_rgba(245,158,11,0.2)] relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Animated Golden Embers */}
            {[...Array(12)].map((_, i) => (
              <div key={i} className="absolute w-2 h-2 rounded-full bg-amber-400 blur-[2px]"
                style={{ left: `${Math.random() * 100}%`, animation: `riseEmber ${4 + Math.random() * 4}s ease-in infinite`, animationDelay: `${Math.random() * 4}s` }}
              />
            ))}
          </div>
          <h4 className="text-amber-400 text-xl font-black mb-1 relative z-10 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]">My Father</h4>
          <p className="text-amber-200/60 text-[10px] font-mono uppercase tracking-[0.2em] mb-4 relative z-10 font-bold border-b border-amber-500/30 pb-2">The Mentor</p>
          <p className="text-gray-300 text-xs leading-relaxed font-medium relative z-10">
            You mentored me, walked the component stores of Gowalmandi with me, and stood by my side as we visited every single welder to build this machine. Thank you for your boundless support and guidance.
          </p>
        </div>

        {/* Mom (Lime/Yellow + Rising Energy Fireflies) */}
        <div className="bg-[#050505] border-t-4 border-lime-400 p-8 rounded-3xl flex flex-col items-center text-center shadow-[0_15px_40px_rgba(163,230,53,0.2)] relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-lime-400/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Animated Lime Fireflies */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-lime-300 blur-[1px] shadow-[0_0_8px_rgba(163,230,53,1)]"
                style={{ left: `${Math.random() * 100}%`, animation: `riseEmber ${5 + Math.random() * 5}s ease-in-out infinite`, animationDelay: `${Math.random() * 5}s` }}
              />
            ))}
          </div>
          <h4 className="text-lime-400 text-xl font-black mb-1 relative z-10 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(163,230,53,0.6)]">My Mother</h4>
          <p className="text-lime-200/60 text-[10px] font-mono uppercase tracking-[0.2em] mb-4 relative z-10 font-bold border-b border-lime-400/30 pb-2">The Inspiration</p>
          <p className="text-gray-300 text-xs leading-relaxed font-medium relative z-10">
            You served as the primary inspiration and motivating force behind the conception of the Mynee smart knee orthosis. Your strength is embedded in every piece of this project. I owe you everything.
          </p>
        </div>

        {/* Dr Judhi (Teal & Cyan + Scanner Line) */}
        <div className="bg-[#050505] border-t-4 border-cyan-400 p-8 rounded-3xl flex flex-col items-center text-center shadow-[0_15px_40px_rgba(6,182,212,0.2)] relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none" />
          {/* Tech Scanner Line */}
          <div className="absolute left-0 w-full h-[2px] bg-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,1)]" style={{ animation: 'scannerSweep 4s linear infinite' }} />
          
          <h4 className="text-cyan-400 text-xl font-black mb-1 relative z-10 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">Dr. Judhi Prasetyo</h4>
          <p className="text-cyan-200/60 text-[10px] font-mono uppercase tracking-[0.2em] mb-4 relative z-10 font-bold border-b border-cyan-400/30 pb-2">The Guide</p>
          <p className="text-gray-300 text-xs leading-relaxed font-medium relative z-10">
            My sincere gratitude for your continuous support, invaluable guidance, and technical insights throughout the development of this Major Project. Thank you to the entire faculty at Middlesex University Dubai.
          </p>
        </div>
      </div>

      {/* ROW 3: ANNA & SAFWAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        
        {/* Anna (Crimson Red + Elegant Swooping Petals) */}
        <div className="bg-[#050505] border-t-4 border-rose-600 p-10 rounded-3xl flex flex-col items-center text-center shadow-[0_15px_40px_rgba(225,29,72,0.2)] relative overflow-hidden hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-600/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Custom Elegant Petal SVG Animation */}
            {[...Array(12)].map((_, i) => (
              <div key={i} className="absolute text-rose-500/60 drop-shadow-[0_0_8px_rgba(225,29,72,0.8)]" 
                   style={{ left: `${Math.random() * 100}%`, animation: `petalFall ${6 + Math.random() * 4}s linear infinite`, animationDelay: `${Math.random() * 4}s` }}>
                <div style={{ animation: `petalSway ${2 + Math.random() * 2}s ease-in-out infinite alternate` }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.1,2.5 C8.5,2.5 5,5 5,9.5 C5,14 12.1,21.5 12.1,21.5 C12.1,21.5 19.2,14 19.2,9.5 C19.2,5 15.7,2.5 12.1,2.5 Z" style={{ transform: 'rotate(45deg)' }} />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <h4 className="text-white text-4xl font-black mb-1 relative z-10 drop-shadow-[0_0_15px_rgba(225,29,72,0.8)] tracking-wide">Anna</h4>
          <p className="text-rose-400 text-[11px] font-mono uppercase tracking-[0.4em] mb-6 relative z-10 font-bold border-b border-rose-500/30 pb-2">The Love of My Life</p>
          <p className="text-gray-200 text-sm leading-relaxed font-light relative z-10 max-w-sm">
            You have made the journey to the completion of my degree truly memorable, making these the absolute best years of my life so far. Thank you for your unwavering emotional support during the most grueling phases of this project.
          </p>
        </div>

        {/* Safwan (Lime/Green + PCB Circuit Trace) */}
        <div className="bg-[#050505] border-t-4 border-lime-500 p-10 rounded-3xl flex flex-col items-center text-center shadow-[0_15px_40px_rgba(132,204,22,0.15)] relative overflow-hidden hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-b from-lime-500/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            {/* High-Tech PCB Trace Animations */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 50 L 50 50 L 80 80 L 150 80" stroke="#a3e635" strokeWidth="2" fill="none" strokeDasharray="150" style={{ animation: `circuitDraw 4s linear infinite` }} />
              <circle cx="150" cy="80" r="3" fill="#a3e635" className="animate-pulse" />
              <path d="M 400 200 L 350 200 L 320 150 L 250 150" stroke="#a3e635" strokeWidth="2" fill="none" strokeDasharray="150" style={{ animation: `circuitDraw 5s linear infinite 1s` }} />
              <circle cx="250" cy="150" r="3" fill="#a3e635" className="animate-pulse" />
              <path d="M 50 250 L 100 250 L 120 220 L 200 220" stroke="#a3e635" strokeWidth="1.5" fill="none" strokeDasharray="150" style={{ animation: `circuitDraw 3.5s linear infinite 2s` }} />
              <circle cx="200" cy="220" r="2.5" fill="#a3e635" className="animate-pulse" />
            </svg>
          </div>
          <h4 className="text-white text-4xl font-black mb-1 relative z-10 drop-shadow-[0_0_15px_rgba(132,204,22,0.8)] tracking-wide">Safwan</h4>
          <p className="text-lime-400 text-[11px] font-mono uppercase tracking-[0.4em] mb-6 relative z-10 font-bold border-b border-lime-500/30 pb-2">A Brother for Life</p>
          <p className="text-gray-200 text-sm leading-relaxed font-light relative z-10 max-w-sm">
            Your engineering capabilities fundamentally shaped my own passion. Your camaraderie helped me out tremendously; you have been a true friend, and our shared journey through the trenches of engineering has bonded us for life.
          </p>
        </div>
      </div>

      {/* ROW 4: COMBINED BROTHERHOOD & FRIENDS */}
      <div className="w-full bg-[#050505] border-t-4 border-fuchsia-500 p-10 md:p-12 rounded-[40px] shadow-[0_15px_40px_rgba(217,70,239,0.2)] relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px] pointer-events-none" />
        
        {/* Animated Network Constellation Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <svg className="w-full h-full">
            <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="#d946ef" strokeWidth="1" />
            <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="#d946ef" strokeWidth="1" />
            <line x1="40%" y1="50%" x2="60%" y2="80%" stroke="#d946ef" strokeWidth="1" />
            <circle cx="10%" cy="20%" r="4" fill="#d946ef" style={{ animation: 'nodePulse 3s infinite' }} />
            <circle cx="40%" cy="50%" r="6" fill="#d946ef" style={{ animation: 'nodePulse 3s infinite 1s' }} />
            <circle cx="80%" cy="30%" r="4" fill="#d946ef" style={{ animation: 'nodePulse 3s infinite 2s' }} />
            <circle cx="60%" cy="80%" r="5" fill="#d946ef" style={{ animation: 'nodePulse 3s infinite 0.5s' }} />
          </svg>
        </div>

        <h4 className="text-fuchsia-400 font-black text-2xl uppercase tracking-[0.3em] mb-10 relative z-10 flex items-center justify-center gap-4 text-center drop-shadow-[0_0_10px_rgba(217,70,239,0.8)]">
          <div className="w-3 h-3 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_15px_#d946ef]" />
          My Amazing Classmates
          <div className="w-3 h-3 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_15px_#d946ef]" />
        </h4>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center bg-black/60 p-8 rounded-3xl border border-white/5 shadow-inner">
          <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
            To <strong className="text-white font-bold">Hassan</strong>, my roommate who profoundly shaped my perspective on life. To <strong className="text-white font-bold">Omar and Umer</strong>, who I had the absolute privilege of building the trash bin-carrying robot with last semester. To <strong className="text-white font-bold">William</strong> for your invaluable partnership in the second semester.
          </p>
          <p className="text-fuchsia-200 text-sm font-medium leading-relaxed mb-6 drop-shadow-sm">
            And to <strong className="text-fuchsia-400 font-bold">Ayush, Stephano, Justin, Kevin, Shaffaq, Aleena, Jannah, Afeera, Khalid, Anush, Fayiz, Safi, Jad, Ketan, Dylan, Leith, Sheif, Rayaan, Ryan, Reuben, Ziad, Bagosher, Shreya, Mitali, Maleesha, Karim, and Ahmed</strong>—we survived the engineering gauntlet together. You guys were amazing!
          </p>
          <div className="w-24 h-px bg-fuchsia-500/30 mx-auto mb-6" />
          <p className="text-gray-400 text-xs font-light leading-relaxed">
            To the Music Club friends, the Drama Club friends, the staff, the security guards, and everyone else who crossed my path. You made the stress bearable and proved that this was the perfect time for my graduation. Thank you for making these years the most memorable of my life.
          </p>
        </div>
      </div>

    </div>
  );
};

// --- NEW BLOCK: The "Comet of Your Journey" Day/Night Flight Path ---
const FlightPathTimeline = () => {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.8)] relative overflow-hidden mt-32 mb-16 h-[500px] flex flex-col justify-end pb-12">
      
      {/* Dynamic Day/Night Background gradient */}
      <div className="absolute inset-0 z-0" style={{ animation: 'skyCycle 25s ease-in-out infinite' }} />

      {/* Day / Night Celestial Spin (Sun & Moon) */}
      <div className="absolute top-[50px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full animate-[celestialSpin_25s_linear_infinite] z-10 pointer-events-none opacity-80">
        {/* Sun */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-500 rounded-full shadow-[0_0_80px_rgba(245,158,11,1)]" />
        {/* Moon */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-500 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.8)]" />
      </div>

      {/* Starry Night Sky Layer (Fades in/out) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ animation: 'nightFade 25s linear infinite' }}>
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full" 
            style={{ 
              width: Math.random() * 3 + 'px', 
              height: Math.random() * 3 + 'px', 
              top: Math.random() * 60 + '%', 
              left: Math.random() * 100 + '%',
              animation: `twinkleStar ${2 + Math.random() * 4}s infinite alternate`,
              animationDelay: `${Math.random() * 2}s`
            }} 
          />
        ))}
      </div>

      {/* Day Birds Layer (Fades in/out) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ animation: 'dayFade 25s linear infinite' }}>
        {/* Bird 1 */}
        <div className="absolute top-[20%] opacity-80" style={{ animation: 'flyRight 25s linear infinite' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M22 12c-2.5-1.5-6-2.5-10-2.5S4.5 10.5 2 12c2.5 1.5 6 3 10 3s7.5-1.5 10-3z"/></svg>
        </div>
        {/* Bird 2 */}
        <div className="absolute top-[25%] opacity-60" style={{ animation: 'flyRight 25s linear infinite', animationDelay: '2s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M22 12c-2.5-1.5-6-2.5-10-2.5S4.5 10.5 2 12c2.5 1.5 6 3 10 3s7.5-1.5 10-3z"/></svg>
        </div>
      </div>

      <div className="text-center mb-16 relative z-30">
        <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4 flex items-center justify-center gap-3 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_#ffffff]" /> 11 Years in the Making
        </h3>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">From Coast to Coast, to the Finish Line.</h2>
      </div>

      <div className="relative w-full h-32 z-30 flex items-center justify-center overflow-visible px-4 md:px-12">
        
        {/* The Arc Path SVG (Background Dotted Line) */}
        <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
          <path 
            d="M 50 100 Q 250 -20, 450 100 T 850 100 T 1200 100" 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.4)" 
            strokeWidth="2" 
            strokeDasharray="6,6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* The Glowing Comet moving perfectly along the arc */}
        <motion.div 
          className="absolute z-40 w-5 h-5 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,1)]"
          animate={{ left: ["0%", "100%"], y: [0, -70, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", y: { duration: 10, repeat: Infinity, ease: "easeInOut" } }}
          style={{ transform: "translateY(50%)" }}
        >
          {/* Comet Tail */}
          <div className="absolute top-1/2 -left-24 w-24 h-[3px] bg-gradient-to-r from-transparent via-white/50 to-white -translate-y-1/2 rounded-full" />
        </motion.div>

        {/* Nodes */}
        <div className="w-full flex justify-between relative z-30 mt-[4.5rem]">
          {/* Node 1: NJ */}
          <div className="flex flex-col items-center relative">
            <div className="w-5 h-5 rounded-full bg-black border-2 border-white z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)] flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="text-center absolute top-8 w-32 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs">Drew Univ.</h4>
              <p className="text-white/80 text-[9px] font-mono mt-1 font-bold">New Jersey, USA<br/>The Beginning</p>
            </div>
          </div>
          
          {/* Node 2: CA */}
          <div className="flex flex-col items-center relative">
            <div className="w-5 h-5 rounded-full bg-black border-2 border-white z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)] flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="text-center absolute top-8 w-32 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs">Marymount</h4>
              <p className="text-white/80 text-[9px] font-mono mt-1 font-bold">California, USA<br/>The Grind</p>
            </div>
          </div>

          {/* Node 3: London */}
          <div className="flex flex-col items-center relative">
            <div className="w-5 h-5 rounded-full bg-black border-2 border-white z-10 shadow-[0_0_15px_rgba(255,255,255,0.8)] flex items-center justify-center">
               <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="text-center absolute top-8 w-32 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs">Queen Mary</h4>
              <p className="text-white/80 text-[9px] font-mono mt-1 font-bold">London, UK<br/>The Pivot</p>
            </div>
          </div>

          {/* Node 4: Dubai */}
          <div className="flex flex-col items-center relative">
            <div className="w-8 h-8 rounded-full bg-white border-4 border-black z-10 shadow-[0_0_30px_rgba(255,255,255,1)] animate-pulse flex items-center justify-center">
               <div className="w-3 h-3 bg-black rounded-full" />
            </div>
            <div className="text-center absolute top-10 w-40 drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
              <h4 className="text-white font-black uppercase tracking-widest text-sm drop-shadow-[0_0_8px_rgba(255,255,255,1)]">Middlesex</h4>
              <p className="text-black text-[10px] font-bold font-mono mt-2 bg-white px-3 py-1 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]">Dubai, UAE (Graduation)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week12Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={12} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">The Bitter-Sweet Goodbye</span>
                <span className="text-gray-500 text-xs font-mono">11 YEARS IN THE MAKING</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 12: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">From Concept to Completion.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Looking back at the 12-week gauntlet of hardware failures, late-night coding, and the ultimate success of the live exoskeleton demonstration. This week feels like the closing chapter of a very intense but profoundly meaningful journey.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <h2 className="text-3xl text-white mt-16 mb-8">The Engineer's Crucible</h2>
              <p>The development of the Mynee exoskeleton was as much a test of my personal resilience as it was a rigorous engineering challenge. Transitioning this project from a theoretical white-box model into a physical, load-bearing orthosis required patience and the guts to navigate a gauntlet of logistical and technical hurdles. It fundamentally shaped my perspective on applied engineering and made me realize how much room I still have to grow as an electronics expert.</p>

              <HardwareCrucibleBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">System Validation & Demo Readiness</h2>
              <p>Engineering is a discipline of proof. Despite the brutal realities of fabrication, the core logic architecture of the Mynee Exoskeleton survived the crucible. We achieved our 13.1ms latency target, we hit the 1.34° kinematic accuracy, and we proved that affordable edge-computing can power a smart orthosis.</p>
              
              <FinalReadinessBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">The Final Conclusion</h2>
              <p>Ultimately, this project has profoundly impacted my trajectory as an engineer. It has taught me that real-world engineering is rarely about perfect initial designs, but rather about grit and adaptability during the relentless pursuit of a solution when things go wrong.</p>
              <p>The Mynee Exoskeleton project is officially complete. I can hardly believe it is over, and the tears of relief are very real.</p>

              <FlightPathTimeline />

              <GratitudeBoard />

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-11">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 11
                </button>
              </Link>
              <Link href="/">
                <button className="group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-teal-400 to-emerald-500 text-black rounded-full font-black transition-all shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] active:scale-95">
                  Return Home <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Project Completion</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Final Reflections</span></li>
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