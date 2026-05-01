"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- PERFORMANCE OPTIMIZED REVEAL ---
const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- ADVANCED CYBER-GRID BACKGROUND ---
const DataGridBackground = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles([...Array(40)].map(() => ({
      tx: `${Math.random() * 40 - 20}px`, dur: `${8 + Math.random() * 12}s`,
      del: `${Math.random() * 2}s`, size: `${1 + Math.random() * 2}px`,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      color: Math.random() > 0.5 ? 'bg-teal-400' : 'bg-yellow-500'
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      <style>{`
        @keyframes scrollGrid {
          0% { transform: translateY(0) rotateX(45deg); }
          100% { transform: translateY(60px) rotateX(45deg); }
        }
        @keyframes floatData {
          0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.1; }
          50% { transform: translate(var(--tx), -100px) scale(1.5); opacity: 0.7; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
      
      {/* 3D Tilted Grid */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [transform-origin:center_top]" style={{ animation: 'scrollGrid 15s linear infinite' }} />
      
      {/* Scanning Laser Line */}
      <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent shadow-[0_0_15px_rgba(20,184,166,0.5)]" style={{ animation: 'scanline 8s linear infinite' }} />
      
      {/* Deep Space Nebulas */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-teal-900/10 blur-[150px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-yellow-900/10 blur-[150px] rounded-full mix-blend-screen" />

      {/* High-Density Floating Data Nodes */}
      {particles.map((p, i) => (
        <div key={i} className={`absolute ${p.color} rounded-full shadow-[0_0_10px_currentColor] will-change-transform`}
          style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatData ${p.dur} infinite ease-in-out ${p.del}` }}
        />
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)]" />
    </div>
  );
};

// --- ICONS ---
const PdfIcon = () => <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path><text x="8.5" y="16" fontFamily="sans-serif" fontSize="4.5" fill="currentColor" strokeWidth="0.5" fontWeight="bold">PDF</text></svg>;
const PptxIcon = () => <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path><text x="8.5" y="16" fontFamily="sans-serif" fontSize="4.5" fill="currentColor" strokeWidth="0.5" fontWeight="bold">PPT</text></svg>;
const VideoIcon = () => <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>;
const ArchiveIcon = () => <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>;
const ChartIcon = () => <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>;
const CodeIcon = () => <svg className="w-6 h-6 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>;
const LockIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>;

// --- DOCUMENTS DATA ---
const documents = [
  { id: 1, title: "PDE3823 Final Report", desc: "Comprehensive documentation of the Mynee architecture, kinematic calculations, literature review, and empirical results.", type: "PDF Document", date: "April 2026", icon: <PdfIcon />, link: "/FinalReport.pdf", status: "Final Submission", isAvailable: true },
  { id: 2, title: "Project Proposal", desc: "Initial project formulation, defining the socioeconomic gap, engineering rationale, and primary objectives.", type: "PDF Document", date: "Feb 2026", icon: <PdfIcon />, link: "/Project Proposal.pdf", status: "Approved", isAvailable: true },
  { id: 3, title: "Hardware Demo Video", desc: "Live recording of the exoskeleton in operation, demonstrating control loops and real-time sensor response.", type: "MP4 Video", date: "April 2026", icon: <VideoIcon />, link: "https://www.youtube.com/watch?v=5EpfVZZaEpE", status: "Published", isAvailable: true },
  { id: 4, title: "Black Box Model", desc: "High-level system abstraction mapping external power and sensor inputs to mechanical and diagnostic outputs.", type: "Visual Asset", date: "March 2026", icon: <ArchiveIcon />, link: "/Blackbox.png", status: "Approved", isAvailable: true },
  { id: 5, title: "Work Breakdown Structure", desc: "Hierarchical decomposition of the 12-week project lifecycle from planning to final evaluation and documentation.", type: "Visual Asset", date: "Feb 2026", icon: <ChartIcon />, link: "/WBS.png", status: "Approved", isAvailable: true },
  { id: 6, title: "Generative AI Use Form", desc: "Official university compliance form detailing the ethical boundaries and use of AI tools during development.", type: "PDF Document", date: "April 2026", icon: <PdfIcon />, link: "/FinalReport.pdf", status: "Appendix B", isAvailable: true },
  { id: 7, title: "UML Diagram", desc: "Software architecture mapping the deterministic Finite State Machine and sensor-to-actuation logic.", type: "Visual Asset", date: "March 2026", icon: <ArchiveIcon />, link: "/UML.png", status: "Approved", isAvailable: true },
  { id: 8, title: "Risk Assessment Matrix", desc: "Detailed evaluation of electromechanical hazards and mitigation strategies for the exoskeleton prototype.", type: "PDF Document", date: "March 2026", icon: <PdfIcon />, link: "/FinalReport.pdf", status: "Appendix C", isAvailable: true },
  { id: 9, title: "Gantt Chart & Schedule", desc: "Visual timeline detailing the 12-week development cycle from ideation to final fabrication.", type: "Visual Asset", date: "Feb 2026", icon: <ChartIcon />, link: "/Gantt Chart.png", status: "Finalized", isAvailable: true },
  { id: 10, title: "FSM Source Code", desc: "The core deterministic Python script utilizing the Complementary Filter and FSM logic.", type: "Python Script", date: "April 2026", icon: <CodeIcon />, link: "/devlog/week-7", status: "Validated", isAvailable: true }
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("models");
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-100 font-sans overflow-x-hidden selection:bg-teal-500/30">
      <DataGridBackground />

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes flowTeal { to { stroke-dashoffset: -16; } }
        @keyframes flowYellow { to { stroke-dashoffset: -16; } }
        @keyframes pulseDataX {
          0% { left: 0%; opacity: 0; transform: translateY(-50%) scale(0.5); }
          10% { opacity: 1; transform: translateY(-50%) scale(1.2); }
          90% { opacity: 1; transform: translateY(-50%) scale(1.2); }
          100% { left: 100%; opacity: 0; transform: translateY(-50%) scale(0.5); }
        }
        @keyframes pulseDataY {
          0% { top: 0%; opacity: 0; transform: translateX(-50%) scale(0.5); }
          10% { opacity: 1; transform: translateX(-50%) scale(1.2); }
          90% { opacity: 1; transform: translateX(-50%) scale(1.2); }
          100% { top: 100%; opacity: 0; transform: translateX(-50%) scale(0.5); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(20,184,166,0.5); }
      `}</style>

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 pt-44 pb-20 flex flex-col flex-1">
        
        {/* HEADER SECTION */}
        <motion.div initial="hidden" animate="visible" variants={reveal} custom={0} className="mb-16 text-center md:text-left xl:pl-8">
          <div className="inline-block mb-6 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            Secure File Server
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-white uppercase leading-none">
            Project<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 drop-shadow-md">
              Documents.
            </span>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-2xl leading-relaxed mx-auto md:mx-0">
            Secure archive containing the final PDE3823 academic report, presentation assets, technical diagrams, and official clearance forms for the <span className="text-teal-400 font-medium tracking-wide">Mynee Smart Brace</span>.
          </p>
        </motion.div>

        {/* DOCUMENT GRID */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:px-8 gap-6 mb-32">
          {documents.map((doc, idx) => (
            <motion.div key={doc.id} variants={reveal} custom={idx + 1} whileHover={{ y: -8, scale: 1.02 }} className="group relative h-full will-change-transform">
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${doc.isAvailable ? 'from-teal-500/0 via-emerald-500/0 to-yellow-500/0 group-hover:from-teal-500/30 group-hover:via-emerald-500/10 group-hover:to-transparent' : 'from-gray-500/0'} rounded-[26px] blur opacity-0 group-hover:opacity-100 transition duration-700 z-0`} />
              <div className={`relative h-full bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-500 flex flex-col justify-between ${doc.isAvailable ? 'group-hover:border-teal-500/40' : 'opacity-60'}`}>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 shadow-inner ${doc.isAvailable ? 'group-hover:bg-teal-500/10 group-hover:border-teal-500/30' : 'grayscale'}`}>
                      {doc.icon}
                    </div>
                    <span className={`bg-white/5 border px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest transition-all ${doc.isAvailable ? 'text-gray-400 border-white/10 group-hover:bg-teal-500/10 group-hover:text-teal-400 group-hover:border-teal-500/30' : 'text-gray-600 border-white/5'}`}>
                      {doc.status}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold text-white mb-3 tracking-tight transition-colors leading-tight ${doc.isAvailable ? 'group-hover:text-teal-400' : ''}`}>{doc.title}</h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed mb-6">{doc.desc}</p>
                </div>
                <div className={`flex items-center justify-between pt-5 border-t border-white/5 mt-auto transition-colors ${doc.isAvailable ? 'group-hover:border-teal-500/20' : ''}`}>
                  <div className="flex flex-col">
                    <span className="text-[8px] text-gray-600 uppercase tracking-widest font-bold mb-1">{doc.type}</span>
                    <span className="text-[10px] text-gray-400">{doc.date}</span>
                  </div>
                  
                  {doc.isAvailable ? (
                    <a href={doc.link} target={doc.link.startsWith('/') ? "_self" : "_blank"} rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-emerald-400 group-hover:text-black group-hover:border-none group-hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] transition-all duration-300 active:scale-95">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    </a>
                  ) : (
                    <div className="group/lock relative cursor-not-allowed">
                      <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500/50 border border-red-500/20 flex items-center justify-center transition-all duration-300 group-hover/lock:bg-red-500/20 group-hover/lock:text-red-400">
                        <LockIcon />
                      </div>
                      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover/lock:opacity-100 bg-red-500/20 border border-red-500/50 text-red-400 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded whitespace-nowrap transition-all duration-300">
                        Coming Soon
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- OVERHAULED TECHNICAL ARCHIVE --- */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="w-full xl:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white">Technical Artifacts</h2>
              <p className="text-gray-500 font-light text-sm mt-2">Interactive system architectures extracted from the final PDE3823 report.</p>
            </div>
            <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 shrink-0 shadow-lg">
              {['models', 'hardware', 'code'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-black shadow-[0_0_15px_rgba(20,184,166,0.4)]' : 'text-gray-500 hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 md:p-12 min-h-[500px] shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: ANIMATED MODELS */}
              {activeTab === 'models' && (
                <motion.div key="models" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                  
                  {/* INTERACTIVE BLACK BOX */}
                  <div className="flex flex-col h-full">
                    <h3 className="text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"/> Black Box Flow</h3>
                    <div className="flex-1 bg-black/50 border border-white/5 rounded-3xl p-6 flex items-center justify-between relative overflow-hidden">
                      
                      {/* CSS-Animated SVG Connections */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
                        <defs>
                          <filter id="glow-teal" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                          <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                        </defs>
                        {/* Background Tracks */}
                        <path d="M 33 18 C 42 18 42 50 50 50" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                        <path d="M 33 50 L 50 50" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                        <path d="M 33 82 C 42 82 42 50 50 50" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                        <path d="M 50 50 C 58 50 58 18 67 18" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                        <path d="M 50 50 L 67 50" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                        <path d="M 50 50 C 58 50 58 82 67 82" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />

                        {/* Active Flowing Data */}
                        <path d="M 33 18 C 42 18 42 50 50 50" fill="none" stroke="#2dd4bf" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowTeal 1s linear infinite' }} filter="url(#glow-teal)" />
                        <path d="M 33 50 L 50 50" fill="none" stroke="#2dd4bf" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowTeal 1s linear infinite' }} filter="url(#glow-teal)" />
                        <path d="M 33 82 C 42 82 42 50 50 50" fill="none" stroke="#2dd4bf" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowTeal 1s linear infinite' }} filter="url(#glow-teal)" />
                        
                        <path d="M 50 50 C 58 50 58 18 67 18" fill="none" stroke="#facc15" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowYellow 1s linear infinite' }} filter="url(#glow-yellow)" />
                        <path d="M 50 50 L 67 50" fill="none" stroke="#facc15" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowYellow 1s linear infinite' }} filter="url(#glow-yellow)" />
                        <path d="M 50 50 C 58 50 58 82 67 82" fill="none" stroke="#facc15" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowYellow 1s linear infinite' }} filter="url(#glow-yellow)" />
                      </svg>

                      {/* Inputs */}
                      <div className="space-y-4 relative z-10 w-1/3">
                        <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-gray-300 font-mono shadow-lg">12V & 5V Power</div>
                        <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-gray-300 font-mono shadow-lg">Gait Phase (FSR)</div>
                        <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-gray-300 font-mono shadow-lg">Spatial Angle (IMU)</div>
                      </div>
                      
                      {/* Core Node */}
                      <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)] border-4 border-black">
                        <span className="text-[10px] font-black text-black text-center leading-tight">MYNEE<br/>CORE</span>
                      </div>

                      {/* Outputs */}
                      <div className="space-y-4 relative z-10 w-1/3">
                        <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-yellow-500 font-mono shadow-lg">Mech Torque</div>
                        <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-yellow-500 font-mono shadow-lg">Zero Impedance</div>
                        <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-yellow-500 font-mono shadow-lg">Diagnostic Logs</div>
                      </div>
                    </div>
                  </div>

                  {/* INTRICATE WHITE BOX */}
                  <div className="flex flex-col h-full">
                    <h3 className="text-yellow-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"/> White Box Routing</h3>
                    <div className="flex-1 bg-black/50 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center">
                      
                      <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-2 h-full relative z-10 w-full items-center">
                        
                        {/* Col 1: Sensors & Power */}
                        <div className="flex flex-col justify-around h-full gap-4 py-4 relative z-20">
                          <div className="bg-teal-900/30 border border-teal-500/30 p-2 rounded-lg text-[9px] font-mono text-teal-400 text-center shadow-lg">MPU6050 & FSR</div>
                          <div className="bg-blue-900/30 border border-blue-500/30 p-2 rounded-lg text-[9px] font-mono text-blue-400 text-center shadow-lg">5V Power Bank</div>
                          <div className="bg-red-900/30 border border-red-500/30 p-2 rounded-lg text-[9px] font-mono text-red-400 text-center shadow-lg">12V LiPo Base</div>
                        </div>

                        {/* Col 2: Routing to Controller */}
                        <div className="flex flex-col justify-around h-full relative py-4 px-2">
                          <div className="w-full flex items-center relative">
                            <div className="h-[2px] w-full bg-teal-500/20" />
                            <div className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-[pulseDataX_1.5s_linear_infinite]" />
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[6px] text-teal-400 font-mono tracking-widest bg-[#0d0d0d] px-1">I2C / GPIO</span>
                          </div>
                          
                          <div className="w-full flex items-center relative">
                            <div className="h-[2px] w-full bg-blue-500/20" />
                            <div className="absolute top-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-[pulseDataX_1.8s_linear_infinite]" />
                          </div>

                          <div className="w-full flex items-center relative">
                            <div className="h-[2px] w-1/2 bg-red-500/20" />
                            <div className="absolute top-1/2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-[pulseDataX_1.2s_linear_infinite]" />
                            <div className="bg-[#1a1a1a] border border-red-500/50 p-1 rounded text-[7px] font-mono text-white text-center z-10 shadow-lg mx-1">Toggle</div>
                            <div className="h-[2px] flex-1 bg-orange-500/20" />
                          </div>
                        </div>

                        {/* Col 3: Processing & Driver */}
                        <div className="flex flex-col justify-between h-full py-4 relative z-20">
                          <div className="bg-gray-800 border border-white/20 p-3 rounded-xl text-[11px] font-black text-white text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">Pi Zero<br/><span className="text-[8px] text-gray-400 font-normal">FSM Logic</span></div>
                          
                          {/* Vertical PWM connection */}
                          <div className="h-full flex justify-center items-center relative py-2 w-full">
                             <div className="w-[2px] h-full bg-yellow-500/20" />
                             <div className="absolute left-1/2 w-2 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15] animate-[pulseDataY_1s_linear_infinite]" />
                             <span className="text-[6px] text-yellow-500 absolute bg-[#0a0a0a] font-mono tracking-widest px-1">PWM BUS</span>
                          </div>

                          <div className="bg-gray-800 border border-white/20 p-3 rounded-xl text-[11px] font-black text-white text-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">L298N<br/><span className="text-[8px] text-gray-400 font-normal">H-Bridge</span></div>
                        </div>

                        {/* Col 4: Actuator Output */}
                        <div className="flex flex-col justify-end h-full pb-6 pl-2 relative">
                           <div className="w-full flex items-center relative">
                              <div className="h-[2px] w-full bg-orange-500/20" />
                              <div className="absolute top-1/2 w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_15px_#f97316] animate-[pulseDataX_0.8s_linear_infinite]" />
                           </div>
                           <div className="bg-orange-900/20 border border-orange-500/40 p-3 rounded-xl text-[10px] font-black text-orange-400 text-center shadow-[0_0_15px_rgba(249,115,22,0.2)] absolute right-0 bottom-4 z-20">PG36-555<br/><span className="text-[8px] text-gray-400 font-normal">Actuator</span></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB 2: HARDWARE */}
              {activeTab === 'hardware' && (
                <motion.div key="hardware" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h3 className="text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-8">System Components List</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: "Central Processing Unit", spec: "Raspberry Pi Zero", desc: "1GHz single-core SBC. Chosen for its ultra-compact makeup and ability to execute the FSM in Python without the latency of complex ML algorithms." },
                      { title: "Kinematic Sensing", spec: "MPU6050 IMU", desc: "6-axis accelerometer & gyroscope. Uses a Complementary Filter to track knee flexion while mitigating raw gyroscopic drift." },
                      { title: "Motor Driver (Final Phase)", spec: "IBT-2 (BTS7960) Driver", desc: "Industrial-grade H-bridge capable of handling up to 43A. Safely bridges the 5V logic and 12V power to modulate the massive stall current of the worm gear." },
                      { title: "Motor Driver (Initial Phase)", spec: "L298N Dual H-Bridge", desc: "Employed during the initial breadboard proof-of-concept phase to validate FSM logic before current limits necessitated an upgrade." },
                      { title: "Electromechanical Actuator (Final Phase)", spec: "12V DC Worm Gear Motor", desc: "High-torque, non-backdrivable actuator. Provides the immense lifting force necessary for the sit-to-stand motion without requiring active holding current." },
                      { title: "Electromechanical Actuator (Initial Phase)", spec: "PG36-555 Geared Motor", desc: "12V DC brushless variant utilized during the initial logic validation and structural testing before thermal failure mandated a pivot." },
                      { title: "Gait Phase Trigger", spec: "Force-Sensitive Resistors", desc: "10kΩ analog sensors configured as digital threshold switches (HIGH/LOW) to detect heel-strike and toe-off instantly." },
                      { title: "System Safety", spec: "Dual Power Topology", desc: "Isolated 12V LiPo for actuation and 5V Power Bank for logic, eliminating voltage-sag brownouts." }
                    ].map((item, i) => (
                      <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-teal-500/30 transition-colors group">
                        <p className="text-gray-500 text-[9px] uppercase tracking-widest font-bold mb-2 group-hover:text-teal-500 transition-colors">{item.title}</p>
                        <h4 className="text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{item.spec}</h4>
                        <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 3: FULL CODE */}
              {activeTab === 'code' && (
                <motion.div key="code" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="h-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-fuchsia-400 text-xs font-black uppercase tracking-[0.2em]">Deterministic FSM Logic</h3>
                    <span className="text-[10px] text-gray-500 font-mono">main.py (Full Source)</span>
                  </div>
                  <div className="bg-[#0d0d0d] rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[450px]">
                    <div className="flex gap-2 px-4 py-3 bg-black border-b border-white/5 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    {/* SCROLLABLE CODE AREA (Extracted from PDE3823 PDF) */}
                    <div className="p-6 overflow-y-auto overflow-x-auto text-[11px] md:text-xs font-mono text-gray-300 leading-relaxed custom-scrollbar">
                      <pre>
<span className="text-fuchsia-400">import</span> smbus<br/>
<span className="text-fuchsia-400">import</span> math<br/>
<span className="text-fuchsia-400">import</span> time<br/>
<span className="text-fuchsia-400">import</span> RPi.GPIO <span className="text-fuchsia-400">as</span> GPIO<br/>
<br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-gray-600"># 1. HARDWARE PIN MAPPING & CONFIGURATION</span><br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-gray-600"># Motor Driver Pins (L298N)</span><br/>
<span className="text-sky-400">ENA_PIN</span> = <span className="text-orange-400">12</span> <span className="text-gray-600"># PWM Pin for Speed Control</span><br/>
<span className="text-sky-400">IN1_PIN</span> = <span className="text-orange-400">23</span> <span className="text-gray-600"># Direction Pin 1</span><br/>
<span className="text-sky-400">IN2_PIN</span> = <span className="text-orange-400">24</span> <span className="text-gray-600"># Direction Pin 2</span><br/>
<br/>
<span className="text-gray-600"># Sensor Pins</span><br/>
<span className="text-sky-400">FSR_PIN</span> = <span className="text-orange-400">17</span> <span className="text-gray-600"># Force Sensitive Resistor (Heel)</span><br/>
<br/>
<span className="text-gray-600"># I2C Configuration (MPU6050)</span><br/>
<span className="text-sky-400">bus</span> = smbus.<span className="text-yellow-200">SMBus</span>(<span className="text-orange-400">1</span>)<br/>
<span className="text-sky-400">MPU_ADDR</span> = <span className="text-orange-400">0x68</span><br/>
<span className="text-sky-400">PWR_MGMT_1</span> = <span className="text-orange-400">0x6B</span><br/>
<br/>
<span className="text-gray-600"># System Thresholds</span><br/>
<span className="text-sky-400">STRAIGHT_ANGLE_THRESHOLD</span> = <span className="text-orange-400">15.0</span> <span className="text-gray-600"># Degrees</span><br/>
<span className="text-sky-400">PWM_FREQUENCY</span> = <span className="text-orange-400">1000</span> <span className="text-gray-600"># Hz</span><br/>
<span className="text-sky-400">ASSIST_POWER</span> = <span className="text-orange-400">80</span> <span className="text-gray-600"># Duty Cycle (0-100%)</span><br/>
<br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-gray-600"># 2. SYSTEM INITIALIZATION</span><br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-fuchsia-400">def</span> <span className="text-yellow-200">setup_hardware</span>():<br/>
  <span className="text-yellow-200">print</span>(<span className="text-green-300">"Initializing System Hardware..."</span>)<br/>
  <span className="text-gray-600"># Setup GPIO</span><br/>
  GPIO.<span className="text-yellow-200">setmode</span>(GPIO.BCM)<br/>
  GPIO.<span className="text-yellow-200">setwarnings</span>(<span className="text-orange-400">False</span>)<br/>
  <br/>
  <span className="text-gray-600"># Configure Motor Pins</span><br/>
  GPIO.<span className="text-yellow-200">setup</span>(ENA_PIN, GPIO.OUT)<br/>
  GPIO.<span className="text-yellow-200">setup</span>(IN1_PIN, GPIO.OUT)<br/>
  GPIO.<span className="text-yellow-200">setup</span>(IN2_PIN, GPIO.OUT)<br/>
  <br/>
  <span className="text-gray-600"># Configure FSR Pin (Pull-down resistor enabled to prevent floating ground)</span><br/>
  GPIO.<span className="text-yellow-200">setup</span>(FSR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)<br/>
  <br/>
  <span className="text-gray-600"># Wake up MPU6050</span><br/>
  bus.<span className="text-yellow-200">write_byte_data</span>(MPU_ADDR, PWR_MGMT_1, <span className="text-orange-400">0</span>)<br/>
  <span className="text-yellow-200">print</span>(<span className="text-green-300">"Hardware Boot Complete. System Armed."</span>)<br/>
<br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-gray-600"># 3. KINEMATIC DATA ACQUISITION</span><br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-fuchsia-400">def</span> <span className="text-yellow-200">read_raw_data</span>(addr):<br/>
  <span className="text-gray-600"># Read raw 16-bit value from I2C registers</span><br/>
  high = bus.<span className="text-yellow-200">read_byte_data</span>(MPU_ADDR, addr)<br/>
  low = bus.<span className="text-yellow-200">read_byte_data</span>(MPU_ADDR, addr+<span className="text-orange-400">1</span>)<br/>
  val = ((high &lt;&lt; <span className="text-orange-400">8</span>) | low)<br/>
  <span className="text-fuchsia-400">if</span> val &gt; <span className="text-orange-400">32768</span>:<br/>
      val = val - <span className="text-orange-400">65536</span><br/>
  <span className="text-fuchsia-400">return</span> val<br/>
<br/>
<span className="text-fuchsia-400">def</span> <span className="text-yellow-200">get_knee_angle</span>():<br/>
  <span className="text-gray-600"># Read Accelerometer Y and Z axes</span><br/>
  accel_y = <span className="text-yellow-200">read_raw_data</span>(<span className="text-orange-400">0x3D</span>)<br/>
  accel_z = <span className="text-yellow-200">read_raw_data</span>(<span className="text-orange-400">0x3F</span>)<br/>
  <br/>
  <span className="text-gray-600"># Calculate angle using basic trigonometry (atan2)</span><br/>
  angle = math.<span className="text-yellow-200">degrees</span>(math.<span className="text-yellow-200">atan2</span>(accel_y, accel_z))<br/>
  <br/>
  <span className="text-gray-600"># Normalize to absolute positive degrees for flexion</span><br/>
  <span className="text-fuchsia-400">return</span> <span className="text-yellow-200">abs</span>(angle)<br/>
<br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-gray-600"># 4. MOTOR ACTUATION LOGIC</span><br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-fuchsia-400">def</span> <span className="text-yellow-200">set_motor_state</span>(state, power=<span className="text-orange-400">0</span>):<br/>
  <span className="text-fuchsia-400">if</span> state == <span className="text-green-300">"ASSIST"</span>:<br/>
      <span className="text-gray-600"># Provide lifting torque (Forward direction)</span><br/>
      GPIO.<span className="text-yellow-200">output</span>(IN1_PIN, GPIO.HIGH)<br/>
      GPIO.<span className="text-yellow-200">output</span>(IN2_PIN, GPIO.LOW)<br/>
      motor_pwm.<span className="text-yellow-200">ChangeDutyCycle</span>(power)<br/>
  <span className="text-fuchsia-400">elif</span> state == <span className="text-green-300">"FREE_SWING"</span>:<br/>
      <span className="text-gray-600"># Cut power to allow gear to free-spin (Zero-impedance)</span><br/>
      GPIO.<span className="text-yellow-200">output</span>(IN1_PIN, GPIO.LOW)<br/>
      GPIO.<span className="text-yellow-200">output</span>(IN2_PIN, GPIO.LOW)<br/>
      motor_pwm.<span className="text-yellow-200">ChangeDutyCycle</span>(<span className="text-orange-400">0</span>)<br/>
<br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-gray-600"># 5. MAIN FINITE STATE MACHINE (FSM) LOOP</span><br/>
<span className="text-gray-600"># ==========================================</span><br/>
<span className="text-fuchsia-400">if</span> __name__ == <span className="text-green-300">'__main__'</span>:<br/>
  <span className="text-yellow-200">setup_hardware</span>()<br/>
  <br/>
  <span className="text-gray-600"># Initialize PWM on ENA Pin</span><br/>
  motor_pwm = GPIO.<span className="text-yellow-200">PWM</span>(ENA_PIN, PWM_FREQUENCY)<br/>
  motor_pwm.<span className="text-yellow-200">start</span>(<span className="text-orange-400">0</span>)<br/>
  <br/>
  <span className="text-fuchsia-400">try</span>:<br/>
      <span className="text-fuchsia-400">while True</span>:<br/>
          <span className="text-gray-600"># Step 1: Gather Proprioceptive Data</span><br/>
          heel_pressure = GPIO.<span className="text-yellow-200">input</span>(FSR_PIN)<br/>
          knee_angle = <span className="text-yellow-200">get_knee_angle</span>()<br/>
          <br/>
          <span className="text-gray-600"># Step 2: Evaluate Logic & Trigger Actuation</span><br/>
          <span className="text-fuchsia-400">if</span> heel_pressure == <span className="text-orange-400">1</span> <span className="text-fuchsia-400">and</span> knee_angle &gt; STRAIGHT_ANGLE_THRESHOLD:<br/>
              <span className="text-gray-600"># STATE 1: Stance Phase (Load-bearing AND Knee is bent)</span><br/>
              <span className="text-yellow-200">set_motor_state</span>(<span className="text-green-300">"ASSIST"</span>, ASSIST_POWER)<br/>
              <span className="text-yellow-200">print</span>(<span className="text-green-300">f"Stance Phase - Angle: &#123;knee_angle:.1f&#125; - Motor: ASSISTING"</span>)<br/>
          <span className="text-fuchsia-400">else</span>:<br/>
              <span className="text-gray-600"># STATE 2: Swing Phase (Heel lifted OR Leg is fully straight)</span><br/>
              <span className="text-yellow-200">set_motor_state</span>(<span className="text-green-300">"FREE_SWING"</span>)<br/>
              <span className="text-yellow-200">print</span>(<span className="text-green-300">f"Swing Phase/Straight - Angle: &#123;knee_angle:.1f&#125; - Motor: OFF"</span>)<br/>
          <br/>
          <span className="text-gray-600"># 20ms delay ensures we hit the targeted &lt;20ms system latency specification</span><br/>
          time.<span className="text-yellow-200">sleep</span>(<span className="text-orange-400">0.02</span>)<br/>
          <br/>
  <span className="text-gray-600"># Hardware Interrupt / Failsafe</span><br/>
  <span className="text-fuchsia-400">except</span> KeyboardInterrupt:<br/>
      <span className="text-yellow-200">print</span>(<span className="text-green-300">"\nSystem Disarmed. Failsafe Activated."</span>)<br/>
      <span className="text-yellow-200">set_motor_state</span>(<span className="text-green-300">"FREE_SWING"</span>)<br/>
      motor_pwm.<span className="text-yellow-200">stop</span>()<br/>
      GPIO.<span className="text-yellow-200">cleanup</span>()<br/>
                      </pre>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full bg-[#050505] border-t border-white/10 pt-20 pb-10 mt-auto overflow-hidden">
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
                <li><Link href="/devlog" className="hover:text-teal-400 transition-colors">Dev Log</Link></li>
                <li><button onClick={scrollToTop} className="hover:text-teal-400 transition-colors text-white font-bold text-left">Documents</button></li>
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
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono tracking-widest uppercase xl:px-8">
            <p>© 2026 MYNEE | Syed Arzanish - Capstone Project.</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}