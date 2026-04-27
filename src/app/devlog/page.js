"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- ADVANCED CYBER-GRID BACKGROUND ---
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

const fadeUpVariant = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

const DarkCardTechDust = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles([...Array(20)].map(() => ({ tx: `${Math.random() * 20 - 10}px`, dur: `${3 + Math.random() * 5}s`, del: `${Math.random() * 0.5}s`, size: `${1.5 + Math.random() * 1.5}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` })));
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[30px]">
      <style>{`@keyframes floatDust { 0%, 100% { transform: translate(0px, 0px); opacity: 0.3; } 50% { transform: translate(var(--tx), -40px); opacity: 1; } }`}</style>
      {particles.map((p, i) => ( <div key={i} className="absolute bg-teal-400/50 rounded-full shadow-[0_0_6px_rgba(45,212,191,0.8)] will-change-transform" style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatDust ${p.dur} infinite ease-in-out ${p.del}` }} /> ))}
    </div>
  );
};

const LockedWatermark = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden rounded-[30px] opacity-[0.05]">
    <svg className="w-56 h-56 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
  </div>
);

export default function DevLog() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // UPDATED: Week 12 is now fully unlocked and populated
  const weeksData = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    if (num === 1) return { num, title: "Project Genesis & Proposal.", desc: "Defining the rationale, establishing core objectives, and submitting the First-Cut Proposal.", isDarkTheme: true };
    if (num === 2) return { num, title: "Ethics & Architecture.", desc: "Formalizing the project plan, securing ethical clearance for biomechanical data collection.", isDarkTheme: true };
    if (num === 3) return { num, title: "Theoretical Framework.", desc: "Analyzing existing research methodologies and identifying the engineering gap.", isDarkTheme: true };
    if (num === 4) return { num, title: "WBS & Planning.", desc: "Establishing the Work Breakdown Structure and Gantt scheduling for hardware deployment.", isDarkTheme: true };
    if (num === 5) return { num, title: "MVP & Hardware Assembly.", desc: "Selecting the Agile framework, wiring the core sensors, and building the initial MVP.", isDarkTheme: true };
    if (num === 6) return { num, title: "UML & Prototype Testing.", desc: "Stress-testing the MVP, mapping the system architecture through UML diagrams.", isDarkTheme: true };
    if (num === 7) return { num, title: "Core Implementation.", desc: "Integrating microcontroller sensor logic, data telemetry, and the hardware-software loop.", isDarkTheme: true };
    if (num === 8) return { num, title: "System Architecture & Debugging.", desc: "Overcoming hardware bottlenecks, documenting API integrations, and drafting Chapter Three.", isDarkTheme: true };
    if (num === 9) return { num, title: "QA & Performance Evaluation.", desc: "Rigorous unit and integration testing of the electro-mechanical components.", isDarkTheme: true };
    if (num === 10) return { num, title: "Results & Empirical Analysis.", desc: "Analyzing telemetry data, charting performance against benchmarks.", isDarkTheme: true };
    if (num === 11) return { num, title: "Final Conclusions & Handover.", desc: "Assembling appendices, risk assessments, and preparing the final presentation slides.", isDarkTheme: true };
    if (num === 12) return { num, title: "Final Reflections.", desc: "Looking back at the 12-week gauntlet of hardware failures, late-night coding, and the ultimate success of the live exoskeleton demonstration.", isDarkTheme: true };
    
    return { num, title: "Project Submission", desc: "🔒 Scheduled for April 24, 2026", isDarkTheme: false };
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#030305] text-gray-100 font-sans overflow-x-hidden selection:bg-teal-500/30">
      <DataGridBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-5xl px-8 pt-52 pb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            <motion.div variants={fadeUpVariant} className="inline-block mb-6 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(20,184,166,0.2)]">
              Development Journal
            </motion.div>
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 drop-shadow-md">Logs.</span>
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
              Documenting the 12-week journey of building the Mynee smart knee exoskeleton. From initial literature reviews and ethical clearance to physical prototyping.
            </motion.p>
          </motion.div>
        </div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full max-w-6xl px-8 pb-32 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {weeksData.map((week) => (
            <Link key={week.num} href={week.isDarkTheme ? `/devlog/week-${week.num}` : "#"}>
              <motion.div variants={fadeUpVariant} whileHover={week.isDarkTheme ? { y: -8, transition: { type: "spring", stiffness: 300 } } : {}}
                className={`relative overflow-hidden p-8 backdrop-blur-xl rounded-[30px] transition-all duration-300 group h-full flex flex-col justify-between will-change-transform
                  ${week.isDarkTheme ? "bg-[#0a0a0a]/90 border border-white/10 hover:border-teal-500/50 shadow-2xl hover:shadow-[0_20px_40px_rgba(20,184,166,0.2)] cursor-pointer" : "bg-[#0a0a0a]/40 border border-white/5 cursor-default"}
                `}
              >
                {week.isDarkTheme ? <DarkCardTechDust /> : <LockedWatermark />}
                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black mb-6 transition-colors ${week.isDarkTheme ? "bg-white/5 border border-white/10 text-teal-400 group-hover:bg-teal-500/20" : "bg-white/5 text-gray-600"}`}>
                    {week.num}
                  </div>
                  <h4 className={`text-xl font-bold mb-1 ${week.isDarkTheme ? "text-white group-hover:text-teal-400 transition-colors" : "text-gray-600"}`}>Week {week.num}</h4>
                  <h5 className={`text-sm font-bold mb-3 ${week.isDarkTheme ? "text-teal-500" : "text-gray-700"}`}>{week.title}</h5>
                  <p className={`text-xs leading-relaxed mb-6 ${week.isDarkTheme ? "text-gray-400" : "text-gray-700"}`}>{week.desc}</p>
                </div>
                {week.isDarkTheme && (
                  <div className="relative z-10 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform text-teal-500 mt-auto pt-6 flex items-center gap-1">
                    Read Log <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* --- MEGA FOOTER --- */}
        <footer className="relative z-10 w-full bg-[#020202] border-t border-white/5 pt-20 pb-10 mt-auto overflow-hidden">
          <div className="relative z-10 max-w-[90rem] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 xl:px-8">
              <div className="lg:col-span-2">
                <div className="text-2xl font-black text-teal-400 mb-6 tracking-tighter">MYNEE</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                  A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Navigation</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                  <li><Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link></li>
                  <li><button onClick={scrollToTop} className="hover:text-teal-400 transition-colors text-white font-bold text-left">Dev Log</button></li>
                  <li><Link href="/documents" className="hover:text-teal-400 transition-colors">Documents</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Topics</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><span className="hover:text-teal-400 transition-colors cursor-default">Biomechanics</span></li>
                  <li><span className="hover:text-teal-400 transition-colors cursor-default">Edge Computing</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6">Resources</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><a href="https://github.com/arzanishshumak0395" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-400 transition-colors">GitHub ↗</a></li>
                  <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-1">LinkedIn ↗</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono tracking-widest uppercase xl:px-8">
              <p>© 2026 MYNEE | Syed Arzanish - Capstone Project.</p>
              <p>Dubai, UAE</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}