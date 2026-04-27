"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

const staggerProfilesContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.25 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const profilePopInVariant = { hidden: { opacity: 0, scale: 0.9, y: 40 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 20, mass: 1 } } };
const fadeUpVariant = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

const meetingLogs = [
  { id: 1, week: "Week 1", title: "Project Genesis & The Pivot", focus: "Concept Ideation", notes: ["Discussed initial concepts carried over from the first module, specifically the smart prayer mat and eye-vision care device.", "Evaluated the engineering complexities and grading potential of these early ideas.", "Decided to officially pivot to the Smart Knee Exoskeleton to tackle more advanced electromechanical challenges."], action: "Finalize the exoskeleton proposal and outline the initial hardware requirements." },
  { id: 2, week: "Week 3", title: "Mechanism, Safety & Ethics", focus: "Risk Management", notes: ["Presented the core mechanical theory of how the exoskeleton will apply assistive torque to the knee joint.", "Conducted a deep dive into safety precautions to ensure the mechanism cannot over-extend.", "Identified the strict need for official documentation prior to physical testing."], action: "Draft and submit the official Ethics Clearance and Risk Assessment forms." },
  { id: 3, week: "Week 5", title: "Remote Hardware Specifications", focus: "Actuation", alert: "Conducted Online (War Conditions)", notes: ["Meeting held remotely due to regional war conditions. Shifted focus purely to theoretical calculations.", "Discussed the actual motor to be used, calculating peak torque, voltage, and power requirements.", "Finalized the architecture for the software application required to run the telemetry."], action: "Procure the finalized motors and establish the software repository." },
  { id: 4, week: "Week 8", title: "Mid-Project Progress Review", focus: "Hardware Limits", notes: ["Reviewed the overall development timeline against the initial Gantt chart.", "Discussed physical hardware limitations encountered during chassis assembly.", "Supervisor requested a detailed update on component integration."], action: "Provide a comprehensive hardware update for the next review." },
  { id: 5, week: "Week 10", title: "Digital Portfolio & Documentation", focus: "Content Strategy", notes: ["Shifted discussion toward the digital deliverables: the development blog and portfolio website.", "Sought clarification on aesthetic expectations vs. technical depth.", "Supervisor explicitly clarified he is more concerned with the quality, depth, and accuracy of the content rather than the visual look."], action: "Ensure the Dev Log accurately reflects the engineering process." },
  { id: 6, week: "Week 11", title: "System Integration & Optimization", focus: "Kinematics", notes: ["Reviewed the integration of the control loop with the physical hardware.", "Analyzed sensor fusion accuracy and real-time data processing capabilities.", "Discussed the responsiveness of the motor engagement during the gait cycle transitions."], action: "Fine-tune the control parameters to ensure smooth kinematic transitions." },
  { id: 7, week: "Final Week", title: "Crisis Management & Pre-Demo Check", focus: "Submission Prep", alert: "Critical Hardware Alert", notes: ["Final project walkthrough before submission discussing everything one last time.", "Informed supervisor of a critical hardware failure: the primary motor fried during stress testing.", "Outlined immediate contingency plans to look for a new motor in time for the live demonstration.", "Discussed preparations for the final demo and the required demo video."], action: "Procure replacement motor, stabilize hardware for the live demo, and render the final video." }
];

export default function Sessions() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-100 font-sans overflow-x-hidden selection:bg-teal-500/30">
      <DataGridBackground />

      {/* HEADER */}
      <section className="relative z-10 max-w-6xl mx-auto px-8 pt-48 pb-12 w-full text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center mb-16">
          <div className="h-1.5 w-32 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 rounded-full mb-6 shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.6em]">Project Personnel</h2>
        </motion.div>
      </section>

      {/* GLOWING PROFILES GRID */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={staggerProfilesContainer} className="w-full max-w-5xl mx-auto px-8 grid grid-cols-1 gap-12 relative z-10">
        
        {/* DR. JUDHI */}
        <motion.div variants={profilePopInVariant} className="group relative bg-[#0a0a0a]/90 backdrop-blur-xl p-1 rounded-[60px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden hover:border-teal-500/50 transition-all duration-500 hover:-translate-y-2">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] pointer-events-none group-hover:bg-teal-500/20 transition-colors duration-1000 rounded-full" />
          <div className="relative bg-[#0a0a0a]/80 rounded-[56px] p-10 md:p-14 flex flex-col md:flex-row items-center gap-12 border border-white/5">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-teal-400 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-700"></div>
              <div className="w-44 h-44 relative z-10 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <Image src="/judhi.jpg" alt="Dr. Judhi" fill className="object-cover" priority />
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-20">
              <h3 className="text-4xl font-black text-white mb-1 tracking-tighter">Dr. Judhi</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-5">
                Senior Lecturer, HoD Computer Engineering
              </p>
              <p className="text-gray-400 font-light text-lg italic leading-relaxed max-w-xl">
                "Directing the engineering rigor, ethical compliance, and structural integrity of the complex knee orthosis, providing expert guidance on kinematic analysis, sensor fusion algorithms, and PID control logic."
              </p>
            </div>
          </div>
        </motion.div>

        {/* ARZANISH */}
        <motion.div variants={profilePopInVariant} className="group relative bg-[#0a0a0a]/90 backdrop-blur-xl p-1 rounded-[60px] shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all duration-500 hover:-translate-y-2">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-500/10 blur-[100px] pointer-events-none group-hover:bg-yellow-500/20 transition-colors duration-1000 rounded-full" />
          <div className="relative bg-[#0a0a0a]/80 rounded-[56px] p-10 md:p-14 flex flex-col md:flex-row items-center gap-12 border border-white/5">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-700"></div>
              <div className="w-44 h-44 relative z-10 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <Image src="/arzanish.png" alt="Syed Arzanish" fill className="object-cover" priority />
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-20">
              <h3 className="text-4xl font-black text-white mb-1 tracking-tighter">Syed Arzanish</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-5">
                Lead Electronics Engineer
              </p>
              <p className="text-gray-400 font-light text-lg leading-relaxed mb-8 max-w-xl">
                Pioneering the Mynee architecture through advanced electronics engineering. Combining a decade of technical writing expertise to document high-fidelity SoC solutions for real-time orthopedic monitoring.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["VHDL", "SoC Design", "PID Control", "Hardware Design", "Next.js", "C++/Python" ].map((skill) => (
                  <span key={skill} className="px-6 py-2 bg-white/5 shadow-inner text-gray-300 rounded-2xl text-[11px] font-bold border border-white/10 hover:border-yellow-400 hover:text-yellow-400 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* MEETING LOGS TIMELINE */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-8 mt-40 pb-32 border-t border-white/10 pt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="space-y-16">
          <motion.div variants={fadeUpVariant} className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-5xl font-black text-white tracking-tighter">Meeting Archives</h3>
              <p className="text-gray-500 font-light mt-2 text-lg">Documented engineering pivots and supervisor feedback.</p>
            </div>
          </motion.div>

          <div className="relative border-l-2 border-white/10 ml-4 md:ml-8 space-y-16">
            {meetingLogs.map((log) => (
              <motion.div key={log.id} variants={fadeUpVariant} className="relative pl-10 md:pl-16 group">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-black border-4 border-white/20 group-hover:border-teal-400 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.6)] transition-all duration-500 z-10">
                  <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                </div>
                <div className="absolute left-[3px] top-4 w-12 h-[2px] bg-white/10 group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 transition-all duration-500 origin-left scale-x-100 group-hover:scale-x-110" />
                
                <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl group-hover:border-teal-500/40 transition-all duration-500 relative overflow-hidden">
                  {log.alert && (
                    <div className="absolute top-0 right-0 bg-red-900/40 text-red-400 border-b border-l border-red-500/30 px-4 py-1.5 rounded-bl-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />{log.alert}
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h4 className="text-2xl font-black text-white tracking-tight group-hover:text-teal-400 transition-colors">{log.title}</h4>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold bg-teal-900/30 px-4 py-1.5 rounded-full border border-teal-500/30 transition-colors">{log.focus}</span>
                      <span className="text-xs font-mono text-gray-500 bg-white/5 border border-white/10 px-3 py-1 rounded-md">{log.week}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {log.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400 font-light text-sm leading-relaxed">
                        <span className="text-teal-500 mt-1 shrink-0 font-bold">→</span>{note}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-black/50 rounded-2xl p-5 border border-white/5 flex gap-4 items-start shadow-inner group-hover:border-teal-500/20 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-sm group-hover:border-teal-500/50 group-hover:text-teal-400 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Supervisor Action Item</p>
                      <p className="text-sm text-gray-300 leading-relaxed font-medium">"{log.action}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* --- MEGA FOOTER RESTORED --- */}
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
                <li><button onClick={scrollToTop} className="hover:text-teal-400 transition-colors text-white font-bold text-left">Sessions</button></li>
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
                <li><a href="#" className="hover:text-teal-400 transition-colors flex items-center gap-1">GitHub ↗</a></li>
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
    </main>
  );
}