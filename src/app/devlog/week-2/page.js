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
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25, 
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

export default function Week2Log() {
  const [architectureHoloActive, setArchitectureHoloActive] = useState(false);
  const [ethicsHoloActive, setEthicsHoloActive] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative z-10">
        
        {/* Note: Ensure activeWeek is set to 2 here! */}
        <Sidebar activeWeek={2} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp} 
            className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-16"
          >
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 font-bold tracking-widest uppercase text-[10px]">Jan 30, 2026</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">4 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Week 2: Formalizing the Blueprint & Ethical Guardrails.
              </h1>
            </div>
          </motion.header>

          {/* INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              Week 2 marked a massive milestone for Mynee: getting the official "green light." After submitting my Final Project Proposal, I had a highly productive meeting with my supervisor, Dr. Judhi. Having the proposal signed and approved was the catalyst I needed to transition from theoretical ideation into structured engineering and execution.
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              With the direction locked in, my focus this week shifted entirely to formalizing the system architecture, establishing a strict ethical safety framework, and breaking the development cycle down into manageable milestones.
            </p>
          </motion.div>

         {/* SYSTEM ARCHITECTURE SECTION (INTERACTIVE BOX) */}
          <motion.div 
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            variants={holoHover}
            viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setArchitectureHoloActive(true)}
            onHoverEnd={() => setArchitectureHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${architectureHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Defining the Multi-Tiered Architecture</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                To prove that an electromechanical system can replicate the compliance of a high-end pneumatic exoskeleton, I had to solidify my hardware choices. The architecture of Mynee is now strictly divided into three distinct layers:
              </p>
              
              <ul className="list-none pl-0 space-y-6 my-6 font-medium text-gray-700">
                <li className="pl-4 border-l-2 border-yellow-500">
                  <span className="text-gray-900 font-black block mb-1">1. Mechanical & Actuation Layer</span>
                  The core of the system relies on <strong>PG36-555 Planetary Gear Motors (12V)</strong> driven by high-current <strong>IBT-2 (BTS7960) H-Bridges</strong>. This setup will be housed within a custom 3D-printed PETG frame designed to align flawlessly with the biological knee joint, generating the 5-10 Nm of torque required to assist with sit-to-stand motions.
                </li>
                <li className="pl-4 border-l-2 border-indigo-500">
                  <span className="text-gray-900 font-black block mb-1">2. Sensor & Perception Layer</span>
                  To achieve accurate "intent recognition," the system will use a sensor fusion approach. <strong>MPU6050 IMUs</strong> will track the spatial angle of the leg, while <strong>Force Sensitive Resistors (FSRs)</strong> placed in the footwear will identify critical gait phases (Stance vs. Swing).
                </li>
                <li className="pl-4 border-l-2 border-slate-800">
                  <span className="text-gray-900 font-black block mb-1">3. Compute & Control Layer</span>
                  Instead of a basic microcontroller, the brain of Mynee will be a <strong>Raspberry Pi</strong>. This allows for complex, real-time Python/C++ processing. It will run a Kalman Filter to clean sensor noise and a PID (Proportional-Integral-Derivative) controller to dynamically regulate motor speed and torque for an "Assist-As-Needed" response.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* ETHICS AND SAFETY SECTION (INTERACTIVE BOX) */}
          <motion.div 
            initial="initial"
            whileInView="visible"
            whileHover="hover"
            variants={holoHover}
            viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setEthicsHoloActive(true)}
            onHoverEnd={() => setEthicsHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${ethicsHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Ethical Guardrails & Physical Safety</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                Unlike purely software-based projects, designing a wearable, motorized exoskeleton introduces severe physical risks. Filling out the ethics and risk assessment forms this week was a sobering reminder of the engineering responsibility I hold.
              </p>
              <p>
                Because the device actively applies torque to a human joint, <strong>safety cannot be an afterthought; it must be hardcoded.</strong> My ethical and safety framework now includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 font-medium text-gray-700">
                <li><strong>Mechanical Hard-Stops:</strong> Physical barriers engineered into the 3D-printed frame to make joint hyperextension (bending backward past 180 degrees) physically impossible, regardless of software failure.</li>
                <li><strong>Emergency Kill Switch:</strong> A hardware interrupt accessible directly to the user that instantly cuts power from the 3S LiPo battery to the motor drivers.</li>
                <li><strong>Software Limits:</strong> Aggressive limits within the PID control loop to prevent sudden jerks or overwhelming resistance during the swing phase.</li>
                <li><strong>Data Privacy:</strong> By leveraging edge computing on the Raspberry Pi, all biometric and gait data is processed locally. Nothing is sent to a cloud server, ensuring complete user privacy.</li>
              </ul>
            </div>
          </motion.div>

          {/* PROJECT MANAGEMENT & GANTT */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Project Planning & The Road Ahead</h2>
            <p>
              To ensure I don't get lost in the weeds of coding, I formalized a strict Work Breakdown Structure (WBS) and mapped it to a Gantt chart. The project is now phased logically:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-6 font-medium text-gray-700">
              <li><strong>Design Phase:</strong> Finalizing CAD models for the leg brace and motor mounts in Fusion 360.</li>
              <li><strong>Subsystem Testing:</strong> Successfully reading raw IMU/FSR data and independently spinning the DC motors via code.</li>
              <li><strong>Integration:</strong> Merging the electronics onto the physical 3D-printed frame.</li>
              <li><strong>Control Tuning:</strong> The hardest part—calibrating the PID loop so the robot moves <em>with</em> the user, not against them.</li>
            </ol>
            <p>
              This structured timeline gives me a clear roadmap for the next 10 weeks, keeping me accountable to tangible deliverables.
            </p>
          </motion.div>

          {/* REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Reflection</h2>
            <p>
              This week brought a profound realization: building an exoskeleton is not just about raw power; it’s about control and empathy. A pneumatic system is naturally "squishy" and forgiving, whereas a geared DC motor is rigid and aggressive. 
            </p>
            <p>
              The true engineering challenge of Mynee won't be making the motor turn—it will be writing an algorithm intelligent enough to make that motor feel invisible until the exact moment the user needs help standing up. With the proposal signed and the ethics cleared, it is finally time to start building.
            </p>
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-1">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Week 1
              </button>
            </Link>
            
            <Link href="/devlog/week-3">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 3 
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