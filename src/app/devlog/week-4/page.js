"use client";

import Sidebar from "../Sidebar";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// ==========================================
// REUSABLE UI BLOCKS
// ==========================================

const DocAttachment = ({ title, type, fileSize }) => (
  <motion.a href="#" whileHover={{ scale: 1.02 }} className="flex items-center justify-between p-5 mb-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-yellow-400 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'XLSX' || type === 'CSV' ? 'bg-green-100 text-green-600' : type === 'DOCX' ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'}`}>
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

const VisualAsset = ({ caption }) => (
  <div className="mb-8 group">
    <div className="w-full aspect-video bg-gray-900 rounded-2xl border border-gray-800 shadow-xl overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
      <span className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10">Updated Master Gantt Chart</span>
    </div>
    <p className="text-center text-xs text-gray-400 mt-3 font-light tracking-wide">{caption}</p>
  </div>
);

// --- NEW BLOCK: WBS Phase Board ---
const WBSBoard = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    {/* Phase 1 */}
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-sky-400 transition-all">
      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-black text-xs mb-4">1</div>
      <h4 className="text-gray-900 font-bold mb-2">Mechanical & Chassis</h4>
      <ul className="space-y-2 text-xs text-gray-500 font-mono">
        <li className="flex items-start gap-2"><span className="text-sky-500">■</span> CAD Modeling (Fusion 360)</li>
        <li className="flex items-start gap-2"><span className="text-sky-500">■</span> 3D Printing PETG Components</li>
        <li className="flex items-start gap-2"><span className="text-sky-500">■</span> Actuator/Motor Mounting</li>
      </ul>
    </div>
    {/* Phase 2 */}
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-yellow-400 transition-all">
      <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-black text-xs mb-4">2</div>
      <h4 className="text-gray-900 font-bold mb-2">Electronics & Sensors</h4>
      <ul className="space-y-2 text-xs text-gray-500 font-mono">
        <li className="flex items-start gap-2"><span className="text-yellow-500">■</span> Raspberry Pi I/O Setup</li>
        <li className="flex items-start gap-2"><span className="text-yellow-500">■</span> I2C IMU (MPU6050) Wiring</li>
        <li className="flex items-start gap-2"><span className="text-yellow-500">■</span> Analog FSR Integration</li>
      </ul>
    </div>
    {/* Phase 3 */}
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-400 transition-all">
      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xs mb-4">3</div>
      <h4 className="text-gray-900 font-bold mb-2">Software & Edge AI</h4>
      <ul className="space-y-2 text-xs text-gray-500 font-mono">
        <li className="flex items-start gap-2"><span className="text-emerald-500">■</span> Python Telemetry Scripting</li>
        <li className="flex items-start gap-2"><span className="text-emerald-500">■</span> Kalman Filter implementation</li>
        <li className="flex items-start gap-2"><span className="text-emerald-500">■</span> PID Control Loop Tuning</li>
      </ul>
    </div>
  </div>
);

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
// MAIN PAGE LAYOUT
// ==========================================
export default function Week4Log() {
  const [isMethodologyHoloActive, setIsMethodologyHoloActive] = useState(false);
  const [isLitReviewHoloActive, setIsLitReviewHoloActive] = useState(false);
  
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
        
        {/* SIDEBAR - Updated to Week 4 */}
        <Sidebar activeWeek={4} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full font-bold tracking-widest uppercase text-[10px] border border-yellow-500/30">Project Phase 1</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">5 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Week 4: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">The Architecture of Execution.</span>
              </h1>
            </div>
          </motion.header>

          {/* INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              With the theoretical framework and literature review firmly established last week, Week 4 was entirely about project management and logistics. A smart exoskeleton is a complex amalgamation of mechanical engineering, analog electronics, and high-level software. Without a rigorous plan, scope creep is inevitable.
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Before touching any hardware, I needed to lock in the Work Breakdown Structure (WBS), select a formal Software Development Methodology, and finalize Chapter 2 of the dissertation.
            </p>
          </motion.div>

          {/* SOFTWARE METHODOLOGY (Interactive Box) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setIsMethodologyHoloActive(true)} onHoverEnd={() => setIsMethodologyHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${isMethodologyHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Selecting a Software Methodology</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                While our <em>Research</em> methodology is Mixed Methods, our <em>Development</em> methodology requires a highly specific approach. You cannot apply standard software paradigms to a hardware project without causing friction. Therefore, I formally selected an <strong>Agile-Waterfall Hybrid (Hardware-Software Co-design)</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-4 font-medium text-gray-700">
                <li><span className="text-sky-600 font-bold">The Waterfall Element (Hardware):</span> Physical engineering is unforgiving. You cannot "iterate" a 3D-printed PETG chassis halfway through printing. The mechanical frame, actuator selection, and PCB wiring must follow a strict, sequential Waterfall approach: Design → Procure → Assemble.</li>
                <li><span className="text-emerald-600 font-bold">The Agile Element (Software):</span> Conversely, the Python telemetry scripts and PID control loops on the Raspberry Pi require immense flexibility. I will use Agile, operating in 1-week iterative "Sprints" to write, test, and tune the sensor fusion algorithms.</li>
              </ul>
              <p className="italic text-sm text-gray-500 mt-4">This hybrid approach ensures the physical exoskeleton is structurally sound before the iterative software intelligence is injected into it.</p>
            </div>
          </motion.div>

          {/* WORK BREAKDOWN STRUCTURE (WBS) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Work Breakdown Structure (WBS)</h3>
             <p className="text-lg text-gray-500 font-light leading-relaxed mb-6 px-4">
               To execute this Hybrid methodology, I translated the core project objectives into a strict Work Breakdown Structure. This divides the massive scope of Mynee into three highly focused, manageable development phases:
             </p>
             <WBSBoard />
          </motion.div>

          {/* GANTT CHART UPDATE */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16 px-4">
             <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-tighter">Timeline Alignment</h2>
             <p className="text-lg text-gray-500 font-light leading-relaxed mb-6">
               With the WBS defined, I updated the master Gantt chart to reflect our Agile software sprints overlapping with the final stages of our Waterfall hardware assembly. This visual roadmap ensures that by the time the chassis is printed and assembled, the foundational I2C sensor code is already written and ready for deployment.
             </p>
             <VisualAsset caption="Figure 4.1 - WBS-aligned Master Project Timeline." />
          </motion.div>

          {/* FINALIZING THE LITERATURE REVIEW */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setIsLitReviewHoloActive(true)} onHoverEnd={() => setIsLitReviewHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-gray-900 p-10 md:p-12 rounded-[40px] border border-gray-800 shadow-xl cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Finalizing Chapter 2</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-gray-300">
                Alongside the project management tasks, this week also marked the finalization of Chapter 2 (Literature Review). I synthesized the feedback from last week's draft, ensuring a seamless transition from the broad analysis of wearable robotics directly into the specific gap Mynee addresses.
              </p>
              <p className="text-gray-300">
                The chapter now conclusively proves that while Quasi-Direct Drive (QDD) actuators and complex sensor fusion exist in clinical settings, there is a profound lack of edge-processed, frugal alternatives. The theoretical groundwork is complete; it is time to transition into Phase 2: Execution.
              </p>
            </div>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Submitted Deliverables</h3>
            <DocAttachment title="Formal Software & Research Methodology" type="DOCX" fileSize="1.2 MB" />
            <DocAttachment title="Work Breakdown Structure (WBS)" type="XLSX" fileSize="500 KB" />
            <DocAttachment title="Finalized Chapter 2: Literature Review" type="PDF" fileSize="3.8 MB" />
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-3">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 3
              </button>
            </Link>
            
            <Link href="/devlog/week-5">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 5 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Project Planning</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Agile Methodology</span></li>
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