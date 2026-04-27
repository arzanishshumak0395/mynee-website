"use client";

import Sidebar from "../Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// --- ADVANCED CYBER-GRID BACKGROUND ---
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

const fadeUpVariant = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15, mass: 1 } } };

export default function Week12Log() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30">
      
      <DataGridBackground />

      {/* MAIN LAYOUT GRID */}
      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        
        {/* --- DYNAMIC LEFT SIDEBAR --- */}
        {/* NOTE: Ensure your Sidebar component has been updated to support the dark theme! */}
        <Sidebar activeWeek={12} />

        {/* --- RIGHT COLUMN: BLOG CONTENT --- */}
        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            
            {/* Header Section */}
            <div className="mb-12 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">
                  Project Phase III
                </span>
                <span className="text-gray-500 text-xs font-mono">5 MIN READ</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 12: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">Final Reflections.</span>
              </h1>
              
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                Looking back at the 12-week gauntlet of hardware failures, late-night coding, and the ultimate success of the live exoskeleton demonstration.
              </p>
            </div>

            {/* Blog Content Section */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <p>
                The development of the Mynee exoskeleton was as much of a test of my personal resilience as it was a rigorous engineering challenge. Transitioning this project from a theoretical white-box model into a physical, load-bearing orthosis required patience and the guts to navigate a gauntlet of logistical and technical hurdles. It fundamentally shaped my perspective on applied engineering and made me realise how much room I still have to grow in terms of being a full fledged electronics expert.
              </p>

              <h3 className="text-2xl text-white mt-12 mb-6">The Supply Chain Crisis</h3>
              <p>
                Perhaps the most daunting initial challenge was the procurement of the hardware. This was a hurdle that arrived due to severe supply chain disruptions and component shortages caused by ongoing geopolitical conflicts. Sourcing specific high-torque electromechanical actuators and microcomputing modules locally within Dubai proved nearly impossible.
              </p>
              
              {/* Image Placeholder (Replaces the empty box) */}
              <div className="my-10 p-6 bg-black/50 border border-white/5 rounded-3xl flex flex-col items-center justify-center text-center group border-dashed hover:border-teal-500/30 transition-colors">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-teal-500 group-hover:scale-110 transition-transform">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 </div>
                 <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">[Insert Image of Sourcing Components in Pakistan Here]</p>
              </div>

              <p>
                Overcoming this specific challenge required traveling to Pakistan to personally source the necessary raw materials and specialized electronic components from College Road and Gowalmandi. Adding immense logistical complexity and time constraints to the prototyping phase, along with intense physical strain.
              </p>

              <h3 className="text-2xl text-white mt-12 mb-6">Theoretical Physics vs. Physical Metal</h3>
              <p>
                Once the materials were secured, the physical fabrication introduced its own unforgiving realities. Theoretical physics rarely translates perfectly to physical metal. Dealing with local welders to fabricate the custom U-brackets and flange couplings required constant oversight and rapid on-the-fly design modifications. 
              </p>
              
              {/* Highlight Quote Block */}
              <blockquote className="border-l-4 border-teal-500 bg-teal-500/5 p-6 my-10 rounded-r-2xl italic text-gray-300">
                "I had to deal with nearly 20 different welders until I was finally able to complete the bracket, which didn't work and I had to repeat the process all over again the second time because the motor fried."
              </blockquote>

              <p>
                The harsh reality of hardware engineering became apparent when the entire mechanical assembly had to be torn down and rebuilt from scratch a second time to properly align the biomechanical pivot points. Pushing the prototype to its limits resulted in a severely burnt-out motor and driver. While frustrating at the moment, it led to diagnosing the thermal failure which in turn forced me to deeply investigate the critical, nuanced relationship between a motor's RPM and the intense power demands of human biomechanics.
              </p>

              <h3 className="text-2xl text-white mt-12 mb-6">The Final Conclusion</h3>
              <p>
                Ultimately, this project has profoundly impacted my trajectory as an engineer. It has taught me that real-world engineering is rarely about perfect initial designs, but rather about grit and adaptability during the relentless pursuit of a solution when things go wrong. We achieved our <span className="text-teal-400 font-mono">13.1ms</span> latency target, we hit the <span className="text-teal-400 font-mono">1.34°</span> kinematic accuracy, and we proved that affordable edge-computing can power a smart orthosis. The Mynee Exoskeleton is officially complete.
              </p>

            </div>

            {/* Back Button */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
              <Link href="/devlog">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Return to Index
                </button>
              </Link>
              <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">End of Log</span>
            </div>

          </motion.div>

        </article>
      </div>

      <footer className="w-full py-16 bg-[#020202] border-t border-white/5 text-center relative z-10 mt-auto">
        <div className="text-xl font-black text-teal-400 mb-4 tracking-tighter">MYNEE</div>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-mono">© 2026 Syed Arzanish.</p>
      </footer>
    </main>
  );
}