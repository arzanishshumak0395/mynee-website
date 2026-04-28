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

// --- BLOCK: Live Demo Status & Hardware Update ---
const DemoStatusBoard = () => {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] pointer-events-none group-hover:bg-orange-500/20 transition-colors duration-700" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/5 pb-6 relative z-10">
        <div>
          <h3 className="text-sm font-black text-orange-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_#f97316]" /> Live Prototype Status
          </h3>
          <h2 className="text-2xl font-bold text-white">Hardware Sourcing Update</h2>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 px-4 py-2 rounded-xl mt-4 md:mt-0 flex items-center gap-3">
           <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
           <span className="text-orange-400 font-bold font-mono text-xs uppercase tracking-widest">Ongoing Procurement</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            As documented in Chapter 6.4, the original bench-test motor fried under thermal load. Due to the severe supply chain crisis, a temporary high-RPM substitute was procured to successfully validate the software architecture and FSM logic.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            However, this high-RPM motor lacks the mechanical torque required to assist a partially abled individual in a physical load-bearing scenario. 
          </p>
          <div className="bg-black/60 border border-white/10 p-5 rounded-2xl">
            <p className="text-white text-xs font-bold mb-2">The Week 12 Directive</p>
            <p className="text-gray-400 text-[10px] font-mono leading-relaxed">
              In preparation for the final demonstration video and presentation, the project is still actively working through regional logistical channels to source the optimal 70-100 RPM high-torque DC geared motor. The goal is to fully swap the actuator before the final defense to validate the physical lifting capacity of the proof-of-concept.
            </p>
          </div>
        </div>

        {/* Readiness Progress Bars */}
        <div className="flex flex-col justify-center space-y-6 bg-white/5 border border-white/5 p-6 rounded-3xl">
          <div>
            <div className="flex justify-between text-xs font-bold font-mono uppercase tracking-widest mb-2 text-emerald-400">
              <span>Software FSM Logic</span>
              <span>100% Validated</span>
            </div>
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold font-mono uppercase tracking-widest mb-2 text-teal-400">
              <span>Sensor Telemetry & Math</span>
              <span>100% Validated</span>
            </div>
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
              <div className="h-full bg-teal-500 w-full" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-bold font-mono uppercase tracking-widest mb-2 text-orange-400">
              <span>Physical Torque Capability</span>
              <span className="animate-pulse">Pending Hardware Swap</span>
            </div>
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-[40%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- BLOCK: Interactive Limitations & Future Work ---
const FutureWorkBoard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
      
      {/* Limitations (Chapter 6.2) */}
      <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[30px] shadow-2xl relative overflow-hidden group hover:border-red-500/30 transition-all">
        <div className="absolute top-0 left-0 w-48 h-48 bg-red-500/10 blur-[60px] pointer-events-none transition-colors" />
        <h4 className="text-red-400 font-black text-sm uppercase tracking-widest mb-6 relative z-10 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          Current Limitations
        </h4>
        <ul className="space-y-5 relative z-10">
          <li className="bg-black/50 p-4 rounded-2xl border border-white/5">
            <strong className="text-gray-200 block mb-1 text-xs uppercase tracking-widest">Thermal Bottleneck</strong>
            <p className="text-gray-400 text-xs font-light leading-relaxed m-0">The legacy L298N motor driver introduced significant thermal inefficiencies, reaching $74.2^\circ C$, restricting continuous high-torque assistance.</p>
          </li>
          <li className="bg-black/50 p-4 rounded-2xl border border-white/5">
            <strong className="text-gray-200 block mb-1 text-xs uppercase tracking-widest">Form Factor</strong>
            <p className="text-gray-400 text-xs font-light leading-relaxed m-0">The dual-power topology required to stabilize the sensors increases the physical footprint and wire-routing complexity of the wearable.</p>
          </li>
          <li className="bg-black/50 p-4 rounded-2xl border border-white/5">
            <strong className="text-gray-200 block mb-1 text-xs uppercase tracking-widest">Clinical Scope</strong>
            <p className="text-gray-400 text-xs font-light leading-relaxed m-0">As evaluation was constrained to bench testing for safety, the system currently lacks empirical data regarding human-device interface comfort under dynamic loads.</p>
          </li>
        </ul>
      </div>

      {/* Future Work (Chapter 6.3) */}
      <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[30px] shadow-2xl relative overflow-hidden group hover:border-sky-500/30 transition-all">
        <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 blur-[60px] pointer-events-none transition-colors" />
        <h4 className="text-sky-400 font-black text-sm uppercase tracking-widest mb-6 relative z-10 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          The Next Iteration
        </h4>
        <ul className="space-y-5 relative z-10">
          <li className="bg-black/50 p-4 rounded-2xl border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
            <strong className="text-white block mb-1 text-xs uppercase tracking-widest">Hardware Optimization</strong>
            <p className="text-gray-400 text-xs font-light leading-relaxed m-0">Transitioning to a modern MOSFET-based driver (BTS7960) to entirely eliminate thermal throttling bottlenecks.</p>
          </li>
          <li className="bg-black/50 p-4 rounded-2xl border border-white/5">
            <strong className="text-gray-200 block mb-1 text-xs uppercase tracking-widest">Structural Integration</strong>
            <p className="text-gray-400 text-xs font-light leading-relaxed m-0">Combining the dual-power harness and the Pi Zero into a single, custom-printed PCB to drastically reduce the wearable's physical footprint.</p>
          </li>
          <li className="bg-black/50 p-4 rounded-2xl border border-white/5">
            <strong className="text-gray-200 block mb-1 text-xs uppercase tracking-widest">Software Expansion</strong>
            <p className="text-gray-400 text-xs font-light leading-relaxed m-0">Integrating a Bluetooth Low Energy (BLE) module to develop a companion smartphone app, allowing physical therapists to adjust FSM thresholds wirelessly.</p>
          </li>
        </ul>
      </div>

    </div>
  );
};

// --- NEW BLOCK: Administrative Deliverables & Appendices ---
const AppendixBoard = () => {
  return (
    <div className="mb-16">
      <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" /> Project Administration & Appendices
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-8">
        To finalize the submission, the required appendices and documentation were compiled to ensure academic transparency and safety compliance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* GenAI Form */}
        <div className="bg-black/60 border border-white/10 p-6 rounded-3xl group hover:border-purple-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-purple-400 font-bold text-sm uppercase tracking-widest">GenAI Use Disclaimer</h4>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-[9px] font-mono rounded">Appendix B</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            Submitted alongside the final report to provide transparency regarding the use of Generative AI tools during project work.
          </p>
          <ul className="text-[10px] font-mono text-gray-500 space-y-2">
            <li className="flex justify-between"><span>Brainstorming & Idea Gen:</span> <span className="text-red-400">NO</span></li>
            <li className="flex justify-between"><span>Text Drafting Assistance:</span> <span className="text-emerald-400">YES</span></li>
            <li className="flex justify-between"><span>Code Debugging / Suggestions:</span> <span className="text-emerald-400">YES</span></li>
            <li className="flex justify-between"><span>Design Simulation:</span> <span className="text-emerald-400">YES</span></li>
          </ul>
        </div>

        {/* Risk Assessment */}
        <div className="bg-black/60 border border-white/10 p-6 rounded-3xl group hover:border-teal-500/50 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-teal-400 font-bold text-sm uppercase tracking-widest">Risk Assessment</h4>
            <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-[9px] font-mono rounded">Appendix C</span>
          </div>
          <p className="text-gray-400 text-xs leading-relaxed mb-4">
            A comprehensive matrix detailing the hazards associated with the physical prototyping of the exoskeleton and the specific control measures implemented.
          </p>
          <ul className="text-[10px] font-mono text-gray-500 space-y-2">
            <li className="border-b border-white/5 pb-2"><span className="text-gray-300">Hazard:</span> Thermal overheating of L298N IC.<br/><span className="text-teal-400">Control:</span> Isolate sensitive microelectronics.</li>
            <li className="border-b border-white/5 pb-2 pt-1"><span className="text-gray-300">Hazard:</span> Electrical Short (12V LiPo).<br/><span className="text-teal-400">Control:</span> Utilize isolated dual-power topology.</li>
            <li className="pt-1"><span className="text-gray-300">Hazard:</span> Joint Hyperextension.<br/><span className="text-teal-400">Control:</span> Hard-code absolute 15° safety threshold.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// --- NEW REPLACEMENT BLOCK 1: Socioeconomic Impact Board ---
const SocioeconomicImpactBoard = () => {
  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-teal-500/5 blur-[100px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-white/5 pb-6 relative z-10">
        <div>
          <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-[0_0_10px_#2dd4bf]" /> Market Dynamics & Disruption
          </h3>
          <h2 className="text-2xl font-bold text-white">Bridging the Socioeconomic Gap</h2>
        </div>
        <div className="bg-teal-500/10 border border-teal-500/30 px-4 py-2 rounded-xl mt-4 md:mt-0 flex flex-col items-end">
           <span className="text-gray-400 text-[10px] uppercase font-mono tracking-widest">Cost Reduction</span>
           <span className="text-teal-400 font-bold font-mono text-lg">&gt; 99%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
          <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest mb-4">The Market Failure</h4>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            The current landscape of wearable rehabilitation robotics is ideologically flawed. Advanced clinical orthoses like the Ottobock C-Brace deliver incredible results but rely entirely on closed-loop, proprietary hardware ecosystems that artificially inflate the cost to over $70,000. This restricts access exclusively to high-income demographics, defeating the purpose of inclusive healthcare.
          </p>
        </div>

        <div className="bg-teal-500/5 border border-teal-500/30 p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-500/20 blur-[40px] pointer-events-none" />
          <h4 className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-4 relative z-10">The Mynee Solution</h4>
          <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
            By circumventing computationally heavy predictive Machine Learning models in favor of a mathematically strict, deterministic Finite State Machine (FSM), Mynee achieves a clinical-grade sub-20ms latency using an $85.00 open-source hardware stack. This empirically proves that advanced rehabilitation can be engineered economically.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- NEW REPLACEMENT BLOCK 2: The Engineer's Crucible ---
const EngineeringCrucibleBoard = () => {
  return (
    <div className="mb-16">
      <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_#eab308]" /> Chapter 6.4: Personal Reflection
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-8">
        The development of the Mynee exoskeleton was as much a test of personal resilience as it was a rigorous engineering challenge. Transitioning this project from a theoretical white-box model into a physical, load-bearing orthosis required navigating a gauntlet of logistical and technical hurdles.
      </p>

      <div className="space-y-6">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border-l-4 border-l-orange-500 border-t border-r border-b border-white/10 p-6 rounded-r-3xl hover:bg-white/5 transition-colors">
          <h4 className="text-white font-bold text-sm mb-2">The Supply Chain Crisis</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            The most daunting initial challenge was procurement. Severe supply chain disruptions caused by geopolitical conflicts made sourcing specific high-torque actuators locally within Dubai nearly impossible. Overcoming this required traveling internationally to Pakistan to personally source components from College Road and Gowalmandi, adding immense logistical strain.
          </p>
        </div>

        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border-l-4 border-l-sky-500 border-t border-r border-b border-white/10 p-6 rounded-r-3xl hover:bg-white/5 transition-colors">
          <h4 className="text-white font-bold text-sm mb-2">Theory vs. Reality: The Fabrication Grind</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            Theoretical physics rarely translates perfectly to physical metal. Dealing with local welders to fabricate the custom U-brackets required constant oversight. I had to coordinate with nearly 20 different welders until the bracket was completed, only to have to repeat the entire process from scratch when the initial motor fried under load.
          </p>
        </div>

        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border-l-4 border-l-emerald-500 border-t border-r border-b border-white/10 p-6 rounded-r-3xl hover:bg-white/5 transition-colors">
          <h4 className="text-white font-bold text-sm mb-2">The Ultimate Takeaway</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            Pushing the prototype to its limits and diagnosing catastrophic thermal failures forced me to deeply investigate the nuanced relationship between a motor's RPM and human biomechanics. Ultimately, this project taught me that real-world engineering is rarely about perfect initial designs, but rather about grit and adaptability when things inevitably go wrong.
          </p>
        </div>
      </div>
    </div>
  );
};


const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week11Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={11} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Finalization</span>
                <span className="text-gray-500 text-xs font-mono">6 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 11: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">Reflections & Readiness.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                After 11 weeks of literature reviews, hardware integration, software tuning, and rigorous performance evaluation, the Mynee Exoskeleton project is functionally complete. This week is dedicated to packaging the final deliverables, compiling the appendices, and finalizing the presentation slides for the grading panel.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <h2 className="text-3xl text-white mt-12 mb-6">Summary of Contributions</h2>
              <p>The Mynee project successfully engineered and validated an accessible, open-architecture smart knee orthosis. By explicitly replacing expensive proprietary silicon with a Raspberry Pi Zero and high-level Python logic, the project achieved a highly responsive, deterministic Finite State Machine (FSM).</p>
              <p>The system successfully demonstrated an ultra-low latency response of 13.1 ms and a kinematic tracking mean absolute error of 1.34°, proving definitively that advanced, programmable rehabilitation technology can be manufactured at a fraction of current market costs.</p>

              <SocioeconomicImpactBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">Hardware Sourcing & Demo Status</h2>
              <DemoStatusBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">Limitations & Future Work</h2>
              <p>Despite fulfilling its core objectives, the initial prototype possesses distinct engineering constraints that must be acknowledged. Moving forward, the blueprint for the next iteration has been firmly established in Chapter 6 of the dissertation.</p>

              <FutureWorkBoard />

              <h2 className="text-3xl text-white mt-16 mb-8">Packaging the Deliverables</h2>
              <AppendixBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">The Engineer's Crucible (Theory vs. Reality)</h2>
              <EngineeringCrucibleBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Final Readiness</h2>
              <p>Looking back at Week 1, the idea of building an electromechanical exoskeleton from scratch felt borderline impossible. Now, staring at a functional, data-streaming prototype, I am incredibly proud of the engineering resilience it took to get here.</p>
              <p>The full technical report is compiled, the presentation slides are polished, and the logic is empirically verified.</p>
              <p>Bring on Week 12.</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-10">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 10
                </button>
              </Link>
              <Link href="/devlog/week-12">
                <button className="group flex items-center gap-3 px-8 py-3 bg-teal-500 hover:bg-teal-400 text-black rounded-full font-black transition-all shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:shadow-[0_0_30px_rgba(45,212,191,0.6)] active:scale-95">
                  Read Final Week 12 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Project Readiness</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Future Improvements</span></li>
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