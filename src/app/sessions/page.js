"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// --- GPU-ACCELERATED FOOTER DUST ---
const FooterDust = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(30)].map(() => ({
      tx: `${Math.random() * 30 - 15}px`,
      dur: `${5 + Math.random() * 7}s`,
      del: `${Math.random() * 1}s`,
      size: `${1 + Math.random() * 1.5}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
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
        <div
          key={i}
          className="absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)] will-change-transform"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            '--tx': p.tx,
            animation: `floatFooterDust ${p.dur} infinite ease-in-out ${p.del}`
          }}
        />
      ))}
    </div>
  );
};

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

// --- WORK IN PROGRESS ANIMATIONS ---
const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, -3, 3, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

const pulseGlow = {
  animate: {
    opacity: [0.1, 0.4, 0.1],
    scale: [0.95, 1.05, 0.95],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  }
};

const loadingBar = {
  hidden: { width: "0%" },
  visible: { 
    width: "100%", 
    transition: { duration: 2.5, repeat: Infinity, ease: "linear" } 
  }
};

export default function Sessions() {
  const [scrolled, setScrolled] = useState(false);
  const [dots, setDots] = useState("");

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Terminal typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        
        {/* DR. JUDHI */}
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

        {/* ARZANISH */}
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
                {["VHDL", "SoC Design", "Hardware Design", "Next.js", "Technical Writing", "C++/Python" ].map((skill) => (
                  <span key={skill} className="px-6 py-2 bg-white shadow-sm text-gray-600 rounded-2xl text-[11px] font-bold border border-gray-100 hover:border-sky-200 hover:text-sky-600 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ARCHIVES - WORK IN PROGRESS */}
      <section className="w-full max-w-5xl mx-auto px-8 mt-40 pb-32 border-t border-gray-200/60 pt-24 [perspective:none]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-10">
          
          <motion.div variants={fadeUpVariant} className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-5xl font-black text-gray-900 tracking-tighter">Meeting Archives</h3>
              <p className="text-gray-400 font-medium mt-2">Documented progress and supervisor feedback</p>
            </div>
          </motion.div>
          
          {/* UNDER CONSTRUCTION BLOCK */}
          <motion.div variants={fadeUpVariant} className="w-full relative overflow-hidden bg-gray-950 border border-white/10 rounded-[40px] p-12 md:p-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            
            {/* Background Glow */}
            <motion.div 
              variants={pulseGlow} 
              animate="animate" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/20 blur-[80px] rounded-full pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Floating Emoji Character */}
              <motion.div 
                variants={floatAnimation} 
                animate="animate" 
                className="text-6xl md:text-7xl mb-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              >
                👷‍♂️📋
              </motion.div>

              {/* Status Badge */}
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[10px] font-black tracking-[0.3em] uppercase">
                Status: Work In Progress
              </div>

              {/* Main Heading */}
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                Meeting Logs<br />Compiling.
              </h3>
              
              {/* Description */}
              <p className="text-base text-gray-400 font-light max-w-md mx-auto mb-10">
                Supervisor meeting notes, feedback, and action items are currently being formatted for documentation. Check back soon.
              </p>

              {/* Fake Terminal / Loading Bar */}
              <div className="w-full max-w-sm bg-black/50 border border-white/5 rounded-2xl p-4 text-left shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  <span className="text-[10px] text-gray-500 font-mono ml-2 uppercase tracking-widest">Supervisor_Terminal</span>
                </div>
                <div className="text-yellow-500 font-mono text-xs mb-3 flex">
                  <span>&gt; Syncing feedback logs{dots}</span>
                </div>
                {/* Animated Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    variants={loadingBar} 
                    initial="hidden" 
                    animate="visible" 
                    className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                  />
                </div>
              </div>

            </div>
          </motion.div>
          
        </motion.div>
      </section>

      {/* --- MEGA FOOTER WITH DUST --- */}
      <footer className="relative z-10 w-full bg-gray-950 border-t border-white/10 pt-20 pb-10 overflow-hidden">
        <FooterDust />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-yellow-500 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="hover:text-yellow-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
                <a href="mailto:syedarzanish@gmail.com" className="hover:text-yellow-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                <li><button onClick={scrollToTop} className="hover:text-yellow-500 transition-colors text-left">Sessions</button></li>
                <li><Link href="/devlog" className="hover:text-yellow-500 transition-colors">Dev Log</Link></li>
                <li><Link href="/#hardware" className="hover:text-yellow-500 transition-colors">Core Engineering</Link></li>
              </ul>
            </div>

            {/* Topics Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Biomechanics</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Edge Computing</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">PID Control</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Sensor Fusion</span></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">GitHub ↗</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">LinkedIn ↗</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">University ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 MYNEE | Syed Arzanish - Final Year Project.</p>
            <p>Built with <span className="text-gray-300 font-medium">Next.js</span> & <span className="text-gray-300 font-medium">Tailwind CSS</span>.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}