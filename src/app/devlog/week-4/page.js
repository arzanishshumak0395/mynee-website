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

// Visual Asset fixed to object-contain so NO edges are cropped
const VisualAsset = ({ imageSrc, caption }) => (
  <div className="mb-12 group">
    <div className="w-full bg-[#0a0a0a]/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex items-center justify-center group-hover:border-teal-500/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] p-4 md:p-8">
      {imageSrc ? (
        <img src={imageSrc} alt={caption} className="w-full h-auto max-h-[70vh] object-contain rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      ) : (
        <div className="aspect-video w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(45,212,191,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
          <span className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10 group-hover:text-teal-400 transition-colors">Visual Asset Not Found</span>
        </div>
      )}
    </div>
    <p className="text-center text-xs text-gray-500 mt-4 font-mono uppercase tracking-widest">{caption}</p>
  </div>
);

// --- Agile-Waterfall Hybrid Methodology ---
const AgileWaterfallBoard = () => {
  const staggerList = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const staggerItem = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="group relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[30px] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 blur-[60px] pointer-events-none group-hover:bg-sky-500/20 transition-colors duration-700" />
        <div className="relative z-10">
          <h4 className="text-white font-black text-xl mb-4 tracking-tight group-hover:text-sky-400 transition-colors">The Waterfall Element</h4>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Hardware Architecture</p>
          <motion.ul variants={staggerList} className="space-y-4 text-sm text-gray-400 font-light">
            <motion.li variants={staggerItem} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-1.5 bg-sky-500 rounded-full shadow-[0_0_5px_#0ea5e9] shrink-0" />
              <span>Physical engineering is unforgiving. A mechanical chassis cannot be "iterated" halfway through printing.</span>
            </motion.li>
            <motion.li variants={staggerItem} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-1.5 bg-sky-500 rounded-full shadow-[0_0_5px_#0ea5e9] shrink-0" />
              <span>The motor selection, power topology, and 3D printing of the PETG frame follow a strict, sequential path: <strong>Design → Procure → Assemble.</strong></span>
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="group relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[30px] shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />
        <div className="relative z-10">
          <h4 className="text-white font-black text-xl mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">The Agile Element</h4>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Software Intelligence</p>
          <motion.ul variants={staggerList} className="space-y-4 text-sm text-gray-400 font-light">
            <motion.li variants={staggerItem} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981] shrink-0" />
              <span>The Python telemetry scripts and PID control loops on the Raspberry Pi require immense flexibility and continuous refinement.</span>
            </motion.li>
            <motion.li variants={staggerItem} className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-1.5 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981] shrink-0" />
              <span>I operate in 1-week iterative <strong>"Sprints"</strong> to write, test, and tune the sensor fusion algorithms before pushing updates to the edge device.</span>
            </motion.li>
          </motion.ul>
        </div>
      </motion.div>
    </div>
  );
};

// --- NEW BLOCK: Interactive White Box Model ---
const InteractiveWhiteBox = () => (
  <div className="bg-[#0a0a0a]/60 border border-white/10 rounded-[30px] p-6 md:p-10 mb-16 relative overflow-hidden shadow-2xl group hover:border-teal-500/30 transition-all duration-500">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/5 blur-[100px] pointer-events-none transition-colors duration-700 group-hover:bg-teal-500/10" />
    
    <h3 className="text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2 relative z-10">
      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"/> Subsystem Data Routing
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      {/* 1. Power & Inputs */}
      <div className="space-y-4">
        <h4 className="text-gray-500 font-mono text-[10px] tracking-widest uppercase mb-4 border-b border-white/10 pb-2">External Inputs</h4>
        <div className="bg-black/50 border border-red-500/30 p-4 rounded-2xl hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all cursor-default">
          <p className="text-red-400 font-bold text-xs">12V LiPo Battery</p>
          <p className="text-gray-500 text-[10px] font-mono mt-1">Raw Actuation Power</p>
        </div>
        <div className="bg-black/50 border border-emerald-500/30 p-4 rounded-2xl hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all cursor-default">
          <p className="text-emerald-400 font-bold text-xs">5V Power Bank</p>
          <p className="text-gray-500 text-[10px] font-mono mt-1">Isolated Logic Power</p>
        </div>
        <div className="bg-black/50 border border-blue-500/30 p-4 rounded-2xl hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all cursor-default">
          <p className="text-blue-400 font-bold text-xs">MPU6050 & FSRs</p>
          <p className="text-gray-500 text-[10px] font-mono mt-1">I2C & GPIO Telemetry</p>
        </div>
      </div>

      {/* 2. The White Box / Processing */}
      <div className="space-y-4 relative">
        <h4 className="text-gray-500 font-mono text-[10px] tracking-widest uppercase mb-4 border-b border-white/10 pb-2">The White Box</h4>
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-white/20 hidden md:block" />
        
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 p-5 rounded-2xl shadow-2xl hover:border-white/40 transition-all cursor-default h-full flex flex-col justify-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          
          <div className="bg-black/80 border border-red-500/20 p-3 rounded-xl">
             <p className="text-gray-300 text-[10px] font-bold">Hardware Failsafe</p>
             <p className="text-gray-500 text-[9px] font-mono mt-1">Inline Fuse & Toggle</p>
          </div>
          
          <div className="bg-black/80 border border-teal-500/50 p-3 rounded-xl shadow-[0_0_15px_rgba(45,212,191,0.1)] relative">
             <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 bg-teal-500 rounded-full" />
             <p className="text-teal-400 text-xs font-black">Raspberry Pi Zero</p>
             <p className="text-gray-500 text-[9px] font-mono mt-1">Python FSM Engine</p>
          </div>

          <div className="bg-black/80 border border-yellow-500/30 p-3 rounded-xl">
             <p className="text-yellow-400 text-[10px] font-bold">L298N Motor Driver</p>
             <p className="text-gray-500 text-[9px] font-mono mt-1">PWM to High-Current Relay</p>
          </div>
        </div>
      </div>

      {/* 3. Outputs */}
      <div className="space-y-4 relative">
        <h4 className="text-gray-500 font-mono text-[10px] tracking-widest uppercase mb-4 border-b border-white/10 pb-2">System Outputs</h4>
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-white/20 hidden md:block" />
        
        <div className="bg-black/50 border border-yellow-500/30 p-4 rounded-2xl hover:border-yellow-500 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all cursor-default">
          <p className="text-yellow-400 font-bold text-xs">Mechanical Torque</p>
          <p className="text-gray-500 text-[10px] font-mono mt-1">Active Stance Assist</p>
        </div>
        <div className="bg-black/50 border border-white/20 p-4 rounded-2xl hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all cursor-default">
          <p className="text-white font-bold text-xs">Zero Impedance</p>
          <p className="text-gray-500 text-[10px] font-mono mt-1">Frictionless Free-Swing</p>
        </div>
        <div className="bg-black/50 border border-teal-500/30 p-4 rounded-2xl hover:border-teal-500 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all cursor-default">
          <p className="text-teal-400 font-bold text-xs">Diagnostic Logs</p>
          <p className="text-gray-500 text-[10px] font-mono mt-1">System Telemetry Output</p>
        </div>
      </div>
    </div>
  </div>
);


// --- Finite State Machine (FSM) Logic Board ---
const FSMBoard = () => (
  <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl hover:border-yellow-500/30 transition-all duration-500 mb-16 relative overflow-hidden group">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-yellow-500/5 blur-[100px] pointer-events-none group-hover:bg-yellow-500/10 transition-colors duration-700" />
    
    {/* Scope Restriction Warning */}
    <div className="relative z-10 mb-10 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start gap-4">
      <div className="mt-0.5 text-red-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
      </div>
      <div>
        <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Scope Constraint Acknowledged</h4>
        <p className="text-red-200/70 text-sm font-light">Due to the strict 12-week development timeline, the physical prototype evaluation will be strictly constrained to <strong>State 1: Stance Phase</strong> (providing sit-to-stand assistance). Continuous bilateral walking is outside the scope of this proof-of-concept.</p>
      </div>
    </div>

    <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-12">
      
      {/* State 1 (h-full forces equal height) */}
      <div className="flex-1 w-full bg-black/50 border border-white/5 p-6 rounded-3xl flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]" />
          <h4 className="text-white font-black tracking-widest uppercase text-sm">State 1: Stance Phase</h4>
        </div>
        <div className="space-y-3 font-mono text-xs text-gray-400 flex-1">
          <p className="flex justify-between border-b border-white/5 pb-2"><span>Trigger:</span> <span className="text-gray-200">FSR = HIGH (Heel Strike)</span></p>
          <p className="flex justify-between border-b border-white/5 pb-2"><span>Condition:</span> <span className="text-gray-200">Knee Angle &gt; 15°</span></p>
        </div>
        <p className="flex justify-between text-yellow-400 font-bold pt-4 mt-auto border-t border-white/5"><span>Action:</span> <span>PWM = 80% (Active Torque)</span></p>
      </div>

      {/* Logic Arrow */}
      <div className="hidden lg:flex items-center justify-center shrink-0">
        <svg className="w-8 h-8 text-gray-600 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
      </div>

      {/* State 2 (h-full forces equal height) */}
      <div className="flex-1 w-full bg-black/50 border border-white/5 p-6 rounded-3xl flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
          <h4 className="text-white font-black tracking-widest uppercase text-sm">State 2: Swing Phase</h4>
        </div>
        <div className="space-y-3 font-mono text-xs text-gray-400 flex-1">
          <p className="flex justify-between border-b border-white/5 pb-2"><span>Trigger:</span> <span className="text-gray-200">FSR = LOW (Toe-Off)</span></p>
          <p className="flex justify-between border-b border-white/5 pb-2"><span>Condition:</span> <span className="text-gray-200">Leg is lifted</span></p>
        </div>
        <p className="flex justify-between text-emerald-400 font-bold pt-4 mt-auto border-t border-white/5"><span>Action:</span> <span>PWM = 0% (Free Spin)</span></p>
      </div>

    </div>
  </div>
);

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week4Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={4} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 1</span>
                <span className="text-gray-500 text-xs font-mono">6 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">The Architecture of Execution.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                With the project timeline and literature review locked in, Week 4 shifted focus entirely toward System Architecture. A smart exoskeleton requires precise harmonization between physical hardware inputs and digital software outputs. Before touching a soldering iron, I had to formally define the data flow and operational logic.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <h2 className="text-3xl text-white mt-12 mb-6">Hardware-Software Co-Design Methodology</h2>
              <p>While the overall <em>Research</em> methodology of this project is Mixed Methods, the actual <em>Development</em> process requires a highly specific approach. You cannot apply standard software paradigms to a mechanical hardware project without causing friction. Therefore, I formally selected an <strong>Agile-Waterfall Hybrid</strong> approach.</p>
              
              <AgileWaterfallBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Architectural Evolution: The Black Box</h2>
              <p>To begin mapping the architecture, I started at the highest level of abstraction: the Black Box model. This model deliberately ignores the complex internal electronics and focuses strictly on what the system needs to function (Inputs) and what it must deliver (Outputs).</p>
              <p>As demonstrated, the system requires a power source and real-time biometric data (foot pressure and spatial angle). In return, the system must deliver active mechanical torque, a frictionless swing state, and diagnostic telemetry.</p>
              
              <VisualAsset imageSrc="/BlackBox.png" caption="Figure 3.1 - The Macroscopic Black Box Abstraction." />

              <h2 className="text-3xl text-white mt-16 mb-6">Drilling Down: The White Box Model</h2>
              <p>With the required inputs and outputs established, I drilled down into the <strong>White Box Model</strong>. This schematic strips away the macroscopic abstraction and delineates the internal components encapsulated within the primary exoskeleton system, detailing the precise routing of data and power.</p>
              
              <VisualAsset imageSrc="/WhiteBox.png" caption="Figure 3.4 - Exoskeleton Internal System (White Box Model)." />

              <p>To fully understand this routing, I mapped the data flow across the three core sub-systems. One of the most critical realizations during this phase was the necessity of <strong>power isolation</strong>. If the high-current 12V DC motor draws too much power, it will cause a voltage sag that could brown-out the sensitive 5V Raspberry Pi logic board. Therefore, the power routing is physically segregated from the microcomputing layer.</p>

              {/* The Interactive Deep Dive Model */}
              <InteractiveWhiteBox />

              <h2 className="text-3xl text-white mt-16 mb-6">UML & Finite State Machine (FSM) Logic</h2>
              <p>While the White Box model illustrates the physical routing of wires, the internal decision-making logic of the central processor was mapped using a Unified Modeling Language (UML) State Diagram.</p>
              <p>The software architecture must prevent erratic motor behavior by relying on absolute binary states triggered by the FSRs. This deterministic <strong>Finite State Machine (FSM)</strong> ensures the motor provides assistance exactly when needed, and gets completely out of the user's way when it isn't.</p>

              <FSMBoard />

              <p>This deterministic sequence outlines the initial hardware boot configuration, the continuous sensor data acquisition loop, and the absolute threshold conditions required to transition the L298N motor driver between the active stance phase and the passive swing phase.</p>

              <VisualAsset imageSrc="/UML.png" caption="Figure 3.5 - UML State Diagram detailing the Python FSM." />

              <h2 className="text-3xl text-white mt-16 mb-6">Reflection & Next Steps</h2>
              <p>This week was incredibly satisfying. Moving from broad timelines into the microscopic details of GPIO pin assignments, I2C bus routes, and PWM duty cycles made the project feel real. The hybrid methodology is fully defined, and the logic architecture is mapped.</p>
              <p>With Phase 1 entirely complete, the theoretical work ends here. Next week, the hardware procurement concludes, and Phase 2 (Physical Prototyping) officially begins. It's time to build.</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-3">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 3
                </button>
              </Link>
              <Link href="/devlog/week-5">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 5 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">System Architecture</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">UML Logic Mapping</span></li>
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