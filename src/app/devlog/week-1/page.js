"use client";

import Sidebar from "../Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- UPGRADED: Butter-Smooth Spring Physics ---
const holoHover = {
  initial: { 
    scale: 1, 
    y: 0, 
    rotateX: 0, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(243, 244, 246, 1)" // Tailwind gray-100
  },
  hover: { 
    scale: 1.015, 
    y: -6, 
    rotateX: -1, // Softened the 3D tilt
    borderColor: "rgba(234, 179, 8, 0.6)", 
    boxShadow: "0 30px 60px -15px rgba(234, 179, 8, 0.2), 0 10px 20px -5px rgba(234, 179, 8, 0.1)",
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25, // This is the secret to removing the "jank"
      mass: 1
    }
  }
};

const StealthTechDust = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(80)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0.2 }}
        animate={{
          y: [0, -40, 0],
          x: [0, Math.random() * 30 - 15, 0],
          opacity: [0.1, 0.8, 0.1]
        }}
        transition={{
          duration: 4 + Math.random() * 8,
          repeat: Infinity,
          delay: i * 0.05,
        }}
        className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.4)]"
        style={{
          width: `${0.5 + Math.random() * 1.3}px`,
          height: `${0.5 + Math.random() * 1.3}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </div>
);

export default function Week1Log() {
  const [methodologyHoloActive, setMethodologyHoloActive] = useState(false);
  const [myneeHoloActive, setMyneeHoloActive] = useState(false);

  return (
    // FIX 1: Removed 'overflow-hidden' from main so the sidebar can stick!
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* BACKGROUND GRID */}
      {/* FIX 1: Added 'overflow-hidden' here to contain the background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative z-10">
        
        <Sidebar activeWeek={1} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER: NO HUE / NO GLOW / NO SHADOW (FIX 2) */}
          <motion.header 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp} 
            className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-16"
          >
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 font-bold tracking-widest uppercase text-[10px]">Jan 23, 2026</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">3 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Week 1: The First Step.
              </h1>
            </div>
          </motion.header>

          {/* FULL INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Stepping into the final chapter of my degree, the primary focus of this week was transitioning from exploring broad concepts to zeroing in on a specific, solvable engineering problem. Rather than rushing into building, this week was about establishing a strong foundation, defining the scope, and understanding the problem space organically.
            </p>
          </motion.div>

          {/* FULL METHODOLOGIES SECTION */}
          <motion.div 
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            variants={holoHover}
            viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setMethodologyHoloActive(true)}
            onHoverEnd={() => setMethodologyHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${methodologyHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>The Module Kick-Off & Methodologies</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                This week marked the official start of our final-year project journey with an introductory session led by Dr. Fehmida and Mr. Roshan. They provided a comprehensive overview of the module structure, timelines, and assessment expectations. A significant portion of the lecture focused on different research methodologies and how they apply to engineering-based projects.
              </p>
              <p>After evaluating the options, the <strong>Build, Model, and Experimental</strong> approaches stood out as the absolute best fit for my goals:</p>
              <ul className="list-disc pl-6 space-y-4 font-medium text-gray-700">
                <li><span className="text-indigo-600 font-bold">Build:</span> Will guide the physical design of the wearable prototype, the 3D-printed housing, and the hardware integration of the Raspberry Pi and sensor nodes.</li>
                <li><span className="text-indigo-600 font-bold">Model:</span> Will be central to designing the Python algorithms for sensor fusion, filtering noise from the analog signals, and translating raw data into accurate gait mapping.</li>
                <li><span className="text-indigo-600 font-bold">Experimental:</span> Will be required for testing the device in real-world walking scenarios to determine telemetry accuracy and network latency.</li>
              </ul>
              <p>
                During the session, Mr. Roshan also introduced us to the First-Cut Proposal—a critical document used to define the project’s objectives and feasibility.
              </p>
            </div>
          </motion.div>

          {/* FULL CONCEPT EXPLORATION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Concept Exploration & The Spark</h2>
            <p>
              At the start of the week, I took time researching different project possibilities. My main goal was to find a topic that was practical, achievable, and addressed a genuine issue. I shortlisted a few ideas. One strong contender was a <strong>Smart Prayer Mat</strong>, designed to integrate sensors for posture and movement tracking. I also had another concept in mind revolving around a <strong>Smart Eye Tracker</strong> focused on eye health and computer vision.
            </p>
            <p>
              However, I was unsure which topic would be the most impactful. The true inspiration finally came from a deeply personal place: witnessing the daily struggles of restricted mobility. Watching my mother navigate the challenges of Osteoarthritis made me realize how limited current orthopedic supports truly are. Standard knee braces provide physical compression, but they generate zero data. If a physical therapist wants to know how a joint is functioning at home, they have to rely on patient guesswork. I wanted to bridge that gap.
            </p>
          </motion.div>

          {/* FULL MYNEE CONCEPT */}
          <motion.div 
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            variants={holoHover}
            viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setMyneeHoloActive(true)}
            onHoverEnd={() => setMyneeHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${myneeHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>My Project Concept: Mynee</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                That realization became the foundation of <strong>Mynee</strong>. The goal is to build a smart knee brace prototype designed to provide real-time telemetry—specifically flexion angles, impact forces, and material strain.
              </p>
              <p>
                Instead of relying on a basic microcontroller, I opted for a more robust compute unit: a <strong>Raspberry Pi</strong>. Having a full Linux environment directly on the wearable allows for complex, local Python processing. This will be paired with an MPU6050 IMU and analog flex sensors embedded directly into a breathable neoprene sleeve, prioritizing the user's natural gait and privacy by processing data locally.
              </p>
            </div>
          </motion.div>

          {/* FULL REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Reflection and Next Steps</h2>
            <p>
              Following the workshop, I had my first introductory meeting with my supervisor, Dr. Judhi. Discussing my initial ideas with him helped refine the project's direction, ensuring the engineering rigor and ethical compliance were locked in from day one.
            </p>
            <p>
              Submitting the First-Cut Proposal and setting up the structure for this very blog brought a lot of clarity to the chaos of the first week. Moving forward, my immediate focus will be on deep-dive research into the I2C and SPI communication protocols required for the sensors, and officially procuring the hardware.
            </p>
            <p className="font-bold text-gray-900 italic pt-6 text-xl tracking-tight">
              This is just the beginning, and I am incredibly excited to bring Mynee to life.
            </p>
          </motion.div>

          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <div className="text-gray-400 text-xs font-black tracking-[0.2em] uppercase">End of Log 1</div>
            <Link href="/devlog/week-2">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 2 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>

        </article>
      </div>

      <footer className="w-full py-16 bg-white border-t border-gray-100 text-center relative z-10">
        <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Syed Arzanish.</p>
      </footer>
    </main>
  );
}