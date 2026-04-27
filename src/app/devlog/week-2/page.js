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

const DocAttachment = ({ title, type, fileSize, link = "#" }) => (
  <motion.a href={link} target={link !== "#" ? "_blank" : "_self"} rel="noopener noreferrer" whileHover={{ scale: 1.02 }} className="flex items-center justify-between p-5 mb-8 bg-[#0a0a0a]/50 border border-white/10 rounded-2xl shadow-sm hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:border-teal-500/50 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'XLSX' || type === 'CSV' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : type === 'DOCX' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
        {type}
      </div>
      <div>
        <h4 className="text-gray-200 font-bold group-hover:text-teal-400 transition-colors">{title}</h4>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest">{fileSize}</p>
      </div>
    </div>
    <svg className="w-5 h-5 text-gray-500 group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
  </motion.a>
);

// FIX: Removed aspect-video and object-cover to prevent cropping. Now uses object-contain.
const VisualAsset = ({ imageSrc, caption }) => (
  <div className="mb-12 group">
    <div className="w-full bg-[#0a0a0a]/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex items-center justify-center group-hover:border-teal-500/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] p-4 md:p-8">
      {imageSrc ? (
        <img src={imageSrc} alt={caption} className="w-full h-auto max-h-[80vh] object-contain rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
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

// --- UPDATED: Highly Interactive Tech Stack & Resources ---
const TechStackBoard = () => {
  const staggerList = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      
      {/* Hardware Card */}
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true }}
        className="group relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[30px] shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 blur-[60px] pointer-events-none group-hover:bg-teal-500/20 transition-colors duration-700" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
            </div>
            <h4 className="text-white font-black text-xl tracking-tight group-hover:text-teal-400 transition-colors">Hardware Architecture</h4>
          </div>

          <motion.div variants={staggerList} className="space-y-3">
            {[
              { title: "Raspberry Pi Zero", desc: "(Edge Compute)" },
              { title: "MPU6050 IMU", desc: "& Analog FSRs" },
              { title: "L298N", desc: "Dual H-Bridge Driver" },
              { title: "PG36-555", desc: "Planetary Gear Motors" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={staggerItem} whileHover={{ scale: 1.03, x: 5 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/50 hover:bg-teal-500/10 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)] transition-all cursor-default group/item">
                <div className="w-2 h-2 bg-teal-500 rounded-full shadow-[0_0_8px_#2dd4bf] group-hover/item:animate-ping" />
                <div className="text-sm"><strong className="text-gray-200 group-hover/item:text-teal-300 transition-colors">{item.title}</strong> <span className="text-gray-500 font-light">{item.desc}</span></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Software Card */}
      <motion.div 
        initial="hidden" whileInView="show" viewport={{ once: true }}
        className="group relative bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[30px] shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-48 h-48 bg-yellow-500/10 blur-[60px] pointer-events-none group-hover:bg-yellow-500/20 transition-colors duration-700" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h4 className="text-white font-black text-xl tracking-tight group-hover:text-yellow-400 transition-colors">Software & Fabrication</h4>
          </div>

          <motion.div variants={staggerList} className="space-y-3">
            {[
              { title: "Python 3", desc: "(FSM Logic & PID Control)" },
              { title: "Thonny IDE", desc: "(Edge Debugging)" },
              { title: "Iron Welding", desc: "& Frame Fabrication" },
              { title: "PETG 3D Printing", desc: "(Enclosures)" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={staggerItem} whileHover={{ scale: 1.03, x: 5 }} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all cursor-default group/item">
                <div className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_8px_#facc15] group-hover/item:animate-ping" />
                <div className="text-sm"><strong className="text-gray-200 group-hover/item:text-yellow-300 transition-colors">{item.title}</strong> <span className="text-gray-500 font-light">{item.desc}</span></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const holoHover = {
  initial: { scale: 1, y: 0, rotateX: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.1)" },
  hover: { scale: 1.015, y: -6, rotateX: -1, borderColor: "rgba(45, 212, 191, 0.4)", boxShadow: "0 30px 60px -15px rgba(45, 212, 191, 0.15), 0 10px 20px -5px rgba(45, 212, 191, 0.1)", transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 } }
};

export default function Week2Log() {
  const [architectureHoloActive, setArchitectureHoloActive] = useState(false);
  const [ethicsHoloActive, setEthicsHoloActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={2} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 1</span>
                <span className="text-gray-500 text-xs font-mono">5 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 2: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">Ethics & Architecture.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Week 2 marked a massive milestone for Mynee: getting the official "green light." After submitting my Final Project Proposal, I had a highly productive meeting with my supervisor, Dr. Judhi. Having the proposal signed and approved was the catalyst I needed to transition from theoretical ideation into structured engineering and execution.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <p>With the direction locked in, my focus this week shifted entirely to formalizing the system architecture, establishing a strict ethical safety framework, defining our precise objectives, and planning out the exact hardware and software resources required.</p>

              <h2 className="text-3xl text-white mt-12 mb-6">Finalizing Aim & Objectives</h2>
              <div className="bg-[#0a0a0a]/60 p-8 rounded-3xl border border-white/10 shadow-sm mb-6">
                <h4 className="text-xs font-black text-teal-500 uppercase tracking-widest mb-4">Primary Aim</h4>
                <p className="text-gray-300 italic m-0">"To design, develop, and evaluate a frugal, electro-mechanical smart knee brace capable of real-time sensor telemetry and physical gait assistance through edge-processed PID control loops."</p>
              </div>
              <p>To achieve this, I broke the project down into measurable objectives:</p>
              <ol className="list-decimal pl-6 space-y-4 font-medium text-gray-300 mb-12">
                <li>Conduct a literature review on quasi-direct drive actuators and wearable biomechanics.</li>
                <li>Design the hardware architecture integrating a Raspberry Pi, IMU, and FSR sensors.</li>
                <li>Develop a local Python-based filtering algorithm to translate raw analog data into actionable telemetry.</li>
                <li>Evaluate system performance based on sensor latency, torque output, and material stress.</li>
                <li>Analyze the economic feasibility and production costs against commercial alternatives.</li>
              </ol>

              <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => setArchitectureHoloActive(true)} onHoverEnd={() => setArchitectureHoloActive(false)}
                className="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-white/10 cursor-default my-12"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 rounded-[40px] pointer-events-none transition-opacity duration-700 ${architectureHoloActive ? "opacity-10" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(45,212,191,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.2) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Defining the Multi-Tiered Architecture</h2>
                <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
                  <p>To prove that an electromechanical system can replicate the compliance of a high-end pneumatic exoskeleton, I had to solidify my hardware choices. The architecture of Mynee is now strictly divided into three distinct layers:</p>
                  <ul className="list-none pl-0 space-y-6 my-6 font-medium text-gray-300">
                    <li className="pl-4 border-l-2 border-yellow-500">
                      <span className="text-yellow-400 font-bold block mb-1">1. Mechanical & Actuation Layer</span>
                      The core of the system relies on <strong>PG36-555 Planetary Gear Motors (12V)</strong> driven by high-current <strong>L298N H-Bridges</strong>. This setup will be housed within a fabricated iron frame and PETG components designed to align flawlessly with the biological knee joint, generating the 5-10 Nm of torque required to assist with sit-to-stand motions.
                    </li>
                    <li className="pl-4 border-l-2 border-emerald-500">
                      <span className="text-emerald-400 font-bold block mb-1">2. Sensor & Perception Layer</span>
                      To achieve accurate "intent recognition," the system will use a sensor fusion approach. <strong>MPU6050 IMUs</strong> will track the spatial angle of the leg, while <strong>Force Sensitive Resistors (FSRs)</strong> placed in the footwear will identify critical gait phases (Stance vs. Swing).
                    </li>
                    <li className="pl-4 border-l-2 border-teal-500">
                      <span className="text-teal-400 font-bold block mb-1">3. Compute & Control Layer</span>
                      Instead of a basic microcontroller, the brain of Mynee will be a <strong>Raspberry Pi Zero</strong>. This allows for complex, real-time Python processing. It will run a Kalman Filter to clean sensor noise and a PID (Proportional-Integral-Derivative) controller to dynamically regulate motor speed and torque.
                    </li>
                  </ul>
                </div>
              </motion.div>

              <h2 className="text-3xl text-white mt-16 mb-8">Tech Stack & Resources</h2>
              <TechStackBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Work Breakdown Structure (WBS)</h2>
              <p>To ensure I don't get lost in the weeds of coding or fabrication, I formalized a strict 7-Phase Work Breakdown Structure (WBS). The project is now sequenced logically from inception to the final demonstration:</p>
              
              <ol className="list-decimal pl-6 space-y-2 mb-8 font-medium text-gray-300">
                <li><strong>Project Planning:</strong> Problem definition, literature review, aims & objectives.</li>
                <li><strong>System Design:</strong> Box models, morphological charts, hardware specifications.</li>
                <li><strong>Prototyping:</strong> Component sourcing, logic mapping, and bench testing the motors.</li>
                <li><strong>Fabrication:</strong> Frame welding, U-bracket assembly, and 3D printing enclosures.</li>
                <li><strong>Software:</strong> Pi OS setup, I2C IMU configuration, and writing the Python FSM.</li>
                <li><strong>Evaluation:</strong> Testing step response, kinematic accuracy, and thermal stability.</li>
                <li><strong>Deliverables:</strong> Compiling the technical report, demo video, and presentation.</li>
              </ol>
              
              <VisualAsset imageSrc="/WBS.png" caption="Figure 2.1 - Mynee 7-Phase Work Breakdown Structure." />

              <h2 className="text-3xl text-white mt-16 mb-6">Master Gantt Chart</h2>
              <p>With the WBS defined, I mapped the timeline out into a Master Gantt chart to ensure overlapping tasks (like writing software while the mechanical frame is being welded) are tracked accurately across the 12-week module.</p>
              
              <VisualAsset imageSrc="/Gantt Chart.png" caption="Figure 2.2 - Mynee 12-Week Development Gantt Chart." />


              <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => setEthicsHoloActive(true)} onHoverEnd={() => setEthicsHoloActive(false)}
                className="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-white/10 cursor-default my-12"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 rounded-[40px] pointer-events-none transition-opacity duration-700 ${ethicsHoloActive ? "opacity-10" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(239,68,68,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.15) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Ethical Guardrails & Physical Safety</h2>
                <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
                  <p>Because the device actively applies torque to a human joint, safety cannot be an afterthought. This week I completed the university Ethics Form, detailing how Mynee mitigates severe physical risks:</p>
                  <ul className="list-disc pl-6 space-y-2 font-medium text-gray-300">
                    <li><strong>Mechanical Hard-Stops:</strong> Physical barriers engineered into the frame to make joint hyperextension physically impossible, regardless of software failure.</li>
                    <li><strong>Emergency Kill Switch:</strong> A hardware interrupt accessible directly to the user that instantly cuts power from the 12V LiPo battery to the motor drivers.</li>
                    <li><strong>Software Limits:</strong> Aggressive limits within the PID control loop to prevent sudden jerks.</li>
                    <li><strong>Data Privacy:</strong> By leveraging edge computing on the Raspberry Pi, all biometric data is processed locally. Nothing is sent to a cloud server, ensuring complete user privacy and anonymity.</li>
                  </ul>
                </div>
              </motion.div>

              <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mt-12 mb-6">Submitted Deliverables</h3>
              <DocAttachment title="Final Project Proposal & Plan" type="PDF" fileSize="1.5 MB" link="/Project Proposal.pdf" />

              <h2 className="text-3xl text-white mt-16 mb-6">Reflection</h2>
              <p>This week brought a profound realization: building an exoskeleton is not just about raw power; it’s about control and empathy. A pneumatic system is naturally "squishy" and forgiving, whereas a geared DC motor is rigid and aggressive.</p>
              <p>The true engineering challenge of Mynee won't be making the motor turn—it will be writing an algorithm intelligent enough to make that motor feel invisible until the exact moment the user needs help standing up. With the proposal signed, the WBS mapped, and the ethics cleared, it is finally time to start building.</p>
            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-1">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 1
                </button>
              </Link>
              <Link href="/devlog/week-3">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 3 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Biomechanics</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Edge Computing</span></li>
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