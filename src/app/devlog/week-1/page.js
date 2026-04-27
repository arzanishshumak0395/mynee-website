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

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
const holoHover = {
  initial: { scale: 1, y: 0, rotateX: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.1)" },
  hover: { scale: 1.015, y: -6, rotateX: -1, borderColor: "rgba(45, 212, 191, 0.4)", boxShadow: "0 30px 60px -15px rgba(45, 212, 191, 0.15), 0 10px 20px -5px rgba(45, 212, 191, 0.1)", transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 } }
};

export default function Week1Log() {
  const [isMethodologyHoloActive, setIsMethodologyHoloActive] = useState(false);
  const [isMyneeHoloActive, setIsMyneeHoloActive] = useState(false);
  const [isScopeHoloActive, setIsScopeHoloActive] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes flowTeal { to { stroke-dashoffset: -16; } }
        @keyframes flowYellow { to { stroke-dashoffset: -16; } }
      `}</style>

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={1} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 1</span>
                <span className="text-gray-500 text-xs font-mono">5 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 1: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">The First Step.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Stepping into the final chapter of my degree, the primary focus of this week was transitioning from exploring broad concepts to zeroing in on a specific, solvable engineering problem. Rather than rushing into building, this week was about establishing a strong foundation, defining the scope, and understanding the problem space organically.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <h2 className="text-3xl text-white mt-12 mb-6">Concept Exploration & The Spark</h2>
              <p>At the start of the week, I took time researching different project possibilities. My main goal was to find a topic that was practical, achievable, and addressed a genuine issue. I shortlisted a few ideas. One strong contender was a <strong>Smart Prayer Mat</strong>, designed to integrate sensors for posture and movement tracking. I also had another concept in mind revolving around a <strong>Smart Eye Tracker</strong> focused on eye health and computer vision.</p>
              <p>However, I was unsure which topic would be the most impactful. The true inspiration finally came from a deeply personal place: witnessing the daily struggles of restricted mobility. Watching my mother navigate the challenges of Osteoarthritis made me realize how limited current orthopedic supports truly are. Standard knee braces provide physical compression, but they generate zero data. If a physical therapist wants to know how a joint is functioning at home, they have to rely on patient guesswork. I wanted to bridge that gap.</p>

              <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => setIsMyneeHoloActive(true)} onHoverEnd={() => setIsMyneeHoloActive(false)}
                className="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-white/10 cursor-default my-12"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 rounded-[40px] pointer-events-none transition-opacity duration-700 ${isMyneeHoloActive ? "opacity-10" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(250,204,21,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.15) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>My Project Concept: Mynee</h2>
                <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
                  <p>The name <strong>Mynee</strong> represents a shift from generic medical braces to a highly personalized telemetry device—literally translating to <em>"My Knee."</em> The goal is to build a smart knee brace prototype designed to provide real-time telemetry: specifically flexion angles, impact forces, and material strain.</p>
                  <p>Instead of relying on a basic microcontroller, I opted for a more robust compute unit: a <strong>Raspberry Pi</strong>. Having a full Linux environment directly on the wearable allows for complex, local Python processing. This will be paired with an MPU6050 IMU and analog flex sensors embedded directly into a breathable neoprene sleeve.</p>
                  <p className="text-teal-400 font-medium"><strong>Privacy by Design:</strong> By processing all sensor fusion locally on the edge (Raspberry Pi) rather than tethering to a cloud server, Mynee ensures that sensitive medical and biometric data never leaves the patient's device.</p>
                </div>
              </motion.div>

              <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => setIsMethodologyHoloActive(true)} onHoverEnd={() => setIsMethodologyHoloActive(false)}
                className="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-white/10 cursor-default my-12"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 rounded-[40px] pointer-events-none transition-opacity duration-700 ${isMethodologyHoloActive ? "opacity-10" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(45,212,191,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.2) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>The Module Kick-Off & Methodologies</h2>
                <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
                  <p>This week marked the official start of our final-year project journey with an introductory session led by Dr. Fehmida and Mr. Roshan. They provided a comprehensive overview of the module structure, timelines, and assessment expectations. A significant portion of the lecture focused on different research methodologies and how they apply to engineering-based projects.</p>
                  <p>After evaluating the options, the <strong>Build, Model, and Experimental</strong> approaches stood out as the absolute best fit for my goals:</p>
                  <ul className="list-none pl-0 space-y-4 font-medium text-gray-300">
                    <li className="pl-4 border-l-2 border-teal-500"><span className="text-teal-400 font-bold">Build:</span> Will guide the physical design of the wearable prototype, the 3D-printed housing, and the hardware integration of the Raspberry Pi and sensor nodes.</li>
                    <li className="pl-4 border-l-2 border-emerald-500"><span className="text-emerald-400 font-bold">Model:</span> Will be central to designing the Python algorithms for sensor fusion, filtering noise from the analog signals, and translating raw data into accurate gait mapping.</li>
                    <li className="pl-4 border-l-2 border-yellow-500"><span className="text-yellow-400 font-bold">Experimental:</span> Will be required for testing the device in real-world walking scenarios to determine telemetry accuracy and network latency.</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
                onHoverStart={() => setIsScopeHoloActive(true)} onHoverEnd={() => setIsScopeHoloActive(false)}
                className="relative bg-[#0a0a0a]/60 backdrop-blur-xl p-10 md:p-12 rounded-[40px] border border-white/10 cursor-default my-12"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
                <div className={`absolute inset-0 rounded-[40px] pointer-events-none transition-opacity duration-700 ${isScopeHoloActive ? "opacity-10" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.15) 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Technical Scope & Phased Approach</h2>
                <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
                  <p>To ensure this complex electro-mechanical integration remains achievable, I have structured the Mynee development pipeline into four rigorous phases:</p>
                  <ul className="list-none pl-0 space-y-4 font-medium text-gray-300">
                    <li className="pl-4 border-l-2 border-gray-600"><span className="text-gray-300 font-bold">Phase 1: Research & Hardware Acquisition.</span> Establishing the theoretical framework and procuring the high-torque planetary gear motors and IMUs.</li>
                    <li className="pl-4 border-l-2 border-teal-500"><span className="text-teal-400 font-bold">Phase 2: Mechanical Assembly.</span> Designing the CAD models for the structural chassis and executing the 3D printing of the exoskeleton frame.</li>
                    <li className="pl-4 border-l-2 border-emerald-500"><span className="text-emerald-400 font-bold">Phase 3: Edge AI & Control Logic.</span> Writing the Python-based PID control loops and Kalman filters to ensure the motor accurately assists the user's natural gait without causing impedance.</li>
                    <li className="pl-4 border-l-2 border-yellow-500"><span className="text-yellow-400 font-bold">Phase 4: Empirical Validation.</span> Live stress-testing of the prototype to benchmark latency and biomechanical torque efficiency.</li>
                  </ul>
                </div>
              </motion.div>

              <h2 className="text-3xl text-white mt-12 mb-6">Reflection and Next Steps</h2>
              <p>Following the workshop, I had my first introductory meeting with my supervisor, Dr. Judhi. Discussing my initial ideas with him helped refine the project's direction, ensuring the engineering rigor and ethical compliance were locked in from day one.</p>
              <p>Submitting the First-Cut Proposal and setting up the structure for this very blog brought a lot of clarity to the chaos of the first week. Moving forward, my immediate focus will be on deep-dive research into the I2C and SPI communication protocols required for the sensors, and officially procuring the hardware.</p>
              <blockquote className="border-l-4 border-teal-500 bg-teal-500/5 p-6 my-10 rounded-r-2xl italic text-gray-300">
                "This is just the beginning, and I am incredibly excited to bring Mynee to life."
              </blockquote>

              {/* INTEGRATED ANIMATED BLACK BOX */}
              <div className="my-16">
                <h3 className="text-teal-400 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"/> Initial Architecture Block Diagram
                </h3>
                <div className="bg-[#0a0a0a]/60 border border-white/10 rounded-[30px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl h-auto md:h-64">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 0 }}>
                    <defs>
                      <filter id="glow-teal-w1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                      <filter id="glow-yellow-w1" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
                    </defs>
                    <path d="M 33 18 C 42 18 42 50 50 50" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                    <path d="M 33 50 L 50 50" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                    <path d="M 33 82 C 42 82 42 50 50 50" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                    <path d="M 50 50 C 58 50 58 18 67 18" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                    <path d="M 50 50 L 67 50" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                    <path d="M 50 50 C 58 50 58 82 67 82" fill="none" stroke="rgba(250,204,21,0.15)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                    
                    <path d="M 33 18 C 42 18 42 50 50 50" fill="none" stroke="#2dd4bf" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowTeal 1s linear infinite' }} filter="url(#glow-teal-w1)" />
                    <path d="M 33 50 L 50 50" fill="none" stroke="#2dd4bf" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowTeal 1s linear infinite' }} filter="url(#glow-teal-w1)" />
                    <path d="M 33 82 C 42 82 42 50 50 50" fill="none" stroke="#2dd4bf" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowTeal 1s linear infinite' }} filter="url(#glow-teal-w1)" />
                    
                    <path d="M 50 50 C 58 50 58 18 67 18" fill="none" stroke="#facc15" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowYellow 1s linear infinite' }} filter="url(#glow-yellow-w1)" />
                    <path d="M 50 50 L 67 50" fill="none" stroke="#facc15" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowYellow 1s linear infinite' }} filter="url(#glow-yellow-w1)" />
                    <path d="M 50 50 C 58 50 58 82 67 82" fill="none" stroke="#facc15" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="4 12" style={{ animation: 'flowYellow 1s linear infinite' }} filter="url(#glow-yellow-w1)" />
                  </svg>

                  <div className="space-y-4 relative z-10 w-full md:w-1/3 mb-6 md:mb-0">
                    <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-gray-300 font-mono shadow-lg">12V & 5V Power</div>
                    <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-gray-300 font-mono shadow-lg">Gait Phase (FSR)</div>
                    <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-gray-300 font-mono shadow-lg">Spatial Angle (IMU)</div>
                  </div>
                  
                  <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)] border-4 border-black shrink-0 mx-4 my-4 md:my-0">
                    <span className="text-[10px] font-black text-black text-center leading-tight">MYNEE<br/>CORE</span>
                  </div>

                  <div className="space-y-4 relative z-10 w-full md:w-1/3 mt-6 md:mt-0">
                    <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-yellow-500 font-mono shadow-lg">Mech Torque</div>
                    <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-yellow-500 font-mono shadow-lg">Zero Impedance</div>
                    <div className="bg-gray-900 border border-white/10 p-3 rounded-xl text-[10px] text-center text-yellow-500 font-mono shadow-lg">Diagnostic Logs</div>
                  </div>
                </div>
              </div>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">End of Log 1</span>
              <Link href="/devlog/week-2">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 2 <span className="group-hover:translate-x-1 transition-transform">→</span>
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