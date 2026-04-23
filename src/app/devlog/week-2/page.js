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
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'DOCX' ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'}`}>
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
      <span className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10">Insert Gantt Chart Here</span>
    </div>
    <p className="text-center text-xs text-gray-400 mt-3 font-light tracking-wide">{caption}</p>
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
export default function Week2Log() {
  const [architectureHoloActive, setArchitectureHoloActive] = useState(false);
  const [ethicsHoloActive, setEthicsHoloActive] = useState(false);
  
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
        
        {/* SIDEBAR */}
        <Sidebar activeWeek={2} />

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
                Week 2: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Ethics & Architecture.</span>
              </h1>
            </div>
          </motion.header>

          {/* INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              Week 2 marked a massive milestone for Mynee: getting the official "green light." After submitting my Final Project Proposal, I had a highly productive meeting with my supervisor, Dr. Judhi. Having the proposal signed and approved was the catalyst I needed to transition from theoretical ideation into structured engineering and execution.
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              With the direction locked in, my focus this week shifted entirely to formalizing the system architecture, establishing a strict ethical safety framework, drafting Chapter 1 of the dissertation, and defining our precise objectives.
            </p>
          </motion.div>

          {/* AIM & OBJECTIVES (Rubric Requirement) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Finalizing Aim & Objectives</h2>
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-6">
              <h4 className="text-sm font-black text-yellow-600 uppercase tracking-widest mb-2">Primary Aim</h4>
              <p className="text-gray-700 italic m-0">"To design, develop, and evaluate a frugal, electro-mechanical smart knee brace capable of real-time sensor telemetry and physical gait assistance through edge-processed PID control loops."</p>
            </div>
            <p>To achieve this, I broke the project down into measurable objectives:</p>
            <ol className="list-decimal pl-6 space-y-2 font-medium text-gray-700">
              <li>Conduct a literature review on quasi-direct drive actuators and wearable biomechanics.</li>
              <li>Design the hardware architecture integrating a Raspberry Pi, IMU, and FSR sensors.</li>
              <li>Develop a local Python-based filtering algorithm to translate raw analog data into actionable telemetry.</li>
              <li>Evaluate system performance based on sensor latency, torque output, and material stress.</li>
            </ol>
          </motion.div>

          {/* SYSTEM ARCHITECTURE SECTION (INTERACTIVE BOX) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setArchitectureHoloActive(true)} onHoverEnd={() => setArchitectureHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${architectureHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Defining the Multi-Tiered Architecture</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                To prove that an electromechanical system can replicate the compliance of a high-end pneumatic exoskeleton, I had to solidify my hardware choices. The architecture of Mynee is now strictly divided into three distinct layers:
              </p>
              
              <ul className="list-none pl-0 space-y-6 my-6 font-medium text-gray-700">
                <li className="pl-4 border-l-2 border-yellow-500">
                  <span className="text-gray-900 font-black block mb-1">1. Mechanical & Actuation Layer</span>
                  The core of the system relies on <strong>PG36-555 Planetary Gear Motors (12V)</strong> driven by high-current <strong>IBT-2 (BTS7960) H-Bridges</strong>. This setup will be housed within a custom 3D-printed PETG frame designed to align flawlessly with the biological knee joint, generating the 5-10 Nm of torque required to assist with sit-to-stand motions.
                </li>
                <li className="pl-4 border-l-2 border-indigo-500">
                  <span className="text-gray-900 font-black block mb-1">2. Sensor & Perception Layer</span>
                  To achieve accurate "intent recognition," the system will use a sensor fusion approach. <strong>MPU6050 IMUs</strong> will track the spatial angle of the leg, while <strong>Force Sensitive Resistors (FSRs)</strong> placed in the footwear will identify critical gait phases (Stance vs. Swing).
                </li>
                <li className="pl-4 border-l-2 border-slate-800">
                  <span className="text-gray-900 font-black block mb-1">3. Compute & Control Layer</span>
                  Instead of a basic microcontroller, the brain of Mynee will be a <strong>Raspberry Pi</strong>. This allows for complex, real-time Python/C++ processing. It will run a Kalman Filter to clean sensor noise and a PID (Proportional-Integral-Derivative) controller to dynamically regulate motor speed and torque.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* PROJECT MANAGEMENT & GANTT */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Project Planning & WBS</h2>
            <p>
              To ensure I don't get lost in the weeds of coding, I formalized a strict Work Breakdown Structure (WBS) and mapped it to a Gantt chart. The project is now phased logically:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-8 font-medium text-gray-700">
              <li><strong>Design Phase:</strong> Finalizing CAD models for the leg brace and motor mounts in Fusion 360.</li>
              <li><strong>Subsystem Testing:</strong> Successfully reading raw IMU/FSR data and independently spinning the DC motors via code.</li>
              <li><strong>Integration:</strong> Merging the electronics onto the physical 3D-printed frame.</li>
              <li><strong>Control Tuning:</strong> Calibrating the PID loop so the robot moves <em>with</em> the user, not against them.</li>
            </ol>
            <VisualAsset caption="Figure 2.1 - Mynee 12-Week Development Gantt Chart." />
          </motion.div>

          {/* ETHICS AND SAFETY SECTION (INTERACTIVE BOX) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setEthicsHoloActive(true)} onHoverEnd={() => setEthicsHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${ethicsHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Ethical Guardrails & Physical Safety</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                Because the device actively applies torque to a human joint, safety cannot be an afterthought. This week I completed the university Ethics Form, detailing how Mynee mitigates severe physical risks:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-medium text-gray-700">
                <li><strong>Mechanical Hard-Stops:</strong> Physical barriers engineered into the 3D-printed frame to make joint hyperextension physically impossible, regardless of software failure.</li>
                <li><strong>Emergency Kill Switch:</strong> A hardware interrupt accessible directly to the user that instantly cuts power from the 3S LiPo battery to the motor drivers.</li>
                <li><strong>Software Limits:</strong> Aggressive limits within the PID control loop to prevent sudden jerks.</li>
                <li><strong>Data Privacy:</strong> By leveraging edge computing on the Raspberry Pi, all biometric data is processed locally. Nothing is sent to a cloud server, ensuring complete user privacy and anonymity.</li>
              </ul>
            </div>
          </motion.div>

          {/* DRAFTING CHAPTER 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Drafting Chapter 1: Introduction</h2>
            <p>
              With the proposal and ethics cleared, I began drafting the first chapter of my dissertation. This chapter serves as the anchor for the entire project. I focused the <em>Background</em> section on the rising prevalence of Osteoarthritis and the limitations of current passive supports. 
            </p>
            <p>
              Writing this draft forced me to clearly articulate the <em>Scope</em> of the research—acknowledging that while this is a functional prototype, it is not a medical-grade final product, but rather a proof-of-concept for localized edge-AI in frugal biomechanics.
            </p>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Submitted Deliverables</h3>
            <DocAttachment title="Final Project Proposal & Plan" type="PDF" fileSize="1.5 MB" />
            <DocAttachment title="Signed Ethics Approval Form" type="PDF" fileSize="800 KB" />
            <DocAttachment title="Chapter 1: Introduction Draft" type="DOCX" fileSize="2.1 MB" />
          </motion.div>

          {/* REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Reflection</h2>
            <p>
              This week brought a profound realization: building an exoskeleton is not just about raw power; it’s about control and empathy. A pneumatic system is naturally "squishy" and forgiving, whereas a geared DC motor is rigid and aggressive. 
            </p>
            <p>
              The true engineering challenge of Mynee won't be making the motor turn—it will be writing an algorithm intelligent enough to make that motor feel invisible until the exact moment the user needs help standing up. With the proposal signed and the ethics cleared, it is finally time to start building.
            </p>
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-1">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Week 1
              </button>
            </Link>
            
            <Link href="/devlog/week-3">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 3 
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
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Biomechanics</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">PID Control</span></li>
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