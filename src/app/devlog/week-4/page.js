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

export default function Week4Log() {
  const [wbsHoloActive, setWbsHoloActive] = useState(false);
  const [ganttHoloActive, setGanttHoloActive] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative z-10">
        <Sidebar activeWeek={4} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-16">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 font-bold tracking-widest uppercase text-[10px]">Feb 13, 2026</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">5 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Week 4: The Architecture of Execution – WBS & Scheduling.
              </h1>
            </div>
          </motion.header>

          {/* OVERVIEW */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              There is a massive difference between understanding the theory behind a robotic joint and actually knowing how to build one logically. Previous weeks established what Mynee is and the biomechanical research justifying its existence. Week 4 was about translating those concepts into a rigorous execution plan.
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              This week, I stepped away from the literature to formally map out the <strong>Work Breakdown Structure (WBS)</strong> and <strong>Gantt Chart</strong>. In hardware engineering, planning is not an administrative chore—it is a form of system design. A poorly sequenced software project results in bugs; a poorly sequenced hardware project results in burnt motors and fried microcontrollers.
            </p>
          </motion.div>

          {/* WBS SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setWbsHoloActive(true)} onHoverEnd={() => setWbsHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${wbsHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10">Decomposing the System: The WBS</h2>
            <div className="relative z-10 space-y-6">
              <p className="text-sm">
                To prevent the project from feeling like an insurmountable mountain, I used a WBS to slice Mynee into four distinct engineering domains. This modular approach ensures I can test components in isolation before attempting full-system integration.
              </p>
              
              <div className="pl-4 border-l-2 border-yellow-500">
                <h4 className="text-gray-900 font-black mb-1 text-sm uppercase tracking-wider">1. Mechanical & Power Infrastructure</h4>
                <p className="text-sm m-0">CAD modeling of the exoskeleton frame in Fusion 360, 3D printing in structural PETG, and designing the 3S LiPo battery management system to safely supply high current to the motors.</p>
              </div>

              <div className="pl-4 border-l-2 border-indigo-500">
                <h4 className="text-gray-900 font-black mb-1 text-sm uppercase tracking-wider">2. Embedded Sensing (Perception)</h4>
                <p className="text-sm m-0">Configuring the I2C protocols for the MPU6050 IMU and wiring the Analog-to-Digital Converter (ADC) required to process the FSR (Force Sensitive Resistor) foot-strike data.</p>
              </div>

              <div className="pl-4 border-l-2 border-slate-800">
                <h4 className="text-gray-900 font-black mb-1 text-sm uppercase tracking-wider">3. Edge Computing & Control (Intelligence)</h4>
                <p className="text-sm m-0">Setting up the Raspberry Pi Linux environment, writing the Python sensor-fusion pipelines (Kalman filtering), and programming the core PID control loop for the IBT-2 motor drivers.</p>
              </div>

              <div className="pl-4 border-l-2 border-emerald-500">
                <h4 className="text-gray-900 font-black mb-1 text-sm uppercase tracking-wider">4. Telemetry & User Interface</h4>
                <p className="text-sm m-0">Developing the web-based dashboard (using Next.js/React) to stream live operational data—flexion angles, motor torque, and system latency—via WebSocket connections.</p>
              </div>
            </div>
          </motion.div>

          {/* GANTT & DEPENDENCIES (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setGanttHoloActive(true)} onHoverEnd={() => setGanttHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${ganttHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10">The Critical Path: Gantt Scheduling</h2>
            <div className="relative z-10 space-y-4">
              <p>
                A Gantt chart was essential because hardware integration is strictly sequential. Mapping the tasks visually exposed several absolute dependencies:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-medium text-gray-700">
                <li>I physically cannot calibrate the Python kinetic variance thresholds until the Raspberry Pi is successfully reading clean I2C data from the IMU.</li>
                <li>I cannot begin tuning the <em>Assist-As-Needed</em> PID loop until the 3D-printed frame is assembled and mounted on a test rig to simulate leg weight.</li>
              </ul>
              <p>
                By identifying this "Critical Path," I structured the timeline to prioritize hardware assembly and base-level sensor communication in Weeks 5 and 6, leaving ample buffer time in Weeks 8-10 for the inevitably frustrating process of tuning algorithmic motor control.
              </p>
            </div>
          </motion.div>

          {/* DEVELOPMENT METHODOLOGY & REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Hardware Agile Methodology & Reflection</h2>
            <p>
              Given the experimental nature of a custom exoskeleton, a rigid "Waterfall" methodology would fail. Instead, I am adopting an <strong>Iterative Hardware Agile</strong> approach. Instead of building the entire leg and turning it on (which usually results in catastrophic failure), I will execute micro-sprints: e.g., Sprint 1 is just getting the IMU to print angles to the console. Sprint 2 is just making the PG36 motor spin based on a hardcoded input. 
            </p>
            <p>
              This week brought immense clarity. The abstract concept of an exoskeleton has now been demystified into a checklist of solvable engineering tasks. The planning phase is officially over; next week, we start wiring.
            </p>
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-3">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 3
              </button>
            </Link>
            <Link href="/devlog/week-5">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 5 <span className="group-hover:translate-x-1 transition-transform">→</span>
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