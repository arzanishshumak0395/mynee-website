"use client";

import Sidebar from "../Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const holoHover = {
  initial: { 
    scale: 1, 
    y: 0, 
    rotateX: 0, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    borderColor: "rgba(243, 244, 246, 1)" 
  },
  hover: { 
    scale: 1.015, 
    y: -6, 
    rotateX: -1, 
    borderColor: "rgba(234, 179, 8, 0.6)", 
    boxShadow: "0 30px 60px -15px rgba(234, 179, 8, 0.2), 0 10px 20px -5px rgba(234, 179, 8, 0.1)",
    transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 }
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
        transition={{ duration: 4 + Math.random() * 8, repeat: Infinity, delay: i * 0.05 }}
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

export default function Week6Log() {
  const [evalHoloActive, setEvalHoloActive] = useState(false);
  const [reqHoloActive, setReqHoloActive] = useState(false);
  const [umlHoloActive, setUmlHoloActive] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative z-10">
        <Sidebar activeWeek={6} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-16">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 font-bold tracking-widest uppercase text-[10px]">Mar 23, 2026</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">5 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Week 6: Stress-Testing the MVP & System Architecture.
              </h1>
            </div>
          </motion.header>

          {/* OVERVIEW */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              After achieving a successful "Sense-Compute-Actuate" loop in last week's Minimum Viable Prototype (MVP), Week 6 was dedicated to breaking it. Just because a motor spins on a workbench doesn't mean it's safe to strap to a human joint. 
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              This week focused heavily on <strong>Prototype Evaluation</strong>—stress-testing the logic, identifying critical failures, and fixing them. Once the logic was stabilized, I formalized the system's architecture through Software Requirements Specifications and UML Design Diagrams.
            </p>
          </motion.div>

          {/* PROTOTYPE EVALUATION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setEvalHoloActive(true)} onHoverEnd={() => setEvalHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${evalHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10">Prototype Evaluation & Refinement</h2>
            <div className="relative z-10 space-y-4">
              <p>
                Subjecting the MVP to continuous real-world movement revealed a critical flaw in the initial software logic. 
              </p>
              
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mt-4">
                <h4 className="text-red-800 font-black mb-2 uppercase text-xs tracking-widest">Failure: The Jitter Effect</h4>
                <p className="text-sm text-red-900 m-0">
                  During rapid movement, the raw accelerometer data from the MPU6050 spiked violently. Because the motor's PWM (speed) signal was directly mapped to this raw angle, the PG36 gear motor began "stuttering" erratically. If attached to a user's knee, this aggressive oscillation would cause severe discomfort or injury.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mt-4">
                <h4 className="text-emerald-800 font-black mb-2 uppercase text-xs tracking-widest">Refinement: Algorithmic Damping</h4>
                <p className="text-sm text-emerald-900 m-0">
                  To solve this, I completely rewrote the Python processing pipeline. I implemented a strict <strong>Kalman Filter</strong> to fuse the accelerometer and gyroscope data. The gyroscope now handles rapid, short-term angle changes (ignoring impact noise), while the accelerometer corrects long-term drift. The result is a buttery-smooth data stream and a safely damped motor response.
                </p>
              </div>
            </div>
          </motion.div>

          {/* REQUIREMENTS SPECIFICATION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setReqHoloActive(true)} onHoverEnd={() => setReqHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${reqHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10">Software Requirements Specification</h2>
            <div className="relative z-10 space-y-6">
              <p className="text-sm">With the logic stabilized, I formalized the system requirements to guide the final integration phase.</p>
              
              <div>
                <h4 className="text-gray-900 font-black mb-1 uppercase text-xs tracking-widest">Functional Requirements</h4>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li>The Raspberry Pi must continuously poll the MPU6050 and FSR sensors at a minimum rate of 50Hz.</li>
                  <li>The system must dynamically adjust the IBT-2 driver's PWM duty cycle based on the calculated knee flexion angle.</li>
                  <li>The system must immediately cut motor power during the "Swing Phase" of the gait cycle to prevent user resistance.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-gray-900 font-black mb-1 uppercase text-xs tracking-widest">Non-Functional Requirements</h4>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong>Latency:</strong> Total end-to-end processing (from physical motion to motor response) must not exceed 100 milliseconds.</li>
                  <li><strong>Safety:</strong> The system must feature an external hardware interrupt (kill switch) isolating the 3S LiPo battery.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-gray-900 font-black mb-1 uppercase text-xs tracking-widest">User Requirements</h4>
                <ul className="text-sm list-disc pl-4 space-y-1">
                  <li><strong>Passive Compliance:</strong> The user should not have to manually trigger the assist. The system must autonomously infer intent based purely on natural movement.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* UML DIAGRAMS */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">System Architecture (UML)</h2>
            <p>
              To map out the finalized logic, I generated the core Unified Modeling Language (UML) diagrams. These map the data flow from the hardware sensors, through the edge-compute node, out to the mechanical actuators.
            </p>

            {/* PLACEHOLDERS FOR UML DIAGRAMS */}
            <div className="space-y-8 mt-8">
              <div className="w-full bg-white border border-gray-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm">
                <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h4 className="font-bold text-gray-900 m-0">Use Case Diagram</h4>
                <p className="text-sm text-gray-400 mt-2">[ Insert Use Case Export Here ]</p>
              </div>

              <div className="w-full bg-white border border-gray-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                </div>
                <h4 className="font-bold text-gray-900 m-0">Activity Diagram</h4>
                <p className="text-sm text-gray-400 mt-2">[ Insert Activity Flow Export Here ]</p>
              </div>

              <div className="w-full bg-white border border-gray-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                </div>
                <h4 className="font-bold text-gray-900 m-0">Sequence Diagram</h4>
                <p className="text-sm text-gray-400 mt-2">[ Insert Sequence Flow Export Here ]</p>
              </div>
            </div>
          </motion.div>

          {/* REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Methodological Reflection</h2>
            <p>
              This week proved exactly why I chose a <strong>Hardware-Adapted Agile</strong> methodology in Week 5. If I had rigidly adhered to a Waterfall model, I would have assumed my math was perfect, assembled the entire exoskeleton, and discovered the devastating jitter effect only after it was strapped to my leg.
            </p>
            <p>
              By testing early and often, I was able to isolate the noise issue in code and deploy the Kalman filter before any physical risk occurred. The system is now stable, structurally sound on paper, and ready for full hardware integration next week.
            </p>
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-5">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 5
              </button>
            </Link>
            <Link href="/devlog/week-7">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 7 <span className="group-hover:translate-x-1 transition-transform">→</span>
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