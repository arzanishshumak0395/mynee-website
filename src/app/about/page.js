"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- DYNAMIC CYBER-GRID BACKGROUND ---
const DataGridBackground = ({ isCreative }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    setParticles([...Array(40)].map(() => ({
      tx: `${Math.random() * 40 - 20}px`, dur: `${8 + Math.random() * 12}s`,
      del: `${Math.random() * 2}s`, size: `${1 + Math.random() * 2}px`,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
      isPrimary: Math.random() > 0.5
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305] transition-colors duration-1000">
      <style>{`
        @keyframes scrollGrid { 0% { transform: translateY(0) rotateX(45deg); } 100% { transform: translateY(60px) rotateX(45deg); } }
        @keyframes floatData { 0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.1; } 50% { transform: translate(var(--tx), -100px) scale(1.5); opacity: 0.7; } }
        @keyframes scanline { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
      `}</style>
      
      {/* 3D Tilted Grid */}
      <div className={`absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[size:80px_80px] [transform-origin:center_top] transition-all duration-1000 ${isCreative ? 'bg-[linear-gradient(rgba(217,70,239,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.05)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)]'}`} style={{ animation: 'scrollGrid 15s linear infinite' }} />
      
      {/* Scanning Laser Line */}
      <div className={`absolute inset-0 w-full h-[2px] transition-colors duration-1000 ${isCreative ? 'bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent shadow-[0_0_15px_rgba(217,70,239,0.5)]' : 'bg-gradient-to-r from-transparent via-teal-500/20 to-transparent shadow-[0_0_15px_rgba(20,184,166,0.5)]'}`} style={{ animation: 'scanline 8s linear infinite' }} />
      
      {/* Deep Space Nebulas */}
      <div className={`absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] blur-[150px] rounded-full mix-blend-screen transition-colors duration-1000 ${isCreative ? 'bg-fuchsia-900/20' : 'bg-teal-900/10'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] blur-[150px] rounded-full mix-blend-screen transition-colors duration-1000 ${isCreative ? 'bg-purple-900/20' : 'bg-yellow-900/10'}`} />

      {/* Floating Data Nodes */}
      {particles.map((p, i) => (
        <div key={i} className={`absolute rounded-full shadow-[0_0_10px_currentColor] will-change-transform transition-colors duration-1000 ${isCreative ? (p.isPrimary ? 'bg-fuchsia-400' : 'bg-purple-500') : (p.isPrimary ? 'bg-teal-400' : 'bg-yellow-500')}`}
          style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatData ${p.dur} infinite ease-in-out ${p.del}` }}
        />
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)]" />
    </div>
  );
};

// --- ANIMATION VARIANTS ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05 } }
};

export default function ArchitectPage() {
  const [isCreativeMode, setIsCreativeMode] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#030305] text-gray-200 font-sans overflow-x-hidden selection:bg-teal-500/30">
      
      {/* TOP SCROLL PROGRESS BAR */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 origin-left z-[100] transition-colors duration-500 ${isCreativeMode ? 'bg-gradient-to-r from-fuchsia-400 to-purple-500 shadow-[0_0_10px_rgba(217,70,239,0.5)]' : 'bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 shadow-[0_0_10px_rgba(20,184,166,0.5)]'}`}
        style={{ scaleX }}
      />

      <DataGridBackground isCreative={isCreativeMode} />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* HEADER & TOGGLE SWITCH */}
        <div className="w-full max-w-6xl px-8 pt-52 pb-12 text-center flex flex-col items-center">
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black mb-10 tracking-tighter text-white uppercase">
            Syed <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000 drop-shadow-md ${isCreativeMode ? 'from-fuchsia-400 via-purple-400 to-pink-500' : 'from-teal-400 via-emerald-400 to-yellow-400'}`}>Arzanish</span>
          </motion.h1>

          {/* THE HARDWARE TOGGLE SWITCH */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative p-1.5 bg-[#0a0a0a]/80 border border-white/10 rounded-full flex shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            
            {/* Active Pill Background */}
            <motion.div 
              className={`absolute top-1.5 bottom-1.5 w-[150px] rounded-full shadow-lg transition-colors duration-500 ${isCreativeMode ? 'bg-fuchsia-600 shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.4)]'}`}
              initial={false}
              animate={{ x: isCreativeMode ? 150 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />

            <button onClick={() => setIsCreativeMode(false)} className={`relative z-10 w-[150px] py-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${!isCreativeMode ? 'text-black' : 'text-gray-400 hover:text-gray-200'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
              Systems Logic
            </button>

            <button onClick={() => setIsCreativeMode(true)} className={`relative z-10 w-[150px] py-3 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${isCreativeMode ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Creative
            </button>
          </motion.div>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className="w-full max-w-7xl px-6 pb-16 min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* ======================================================== */}
            {/* STATE 1: LOGIC & ENGINEERING VIEW                        */}
            {/* ======================================================== */}
            {!isCreativeMode && (
              <motion.div key="logic" variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* ENGINEERING PROFILE CARD */}
                <motion.div variants={fadeUpVariant} className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-2xl hover:border-teal-500/30 transition-all duration-500 flex flex-col items-center text-center">
                  
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 blur-[80px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />

                  {/* Profile Image */}
                  <div className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-white/5 shadow-[0_0_30px_rgba(20,184,166,0.15)] group-hover:border-teal-500/40 transition-all duration-500 group-hover:scale-105 z-10">
                    <Image src="/arzanish.png" alt="Syed Arzanish" fill className="object-cover" priority />
                  </div>
                  
                  <h4 className="relative z-10 text-3xl font-black text-white mb-2 tracking-tight group-hover:text-teal-400 transition-colors">Syed Arzanish</h4>
                  <p className="relative z-10 text-[10px] text-teal-500 uppercase tracking-widest mb-8 font-mono font-bold">Electronics Engineer & Developer</p>
                  
                  <p className="relative z-10 text-gray-400 font-light leading-relaxed text-sm md:text-base max-w-md">
                    As a final-year Electronics Engineering student at Middlesex University Dubai, my focus lies at the intersection of embedded systems, hardware-software co-design, and applied robotics. I specialize in bridging the gap between low-level kinematics and high-level control logic. My engineering philosophy is driven by frugal innovation—proving that highly complex, medical-grade automation and assistive robotics can be achieved through accessible, deterministic edge-computing.
                  </p>
                  
                  <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-8">
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-teal-500/30 transition-colors">VHDL / FPGA</span>
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-teal-500/30 transition-colors">Embedded C / Python</span>
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-teal-500/30 transition-colors">PCB Design</span>
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-teal-500/30 transition-colors">Robotics</span>
                  </div>
                </motion.div>

                {/* TELEMETRY / PROFICIENCY BAR CHART */}
                <motion.div variants={fadeUpVariant} className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 flex flex-col justify-center shadow-2xl h-full hover:border-teal-500/30 transition-all duration-500">
                  <h4 className="text-2xl font-black text-white mb-10 tracking-tight">System Proficiency</h4>
                  
                  <div className="space-y-8">
                    {[
                      { name: "Hardware Design & Prototyping", level: "95%", color: "bg-teal-500" },
                      { name: "SoC Architecture & VHDL", level: "85%", color: "bg-emerald-500" },
                      { name: "PID Control Loops", level: "80%", color: "bg-yellow-500" },
                      { name: "Sensor Fusion (IMU/FSR)", level: "90%", color: "bg-cyan-500" },
                    ].map((skill, idx) => (
                      <div key={idx} className="w-full group/skill">
                        <div className="flex justify-between text-[11px] font-mono font-bold text-gray-400 mb-3">
                          <span className="uppercase tracking-wider">{skill.name}</span>
                          <span className="opacity-0 group-hover/skill:opacity-100 transition-opacity text-white">{skill.level}</span>
                        </div>
                        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }} animate={{ width: skill.level }} transition={{ duration: 1.5, delay: 0.2 + (idx * 0.1), type: "spring" }}
                            className={`h-full ${skill.color} rounded-full relative shadow-[0_0_10px_currentColor]`}
                          >
                            <div className="absolute right-0 top-0 bottom-0 w-6 bg-white/50 blur-[3px]" />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ======================================================== */}
            {/* STATE 2: CREATIVE & MEDIA VIEW                           */}
            {/* ======================================================== */}
            {isCreativeMode && (
              <motion.div key="creative" variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* CREATIVE PROFILE CARD */}
                <motion.div variants={fadeUpVariant} className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-2xl hover:border-fuchsia-500/30 transition-all duration-500 flex flex-col items-center text-center">
                  
                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-500/5 blur-[80px] pointer-events-none group-hover:bg-fuchsia-500/10 transition-colors duration-700" />

                  {/* Profile Image */}
                  <div className="relative w-48 h-48 mb-8 rounded-full overflow-hidden border-4 border-white/5 shadow-[0_0_30px_rgba(217,70,239,0.15)] group-hover:border-fuchsia-500/40 transition-all duration-500 group-hover:scale-105 z-10">
                    <Image src="/arzanish.png" alt="Syed Arzanish" fill className="object-cover" priority />
                  </div>
                  
                  <h4 className="relative z-10 text-3xl font-black text-white mb-2 tracking-tight group-hover:text-fuchsia-400 transition-colors">Syed Arzanish</h4>
                  <p className="relative z-10 text-[10px] text-fuchsia-500 uppercase tracking-widest mb-8 font-mono font-bold">Author & Media Director</p>
                  
                  <p className="relative z-10 text-gray-400 font-light leading-relaxed text-sm md:text-base max-w-md">
                    Beyond the soldering iron and code editors, I am a dedicated technical writer and digital media producer with a decade of creative experience. I believe that engineering and storytelling share a fundamental core: structure. The same rigorous, systemic logic required to route a printed circuit board or write a Finite State Machine is what I apply to construct intricate technical documentation, design compelling presentations, and produce cohesive digital media.
                  </p>
                  
                  <div className="relative z-10 flex flex-wrap justify-center gap-3 mt-8">
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-fuchsia-500/30 transition-colors">Digital Media</span>
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-fuchsia-500/30 transition-colors">Video Editing</span>
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-fuchsia-500/30 transition-colors">Canva Pro</span>
                     <span className="px-4 py-2 bg-white/5 text-gray-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-white/10 group-hover:border-fuchsia-500/30 transition-colors">Narrative Design</span>
                  </div>
                </motion.div>

                {/* TECHNICAL & CREATIVE COMMUNICATION */}
                <motion.div variants={fadeUpVariant} className="flex flex-col gap-8 h-full">
                  <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 flex-1 relative overflow-hidden shadow-2xl hover:border-fuchsia-500/30 transition-colors duration-500 group flex flex-col justify-center items-start">
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 blur-[100px] pointer-events-none group-hover:bg-purple-500/10 transition-colors" />
                    
                    <div className="w-14 h-14 bg-fuchsia-500/10 rounded-2xl flex items-center justify-center text-fuchsia-400 mb-8 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    
                    <h4 className="text-4xl font-black text-white mb-2 tracking-tight">Technical & Creative Media</h4>
                    <p className="text-fuchsia-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-8">Translating Complexity into Clarity</p>
                    
                    <p className="text-gray-400 font-light leading-relaxed mb-6 text-sm md:text-base relative z-10">
                      I specialize in transforming high-level engineering data into engaging, accessible narratives. Whether I am drafting comprehensive academic reports, designing compelling industry pitches, or producing dynamic video demonstrations, I ensure the communication is as flawless as the underlying code.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mt-4 relative z-10">
                      {["Technical Writing", "Digital Storytelling", "Video Production", "UI/UX Copywriting"].map((skill, idx) => (
                        <span key={idx} className="px-5 py-2.5 bg-fuchsia-500/5 text-fuchsia-300 text-[10px] uppercase tracking-widest font-bold rounded-xl border border-fuchsia-500/20 shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- RECENT MILESTONES / EXPERIENCE --- */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="w-full max-w-7xl px-6 pb-32 pt-16 border-t border-white/10">
          <motion.div variants={fadeUpVariant} className="mb-16">
             <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
               Recent <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isCreativeMode ? 'from-fuchsia-400 to-purple-500' : 'from-teal-400 to-emerald-400'}`}>Milestones.</span>
             </h3>
          </motion.div>

          {/* UPDATED EXPERIENCES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: "Mynee Smart Knee Exoskeleton", subtitle: "Lead Developer", desc: "Designed and programmed a deterministic, edge-computed mechanical orthosis for targeted lower-limb physical rehabilitation, utilizing sensor fusion and PID control." },
              { title: "Vision Care Assistive Device", subtitle: "Hardware Integration", desc: "Developed a smart assistive device focused on visual care, integrating microcontrollers and real-time feedback mechanisms for enhanced user accessibility." },
              { title: "Automated Trash Bin Robot", subtitle: "Robotics Programmer", desc: "Engineered an autonomous robotic system utilizing sensor integration for pathfinding, obstacle avoidance, and automated waste management." }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeUpVariant} whileHover={{ y: -8 }} className={`relative group bg-[#0a0a0a]/90 backdrop-blur-xl p-8 md:p-10 rounded-[30px] border border-white/10 transition-all duration-500 overflow-hidden flex flex-col shadow-2xl ${isCreativeMode ? 'hover:border-fuchsia-500/50 hover:shadow-[0_20px_40px_rgba(217,70,239,0.1)]' : 'hover:border-teal-500/50 hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)]'}`}>
                <div className={`absolute top-0 right-8 h-full w-[1px] border-l-2 border-dashed border-white/10 transition-colors duration-500 z-0 ${isCreativeMode ? 'group-hover:border-fuchsia-500/40' : 'group-hover:border-teal-500/40'}`} />
                <motion.div className={`absolute top-8 right-[23px] text-2xl z-10 ${isCreativeMode ? 'text-fuchsia-500' : 'text-teal-400'}`} animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}>✦</motion.div>
                <div className="relative z-10 flex-1">
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-4 transition-colors duration-300 ${isCreativeMode ? 'text-gray-500 group-hover:text-fuchsia-400' : 'text-gray-500 group-hover:text-teal-400'}`}>{item.subtitle}</p>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight tracking-tight">{item.title}</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* --- MEGA FOOTER --- */}
      <footer className="relative z-10 w-full bg-[#020202] border-t border-white/5 pt-20 pb-10 mt-auto overflow-hidden">
        <div className="relative z-10 max-w-[90rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 xl:px-8">
            <div className="lg:col-span-2">
              <div className={`text-2xl font-black mb-6 tracking-tighter transition-colors duration-500 ${isCreativeMode ? 'text-fuchsia-500' : 'text-teal-400'}`}>MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className={`transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>Home</Link></li>
                <li><Link href="/sessions" className={`transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>Sessions</Link></li>
                <li><Link href="/devlog" className={`transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>Dev Log</Link></li>
                <li><Link href="/documents" className={`transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>Documents</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className={`cursor-default transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>Biomechanics</span></li>
                <li><span className={`cursor-default transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>Edge Computing</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className={`flex items-center gap-1 transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>GitHub ↗</a></li>
                <li><a href="#" className={`flex items-center gap-1 transition-colors ${isCreativeMode ? 'hover:text-fuchsia-400' : 'hover:text-teal-400'}`}>LinkedIn ↗</a></li>
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