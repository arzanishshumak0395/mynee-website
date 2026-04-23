"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- DYNAMIC BACKGROUND COMPONENT ---
const AmbientBackground = ({ isCreative }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(15)].map(() => ({
      tx: `${Math.random() * 40 - 20}px`,
      dur: `${12 + Math.random() * 8}s`,
      del: `${Math.random() * 0.5}s`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000">
      <style>{`
        @keyframes floatAmbient {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.3; }
          50% { transform: translate(var(--tx), -120px); opacity: 0.8; }
        }
      `}</style>
      
      {/* Colors transition based on the active mode */}
      <div className={`absolute top-[-15%] left-[-5%] w-[60%] h-[60%] rounded-full blur-[140px] transition-colors duration-1000 ${isCreative ? 'bg-fuchsia-600/20' : 'bg-yellow-500/20'}`} />
      <div className={`absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full blur-[120px] transition-colors duration-1000 ${isCreative ? 'bg-purple-600/20' : 'bg-sky-500/20'}`} />
      
      {/* Bouncing Orb */}
      <motion.div
        animate={{ x: [0, 300, -150, 200, 0], y: [0, 200, 300, -100, 0], scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" }, y: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="fixed pointer-events-none z-0 will-change-transform"
        style={{
          left: '20%', top: '10%', width: '450px', height: '450px', borderRadius: '50%', filter: 'blur(70px)',
          background: isCreative ? 'radial-gradient(circle, rgba(162, 28, 175, 0.5) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(180, 83, 9, 0.5) 0%, transparent 70%)',
        }}
      />

      {particles.map((p, i) => (
        <div key={i} className={`absolute w-1.5 h-1.5 rounded-full blur-[0.5px] will-change-transform ${isCreative ? 'bg-fuchsia-400' : 'bg-amber-700'}`}
          style={{ left: p.left, top: p.top, '--tx': p.tx, animation: `floatAmbient ${p.dur} infinite ease-in-out ${p.del}` }}
        />
      ))}
    </div>
  );
};

// --- GPU-ACCELERATED FOOTER DUST ---
const FooterDust = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles([...Array(30)].map(() => ({
      tx: `${Math.random() * 30 - 15}px`, dur: `${5 + Math.random() * 7}s`,
      del: `${Math.random() * 1}s`, size: `${1 + Math.random() * 1.5}px`,
      left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <style>{`
        @keyframes floatFooterDust {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.1; }
          50% { transform: translate(var(--tx), -30px); opacity: 0.8; }
        }
      `}</style>
      {particles.map((p, i) => (
        <div key={i} className="absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)] will-change-transform"
          style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatFooterDust ${p.dur} infinite ease-in-out ${p.del}` }}
        />
      ))}
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

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function ArchitectPage() {
  const [isCreativeMode, setIsCreativeMode] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-[#050505] text-gray-200 font-sans overflow-x-hidden">
      
      {/* TOP SCROLL PROGRESS BAR */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-1 origin-left z-[100] transition-colors duration-500 ${isCreativeMode ? 'bg-gradient-to-r from-fuchsia-500 to-purple-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-600'}`}
        style={{ scaleX }}
      />

      <AmbientBackground isCreative={isCreativeMode} />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* HEADER & TOGGLE SWITCH */}
        <div className="w-full max-w-5xl px-8 pt-52 pb-12 text-center flex flex-col items-center">
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-10 tracking-tighter text-white">
            Syed <span className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-1000 ${isCreativeMode ? 'from-fuchsia-400 to-purple-600' : 'from-sky-400 to-sky-700'}`}>Arzanish.</span>
          </motion.h1>

          {/* THE HARDWARE TOGGLE SWITCH */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative p-1.5 bg-white/5 border border-white/10 rounded-full flex shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            
            {/* Active Pill Background */}
            <motion.div 
              className={`absolute top-1.5 bottom-1.5 w-[140px] rounded-full shadow-lg ${isCreativeMode ? 'bg-fuchsia-600' : 'bg-sky-600'}`}
              initial={false}
              animate={{ x: isCreativeMode ? 140 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />

            <button onClick={() => setIsCreativeMode(false)} className={`relative z-10 w-[140px] py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${!isCreativeMode ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
              Systems Logic
            </button>

            <button onClick={() => setIsCreativeMode(true)} className={`relative z-10 w-[140px] py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${isCreativeMode ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Creative
            </button>
          </motion.div>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className="w-full max-w-6xl px-8 pb-16 min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* ======================================================== */}
            {/* STATE 1: LOGIC & ENGINEERING VIEW                        */}
            {/* ======================================================== */}
            {!isCreativeMode && (
              <motion.div key="logic" variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* INTERACTIVE EXPLODED BLUEPRINT */}
                <motion.div variants={fadeUpVariant} className="bg-gray-950 border border-white/10 rounded-[40px] p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')] opacity-10 pointer-events-none" />
                  <h4 className="relative z-10 text-2xl font-black text-white mb-2 tracking-tight">Hardware Architecture</h4>
                  <p className="relative z-10 text-xs text-sky-400 uppercase tracking-widest mb-8 font-mono">Interactive Schematic</p>
                  
                  {/* Schematic Area */}
                  <div className="relative w-full aspect-square border border-sky-500/20 bg-sky-900/10 rounded-2xl flex items-center justify-center">
                    
                    {/* Central Processor Node */}
                    <div className="absolute w-24 h-24 border border-sky-500 bg-sky-500/10 rounded-lg flex items-center justify-center group/node cursor-crosshair">
                      <div className="w-3 h-3 bg-sky-400 rounded-full animate-ping" />
                      {/* Tooltip */}
                      <div className="absolute -top-16 opacity-0 group-hover/node:opacity-100 transition-opacity bg-black border border-sky-500/30 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap z-50">
                        <span className="text-sky-400 font-bold">SoC Brain</span><br/>Data fusion & telemetry
                      </div>
                    </div>

                    {/* Sensor Node Top Left */}
                    <div className="absolute top-[20%] left-[20%] w-12 h-12 border border-emerald-500/50 rounded-full flex items-center justify-center group/node cursor-crosshair">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      {/* Connecting Line */}
                      <div className="absolute top-full left-1/2 w-[2px] h-[70px] bg-emerald-500/20 origin-top rotate-[-45deg]" />
                      <div className="absolute -top-12 opacity-0 group-hover/node:opacity-100 transition-opacity bg-black border border-emerald-500/30 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap z-50">
                        <span className="text-emerald-400 font-bold">IMU Unit</span>
                      </div>
                    </div>

                    {/* Actuator Node Bottom Right */}
                    <div className="absolute bottom-[20%] right-[20%] w-16 h-16 border border-yellow-500/50 rounded-md flex items-center justify-center group/node cursor-crosshair">
                      <div className="w-2 h-2 bg-yellow-400 rounded-sm" />
                      {/* Connecting Line */}
                      <div className="absolute bottom-full left-0 w-[2px] h-[90px] bg-yellow-500/20 origin-bottom rotate-[-45deg]" />
                      <div className="absolute -bottom-14 opacity-0 group-hover/node:opacity-100 transition-opacity bg-black border border-yellow-500/30 px-4 py-2 rounded-lg text-xs font-mono whitespace-nowrap z-50">
                        <span className="text-yellow-400 font-bold">PG36 Actuator</span>
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* DIAGNOSTIC SKILL RADAR / TELEMETRY */}
                <motion.div variants={fadeUpVariant} className="flex flex-col gap-6">
                  
                  {/* Bio Card */}
                  <div className="bg-gray-900 border border-white/5 rounded-[40px] p-10">
                    <p className="text-gray-400 font-light leading-relaxed mb-6">
                      A final-year Electronics Engineering student immersed in embedded systems and hardware integration. I specialize in bridging the gap between low-level physics and high-level control logic, proving that complex orthopedic assistance can be achieved through accessible, frugal engineering.
                    </p>
                    <div className="flex gap-2">
                       <span className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] uppercase tracking-wider rounded-lg border border-white/10">VHDL / FPGA</span>
                       <span className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] uppercase tracking-wider rounded-lg border border-white/10">Arduino</span>
                       <span className="px-3 py-1 bg-white/5 text-gray-300 text-[10px] uppercase tracking-wider rounded-lg border border-white/10">C++</span>
                    </div>
                  </div>

                  {/* Telemetry Bar Chart */}
                  <div className="bg-gray-950 border border-white/10 rounded-[40px] p-10 flex-1 flex flex-col justify-center">
                    <h4 className="text-xl font-bold text-white mb-6">System Proficiency</h4>
                    
                    <div className="space-y-5">
                      {[
                        { name: "Hardware Design & Prototyping", level: "95%", color: "bg-sky-500" },
                        { name: "SoC Architecture & VHDL", level: "85%", color: "bg-emerald-500" },
                        { name: "PID Control Loops", level: "80%", color: "bg-yellow-500" },
                        { name: "Sensor Fusion (IMU/FSR)", level: "90%", color: "bg-orange-500" },
                      ].map((skill, idx) => (
                        <div key={idx} className="w-full group">
                          <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                            <span>{skill.name}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white">{skill.level}</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} animate={{ width: skill.level }} transition={{ duration: 1.5, delay: 0.2 + (idx * 0.1), type: "spring" }}
                              className={`h-full ${skill.color} rounded-full relative`}
                            >
                              <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
                            </motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>

              </motion.div>
            )}

            {/* ======================================================== */}
            {/* STATE 2: CREATIVE & MEDIA VIEW                           */}
            {/* ======================================================== */}
            {isCreativeMode && (
              <motion.div key="creative" variants={staggerContainer} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* TERMINAL SIZZLE REEL */}
                <motion.div variants={fadeUpVariant} className="bg-[#1e1e1e] border border-white/10 rounded-[20px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex flex-col relative group">
                  {/* macOS Top Bar */}
                  <div className="h-8 bg-[#2d2d2d] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-4 text-[10px] text-gray-400 font-mono tracking-widest">arzanish@post-production ~</span>
                  </div>
                  
                  {/* Sizzle Reel Container */}
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                    {/* Placeholder for video - User can add real <video> tag here later */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 to-black z-0" />
                    
                    <div className="text-center z-10">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-fuchsia-500/20 transition-all cursor-pointer">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                      <p className="text-xs font-mono text-fuchsia-400 uppercase tracking-widest">Play Visual Reel</p>
                    </div>
                  </div>

                  {/* Terminal Text Overlay */}
                  <div className="p-6 bg-black/80 font-mono text-xs text-green-400 leading-relaxed">
                    <p>&gt; Executing rendering_engine.sh...</p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>&gt; Loading 8_years_post_production_experience.dll</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>&gt; Canva Pro environments synchronized.</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, repeat: Infinity, repeatType: "reverse", duration: 0.8 }} className="text-fuchsia-500">&gt; Awaiting input_</motion.p>
                  </div>
                </motion.div>

                {/* WORLD-BUILDING & NARRATIVE DESIGN */}
                <motion.div variants={fadeUpVariant} className="flex flex-col gap-6">
                  
                  <div className="bg-gray-900 border border-fuchsia-500/20 rounded-[40px] p-10 flex-1 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[80px]" />
                    
                    <div className="w-12 h-12 bg-fuchsia-500/20 rounded-xl flex items-center justify-center text-fuchsia-400 mb-6 border border-fuchsia-500/30">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                    
                    <h4 className="text-2xl font-black text-white mb-2 tracking-tight">Narrative Architecture</h4>
                    <p className="text-fuchsia-400 text-xs font-mono uppercase tracking-widest mb-6">10 Years of Writing Experience</p>
                    
                    <p className="text-gray-400 font-light leading-relaxed mb-6">
                      Engineering isn't just about wires; it's about structure. I apply the same rigorous logic required for VHDL programming to the architecture of storytelling and world-building. 
                    </p>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Currently writing the fiction novel <strong className="text-white">"Touch of the Tainted"</strong>, where managing the complex, intertwining character arcs of Vanessa, Silver, and Ezekiel requires as much system-level thinking as routing a printed circuit board.
                    </p>
                  </div>

                  {/* Skills Tag Box */}
                  <div className="bg-gray-950 border border-white/10 rounded-[30px] p-8">
                     <div className="flex flex-wrap gap-2.5">
                      {["World-Building", "Character Arcs", "Video Editing", "Canva Pro", "Audio & Music Sync", "Digital Media"].map((skill, idx) => (
                        <span key={idx} className="px-4 py-2 bg-fuchsia-900/20 text-fuchsia-300 text-[10px] uppercase tracking-wider rounded-xl border border-fuchsia-500/20">
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

        {/* --- RECENT MILESTONES (Appears in both states) --- */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="w-full max-w-6xl px-8 pb-32 pt-16">
          <motion.div variants={fadeUpVariant} className="mb-12 border-t border-white/10 pt-16">
             <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Milestones.</span></h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "University Innovators Pitch", subtitle: "First Runner Up", desc: "Successfully pitched the Mynee prototype business model and hardware architecture to a panel of industry experts, securing funding." },
              { title: "Embedded Systems Hackathon", subtitle: "Best Hardware Integration", desc: "Developed a rapid MVP integrating Wi-Fi CSI sensing with edge processing in under 48 hours." },
              { title: "Tech Symposium 2025", subtitle: "Keynote Presenter", desc: "Invited to present on the ethics and execution of quasi-direct drive technology in affordable medical devices." }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeUpVariant} whileHover={{ y: -8 }} className="relative group bg-gray-900/50 p-8 rounded-[30px] border border-white/10 hover:border-yellow-500/50 hover:shadow-[0_20px_40px_rgba(234,179,8,0.1)] transition-all duration-500 overflow-hidden flex flex-col">
                <div className="absolute top-0 right-8 h-full w-[1px] border-l-2 border-dashed border-white/10 group-hover:border-yellow-500/40 transition-colors duration-500 z-0" />
                <motion.div className="absolute top-8 right-[23px] text-yellow-500 text-2xl z-10" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}>✦</motion.div>
                <div className="relative z-10 flex-1">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3 group-hover:text-yellow-500 transition-colors duration-300">{item.subtitle}</p>
                  <h4 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- MEGA FOOTER --- */}
        <footer className="relative z-10 w-full bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
          <FooterDust />
          <div className="relative z-10 max-w-6xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
              
              <div className="lg:col-span-2">
                <div className="text-2xl font-black text-yellow-500 mb-6 tracking-tighter">MYNEE</div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.</p>
                <div className="flex items-center gap-4 text-gray-400">
                  <a href="#" className="hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></a>
                  <a href="#" className="hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg></a>
                </div>
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
                  <li><span className="hover:text-yellow-500 transition-colors cursor-default">Creative Media</span></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6">Resources</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">GitHub ↗</a></li>
                  <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">LinkedIn ↗</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
              <p>© 2026 MYNEE | Syed Arzanish</p>
              <p>Built with <span className="text-gray-300 font-medium">Next.js</span></p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}