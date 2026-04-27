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

// --- INTERACTIVE TROUBLESHOOTING BOARD ---
const TroubleshootingBoard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {/* The Bug / Symptom */}
      <div className="bg-red-500/5 border border-red-500/30 p-8 rounded-3xl relative overflow-hidden group hover:bg-red-500/10 transition-all">
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/20 blur-[60px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h4 className="text-red-400 font-black text-sm uppercase tracking-widest">Isolated Symptoms</h4>
          </div>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li className="border-b border-red-500/20 pb-4">
              <strong className="text-gray-200 block mb-1">1. Logic-Level Brownouts</strong>
              When the 12V PG36-555 motor engaged under load, the instantaneous current draw caused the voltage to sag to 11.2V, causing the Raspberry Pi to reboot mid-loop.
            </li>
            <li className="border-b border-red-500/20 pb-4">
              <strong className="text-gray-200 block mb-1">2. I2C Bus NaN Errors (EMI)</strong>
              The Bipolar Junction Transistors (BJTs) in the L298N generated severe Electromagnetic Interference (EMI), bleeding noise into the I2C bus and freezing the MPU6050.
            </li>
            <li>
              <strong className="text-gray-200 block mb-1">3. Floating Ground Triggers</strong>
              Ambient static occasionally caused the digital FSR GPIO pins to register false "HIGH" readings, risking accidental motor actuation.
            </li>
          </ul>
        </div>
      </div>

      {/* The Fix / Resolution */}
      <div className="bg-emerald-500/5 border border-emerald-500/30 p-8 rounded-3xl relative overflow-hidden group hover:bg-emerald-500/10 transition-all">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[60px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h4 className="text-emerald-400 font-black text-sm uppercase tracking-widest">Engineering Interventions</h4>
          </div>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li className="border-b border-emerald-500/20 pb-4">
              <strong className="text-gray-200 block mb-1">1. Dual Power Topology</strong>
              Completely severed the actuation power from the microcomputing power. The Pi Zero now runs on an isolated 5V bank, while the L298N runs on a dedicated 12V LiPo.
            </li>
            <li className="border-b border-emerald-500/20 pb-4">
              <strong className="text-gray-200 block mb-1">2. Hardware Failsafe Integration</strong>
              Added a 12V inline toggle switch and physical fuse to the actuation circuit, ensuring that if the I2C bus locks up, the motor can be manually killed by the user.
            </li>
            <li>
              <strong className="text-gray-200 block mb-1">3. Pull-Down Resistors</strong>
              Soldered physical 10kΩ pull-down resistors to the FSR circuits to prevent floating grounds and false triggers.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- THERMAL PROFILING GAUGE ---
const ThermalProfileBoard = () => {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl mb-16 relative overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-500/5 blur-[100px] pointer-events-none group-hover:bg-orange-500/10 transition-colors duration-700" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_#f97316]" /> Hardware Limitations
          </h3>
          <h2 className="text-2xl font-bold text-white mb-4">L298N Thermal Ceiling</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            While the Dual Power Topology solved the voltage sag, rigorous bench testing revealed a stark limitation in the L298N Motor Driver. During a 5-minute continuous stall-load test, the driver IC reached <strong>74.2°C</strong>, exceeding the 60°C safety target.
          </p>
          <div className="bg-black/50 border border-white/5 p-4 rounded-xl">
             <p className="text-orange-400 text-xs font-bold mb-1">Future Iteration Note</p>
             <p className="text-gray-500 text-[10px] font-mono leading-relaxed">
               The L298N is sufficient for initial prototyping and validating the FSM logic. However, for a clinical-ready product, it must be replaced with a high-efficiency MOSFET driver (e.g., BTS7960) to eliminate this thermal bottleneck.
             </p>
          </div>
        </div>

        {/* Animated Thermometer Visual */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative w-12 h-64 bg-black/80 rounded-full border border-white/10 shadow-inner overflow-hidden flex items-end p-1">
            {/* Safety Line */}
            <div className="absolute top-[40%] left-0 w-full border-t-2 border-dashed border-emerald-500 z-20" />
            <span className="absolute top-[40%] -translate-y-1/2 left-16 text-emerald-500 text-[10px] font-bold font-mono whitespace-nowrap">60.0°C Safe Target</span>
            
            {/* Heat Bar */}
            <motion.div 
              initial={{ height: "0%" }}
              whileInView={{ height: "85%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-full bg-gradient-to-t from-yellow-400 via-orange-500 to-red-500 rounded-full relative z-10 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
            />
          </div>
          <div className="mt-6 text-center">
            <p className="text-red-500 text-3xl font-black font-mono">74.2°C</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Peak Stall Temp</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NEW BLOCK: Economic Feasibility Board ---
const EconomicFeasibilityBoard = () => {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500/5 blur-[80px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]" /> Project Objective Validation
          </h3>
          <h2 className="text-2xl font-bold text-white mb-4">Economic Viability Verified</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The final Bill of Materials (BOM) for the prototype was successfully kept to approximately <strong>$85.00 USD</strong>. This strictly adheres to the non-functional requirement of remaining under a $100.00 BOM limit.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            This outcome empirically proves the core hypothesis formulated in Chapter 1: The excessively high costs of clinical exoskeletons are driven by closed-loop proprietary ecosystems, not the fundamental cost of the robotic actuation hardware.
          </p>
        </div>

        {/* Financial Graph */}
        <div className="w-full md:w-1/3">
          <div className="bg-black/60 border border-white/5 rounded-2xl p-6 shadow-inner">
            <div className="flex justify-between items-end mb-2">
              <span className="text-teal-400 text-3xl font-black font-mono">$85.00</span>
              <span className="text-gray-500 text-xs font-mono uppercase">Actual Cost</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden mb-4 border border-white/5">
              <motion.div 
                initial={{ width: "0%" }}
                whileInView={{ width: "85%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
              />
            </div>
            
            <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
              <span className="text-gray-500 text-xs font-mono uppercase">Target Limit</span>
              <span className="text-gray-300 text-sm font-bold font-mono">$100.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week8Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={8} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 3</span>
                <span className="text-gray-500 text-xs font-mono">9 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 8: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">System Integration & Debugging.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Transitioning from modular bench-top testing to full physical system integration was the primary objective of Week 8. While the individual code modules for the Raspberry Pi Zero and L298N driver worked perfectly in isolation, merging them onto the physical chassis revealed entirely new electromechanical complexities.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <h2 className="text-3xl text-white mt-12 mb-6">Structured Debugging Methodology</h2>
              <p>During this week’s Thursday lab session, Dr. Roshan heavily emphasized the importance of structured debugging. When a complex cyber-physical system breaks, changing code randomly is counterproductive. Instead, I applied a rigorous framework to the integration process: <strong>Isolate, Identify, and Resolve.</strong></p>
              <p>This approach became immediately necessary when the integration of high-current actuators with sensitive logic controllers resulted in severe system instability.</p>
              
              <TroubleshootingBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Formalizing Chapter 3: Concept Derivation</h2>
              <p>With the bugs resolved, I formalized Chapter 3 of the final report, specifically defending the hardware choices. Before finalizing the bill of materials, a morphological analysis was conducted to prevent design fixation.</p>
              <ul className="list-none pl-0 space-y-6 my-8 font-medium text-gray-300">
                <li className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <span className="text-gray-200 font-bold block mb-2">Concept 1 (Arduino + Potentiometers) Rejected</span>
                  <p className="text-gray-400 text-sm leading-relaxed mb-0">This concept was highly affordable, but it was rejected because physical rotary potentiometers require complex mechanical coupling to the human joint and are heavily prone to physical wear and tear, reducing long-term kinematic accuracy.</p>
                </li>
                <li className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <span className="text-gray-200 font-bold block mb-2">Concept 2 (ESP32 + Stepper Motor) Rejected</span>
                  <p className="text-gray-400 text-sm leading-relaxed mb-0">While this combination provides excellent thermal stability, stepping motors fundamentally lack the free-wheeling (zero-impedance) capability required for a natural, unresisted human swing phase, making it biomechanically unsuitable.</p>
                </li>
                <li className="bg-teal-500/10 p-6 rounded-2xl border border-teal-500/30">
                  <span className="text-teal-400 font-bold block mb-2">Concept 3 (Pi Zero + IMU + DC Motor) Selected</span>
                  <p className="text-gray-300 text-sm leading-relaxed mb-0">This architecture perfectly balances computational bandwidth for deterministic latency, highly accurate non-intrusive spatial tracking via the MPU6050, and the ability to instantly cut power to a DC motor to allow for a frictionless swing phase.</p>
                </li>
              </ul>

              <h2 className="text-3xl text-white mt-16 mb-6">High-Fidelity Mechanical Integration</h2>
              <p>Translating the validated bench circuit into a wearable, structural prototype required careful mechanical integration. The physical frame was designed using parallel iron struts, explicitly mirroring the pivot points of the human knee.</p>
              <p>To prevent any type of thermal damage to the DC motor, direct welding to the motor casing was explicitly avoided. Instead, a custom fabricated U-bracket and flange coupling system were used to safely anchor the actuator to the metal frame. Furthermore, the microelectronics were transitioned into a non-conductive plastic enclosure, physically isolating the Logic Board from the heavy 12V power supply.</p>

              <h2 className="text-3xl text-white mt-16 mb-6">Thermal Profiling & Hardware Limitations</h2>
              <p>With the physical architecture complete, I moved to stress-test the mechanical outputs. This revealed a significant operational limitation regarding the thermal dissipation of the motor driver under physical load.</p>
              
              <ThermalProfileBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Evaluating Economic Feasibility</h2>
              <p>One of the primary objectives of the Mynee project was to prove that advanced rehabilitation technology can be engineered economically without sacrificing the low-latency deterministic control required for therapeutic recovery. With the integration complete, I compiled the final financial audit.</p>

              <EconomicFeasibilityBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Reflection & Next Steps</h2>
              <p>Week 8 taught me that hardware engineering is 20% writing code and 80% managing electrical physics and thermal dynamics. The shift to a Dual Power Topology was a massive "lesson learned" moment that stabilized the entire platform.</p>
              <p>With the integration complete, the logic validated, and the financial objectives verified, Mynee is no longer a collection of parts on a breadboard—it is a functional machine. Next week, we move into final QA and performance benchmarking.</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-7">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 7
                </button>
              </Link>
              <Link href="/devlog/week-9">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 9 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">System Integration</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Hardware Debugging</span></li>
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