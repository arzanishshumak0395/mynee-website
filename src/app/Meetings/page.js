"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Meetings() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Placeholder data for meetings
  const meetingLogs = [
    { id: 1, date: "Week 2", topic: "Project Proposal & Ethics Package", notes: "Reviewed initial hardware schematic. Approved direction for Osteoarthritis focus. Pending submission of final ethics documentation." },
    { id: 2, date: "Week 4", topic: "VHDL & Sensor Integration", notes: "Discussed the architecture for the SoC Design & Implementation module. Evaluated analog flex sensor reliability." },
    { id: 3, date: "Week 7", topic: "UX/UI & Telemetry Feedback", notes: "Presented the live web dashboard. Advised to ensure data streaming latency remains below 100ms for accurate medical review." },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 font-sans">
      
      {/* NAVIGATION MENU */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/30 backdrop-blur-2xl border-b border-white/40 shadow-sm py-4 saturate-200" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center gap-8">
          <Link href="/" className="text-2xl font-black text-yellow-600 tracking-tighter shrink-0">MYNEE</Link>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em] shrink-0">
            <Link href="/" className="hover:text-yellow-600 transition-colors">Home</Link>
            <Link href="/meetings" className="text-yellow-600 transition-colors">Meetings</Link>
            <Link href="/devlog" className="hover:text-yellow-600 transition-colors">Dev Log</Link>
          </div>
        </div>
      </nav>

      <div className="w-full max-w-4xl px-8 pt-40 pb-20">
        
        {/* SUPERVISOR PROFILE */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="mb-20">
          <motion.h1 variants={fadeUpVariant} className="text-4xl md:text-5xl font-black mb-10 tracking-tighter text-gray-800 text-center">
            Supervisory <span className="text-yellow-500">Board.</span>
          </motion.h1>
          
          <motion.div variants={fadeUpVariant} className="bg-white p-10 md:p-14 rounded-[40px] shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-10 items-center hover:border-yellow-300 transition-colors duration-500">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-5xl font-black shrink-0 shadow-inner">
              J
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black text-gray-800 mb-2">Dr. Judhi</h3>
              <p className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-4">Project Supervisor • Middlesex University Dubai</p>
              <p className="text-gray-500 leading-relaxed font-light">
                Overseeing the development of the Mynee smart knee brace, ensuring engineering rigor, ethical compliance, and structural integrity for the SoC Design & Implementation module.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* MEETING TIMELINE */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
          <motion.h3 variants={fadeUpVariant} className="text-2xl font-black text-gray-800 mb-8 border-b border-gray-200 pb-4">Meeting Archives</motion.h3>
          
          {meetingLogs.map((log) => (
            <motion.div key={log.id} variants={fadeUpVariant} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <h4 className="text-lg font-bold text-gray-800">{log.topic}</h4>
                <span className="px-4 py-1 bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest rounded-full whitespace-nowrap w-max">{log.date}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{log.notes}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <footer className="w-full mt-auto py-16 bg-white border-t border-gray-100 text-center">
        <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Syed Arzanish.</p>
      </footer>
    </main>
  );
}
