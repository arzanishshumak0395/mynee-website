"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
        @keyframes scrollGrid { 0% { transform: translateY(0) rotateX(45deg); } 100% { transform: translateY(60px) rotateX(45deg); } }
        @keyframes floatData { 0%, 100% { transform: translate(0px, 0px) scale(1); opacity: 0.1; } 50% { transform: translate(var(--tx), -100px) scale(1.5); opacity: 0.7; } }
        @keyframes scanline { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } }
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
          style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatData ${p.dur} infinite ease-in-out ${p.del}` }} />
      ))}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_90%)]" />
    </div>
  );
};

// --- ANIMATION VARIANTS ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ContactPage() {
  const [formActive, setFormActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleFormBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setFormActive(false);
    }
  };

  // Form submission handler to provide UX feedback & send to Formspree
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/mdabkdjj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitStatus('success');
        e.target.reset(); // Clear form on success
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans overflow-x-hidden selection:bg-teal-500/30">
      
      <DataGridBackground />

      <div className="relative z-10 w-full flex flex-col items-center flex-1">
        
        {/* HEADER SECTION */}
        <div className="w-full max-w-5xl px-6 md:px-8 pt-44 pb-12 text-center flex flex-col items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="inline-block mb-6 px-5 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            Secure Channel
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUpVariant} className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 drop-shadow-md">Contact.</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUpVariant} className="text-lg text-gray-400 font-light max-w-2xl leading-relaxed mx-auto">
            Interested in the <span className="text-teal-400 font-medium tracking-wide">Mynee Exoskeleton</span>? Whether you are a researcher, potential industry partner, or just curious about edge-computed biomechanics, I'd love to connect.
          </motion.p>
        </div>

        {/* CONTACT GRID */}
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full max-w-6xl px-6 md:px-8 pb-32 grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* LEFT: TRANSMIT MESSAGE FORM */}
          <motion.div 
            variants={fadeUpVariant} 
            className={`lg:col-span-3 bg-[#0a0a0a]/90 backdrop-blur-2xl border ${formActive ? 'border-teal-500/50 shadow-[0_0_30px_rgba(45,212,191,0.1)]' : 'border-white/10 shadow-2xl'} rounded-[40px] p-8 md:p-12 hover:border-teal-500/30 transition-all duration-500 group`}
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black text-white tracking-tight">Transmit Message</h3>
              
              {/* DYNAMIC STATUS INDICATOR */}
              <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-white/5">
                {formActive ? (
                  <>
                    <div className="relative flex w-2 h-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full w-2 h-2 bg-teal-500"></span>
                    </div>
                    <span className="text-[9px] font-mono text-teal-400 font-bold uppercase tracking-widest drop-shadow-[0_0_5px_rgba(45,212,191,0.8)]">Status: Active</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest transition-colors duration-300">Status: Standby</span>
                  </>
                )}
              </div>
            </div>

            <form 
              className="space-y-6 flex flex-col h-full relative" 
              onSubmit={handleSubmit}
              onFocus={() => setFormActive(true)}
              onBlur={handleFormBlur}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${formActive ? 'text-teal-400' : 'text-gray-500'}`}>Your Name</label>
                  <input required id="name" name="name" type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${formActive ? 'text-teal-400' : 'text-gray-500'}`}>Email Address</label>
                  <input required id="email" name="email" type="email" placeholder="john@domain.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${formActive ? 'text-teal-400' : 'text-gray-500'}`}>Subject / Inquiry Type</label>
                <input required id="subject" name="subject" type="text" placeholder="Hardware Collaboration / Academic Inquiry" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all" />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <label htmlFor="message" className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${formActive ? 'text-teal-400' : 'text-gray-500'}`}>Message Data</label>
                <textarea required id="message" name="message" placeholder="Enter transmission details here..." className="w-full flex-1 min-h-[160px] bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all resize-none custom-scrollbar" />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm text-center">
                  Transmission successful. I will respond to your channel shortly.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                  Transmission failed. Please try again or use the Direct Comm link.
                </div>
              )}

              <button 
                disabled={isSubmitting}
                type="submit" 
                className={`w-full mt-4 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3
                  ${isSubmitting 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/10' 
                    : 'bg-gradient-to-r from-teal-400 to-emerald-400 text-black hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:scale-[1.02] active:scale-95'
                  }`}
              >
                {isSubmitting ? 'Transmitting...' : 'Send Transmission'}
                {!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
              </button>
            </form>
          </motion.div>

          {/* RIGHT: NETWORK NODES */}
          <motion.div variants={fadeUpVariant} className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 shadow-2xl flex-1 flex flex-col hover:border-teal-500/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 blur-[80px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />
              
              <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-8">Network Nodes</h3>
              
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                
                {/* Email Node */}
                <a href="mailto:Arzanishshumak0395@gmail.com" className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/40 hover:bg-teal-500/10 transition-all duration-300 group/node">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-teal-400 shadow-inner group-hover/node:border-teal-500/50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <span className="text-sm font-bold text-white tracking-wide">Direct Comm</span>
                  </div>
                  {/* Truncated slightly for UI aesthetics but links to full email */}
                  <span className="text-[10px] text-gray-500 font-mono group-hover/node:text-teal-300 transition-colors">Arzanishshumak0395...</span>
                </a>

                {/* GitHub Node */}
                <a href="https://github.com/arzanishshumak0395" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300 group/node">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-emerald-400 shadow-inner group-hover/node:border-emerald-500/50">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="text-sm font-bold text-white tracking-wide">Repository</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono group-hover/node:text-emerald-300 transition-colors">/arzanishshumak0395</span>
                </a>

              </div>
            </div>

            {/* LOCATION CARD */}
            <div className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 shadow-2xl flex items-center justify-between hover:border-yellow-500/30 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute top-1/2 right-10 -translate-y-1/2 w-32 h-32 bg-yellow-500/10 blur-[50px] pointer-events-none group-hover:bg-yellow-500/20 transition-colors" />
              <div>
                <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1">Current Base of Operations</p>
                <h4 className="text-lg font-black text-white">Dubai, United Arab Emirates</h4>
              </div>
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shadow-inner group-hover:border-yellow-500/50 transition-colors">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>

      {/* --- MEGA FOOTER --- */}
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
                <li><Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link></li>
                <li><Link href="/devlog" className="hover:text-teal-400 transition-colors">Dev Log</Link></li>
                <li><Link href="/documents" className="hover:text-teal-400 transition-colors">Documents</Link></li>
                <li><Link href="/about" className="hover:text-teal-400 transition-colors">The Architect</Link></li>
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
                <li><a href="#" className="flex items-center gap-1 hover:text-teal-400 transition-colors">LinkedIn ↗</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono tracking-widest uppercase xl:px-8">
            <p>© 2026 MYNEE | Syed Arzanish - Capstone Project.</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </footer>
      
      {/* Global CSS for custom scrollbar in textarea */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45,212,191,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45,212,191,0.5); }
      `}</style>
    </main>
  );
}