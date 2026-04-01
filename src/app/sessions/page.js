"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- PERSPECTIVE-REVEAL ANIMATIONS ---
const staggerProfilesContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } }
};

const profilePopInVariant = {
  hidden: { opacity: 0, scale: 0.9, y: 40, rotateX: -15 }, 
  visible: { 
    opacity: 1, scale: 1, y: 0, rotateX: 0, 
    transition: { type: "spring", stiffness: 90, damping: 20, mass: 1 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Sessions() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const meetingLogs = [
    { id: 1, date: "Week 2", topic: "Project Proposal & Ethics Package", notes: "Reviewed initial hardware schematic. Approved direction for Osteoarthritis focus. Pending submission of final ethics documentation." },
    { id: 2, date: "Week 4", topic: "VHDL & Sensor Integration", notes: "Discussed the architecture for the SoC Design & Implementation module. Evaluated analog flex sensor reliability." },
    { id: 3, date: "Week 7", topic: "UX/UI & Telemetry Feedback", notes: "Presented the live web dashboard. Advised to ensure data streaming latency remains below 100ms for accurate medical review." },
  ];

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans overflow-x-hidden [perspective:1000px]">
      
      

      {/* HEADER - RESTORED ORIGINAL */}
      <section className="max-w-6xl mx-auto px-8 pt-48 pb-12 w-full text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center mb-16">
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 via-sky-400 to-emerald-500 rounded-full mb-6"></div>
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.6em]">Project Personnel</h2>
        </motion.div>
      </section>

      {/* PROFILES GRID */}
      <motion.div 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        variants={staggerProfilesContainer}
        className="w-full max-w-5xl mx-auto px-8 grid grid-cols-1 gap-12 relative z-10"
      >
        
        {/* DR. JUDHI - FULL TEXT, COMPACT SCALE */}
        <motion.div variants={profilePopInVariant} className="group relative bg-white/60 backdrop-blur-xl p-1 rounded-[60px] shadow-xl border border-white/80 overflow-hidden hover:shadow-yellow-200/40 hover:-translate-y-1 transition-all duration-500">
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-100/30 blur-[100px] pointer-events-none group-hover:bg-yellow-200/40 transition-colors duration-1000" />
          <div className="relative bg-white/80 rounded-[56px] p-10 md:p-14 flex flex-col md:flex-row items-center gap-12">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-44 h-44 relative z-10 rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <Image src="/judhi.jpg" alt="Dr. Judhi" fill className="object-cover" priority />
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-20">
              <h3 className="text-4xl font-black text-gray-800 mb-1 tracking-tighter">Dr. Judhi</h3>
              <p className="text-yellow-600 font-black uppercase tracking-[0.2em] text-[10px] mb-5">
                Project Supervisor • Middlesex University Dubai
              </p>
              <p className="text-gray-500 font-light text-lg italic leading-relaxed max-w-xl">
                "Directing the engineering rigor, ethical compliance, and structural integrity of the Mynee smart knee brace within the Design & Implementation module."
              </p>
            </div>
          </div>
        </motion.div>

        {/* ARZANISH - FULL TEXT, COMPACT SCALE (Sky Theme) */}
        <motion.div variants={profilePopInVariant} className="group relative bg-white/60 backdrop-blur-xl p-1 rounded-[60px] shadow-xl border border-white/80 overflow-hidden hover:shadow-sky-200/40 hover:-translate-y-1 transition-all duration-500">
          <div className="absolute top-0 left-0 w-80 h-80 bg-sky-100/30 blur-[100px] pointer-events-none group-hover:bg-sky-200/40 transition-colors duration-1000" />
          <div className="relative bg-white/80 rounded-[56px] p-10 md:p-14 flex flex-col md:flex-row items-center gap-12">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-sky-400 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="w-44 h-44 relative z-10 rounded-full overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <Image src="/arzanish.png" alt="Syed Arzanish" fill className="object-cover" priority />
                <div className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </div>
            <div className="text-center md:text-left flex-1 relative z-20">
              <h3 className="text-4xl font-black text-gray-800 mb-1 tracking-tighter">Syed Arzanish</h3>
              <p className="text-sky-600 font-black uppercase tracking-[0.2em] text-[10px] mb-5">
                Lead Electronics Engineer • Middlesex University Dubai
              </p>
              <p className="text-gray-500 font-light text-lg leading-relaxed mb-8 max-w-xl">
                Pioneering the Mynee architecture through advanced electronics engineering. 
                Combining a decade of technical writing expertise to document high-fidelity 
                SoC solutions for real-time orthopedic monitoring.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {["VHDL", "SoC Design", "Next.js", "Video Editing"].map((skill) => (
                  <span key={skill} className="px-6 py-2 bg-white shadow-sm text-gray-600 rounded-2xl text-[11px] font-bold border border-gray-100 hover:border-sky-200 hover:text-sky-600 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ARCHIVES */}
      <section className="w-full max-w-5xl mx-auto px-8 mt-60 pb-32 border-t border-gray-200/60 pt-24 [perspective:none]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-10">
          <motion.div variants={fadeUpVariant} className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">Meeting Archives</h3>
              <p className="text-gray-400 font-medium mt-2">Documented progress and supervisor feedback</p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6">
            {meetingLogs.map((log) => (
              <motion.div key={log.id} variants={fadeUpVariant} className="group bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <h4 className="text-2xl font-black text-gray-800 group-hover:text-yellow-600 transition-colors">{log.topic}</h4>
                  <span className="px-5 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap w-max">{log.date}</span>
                </div>
                <p className="text-gray-500 text-lg font-light leading-relaxed">{log.notes}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-16 bg-white border-t border-gray-100 text-center">
        <div className="text-xl font-black text-yellow-600 mb-2 tracking-tighter">MYNEE</div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Syed Arzanish.</p>
      </footer>
    </main>
  );
}