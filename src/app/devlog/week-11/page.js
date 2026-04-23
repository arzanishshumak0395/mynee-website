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
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'PDF' ? 'bg-red-100 text-red-500' : type === 'PPTX' ? 'bg-orange-100 text-orange-500' : type === 'MP4' ? 'bg-purple-100 text-purple-500' : 'bg-blue-100 text-blue-500'}`}>
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

// --- NEW BLOCK: Future Roadmap Grid ---
const FutureRoadmap = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-400 transition-colors">
      <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <h4 className="text-gray-900 font-bold mb-2">Hardware Optimization</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-light">Transitioning from the legacy L298N to a modern MOSFET-based driver (BTS7960) to entirely eliminate thermal throttling bottlenecks.</p>
    </div>
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-400 transition-colors">
      <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
      </div>
      <h4 className="text-gray-900 font-bold mb-2">Structural Integration</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-light">Combining the dual-power wiring harness and the Raspberry Pi Zero into a single, custom-printed PCB to drastically reduce the wearable's physical footprint.</p>
    </div>
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:border-yellow-400 transition-colors">
      <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
      </div>
      <h4 className="text-gray-900 font-bold mb-2">Software Expansion</h4>
      <p className="text-xs text-gray-500 leading-relaxed font-light">Integrating a Bluetooth module to develop a companion smartphone app, allowing physical therapists to adjust FSM thresholds wirelessly.</p>
    </div>
  </div>
);

// --- NEW BLOCK: Academic References ---
const AcademicReferences = () => (
  <div className="bg-[#1e1e1e] border border-white/10 rounded-[30px] p-8 mb-8 shadow-xl">
    <h4 className="text-gray-400 font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-yellow-500"></span> IEEE Formatted Citations
    </h4>
    <ul className="text-[11px] text-green-400 space-y-4 list-none pl-0 font-mono leading-relaxed">
      <li>[1] A. M. Dollar and H. Herr, "Lower extremity exoskeletons and active orthoses: Challenges and state-of-the-art," <span className="text-gray-400">IEEE Transactions on Robotics, vol. 24, no. 1, pp. 144-158, 2008.</span></li>
      <li>[2] S. Hussain et al., "Control of a robotic orthosis for gait rehabilitation," <span className="text-gray-400">Robotics and Autonomous Systems, vol. 61, no. 8, pp. 777-789, 2013.</span></li>
      <li>[3] A. J. Young and D. P. Ferris, "State of the art and future directions for lower limb robotic exoskeletons," <span className="text-gray-400">IEEE Transactions on Neural Systems and Rehabilitation Engineering, vol. 25, no. 2, pp. 171-182, 2017.</span></li>
    </ul>
  </div>
);

// ==========================================
// MAIN PAGE LAYOUT
// ==========================================
export default function Week11Log() {
  const [conclusionsHoloActive, setConclusionsHoloActive] = useState(false);
  const [limitationsHoloActive, setLimitationsHoloActive] = useState(false);
  
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
        
        <Sidebar activeWeek={11} />

        <article className="flex-1 max-w-3xl">
          
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full font-bold tracking-widest uppercase text-[10px] border border-yellow-500/30">Phase 3: Handover</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">7 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Week 11: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Final Conclusions & Handover.</span>
              </h1>
            </div>
          </motion.header>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              After 11 weeks of literature reviews, hardware integration, software tuning, and rigorous performance evaluation, the Mynee Exoskeleton project is functionally complete. 
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              This week is dedicated to packaging the final deliverables: drafting <strong>Chapter 6: Conclusions & Future Work</strong>, compiling the required Appendices (Risk Assessments and IEEE References), and finalizing the presentation slides and demo video for the grading panel.
            </p>
          </motion.div>

          {/* CONCLUSIONS SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setConclusionsHoloActive(true)} onHoverEnd={() => setConclusionsHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${conclusionsHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>6.1 Summary of Contributions</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                The Mynee project successfully engineered and validated an accessible, open-architecture smart knee orthosis. By explicitly replacing expensive proprietary silicon with a Raspberry Pi Zero and high-level Python logic, the project achieved a highly responsive, deterministic Finite State Machine (FSM). 
              </p>
              <p className="text-gray-900 font-medium">
                The system successfully demonstrated an ultra-low latency response of 13.1 ms and high kinematic accuracy, proving definitively that advanced, programmable rehabilitation technology can be manufactured at a fraction of current market costs.
              </p>
            </div>
          </motion.div>

          {/* LIMITATIONS & FUTURE WORK */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setLimitationsHoloActive(true)} onHoverEnd={() => setLimitationsHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-8 bg-gray-900 p-10 md:p-12 rounded-[40px] border border-gray-800 shadow-xl cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>6.2 Limitations</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-gray-300">
                Despite fulfilling its core objectives, the initial prototype possesses distinct engineering constraints that must be acknowledged. 
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
                <li><span className="text-yellow-500 font-bold">Thermal Bottleneck:</span> The reliance on the legacy L298N motor driver introduced significant thermal inefficiencies, restricting the system's ability to provide continuous, high-torque assistance.</li>
                <li><span className="text-yellow-500 font-bold">Form Factor:</span> The dual-power topology required to stabilize the sensors increases the physical footprint and wiring complexity of the wearable device.</li>
                <li><span className="text-yellow-500 font-bold">Clinical Scope:</span> As the evaluation was strictly constrained to bench testing for safety, the system lacks empirical data regarding human-device interface comfort during dynamic gait cycles.</li>
              </ul>
            </div>
          </motion.div>

          {/* FUTURE ROADMAP GRID */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">6.3 Future Work (The Next Iteration)</h3>
             <FutureRoadmap />
          </motion.div>

          {/* APPENDICES & REFERENCES */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4 uppercase tracking-tighter">Appendices & Documentation</h2>
             <p className="text-lg text-gray-500 font-light leading-relaxed mb-8 px-4">
               To finalize the submission, I compiled the required Appendices. This includes the GenAI Use Disclaimer form, ensuring complete academic transparency regarding code generation assistance, and the finalized Risk Assessment Document detailing the mechanical hard-stops engineered into the Mynee chassis.
             </p>
             <AcademicReferences />
             <VisualAsset label="Insert Embedded Demo Video Player Here" caption="Final Prototype Demonstration Video (Pending Week 12 Upload)" />
          </motion.div>

          {/* OVERALL REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Final Reflection & Readiness</h2>
            <p>
              Looking back at Week 1, the idea of building an exoskeleton from scratch felt borderline impossible. Now, staring at a functional, data-streaming prototype, I am incredibly proud of the engineering resilience it took to get here. 
            </p>
            <p>
              The full technical report is compiled, the presentation slides are polished, and the prototype is ready for demonstration. Bring on Week 12.
            </p>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Final Submission Deliverables</h3>
            <DocAttachment title="Mynee Major Project: Full Technical Report" type="PDF" fileSize="14.2 MB" />
            <DocAttachment title="Final Presentation Slides" type="PPTX" fileSize="8.5 MB" />
            <DocAttachment title="Appendices (Risk Assessment & GenAI Form)" type="PDF" fileSize="1.1 MB" />
            <DocAttachment title="Mynee Final Demonstration" type="MP4" fileSize="45.8 MB" />
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-10">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 10
              </button>
            </Link>
            
            <Link href="/devlog">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Return to Grid <span className="group-hover:translate-x-1 transition-transform">↑</span>
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
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Future Enhancements</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">PCB Integration</span></li>
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