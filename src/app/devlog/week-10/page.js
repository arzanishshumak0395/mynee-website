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
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'CSV' ? 'bg-green-100 text-green-600' : type === 'DOCX' ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'}`}>
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

// --- NEW BLOCK: Empirical Results Table ---
// --- NEW BLOCK: Empirical Results Table ---
const MetricsTable = () => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 overflow-hidden rounded-[30px] border border-gray-200 shadow-sm bg-white overflow-x-auto cursor-default">
    <table className="w-full text-left text-sm min-w-[600px]">
      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-6 w-1/4">Evaluation Metric</th>
          <th className="p-6 w-1/2">Recorded Result</th>
          <th className="p-6 w-1/4">Performance vs Baseline</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 font-light divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-sky-600">System Latency</td>
          <td className="p-6 text-xs leading-relaxed">
            Total Mean Latency: <strong>13.1 ms</strong><br/>
            <span className="text-gray-400">(FSR Polling: 4.2ms | I2C Read: 6.8ms | Logic: 2.1ms)</span>
          </td>
          <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Exceptional</span></td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-emerald-600">Kinematic Accuracy</td>
          <td className="p-6 text-xs leading-relaxed">
            Mean Absolute Error (MAE): <strong>1.34°</strong> against physical goniometer during 0° to 90° flexion sweep.
          </td>
          <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Pass</span></td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-red-600">Thermal Dissipation</td>
          <td className="p-6 text-xs leading-relaxed">
            L298N driver reached <strong>74.2°C</strong> after 5 minutes of continuous stall-torque load.
          </td>
          <td className="p-6"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold uppercase">Critical Limit</span></td>
        </tr>
      </tbody>
    </table>
  </motion.div>
);
// --- NEW BLOCK: Economic Feasibility Table ---
const CostTable = () => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 overflow-hidden rounded-[30px] border border-gray-200 shadow-sm bg-white overflow-x-auto cursor-default">
    <table className="w-full text-left text-sm min-w-[600px]">
      <thead className="bg-gray-900 border-b border-gray-800 text-gray-300 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-6 w-1/3">Solution / Device</th>
          <th className="p-6 w-1/3">Primary Application</th>
          <th className="p-6 w-1/3">Market Cost (USD)</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 font-light divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-gray-800">Ottobock C-Brace</td>
          <td className="p-6 text-xs">Medical Rehabilitation (Clinical)</td>
          <td className="p-6 text-xs font-mono text-red-600">~$70,000+</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-gray-800">Dnsys Z1 Exosuit</td>
          <td className="p-6 text-xs">Recreational / Athletic</td>
          <td className="p-6 text-xs font-mono text-orange-500">~$700+</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors bg-yellow-50/30">
          <td className="p-6 font-bold text-yellow-700">Mynee Prototype</td>
          <td className="p-6 text-xs font-medium">Medical Rehabilitation (Frugal Edge-AI)</td>
          <td className="p-6 text-xs font-mono font-bold text-green-600">$85.00 (BOM)</td>
        </tr>
      </tbody>
    </table>
  </motion.div>
);

// ==========================================
// MAIN PAGE LAYOUT
// ==========================================
export default function Week10Log() {
  const [resultsHoloActive, setResultsHoloActive] = useState(false);
  const [limitationsHoloActive, setLimitationsHoloActive] = useState(false);
  const [marketHoloActive, setMarketHoloActive] = useState(false);
  
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
        
        <Sidebar activeWeek={10} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full font-bold tracking-widest uppercase text-[10px] border border-yellow-500/30">Phase 3: QA & Evaluation</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">8 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Week 10: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Results & Empirical Analysis.</span>
              </h1>
            </div>
          </motion.header>

          {/* INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              Engineering is a discipline of proof. Building a functional smart exoskeleton is an achievement, but validating its performance against established biomechanical baselines is what transitions this project into a true medical technology study.
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              This week, I executed the rigorous bench-test scenarios established in Week 9. The objective was to generate the empirical data necessary to draft <strong>Chapter 5: Results and Discussion</strong> of my dissertation, focusing on system effectiveness, hard engineering limitations, and market viability.
            </p>
          </motion.div>

          {/* EXPERIMENTAL RESULTS SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setResultsHoloActive(true)} onHoverEnd={() => setResultsHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-8 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${resultsHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>5.1 Performance Analysis & Success Criteria</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                The performance of the Raspberry Pi Zero and the Python Finite State Machine (FSM) vastly exceeded my initial expectations, proving the efficacy of edge-computed robotics.
              </p>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mt-4">
                <h4 className="text-emerald-800 font-black mb-2 uppercase text-xs tracking-widest">Highlight: Ultra-Low Latency</h4>
                <p className="text-sm text-emerald-900 m-0">
                  In human biomechanics, neuromuscular reaction times typically range from 150 to 300 milliseconds. The Mynee system achieved a total mean latency (from FSR foot-strike to PWM motor generation) of exactly <strong>13.1 milliseconds</strong>. This means the mechanical actuation feels entirely instantaneous and natural to the user.
                </p>
              </div>
            </div>
          </motion.div>

          {/* METRICS TABLE */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <MetricsTable />
             <VisualAsset label="Insert Oscilloscope / Goniometer Line Graph Here" caption="Figure 10.1 - Plot showing MPU6050 Complementary Filter tracking true mechanical angles." />
          </motion.div>

          {/* LIMITATIONS SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setLimitationsHoloActive(true)} onHoverEnd={() => setLimitationsHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-red-50/50 p-10 md:p-12 rounded-[40px] border border-red-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${limitationsHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-red-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>5.3 Discussion: System Limitations</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-red-800">
                While the software logic is robust, testing exposed distinct physical constraints in the hardware architecture that must be documented.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-sm text-red-900">
                <li><strong>Thermal Throttling:</strong> As anticipated in earlier logs, the legacy L298N motor driver is highly inefficient under heavy load. The Bipolar Junction Transistors (BJTs) hit <strong>74.2°C</strong> within 5 minutes of stall-torque testing. This restricts the current prototype from continuous, high-load clinical use.</li>
                <li><strong>Wiring Bulk:</strong> Implementing the Dual Power Topology (separating 5V logic from 12V actuation) successfully fixed our EMI sensor noise, but it significantly increased the physical wiring footprint of the wearable device.</li>
              </ul>
            </div>
          </motion.div>

          {/* COMPARISON WITH RELATED WORK */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setMarketHoloActive(true)} onHoverEnd={() => setMarketHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-8 bg-gray-900 p-10 md:p-12 rounded-[40px] border border-gray-800 shadow-xl cursor-default"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>5.4 Economic Feasibility & Related Work</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-gray-300">
                The primary objective of Mynee was to bridge the massive socioeconomic gap in wearable robotics. To validate this, I compiled the final Bill of Materials (BOM) and benchmarked it against both premium clinical orthoses and affordable recreational exosuits.
              </p>
              <p className="text-gray-300">
                The results decisively prove that the prohibitive costs of current medical orthoses are a product of proprietary, closed-loop business models rather than strict engineering necessities.
              </p>
            </div>
          </motion.div>

          {/* COST TABLE */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <CostTable />
          </motion.div>

          {/* PROJECT REVIEW REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Overall Project Reflection</h2>
            <p>
              Reviewing the full lifecycle of this project—from the initial Planning and Design phases to the ultimate Implementation and Evaluation—has been incredibly rewarding. 
            </p>
            <p>
              Mynee successfully replicates the threshold-based reactive control of a $70,000 clinical device using an $85 hardware stack and open-source Python logic. While it has thermal constraints, it undeniably achieves its core aim of demonstrating frugal innovation in biomechatronics.
            </p>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Submitted Deliverables</h3>
            <DocAttachment title="Chapter 5: Results & Discussion" type="DOCX" fileSize="4.1 MB" />
            <DocAttachment title="Raw Telemetry Data (Latency & Angle)" type="CSV" fileSize="850 KB" />
            <DocAttachment title="Mynee Prototype Demonstration Video" type="DOCX" fileSize="(External Link)" />
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-9">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 9
              </button>
            </Link>
            
            <Link href="/devlog/week-11">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 11 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>

        </article>
      </div>

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
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Empirical Data</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Market Analysis</span></li>
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