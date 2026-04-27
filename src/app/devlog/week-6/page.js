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

// --- HIGH-DENSITY BLOCK: Post-Mortem Diagnostics ---
const DiagnosticBoard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
    
    {/* Diagnostic 1: Power Topologies */}
    <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl relative overflow-hidden group hover:border-red-500/60 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-[50px] pointer-events-none" />
      <h4 className="text-red-400 font-black text-sm uppercase tracking-widest mb-4">Critical Failure 1: Logic-Level Brownouts</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
        During initial middle-fidelity testing, it was found that the rapid current draw from the 12V DC motor caused severe voltage sag which intermittently reset the 5V Raspberry Pi logic board. Furthermore, floating ground pins were causing false sensor triggers.
      </p>
      <div className="bg-black/50 border border-red-500/20 p-4 rounded-xl">
        <p className="text-red-400 text-xs font-bold mb-1">Hardware Resolution</p>
        <p className="text-gray-400 text-[10px] font-mono leading-relaxed">
          Implemented an isolated dual-power topology, completely severing actuation power from microcomputing power. Added 10kΩ pull-down resistors to eliminate floating ground triggers.
        </p>
      </div>
    </div>

    {/* Diagnostic 2: Kinematic Drift */}
    <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/60 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-[50px] pointer-events-none" />
      <h4 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-4">Critical Failure 2: Gyroscopic Drift & Jitter</h4>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
        Relying on raw accelerometer data caused the motor to stutter violently. Conversely, the MPU6050 suffered from gyroscopic data drift over time, failing our <span className="font-mono text-emerald-400">&lt;2.0°</span> accuracy requirement.
      </p>
      <div className="bg-black/50 border border-emerald-500/20 p-4 rounded-xl">
        <p className="text-emerald-400 text-xs font-bold mb-1">Software Resolution (Algorithmic Damping)</p>
        <p className="text-gray-400 text-[10px] font-mono leading-relaxed">
          Coded a mathematical Complementary Filter. This forces the data to rely on the gyroscope for short-term changes (ignoring impact noise) and the accelerometer for long-term corrections, yielding a verified MAE of 1.34°.
        </p>
      </div>
    </div>

  </div>
);

// --- HIGH-DENSITY BLOCK: Interactive SRS Table ---
const SRSBoard = () => (
  <div className="mb-16 overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0a]/50 overflow-x-auto">
    <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_10px_#2dd4bf]" />
      <h3 className="text-xs font-black text-teal-400 uppercase tracking-widest">Hardware & Software Specifications</h3>
    </div>
    <table className="w-full text-left text-sm min-w-[700px]">
      <thead className="bg-black/50 border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-5 w-1/5">Category</th>
          <th className="p-5 w-1/4">Metric</th>
          <th className="p-5 w-1/2">Target Value & Description</th>
        </tr>
      </thead>
      <tbody className="text-gray-300 font-light divide-y divide-white/5">
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100">System Latency</td>
          <td className="p-5 text-gray-400 text-xs font-mono">Sensor-to-Actuation Delay</td>
          <td className="p-5 text-gray-300 text-sm">&lt; 20 milliseconds to match human neuromuscular reaction time.</td>
        </tr>
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100">Kinematic Tracking</td>
          <td className="p-5 text-gray-400 text-xs font-mono">Angle Calculation Accuracy</td>
          <td className="p-5 text-gray-300 text-sm">Mean Absolute Error (MAE) of &lt; 2.0° during standard gait cycles.</td>
        </tr>
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100">Gait Phase</td>
          <td className="p-5 text-gray-400 text-xs font-mono">Trigger Threshold</td>
          <td className="p-5 text-gray-300 text-sm">Binary High/Low response to heel-strike and toe-off events.</td>
        </tr>
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100">Economic Viability</td>
          <td className="p-5 text-gray-400 text-xs font-mono">Total Prototype BOM</td>
          <td className="p-5 text-gray-300 text-sm">Total Bill of Materials must remain under $100 to ensure consumer accessibility.</td>
        </tr>
        <tr className="hover:bg-red-500/5 transition-colors">
          <td className="p-5 font-bold text-red-400">Safety Integration</td>
          <td className="p-5 text-red-300/70 text-xs font-mono">Failsafe Mechanism</td>
          <td className="p-5 text-gray-300 text-sm">Hardware-level cut-off switch and fused power line.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// --- NEW BLOCK: Interactive Activity Flow Diagram ---
const ActivityFlowBoard = () => {
  return (
    <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl hover:border-teal-500/30 transition-all duration-500 mb-16 relative overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-500/5 blur-[100px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />
      
      {/* Scope Restriction Warning */}
      <div className="relative z-10 mb-10 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 flex items-start gap-4">
        <div className="mt-0.5 text-yellow-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        <div>
          <h4 className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-1">Scope Constraint</h4>
          <p className="text-yellow-200/70 text-sm font-light">For the purposes of this project, a proof of concept will only ever focus on the basic mobility case, for instance of a sit to stand motion.</p>
        </div>
      </div>

      <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-10 flex items-center justify-center gap-3 relative z-10 text-center">
        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]" /> Algorithmic Activity Flow (FSM)
      </h3>

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
        
        {/* Step 1: Input */}
        <div className="w-full bg-black/60 border border-white/10 p-4 rounded-2xl text-center shadow-lg hover:border-teal-500/50 transition-colors">
          <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Stage 1: Acquisition</p>
          <p className="text-white font-bold text-sm">Read MPU6050 & FSR Sensors via GPIO/I2C</p>
        </div>

        {/* Arrow Down */}
        <div className="w-0.5 h-8 bg-gradient-to-b from-teal-500/50 to-transparent my-2" />

        {/* Step 2: Processing */}
        <div className="w-full bg-teal-900/20 border border-teal-500/30 p-4 rounded-2xl text-center shadow-[0_0_20px_rgba(45,212,191,0.1)]">
          <p className="text-teal-400 text-[10px] uppercase tracking-widest mb-1">Stage 2: Edge Processing</p>
          <p className="text-white font-bold text-sm mb-1">Execute Complementary Filter & FSM Logic</p>
          <p className="text-teal-200/50 text-[10px] font-mono">Evaluates incoming sensor data against predefined kinematic thresholds.</p>
        </div>

        {/* Arrow Down */}
        <div className="w-0.5 h-8 bg-gradient-to-b from-teal-500/50 to-transparent my-2" />

        {/* Split Decision */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1 bg-black/60 border border-emerald-500/30 p-5 rounded-2xl text-center shadow-lg hover:border-emerald-500 transition-colors">
            <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2 border-b border-emerald-500/20 pb-2">Stance Phase</p>
            <p className="text-gray-400 text-xs font-mono mb-1">Trigger: FSR = HIGH</p>
            <p className="text-gray-400 text-xs font-mono mb-3">Condition: Angle &gt; 15°</p>
            <p className="text-white font-bold text-xs bg-emerald-500/20 py-2 rounded-lg">Action: PWM = 80% (Active Torque)</p>
          </div>
          <div className="flex-1 bg-black/60 border border-red-500/30 p-5 rounded-2xl text-center shadow-lg hover:border-red-500 transition-colors">
            <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-2 border-b border-red-500/20 pb-2">Swing Phase / Failsafe</p>
            <p className="text-gray-400 text-xs font-mono mb-1">Trigger: FSR = LOW</p>
            <p className="text-gray-400 text-xs font-mono mb-3">Condition: Angle &lt; 15° (Hyperextension)</p>
            <p className="text-white font-bold text-xs bg-red-500/20 py-2 rounded-lg">Action: PWM = 0% (Zero Impedance)</p>
          </div>
        </div>

        {/* Return Loop */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-0.5 h-6 bg-gradient-to-t from-gray-500/50 to-transparent" />
          <div className="bg-gray-800/50 border border-white/10 px-4 py-2 rounded-full mt-2">
            <p className="text-gray-400 text-[10px] font-mono">time.sleep(0.02) // Enforces &lt;20ms Latency Requirement</p>
          </div>
        </div>

      </div>
    </div>
  );
};


const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week6Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={6} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 2</span>
                <span className="text-gray-500 text-xs font-mono">6 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 6: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">Prototype Evaluation.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                After achieving a successful "Sense-Compute-Actuate" loop in last week's Minimum Viable Prototype (MVP), Week 6 was dedicated to breaking it. Just because a motor spins on a workbench doesn't mean it's safe to strap to a human joint.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <p>This week focused heavily on Prototype Evaluation—stress-testing the logic, identifying critical failures, and fixing them based on our established technical benchmarks. Once the logic was stabilized, I formalized the system's architecture through Software Requirements Specifications and System Logic Flow diagrams.</p>

              <h2 className="text-3xl text-white mt-12 mb-8">Post-Mortem: Evaluation & Refinement</h2>
              <p>Subjecting the MVP to continuous real-world movement revealed critical flaws in the initial hardware/software logic that had to be addressed immediately before any further mechanical fabrication could continue.</p>
              
              <DiagnosticBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">Software Requirements Specification (SRS)</h2>
              <p>To ensure the software meets the intense physical demands of the hardware, I drafted a formal SRS based on the constraints outlined in Chapter 3 of my technical report. This document acts as the final contract for what the system <em>must</em> achieve.</p>
              
              <SRSBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">System Activity Flow</h2>
              <p>To map out the finalized, refined logic and prevent spaghetti code, I generated the core algorithmic Activity Flow diagram. This replaces a standard sequence diagram, as the exoskeleton relies on continuous, real-time looping rather than asynchronous network calls.</p>
              <p>The diagram maps the chronological flow of data from the hardware sensors, through the edge-compute node (Raspberry Pi), out to the mechanical actuators (DC Gear Motor), demonstrating the strict decision trees used for distinguishing between the "Stance Phase" and "Swing Phase" of the gait cycle.</p>

              <ActivityFlowBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Methodological Reflection</h2>
              <p>This week proved exactly why I chose a <strong>Hardware-Adapted Agile</strong> methodology in Week 4. If I had rigidly adhered to a Waterfall model, I would have assumed my math was perfect, assembled the entire exoskeleton, and discovered the devastating jitter effect and logic-level brownouts only after the device was strapped to my leg.</p>
              <p>By testing early and often on the benchtop, I was able to isolate the noise issue in the code, deploy the Complementary filter, and physically sever the 5V and 12V power lines before any physical risk occurred. The system is now stable, structurally sound on paper, and ready for full mechanical hardware integration next week.</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-5">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 5
                </button>
              </Link>
              <Link href="/devlog/week-7">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 7 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Prototype Testing</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Complementary Filter</span></li>
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