"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- ANIMATED LIGHT DUST (GPU-Accelerated) ---
const LightDust = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setParticles([...Array(25)].map(() => ({
      tx: `${Math.random() * 40 - 20}px`,
      dur: `${8 + Math.random() * 10}s`,
      del: `${Math.random() * 2}s`,
      size: `${1.5 + Math.random() * 2}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
      <style>{`
        @keyframes floatLightDust {
          0%, 100% { transform: translate(0px, 0px); opacity: 0; }
          50% { transform: translate(var(--tx), -60px); opacity: 0.6; }
        }
      `}</style>
      {particles.map((p, i) => (
        <div key={i} className="absolute bg-teal-600/40 rounded-full will-change-transform blur-[0.5px]"
          style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatLightDust ${p.dur} infinite ease-in-out ${p.del}` }}
        />
      ))}
    </div>
  );
};

// --- DYNAMIC AMBIENT BACKGROUND FOR LIGHT MODE ---
const AmbientLightBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50">
    <style>{`
      @keyframes breatheLight {
        0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.3; }
        50% { transform: scale(1.1) translate(2%, 2%); opacity: 0.6; }
      }
    `}</style>
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-sky-200/60 blur-[140px] rounded-full mix-blend-multiply" style={{ animation: 'breatheLight 15s infinite ease-in-out' }} />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-200/50 blur-[140px] rounded-full mix-blend-multiply" style={{ animation: 'breatheLight 20s infinite ease-in-out reverse' }} />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-80" />
    <LightDust />
  </div>
);

// --- ANIMATION VARIANTS ---
const staggerProfilesContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
};

const profilePopInVariant = {
  hidden: { opacity: 0, scale: 0.9, y: 40 }, 
  visible: { 
    opacity: 1, scale: 1, y: 0, 
    transition: { type: "spring", stiffness: 90, damping: 20, mass: 1 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// --- SUPERVISOR MEETING LOGS DATA ---
const meetingLogs = [
  {
    id: 1,
    week: "Week 1",
    title: "Project Genesis & The Pivot",
    focus: "Concept Ideation",
    notes: [
      "Discussed initial concepts carried over from the first module, specifically the smart prayer mat and eye-vision care device.",
      "Evaluated the engineering complexities and grading potential of these early ideas.",
      "Decided to officially pivot to the Smart Knee Exoskeleton to tackle more advanced electromechanical and edge-computing challenges."
    ],
    action: "Finalize the exoskeleton proposal and outline the initial hardware requirements."
  },
  {
    id: 2,
    week: "Week 3",
    title: "Mechanism, Safety & Ethics",
    focus: "Risk Management",
    notes: [
      "Presented the core mechanical theory of how the exoskeleton will apply assistive torque to the knee joint.",
      "Conducted a deep dive into safety precautions to ensure the mechanism cannot over-extend or harm any real-world participants.",
      "Identified the strict need for official documentation prior to physical testing."
    ],
    action: "Draft and submit the official Ethics Clearance and Risk Assessment forms."
  },
  {
    id: 3,
    week: "Week 5",
    title: "Remote Hardware Specifications",
    focus: "Actuation & Software",
    alert: "Conducted Online (War Conditions)",
    notes: [
      "Meeting held remotely due to regional war conditions. Shifted focus purely to theoretical calculations and sourcing.",
      "Discussed the actual motor to be used, calculating peak torque, voltage, and overall power requirements.",
      "Finalized the architecture for the software application required to run the telemetry."
    ],
    action: "Procure the finalized motors and establish the software repository."
  },
  {
    id: 4,
    week: "Week 8",
    title: "Mid-Project Progress Review",
    focus: "Hardware Limitations",
    notes: [
      "Reviewed the overall development timeline against the initial Gantt chart.",
      "Discussed the development of the project so far, heavily focusing on physical hardware limitations encountered during chassis assembly.",
      "Supervisor requested a detailed update on how the hardware development was taking place and component integration."
    ],
    action: "Provide a comprehensive hardware update and complete the mechanical assembly for the next review."
  },
  {
    id: 5,
    week: "Week 10",
    title: "Digital Portfolio & Documentation",
    focus: "Content Strategy",
    notes: [
      "Shifted discussion toward the digital deliverables: the development blog and portfolio website.",
      "Sought clarification on aesthetic expectations vs. technical depth.",
      "Supervisor explicitly clarified he is more concerned with the quality, depth, and accuracy of the content rather than the visual look of the site."
    ],
    action: "Ensure the Dev Log accurately reflects the engineering process, challenges faced, and theoretical frameworks applied."
  },
  {
    id: 6,
    week: "Week 11",
    title: "System Integration & Optimization",
    focus: "Kinematics & Telemetry",
    notes: [
      "Reviewed the integration of the control loop with the physical hardware.",
      "Analyzed sensor fusion accuracy and real-time data processing capabilities.",
      "Discussed the responsiveness of the motor engagement during the transition between the swing and stance phases of the gait cycle."
    ],
    action: "Fine-tune the control parameters to ensure smooth kinematic transitions and finalize data collection."
  },
  {
    id: 7,
    week: "Final Week",
    title: "Crisis Management & Pre-Demo Check",
    focus: "Final Submission Prep",
    alert: "Critical Hardware Alert",
    notes: [
      "Final project walkthrough before submission discussing everything one last time.",
      "Informed supervisor of a critical hardware failure: the primary motor fried during stress testing.",
      "Outlined immediate contingency plans to look for a new motor in time for the live demonstration.",
      "Discussed preparations for the final demo and the required demo video."
    ],
    action: "Procure replacement motor, stabilize hardware for the live demo, and render the final presentation video."
  }
];

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

export default function Sessions() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans overflow-x-hidden">
      
      <AmbientLightBackground />

      {/* HEADER */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-48 pb-12 w-full text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center mb-16">
          {/* ENHANCED MULTI-TONE GRADIENT */}
          <div className="h-1.5 w-32 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 rounded-full mb-6 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.6em]">Project Personnel</h2>
        </motion.div>
      </section>

      {/* GLOWING PROFILES GRID */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        variants={staggerProfilesContainer}
        className="w-full max-w-5xl mx-auto px-8 grid grid-cols-1 gap-12 relative z-10"
      >
        {/* DR. JUDHI */}
        <motion.div variants={profilePopInVariant} className="group relative bg-white/80 backdrop-blur-md p-1 rounded-[60px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden hover:border-teal-300 transition-all duration-500 hover:-translate-y-2">
          {/* RESTORED BACKGROUND GLOW ORB */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-400/20 blur-[100px] pointer-events-none group-hover:bg-teal-400/40 transition-colors duration-1000 rounded-full" />
          
          <div className="relative bg-white/90 rounded-[56px] p-10 md:p-14 flex flex-col md:flex-row items-center gap-12 border border-white">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-teal-400 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
              <div className="w-44 h-44 relative z-10 rounded-full overflow-hidden border-8 border-white shadow-xl transition-transform duration-500 group-hover:scale-105">
                <Image src="/judhi.jpg" alt="Dr. Judhi" fill className="object-cover" priority />
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-20">
              <h3 className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">Dr. Judhi</h3>
              <p className="text-teal-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-5">
                Senior Lecturer, HoD Department of Computer Engineering and Informatics
              </p>
              <p className="text-gray-500 font-light text-lg italic leading-relaxed max-w-xl">
                "Directing the engineering rigor, ethical compliance, and structural integrity of the complex knee orthosis, providing expert guidance on kinematic analysis, sensor fusion algorithms, and PID control logic."
              </p>
            </div>
          </div>
        </motion.div>

        {/* ARZANISH */}
        <motion.div variants={profilePopInVariant} className="group relative bg-white/80 backdrop-blur-md p-1 rounded-[60px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden hover:border-sky-300 transition-all duration-500 hover:-translate-y-2">
          {/* RESTORED BACKGROUND GLOW ORB */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-400/20 blur-[100px] pointer-events-none group-hover:bg-sky-400/40 transition-colors duration-1000 rounded-full" />
          
          <div className="relative bg-white/90 rounded-[56px] p-10 md:p-14 flex flex-col md:flex-row items-center gap-12 border border-white">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-sky-400 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
              <div className="w-44 h-44 relative z-10 rounded-full overflow-hidden border-8 border-white shadow-xl transition-transform duration-500 group-hover:scale-105">
                <Image src="/arzanish.png" alt="Syed Arzanish" fill className="object-cover" priority />
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-20">
              <h3 className="text-4xl font-black text-gray-900 mb-1 tracking-tighter">Syed Arzanish</h3>
              <p className="text-sky-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-5">
                Lead Electronics Engineer • Middlesex University Dubai
              </p>
              <p className="text-gray-500 font-light text-lg leading-relaxed mb-8 max-w-xl">
                Pioneering the Mynee architecture through advanced electronics engineering. Combining a decade of technical writing expertise to document high-fidelity SoC solutions for real-time orthopedic monitoring.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["VHDL", "SoC Design", "PID Control", "Hardware Design", "Next.js", "C++/Python" ].map((skill) => (
                  <span key={skill} className="px-6 py-2 bg-slate-50 shadow-sm text-gray-600 rounded-2xl text-[11px] font-bold border border-gray-200 hover:border-sky-300 hover:text-sky-600 hover:shadow-sky-100 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* MEETING LOGS TIMELINE WITH ANIMATIONS */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-8 mt-40 pb-32 border-t border-gray-200/60 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-16">
          
          <motion.div variants={fadeUpVariant} className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">Meeting Archives</h3>
              <p className="text-gray-500 font-light mt-2 text-lg">Documented engineering pivots and supervisor feedback.</p>
            </div>
          </motion.div>

          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-8 space-y-16">
            {meetingLogs.map((log) => (
              <motion.div key={log.id} variants={fadeUpVariant} className="relative pl-10 md:pl-16 group">
                
                {/* ANIMATED TIMELINE NODE */}
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-gray-300 group-hover:border-teal-400 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] transition-all duration-500 z-10">
                  {/* Inner pulsing dot */}
                  <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                </div>
                
                {/* Animated connecting line */}
                <div className="absolute left-[3px] top-4 w-12 h-[2px] bg-gray-200 group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 transition-all duration-500 origin-left scale-x-100 group-hover:scale-x-110" />
                
                {/* Content Card */}
                <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(20,184,166,0.1)] group-hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                  
                  {/* Alert Banner if applicable */}
                  {log.alert && (
                    <div className="absolute top-0 right-0 bg-red-50 text-red-600 border-b border-l border-red-100 px-4 py-1.5 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      {log.alert}
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight group-hover:text-teal-900 transition-colors">{log.title}</h4>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] uppercase tracking-widest text-teal-700 font-bold bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100 group-hover:bg-teal-100 transition-colors">{log.focus}</span>
                      <span className="text-xs font-bold text-gray-500 bg-slate-100 px-3 py-1 rounded-md">{log.week}</span>
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-3 mb-8">
                    {log.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600 font-light text-sm leading-relaxed">
                        <span className="text-teal-500 mt-1 shrink-0 font-bold">→</span>
                        {note}
                      </li>
                    ))}
                  </ul>

                  {/* Action Item Block */}
                  <div className="bg-slate-50/80 rounded-2xl p-5 border border-gray-100 flex gap-4 items-start shadow-inner group-hover:border-teal-100 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-gray-200 shadow-sm group-hover:border-teal-200 group-hover:text-teal-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Supervisor Action Item</p>
                      <p className="text-sm text-gray-800 leading-relaxed font-medium">"{log.action}"</p>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
          
        </motion.div>
      </section>

      {/* --- LIGHT FOOTER --- */}
      <footer className="relative z-10 w-full bg-slate-900 pt-20 pb-10 mt-auto overflow-hidden">
        <FooterDust />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-teal-400 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.
              </p>
              <div className="flex items-center gap-4 text-gray-500">
                <a href="#" className="hover:text-teal-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="hover:text-teal-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
                <a href="mailto:syedarzanish@gmail.com" className="hover:text-teal-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-gray-100 font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                <li><button onClick={scrollToTop} className="hover:text-teal-400 transition-colors text-left font-bold text-white">Sessions</button></li>
                <li><Link href="/devlog" className="hover:text-teal-400 transition-colors">Dev Log</Link></li>
                <li><Link href="/about" className="hover:text-teal-400 transition-colors">The Architect</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-100 font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="hover:text-teal-400 transition-colors cursor-default">Biomechanics</span></li>
                <li><span className="hover:text-teal-400 transition-colors cursor-default">Edge Computing</span></li>
                <li><span className="hover:text-teal-400 transition-colors cursor-default">PID Control</span></li>
                <li><span className="hover:text-teal-400 transition-colors cursor-default">Sensor Fusion</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-100 font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-1">GitHub ↗</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-1">LinkedIn ↗</a></li>
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-1">University ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono tracking-widest uppercase">
            <p>© 2026 MYNEE | Syed Arzanish - Capstone Project.</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </footer>
    </main>
  );
}