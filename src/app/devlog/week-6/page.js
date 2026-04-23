"use client";

import Sidebar from "../Sidebar";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// ==========================================
// ANIMATIONS & EFFECTS
// ==========================================
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

const holoHover = {
  initial: { scale: 1, y: 0, rotateX: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)", borderColor: "rgba(243, 244, 246, 1)" },
  hover: { scale: 1.015, y: -6, rotateX: -1, borderColor: "rgba(234, 179, 8, 0.6)", boxShadow: "0 30px 60px -15px rgba(234, 179, 8, 0.2), 0 10px 20px -5px rgba(234, 179, 8, 0.1)", transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 } }
};

const StealthTechDust = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(80)].map((_, i) => (
      <motion.div key={i} initial={{ opacity: 0.2 }} animate={{ y: [0, -40, 0], x: [0, Math.random() * 30 - 15, 0], opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 4 + Math.random() * 8, repeat: Infinity, delay: i * 0.05 }} className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.4)]" style={{ width: `${0.5 + Math.random() * 1.3}px`, height: `${0.5 + Math.random() * 1.3}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
    ))}
  </div>
);

const FooterDust = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => { setParticles([...Array(30)].map(() => ({ tx: `${Math.random() * 30 - 15}px`, dur: `${5 + Math.random() * 7}s`, del: `${Math.random() * 1}s`, size: `${1 + Math.random() * 1.5}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }))); }, []);
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <style>{`@keyframes floatFooterDust { 0%, 100% { transform: translate(0px, 0px); opacity: 0.1; } 50% { transform: translate(var(--tx), -30px); opacity: 0.8; } }`}</style>
      {particles.map((p, i) => (<div key={i} className="absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)] will-change-transform" style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatFooterDust ${p.dur} infinite ease-in-out ${p.del}` }} />))}
    </div>
  );
};

// ==========================================
// REUSABLE UI BLOCKS
// ==========================================
const DocAttachment = ({ title, type, fileSize }) => (
  <motion.a href="#" whileHover={{ scale: 1.02, y: -2 }} className="flex items-center justify-between p-5 mb-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-yellow-400 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'PDF' ? 'bg-red-100 text-red-500' : 'bg-blue-100 text-blue-500'}`}>
        {type}
      </div>
      <div>
        <h4 className="text-gray-900 font-bold group-hover:text-yellow-600 transition-colors">{title}</h4>
        <p className="text-gray-400 text-xs uppercase tracking-widest">{fileSize}</p>
      </div>
    </div>
    <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
  </motion.a>
);

const VisualAsset = ({ caption, label }) => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 group cursor-default">
    <div className="w-full aspect-video bg-gray-900 rounded-[30px] border border-gray-800 shadow-xl overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
      <span className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10 group-hover:text-yellow-500 transition-colors duration-500">{label}</span>
    </div>
    <p className="text-center text-xs text-gray-400 mt-4 font-light tracking-wide">{caption}</p>
  </motion.div>
);

const RequirementsTable = () => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 overflow-hidden rounded-[30px] border border-gray-200 shadow-sm bg-white overflow-x-auto cursor-default">
    <table className="w-full text-left text-sm min-w-[600px]">
      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-6 w-1/4">Requirement Type</th>
          <th className="p-6 w-1/2">Specification</th>
          <th className="p-6 w-1/4">Priority</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 font-light divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-sky-600">Functional</td>
          <td className="p-6 text-xs leading-relaxed">The Raspberry Pi must continuously poll the MPU6050 and FSR sensors at a minimum rate of 50Hz and adjust PWM duty cycle accordingly.</td>
          <td className="p-6"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold uppercase">High</span></td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-emerald-600">Non-Functional</td>
          <td className="p-6 text-xs leading-relaxed">Latency: Total end-to-end processing (from physical motion to motor response) must not exceed 100 milliseconds.</td>
          <td className="p-6"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold uppercase">High</span></td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-yellow-600">User Requirement</td>
          <td className="p-6 text-xs leading-relaxed">Passive Compliance: The system must autonomously infer intent based on natural movement without manual triggers, featuring a physical kill switch.</td>
          <td className="p-6"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold uppercase">Critical</span></td>
        </tr>
      </tbody>
    </table>
  </motion.div>
);

const UMLGrid = () => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 cursor-default">
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-400 transition-colors">
      <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Use Case Diagram</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-light">Maps the interaction between the primary actor (the User) and the system boundaries (Calibration, Actuation, Emergency Stop).</p>
    </div>
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-400 transition-colors">
      <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Class Diagram</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-light">Defines the Object-Oriented structure of the Python backend. Classes include <code>IMUSensor</code>, <code>PIDController</code>, and <code>MotorDriver</code>.</p>
    </div>
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-400 transition-colors">
      <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Sequence Diagram</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-light">Illustrates the chronological flow of data: FSR detects impact → triggers IMU read → passes to Kalman Filter → sends PWM to motor.</p>
    </div>
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-400 transition-colors">
      <h4 className="text-gray-900 font-bold mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500"></span> Activity Diagram</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-light">Charts the control logic flow, detailing the decision trees for distinguishing between "Stance Phase" and "Swing Phase" of the gait cycle.</p>
    </div>
  </motion.div>
);

// ==========================================
// MAIN PAGE LAYOUT
// ==========================================
export default function Week6Log() {
  const [evalHoloActive, setEvalHoloActive] = useState(false);
  const [reqHoloActive, setReqHoloActive] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 origin-left z-[100]" style={{ scaleX }} />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-8 pt-52 pb-32 gap-16 relative z-10">
        
        <Sidebar activeWeek={6} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full font-bold tracking-widest uppercase text-[10px] border border-yellow-500/30">Project Phase 2</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">5 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Week 6: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">UML & Prototype Evaluation.</span>
              </h1>
            </div>
          </motion.header>

          {/* INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              After achieving a successful "Sense-Compute-Actuate" loop in last week's Minimum Viable Prototype (MVP), Week 6 was dedicated to breaking it. Just because a motor spins on a workbench doesn't mean it's safe to strap to a human joint. 
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              This week focused heavily on <strong>Prototype Evaluation</strong>—stress-testing the logic, identifying critical failures, and fixing them. Once the logic was stabilized, I formalized the system's architecture through Software Requirements Specifications and UML Design Diagrams.
            </p>
          </motion.div>

          {/* PROTOTYPE EVALUATION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setEvalHoloActive(true)} onHoverEnd={() => setEvalHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${evalHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Prototype Evaluation & Refinement</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                Subjecting the MVP to continuous real-world movement revealed a critical flaw in the initial software logic. 
              </p>
              
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mt-4">
                <h4 className="text-red-800 font-black mb-2 uppercase text-xs tracking-widest">Failure: The Jitter Effect</h4>
                <p className="text-sm text-red-900 m-0">
                  During rapid movement, the raw accelerometer data from the MPU6050 spiked violently. Because the motor's PWM (speed) signal was directly mapped to this raw angle, the PG36 gear motor began "stuttering" erratically. If attached to a user's knee, this aggressive oscillation would cause severe discomfort or injury.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mt-4">
                <h4 className="text-emerald-800 font-black mb-2 uppercase text-xs tracking-widest">Refinement: Algorithmic Damping</h4>
                <p className="text-sm text-emerald-900 m-0">
                  To solve this, I completely rewrote the Python processing pipeline. I implemented a strict <strong>Kalman Filter</strong> to fuse the accelerometer and gyroscope data. The gyroscope now handles rapid, short-term angle changes (ignoring impact noise), while the accelerometer corrects long-term drift. The result is a buttery-smooth data stream and a safely damped motor response.
                </p>
              </div>
            </div>
          </motion.div>

          {/* REQUIREMENTS SPECIFICATION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setReqHoloActive(true)} onHoverEnd={() => setReqHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-8 bg-gray-900 p-10 md:p-12 rounded-[40px] border border-gray-800 shadow-xl cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Software Requirements Specification (SRS)</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-gray-300">
                To ensure the software meets the physical demands of the hardware, I drafted a formal SRS. This document acts as the final contract for what the code <em>must</em> do, separated into Functional (what the system does), Non-Functional (how well it does it), and User Needs.
              </p>
            </div>
          </motion.div>

          {/* SRS TABLE */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <RequirementsTable />
          </motion.div>

          {/* UML DIAGRAMS */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4 uppercase tracking-tighter">System Architecture (UML)</h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed mb-8 px-4">
               To map out the finalized logic and prevent spaghetti code, I generated the core Unified Modeling Language (UML) diagrams. These map the data flow from the hardware sensors, through the edge-compute node, out to the mechanical actuators.
            </p>
            
            <UMLGrid />
            <VisualAsset label="Insert Sequence Diagram Here" caption="Figure 6.1 - System Sequence Diagram detailing the chronological flow of telemetry data." />
          </motion.div>

          {/* REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Methodological Reflection</h2>
            <p>
              This week proved exactly why I chose a <strong>Hardware-Adapted Agile</strong> methodology in Week 5. If I had rigidly adhered to a Waterfall model, I would have assumed my math was perfect, assembled the entire exoskeleton, and discovered the devastating jitter effect only after it was strapped to my leg.
            </p>
            <p>
              By testing early and often, I was able to isolate the noise issue in code and deploy the Kalman filter before any physical risk occurred. The system is now stable, structurally sound on paper, and ready for full hardware integration next week.
            </p>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Submitted Deliverables</h3>
            <DocAttachment title="Software Requirements Specification (SRS)" type="PDF" fileSize="1.8 MB" />
            <DocAttachment title="Complete UML Diagrams Package" type="PDF" fileSize="4.2 MB" />
            <DocAttachment title="Design Chapter (Wireframes & Evaluation)" type="DOCX" fileSize="3.5 MB" />
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-5">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 5
              </button>
            </Link>
            
            <Link href="/devlog/week-7">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 7 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>

        </article>
      </div>

      {/* --- MEGA FOOTER --- */}
      <footer className="relative z-10 w-full bg-gray-950 border-t border-white/10 pt-20 pb-10 overflow-hidden">
        <FooterDust />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-yellow-500 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                <li><Link href="/sessions" className="hover:text-yellow-500 transition-colors">Sessions</Link></li>
                <li><Link href="/devlog" className="hover:text-yellow-500 transition-colors">Dev Log</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">System Architecture</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">UML Design</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">GitHub ↗</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">University ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
            <p>© 2026 MYNEE | Syed Arzanish</p>
            <p>Built with <span className="text-gray-300 font-medium">Next.js</span></p>
          </div>
        </div>
      </footer>
    </main>
  );
}