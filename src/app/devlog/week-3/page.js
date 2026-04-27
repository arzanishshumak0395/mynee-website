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

const MethodologyTable = () => (
  <div className="mb-12 overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0a]/50 overflow-x-auto">
    <table className="w-full text-left text-sm min-w-[600px]">
      <thead className="bg-white/5 border-b border-white/10 text-teal-400 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-5 w-1/4">Methodology</th>
          <th className="p-5 w-1/4">Core Focus</th>
          <th className="p-5 w-1/2">Application to Mynee Exoskeleton</th>
        </tr>
      </thead>
      <tbody className="text-gray-300 font-light divide-y divide-white/5">
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100">Quantitative</td>
          <td className="p-5 text-gray-400">Numerical data, objective measurements, telemetry.</td>
          <td className="p-5 text-xs leading-relaxed text-gray-400">Measuring specific IMU flexion angles, calculating actuator torque output (Nm), and tracking algorithm latency (ms).</td>
        </tr>
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100">Qualitative</td>
          <td className="p-5 text-gray-400">Subjective feedback, user experience, observations.</td>
          <td className="p-5 text-xs leading-relaxed text-gray-400">Assessing physical comfort of the neoprene sleeve, perceived ease of walking, and user confidence during sit-to-stand motions.</td>
        </tr>
        <tr className="hover:bg-teal-500/10 transition-colors bg-teal-500/5">
          <td className="p-5 font-bold text-teal-400">Mixed Methods</td>
          <td className="p-5 text-teal-200/80">Integration of both hard data and user experience.</td>
          <td className="p-5 text-xs leading-relaxed font-medium text-teal-100"><strong>*Chosen Approach*</strong> Correlating hard telemetry data (PID torque curves) with subjective user feedback to ensure the brace is both powerful and comfortable.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// --- OVERHAULED: Literature Review Summary Table from Official Report ---
const LiteratureTable = () => (
  <div className="mb-12 overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-[#0a0a0a]/50 overflow-x-auto">
    <table className="w-full text-left text-sm min-w-[700px]">
      <thead className="bg-white/5 border-b border-white/10 text-teal-400 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-5 w-1/4">Research Domain</th>
          <th className="p-5 w-1/3">Key Findings & Academic Citation</th>
          <th className="p-5 w-5/12">Identified Gap / Limitation</th>
        </tr>
      </thead>
      <tbody className="text-gray-300 font-light divide-y divide-white/5">
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100 text-xs">Control Logic & FSMs</td>
          <td className="p-5 text-xs leading-relaxed text-gray-400">Reactive Finite State Machines (FSMs) triggered by strict sensor thresholds offer low-latency, deterministic control <span className="text-teal-500 font-mono">(Wang et al., 2022)</span>.</td>
          <td className="p-5 text-xs leading-relaxed text-red-400 font-medium">Predictive Machine Learning (ML) algorithms require immense computational overhead, making them highly susceptible to latency on accessible hardware <span className="text-gray-500 italic">(Baud et al., 2021)</span>.</td>
        </tr>
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100 text-xs">Microcomputing & Edge AI</td>
          <td className="p-5 text-xs leading-relaxed text-gray-400">The evolution of Single-Board Computers (SBCs) like the Raspberry Pi enables real-time edge processing without proprietary ASICs <span className="text-teal-500 font-mono">(Razmi & Shojaei, 2026)</span>.</td>
          <td className="p-5 text-xs leading-relaxed text-red-400 font-medium">Premium clinical-grade devices (e.g., Ottobock C-Brace) rely entirely on closed-loop proprietary hardware, artificially inflating costs to $70,000+.</td>
        </tr>
        <tr className="hover:bg-white/5 transition-colors">
          <td className="p-5 font-bold text-gray-100 text-xs">Joint Biomechanics</td>
          <td className="p-5 text-xs leading-relaxed text-gray-400">The knee requires peak torque during the stance phase (sit-to-stand) and a frictionless, zero-impedance state during the swing phase <span className="text-teal-500 font-mono">(Farah et al., 2019; Tucker et al., 2015)</span>.</td>
          <td className="p-5 text-xs leading-relaxed text-red-400 font-medium">Affordable recreational exoskeletons (e.g., Dnsys Z1) utilize rigid kinetic profiles unsuitable for patient-specific therapeutic rehabilitation.</td>
        </tr>
      </tbody>
    </table>
  </div>
);

// --- NEW BLOCK: Research Questions ---
const ResearchQuestionsBoard = () => (
  <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[30px] shadow-2xl hover:border-emerald-500/30 transition-all duration-500 mb-16 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-700" />
    <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-8">Core Research Questions</h3>
    <ul className="space-y-6 relative z-10">
      <li className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xs shrink-0 border border-emerald-500/30">1</div>
        <p className="text-gray-300 font-light leading-relaxed">How effectively can a low-cost Single-Board Computer (Raspberry Pi Zero) execute real-time deterministic Finite State Machines (FSMs) without exceeding the 20ms human neuromuscular latency threshold?</p>
      </li>
      <li className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xs shrink-0 border border-emerald-500/30">2</div>
        <p className="text-gray-300 font-light leading-relaxed">Can an open-architecture sensor fusion array (MPU6050 IMU + FSRs) accurately distinguish between stance and swing gait phases to safely deliver dynamic mechanical torque?</p>
      </li>
    </ul>
  </div>
);

// --- NEW BLOCK: References List ---
const ReferencesBoard = () => (
  <div className="bg-[#050505]/90 border border-white/5 p-8 rounded-3xl shadow-inner mt-12">
    <h3 className="text-xs font-black text-teal-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" /> Academic References
    </h3>
    <ul className="space-y-4 text-xs text-gray-500 font-mono leading-relaxed">
      <li>Awad, L. N., et al. (2017). A soft exosuit improves walking in patients after stroke. <i className="text-gray-400">Science Translational Medicine</i>.</li>
      <li>Baud, R., et al. (2021). Machine learning in the control of lower-limb exoskeletons. <i className="text-gray-400">IEEE Transactions on Neural Systems and Rehabilitation Engineering</i>.</li>
      <li>Farah, C., et al. (2019). Design, development, and evaluation of a local sensor-based gait phase recognition system. <i className="text-gray-400">Journal of NeuroEngineering and Rehabilitation</i>.</li>
      <li>Razmi, M., & Shojaei, I. (2026). Event-Driven On-Sensor Locomotion Mode Recognition... <i className="text-gray-400">arXiv preprint arXiv:2602.21418</i>.</li>
      <li>Tucker, M. R., et al. (2015). Control strategies for active lower extremity prosthetics and orthotics: a review. <i className="text-gray-400">Journal of NeuroEngineering and Rehabilitation</i>.</li>
      <li>Wang, J., et al. (2022). FSM-HSVM-Based Locomotion Mode Recognition for Exoskeleton Robot. <i className="text-gray-400">Applied Sciences</i>.</li>
    </ul>
  </div>
);

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const holoHover = {
  initial: { scale: 1, y: 0, rotateX: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.1)" },
  hover: { scale: 1.015, y: -6, rotateX: -1, borderColor: "rgba(45, 212, 191, 0.4)", boxShadow: "0 30px 60px -15px rgba(45, 212, 191, 0.15), 0 10px 20px -5px rgba(45, 212, 191, 0.1)", transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 } }
};

export default function Week3Log() {
  const [isMethodHoloActive, setIsMethodHoloActive] = useState(false);
  const [isGapHoloActive, setIsGapHoloActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={3} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 1</span>
                <span className="text-gray-500 text-xs font-mono">7 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 3: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">Theoretical Framework.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                With the project proposal approved in Week 2, the goal for Week 3 was to build the scientific foundation. You cannot engineer a solution to a problem you don't deeply understand. This week was entirely dedicated to academic research, synthesizing peer-reviewed literature, establishing a strict research methodology, and defining the core research questions for the dissertation.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => setIsMethodHoloActive(true)} onHoverEnd={() => setIsMethodHoloActive(false)}
                className="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-white/10 cursor-default my-12"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 rounded-[40px] pointer-events-none transition-opacity duration-700 ${isMethodHoloActive ? "opacity-10" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(45,212,191,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.2) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Defining the Research Methodology</h2>
                <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
                  <p>To structure the evaluation of the Mynee prototype, I analyzed the three core research methodologies: Qualitative, Quantitative, and Mixed Methods. Given that an exoskeleton sits squarely at the intersection of hard physics and human-computer interaction, a purely data-driven approach wasn't enough.</p>
                  <p>A motor outputting 10 Nm of torque might be an empirical success quantitatively, but if it causes severe discomfort to the user, it is a qualitative failure. Therefore, I formally selected a <strong>Mixed Methods Methodology</strong> for this project.</p>
                </div>
              </motion.div>

              <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Methodology Comparison</h3>
              <MethodologyTable />

              <h2 className="text-3xl text-white mt-16 mb-6">The Narrative Literature Review</h2>
              <p>During this week’s Thursday session, Dr. Roshan focused on understanding how to properly conduct a literature review. He stressed that a literature review is not just about collecting papers, but about analyzing existing work, identifying gaps, and linking it directly to our hardware.</p>
              <p>Following this guidance, I sourced over a dozen peer-reviewed articles, eventually narrowing them down to a core group of highly relevant papers. I categorized my research into three specific domains:</p>
              <ul className="list-disc pl-6 space-y-2 font-medium text-gray-300 mb-12">
                <li><strong>Actuation Hardware:</strong> The physics of moving the joint (Pneumatics vs. Geared Motors).</li>
                <li><strong>Sensor Fusion:</strong> The intelligence required to understand the joint (IMUs and FSRs).</li>
                <li><strong>Control Logic:</strong> The algorithms driving the assistance (Machine Learning vs Finite State Machines).</li>
              </ul>

              <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-6">Literature Synthesis & Gap Identification</h3>
              <LiteratureTable />

              <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => setIsGapHoloActive(true)} onHoverEnd={() => setIsGapHoloActive(false)}
                className="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-white/10 cursor-default my-12"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 rounded-[40px] pointer-events-none transition-opacity duration-700 ${isGapHoloActive ? "opacity-10" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(250,204,21,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.15) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Summary & The Engineering Gap</h2>
                <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
                  <p>Synthesizing this literature allowed me to perfectly frame the end of Chapter 2. The research clearly shows a polarized industry.</p>
                  <p>On one end, we have incredibly sophisticated, clinically viable powered exoskeletons. However, their reliance on custom pneumatics and tethered power supplies makes them economically impossible for consumer use. On the other end, we have affordable passive braces that offer zero intelligent kinetic assistance.</p>
                  <p className="text-yellow-400 font-medium"><strong>The Identified Gap:</strong> There is a critical lack of frugal, edge-processed, electromechanical active-assist devices designed for daily wear. Mynee aims directly at this gap by utilizing accessible planetary gear motors and local Single-Board processing (Raspberry Pi) to deliver intelligent, affordable assistance.</p>
                </div>
              </motion.div>

              <h2 className="text-3xl text-white mt-16 mb-6">Defining the Objectives</h2>
              <p>Having identified the engineering gap in the literature, I formally defined the Research Questions that the physical Mynee prototype must ultimately answer.</p>
              
              <ResearchQuestionsBoard />
              
              <ReferencesBoard />
            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-2">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 2
                </button>
              </Link>
              <Link href="/devlog/week-4">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 4 <span className="group-hover:translate-x-1 transition-transform">→</span>
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