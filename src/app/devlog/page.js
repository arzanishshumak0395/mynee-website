"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- 1. DARK DUST FOR PUBLISHED LOGS (GPU-Accelerated CSS Animations) ---
const DarkCardTechDust = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      tx: `${Math.random() * 20 - 10}px`,
      dur: `${3 + Math.random() * 5}s`,
      del: `${Math.random() * 0.5}s`,
      size: `${1.5 + Math.random() * 1.5}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-[30px]">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)] will-change-transform"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            '--tx': p.tx, 
            animation: `floatDust ${p.dur} infinite ease-in-out ${p.del}`
          }}
        />
      ))}
    </div>
  );
};

// --- 2. SUBTLE LOCK WATERMARK FOR UPCOMING LOGS ---
const LockedWatermark = () => (
  <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden rounded-[30px] opacity-[0.03]">
    <svg className="w-56 h-56 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
    </svg>
  </div>
);

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

// --- BACKGROUND ANIMATION COMPONENTS (GPU-Accelerated) ---
const BouncingOrb = () => {
  return (
    <motion.div
      animate={{ 
        x: [0, 300, -150, 200, 0],
        y: [0, 200, 300, -100, 0],
        scale: [1, 1.15, 1], 
        opacity: [0.6, 0.9, 0.6] 
      }}
      transition={{ 
        x: { duration: 25, repeat: Infinity, ease: "linear" },
        y: { duration: 30, repeat: Infinity, ease: "linear" },
        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
      }}
      className="fixed pointer-events-none z-0 will-change-transform"
      style={{
        left: '20%',
        top: '10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(180, 83, 9, 0.8) 0%, transparent 70%)',
        filter: 'blur(70px)',
      }}
    />
  );
};

const AmbientBackground = () => {
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      <style>{`
        @keyframes floatDust {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.3; }
          50% { transform: translate(var(--tx), -40px); opacity: 1; }
        }
        @keyframes floatAmbient {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.3; }
          50% { transform: translate(var(--tx), -120px); opacity: 0.8; }
        }
      `}</style>

      <div className="absolute top-[-15%] left-[-5%] w-[60%] h-[60%] bg-yellow-500/35 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-sky-500/30 rounded-full blur-[120px]" />
      <BouncingOrb />
      
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-amber-700 rounded-full blur-[0.5px] will-change-transform"
          style={{
            left: p.left,
            top: p.top,
            '--tx': p.tx,
            animation: `floatAmbient ${p.dur} infinite ease-in-out ${p.del}`
          }}
        />
      ))}
    </div>
  );
};

// --- MAIN PAGE VARIANTS ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

export default function DevLog() {
  const [scrolled, setScrolled] = useState(false);

  // FULL 11-WEEK SYLLABUS MAPPING
  const weeksData = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    
    // Phase 1: Foundation
    if (num === 1) return { num, title: "Project Genesis & Proposal.", desc: "Defining the rationale, establishing core objectives, and submitting the First-Cut Proposal for the Mynee exoskeleton.", isDarkTheme: true };
    if (num === 2) return { num, title: "Ethics & Architecture.", desc: "Formalizing the project plan, securing ethical clearance for biomechanical data collection, and drafting Chapter One.", isDarkTheme: true };
    if (num === 3) return { num, title: "Theoretical Framework.", desc: "Analyzing existing research methodologies, conducting the narrative literature review, and identifying the engineering gap.", isDarkTheme: true };
    if (num === 4) return { num, title: "WBS & Planning.", desc: "Finalizing Chapter Two. Establishing the Work Breakdown Structure and Gantt scheduling for hardware deployment.", isDarkTheme: true };
    
    // Phase 2: Execution
    if (num === 5) return { num, title: "MVP & Hardware Assembly.", desc: "Selecting the Agile framework, wiring the core sensors, and building the initial Minimum Viable Product.", isDarkTheme: true };
    if (num === 6) return { num, title: "UML & Prototype Testing.", desc: "Stress-testing the MVP, mapping the system architecture through UML diagrams, and drafting the SRS.", isDarkTheme: true };
    if (num === 7) return { num, title: "Core Implementation.", desc: "Executing Phase 1 coding. Integrating microcontroller sensor logic, data telemetry, and establishing the hardware-software loop.", isDarkTheme: true };
    if (num === 8) return { num, title: "System Architecture & Debugging.", desc: "Overcoming hardware bottlenecks, documenting API integrations, and drafting Chapter Three (System Design).", isDarkTheme: true };
    
    // Phase 3: Evaluation & Handover
    if (num === 9) return { num, title: "QA & Performance Evaluation.", desc: "Rigorous unit and integration testing of the electro-mechanical components. Defining metrics for Chapter Four.", isDarkTheme: true };
    if (num === 10) return { num, title: "Results & Empirical Analysis.", desc: "Analyzing telemetry data, charting performance against benchmarks, and evaluating limitations for Chapter Five.", isDarkTheme: true };
    if (num === 11) return { num, title: "Final Conclusions & Handover.", desc: "Drafting Chapter Six. Assembling appendices, risk assessments, and preparing the final presentation slides and demo video.", isDarkTheme: true };

    return {
      num,
      title: "Project Submission",
      desc: "🔒 Scheduled for April 24, 2026", 
      isDarkTheme: false
    };
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 font-sans overflow-x-hidden">
      
      <AmbientBackground />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* HEADER SECTION */}
        <div className="w-full max-w-5xl px-8 pt-52 pb-16 text-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center">
            <motion.div variants={fadeUpVariant} className="inline-block mb-6 px-5 py-1.5 rounded-full bg-yellow-100/50 border border-yellow-200 text-yellow-700 text-[10px] font-bold tracking-[0.3em] uppercase shadow-sm">
              Development Journal
            </motion.div>
            <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-gray-800">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Logs.</span>
            </motion.h1>
            <motion.p variants={fadeUpVariant} className="text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Documenting the 12-week journey of building the Mynee smart knee exoskeleton. From initial literature reviews and ethical clearance to physical prototyping and final empirical evaluation.
            </motion.p>
          </motion.div>
        </div>

        {/* 12-WEEK GRID */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-6xl px-8 pb-32 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {weeksData.map((week) => (
            <Link key={week.num} href={week.isDarkTheme ? `/devlog/week-${week.num}` : "#"}>
              <motion.div 
                variants={fadeUpVariant} 
                whileHover={week.isDarkTheme ? { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } } : {}}
                className={`relative overflow-hidden p-8 backdrop-blur-md rounded-[30px] transition-all duration-300 group h-full flex flex-col justify-between will-change-transform
                  ${week.isDarkTheme 
                    ? "bg-black border border-white/10 hover:border-yellow-500/50 shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(234,179,8,0.2)] cursor-pointer" 
                    : "bg-white/70 border border-gray-100 cursor-default"
                  }
                `}
              >
                {week.isDarkTheme ? <DarkCardTechDust /> : <LockedWatermark />}

                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black mb-6 transition-colors
                    ${week.isDarkTheme 
                      ? "bg-white/10 text-yellow-500 group-hover:bg-yellow-500/20" 
                      : "bg-slate-50 text-gray-400"
                    }
                  `}>
                    {week.num}
                  </div>
                  
                  <h4 className={`text-xl font-bold mb-1 ${week.isDarkTheme ? "text-white" : "text-gray-800"}`}>
                    Week {week.num}
                  </h4>
                  
                  <h5 className={`text-sm font-bold mb-3 ${week.isDarkTheme ? "text-yellow-500" : "text-gray-400"}`}>
                    {week.title}
                  </h5>
                  
                  <p className={`text-xs leading-relaxed mb-6 ${week.isDarkTheme ? "text-gray-400" : "text-gray-400"}`}>
                    {week.desc}
                  </p>
                </div>

                {week.isDarkTheme && (
                  <div className="relative z-10 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform text-yellow-500 mt-auto pt-6 flex items-center gap-1">
                    Read Log <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>

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
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  </a>
                  <a href="#" className="hover:text-yellow-500 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                  </a>
                  <a href="mailto:syedarzanish@gmail.com" className="hover:text-yellow-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </a>
                </div>
              </div>

              {/* Navigation Column */}
              <div>
                <h4 className="text-white font-bold mb-6">Navigation</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                  <li><Link href="/sessions" className="hover:text-yellow-500 transition-colors">Sessions</Link></li>
                  <li><button onClick={scrollToTop} className="hover:text-yellow-500 transition-colors text-left text-white">Dev Log</button></li>
                  <li><Link href="/about" className="hover:text-yellow-500 transition-colors">The Architect</Link></li>
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
      </div>
    </main>
  );
}