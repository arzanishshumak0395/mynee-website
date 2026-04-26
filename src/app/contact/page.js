"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// ==========================================
// ELITE INTERSTELLAR ANIMATIONS (Zero-Lag)
// ==========================================
const fadeUp = { 
  hidden: { opacity: 0, y: 40 }, 
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 } } 
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// CSS-Only Starfield & Nebulas (Offloaded to GPU)
const EliteStarfield = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <style>{`
      .stars-container {
        position: absolute;
        inset: -100%;
        background-image: 
          radial-gradient(1.5px 1.5px at 20% 30%, #ffffff, transparent),
          radial-gradient(1px 1px at 50% 70%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 80% 40%, #ffffff, transparent),
          radial-gradient(1px 1px at 10% 90%, rgba(255,255,255,0.6), transparent),
          radial-gradient(1.5px 1.5px at 90% 10%, #ffffff, transparent);
        background-size: 350px 350px;
        animation: interstellar-drift 120s linear infinite;
      }
      @keyframes interstellar-drift {
        from { transform: translateY(0); }
        to { transform: translateY(350px); }
      }
      .nebula-glow {
        animation: breathe 20s infinite alternate ease-in-out;
      }
      @keyframes breathe {
        from { opacity: 0.15; transform: scale(1) rotate(0deg); }
        to { opacity: 0.35; transform: scale(1.1) rotate(3deg); }
      }
    `}</style>
    
    {/* Deep Space Gradients */}
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)] z-10" />
    
    {/* Infinite Parallax Star Layers */}
    <div className="stars-container opacity-50" />
    <div className="stars-container opacity-20" style={{ animationDuration: '180s', transform: 'scale(1.5)' }} />
    
    {/* Breating Nebulas */}
    <div className="nebula-glow absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-indigo-600/30 blur-[150px] rounded-full mix-blend-screen" />
    <div className="nebula-glow absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-yellow-600/20 blur-[150px] rounded-full mix-blend-screen" style={{ animationDelay: '-10s' }} />
  </div>
);

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

// ==========================================
// ICONS
// ==========================================
const MailIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>;
const GitHubIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>;
const LinkedInIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>;
const UniversityIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.5a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14v7"></path></svg>;

// ==========================================
// MAIN PAGE
// ==========================================
export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formState);
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black overflow-hidden">
      
      {/* ELITE ZERO-LAG BACKGROUND */}
      <EliteStarfield />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-48 pb-32 flex flex-col items-center flex-1">
        
        {/* HEADER SECTION */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-3xl mb-16">
          <motion.div variants={fadeUp} className="inline-block mb-6 px-5 py-1.5 rounded-full bg-yellow-100/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold tracking-[0.3em] uppercase shadow-sm">
            Secure Channel
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 drop-shadow-sm">
            Initiate Contact.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            Interested in the <span className="text-yellow-500 font-medium">Mynee Exoskeleton</span>? Whether you are a researcher, potential industry partner, or just curious about edge-computed biomechanics, I’d love to connect.
          </p>
        </motion.div>

        {/* GLASSMORPHISM MAIN CONTAINER */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer} 
          className="w-full bg-[#0a0a0a]/60 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-16 relative overflow-hidden"
        >
          {/* Subtle inner grid glow */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* LEFT COLUMN: MINIMALIST FORM */}
          <motion.div variants={fadeUp} className="lg:col-span-7 relative z-10">
            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Transmit Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group relative">
                <input 
                  type="text" id="name" name="name" placeholder=" " value={formState.name} onChange={handleInputChange} required
                  className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent"
                />
                <label htmlFor="name" className="absolute left-0 top-3 text-gray-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-yellow-500 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400 cursor-text">
                  Your Name
                </label>
              </div>

              <div className="group relative">
                <input 
                  type="email" id="email" name="email" placeholder=" " value={formState.email} onChange={handleInputChange} required
                  className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent"
                />
                <label htmlFor="email" className="absolute left-0 top-3 text-gray-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-yellow-500 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400 cursor-text">
                  Email Address
                </label>
              </div>

              <div className="group relative">
                <input 
                  type="text" id="subject" name="subject" placeholder=" " value={formState.subject} onChange={handleInputChange} required
                  className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent"
                />
                <label htmlFor="subject" className="absolute left-0 top-3 text-gray-500 text-sm font-medium transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-yellow-500 peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400 cursor-text">
                  Subject / Inquiry Type
                </label>
              </div>

              <div className="group relative pt-2">
                <textarea 
                  id="message" name="message" rows="4" placeholder=" " value={formState.message} onChange={handleInputChange} required
                  className="peer w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder-transparent resize-none"
                ></textarea>
                <label htmlFor="message" className="absolute left-0 top-5 text-gray-500 text-sm font-medium transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-yellow-500 peer-valid:-top-2 peer-valid:text-xs peer-valid:text-gray-400 cursor-text">
                  Message Data
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-white hover:bg-yellow-500 text-black font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] active:scale-95"
              >
                Engage
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: CONNECTION NODES */}
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-6 relative z-10 lg:pl-8 lg:border-l border-white/5">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Network Nodes</h3>
            
            {/* Contact Cards - Redesigned as sleek nodes */}
            <div className="space-y-4">
              <a href="mailto:syedarzanish@gmail.com" className="group flex items-center justify-between bg-black/40 border border-white/5 hover:border-yellow-500/50 p-4 rounded-2xl transition-all hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-yellow-500 transition-colors shadow-inner">
                    <MailIcon />
                  </div>
                  <h4 className="text-white font-medium text-sm">Direct Comm</h4>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">syedarzanish@gmail.com</span>
              </a>

              <a href="https://github.com/arzanish" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-black/40 border border-white/5 hover:border-yellow-500/50 p-4 rounded-2xl transition-all hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-yellow-500 transition-colors shadow-inner">
                    <GitHubIcon />
                  </div>
                  <h4 className="text-white font-medium text-sm">Repository</h4>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">/arzanish</span>
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between bg-black/40 border border-white/5 hover:border-yellow-500/50 p-4 rounded-2xl transition-all hover:bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 border border-white/5 flex items-center justify-center text-gray-400 group-hover:text-yellow-500 transition-colors shadow-inner">
                    <LinkedInIcon />
                  </div>
                  <h4 className="text-white font-medium text-sm">Professional</h4>
                </div>
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">Syed Arzanish</span>
              </a>

              <div className="group flex items-center justify-between bg-black/40 border border-white/5 p-4 rounded-2xl cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-900 border border-white/5 flex items-center justify-center text-gray-400 shadow-inner">
                    <UniversityIcon />
                  </div>
                  <h4 className="text-white font-medium text-sm">Institution</h4>
                </div>
                <span className="text-xs text-gray-500">Middlesex Dubai</span>
              </div>
            </div>

            {/* Information Callout */}
            <div className="mt-auto pt-8 border-t border-white/5">
              <p className="text-gray-400 text-xs leading-relaxed font-light">
                <strong className="text-yellow-500 block mb-1">Project Status: Complete</strong>
                The Mynee smart orthosis project has officially concluded its prototyping phase. Inquiries regarding technical documentation, methodology, or academic reproduction are highly encouraged.
              </p>
            </div>

          </motion.div>

        </motion.div>
      </div>

      {/* --- MEGA FOOTER WITH DUST --- */}
      <footer className="relative z-10 w-full bg-gray-950 border-t border-white/10 pt-20 pb-10 mt-auto overflow-hidden">
        <FooterDust />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-yellow-500 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.
              </p>
              <div className="flex items-center gap-4 text-gray-400">
                <a href="#" className="hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg></a>
                <a href="#" className="hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg></a>
                <a href="mailto:syedarzanish@gmail.com" className="hover:text-yellow-500 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                <li><Link href="/sessions" className="hover:text-yellow-500 transition-colors">Sessions</Link></li>
                <li><Link href="/devlog" className="hover:text-yellow-500 transition-colors">Dev Log</Link></li>
                <li><Link href="/about" className="hover:text-yellow-500 transition-colors">The Architect</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Biomechanics</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Edge Computing</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">PID Control</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Sensor Fusion</span></li>
              </ul>
            </div>

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