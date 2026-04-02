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

export default function Week3Log() {
  const [litReviewHoloActive, setLitReviewHoloActive] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative z-10">
        <Sidebar activeWeek={3} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-16">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 font-bold tracking-widest uppercase text-[10px]">Feb 6, 2026</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">6 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Kinetic Intelligence: Grounding Mynee in the Landscape of Assisted Mobility.
              </h1>
            </div>
          </motion.header>

          {/* OVERVIEW */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              With the Mynee blueprint finalized, Week 3 shifted focus toward building the <strong>intellectual scaffolding</strong> of the project. A technical build is only as strong as the research supporting it. This week was dedicated to my structured Literature Review (Chapter 2), ensuring that every sensor and motor choice is justified by academic rigor.
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              I spent the week synthesizing findings across biomechanics, electromechanical compliance, and edge-computing paradigms. The goal was to move from <em>"How do I build this?"</em> to <em>"Why is this the most effective way to solve the problem?"</em>
            </p>
          </motion.div>

          {/* LITERATURE REVIEW SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setLitReviewHoloActive(true)} onHoverEnd={() => setLitReviewHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${litReviewHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-0 relative z-10">Thematic Literature Review</h2>
            <div className="relative z-10 space-y-8">
              
              <div>
                <h4 className="text-gray-900 font-black mb-2 uppercase text-xs tracking-widest">Theme 1: Electromechanical Compliance & Actuation</h4>
                <p className="text-sm leading-relaxed">
                  Traditional active orthoses, such as the <em>Roam Robotics Ascend</em>, utilize pneumatic actuators to achieve "compliance" (the ability of a joint to feel natural and 'squishy' rather than rigid). However, <strong>Dollar & Herr (2008)</strong> emphasize that pneumatic systems are limited by the weight of air compressors. Recent literature suggests that <strong>Quasi-Direct Drive (QDD)</strong> motors—like my choice of the <strong>PG36 planetary gears</strong>—can replicate this compliance through high-torque-density and back-drivability, offering a more portable solution for daily use (Young & Ferris, 2017).
                </p>
              </div>

              <div>
                <h4 className="text-gray-900 font-black mb-2 uppercase text-xs tracking-widest">Theme 2: Multi-Modal Sensor Fusion for Intent Recognition</h4>
                <p className="text-sm leading-relaxed">
                  A major failure point in elderly mobility aids is the inability to distinguish between standard walking and the high-torque demand of a <strong>Sit-to-Stand (STS)</strong> transition. <strong>Huo et al. (2016)</strong> highlight that IMUs alone suffer from cumulative drift. My research this week validated the need for <strong>Force Sensitive Resistors (FSRs)</strong>. By fusing IMU spatial data with FSR ground-reaction-force data, the system can achieve &gt;95% accuracy in intent recognition, ensuring the motors engage only when the user intends to lift their center of mass (Hussain et al., 2013).
                </p>
              </div>

              <div>
                <h4 className="text-gray-900 font-black mb-2 uppercase text-xs tracking-widest">Theme 3: Edge Computing in Biomechanics</h4>
                <p className="text-sm leading-relaxed">
                  Current IoT research often offloads processing to the cloud. However, for a gait-assist device, the <strong>Human-in-the-Loop</strong> latency must be under 100ms to prevent user imbalance. Utilizing a <strong>Raspberry Pi</strong> for local PID control, as supported by <strong>Hassani et al. (2025)</strong>, allows Mynee to run complex Kalman filters and control loops natively, ensuring real-time response without the risks of network dropouts.
                </p>
              </div>

            </div>
          </motion.div>

          {/* RESEARCH GAPS & QUESTIONS */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 uppercase tracking-tighter">The "Accessibility Gap"</h2>
            <p>
              From the literature, a massive gap emerged: **Cost vs. Utility**. Most assisted-living exoskeletons are industrial prototypes costing upwards of $30,000. There is very little research on <em>Frugal Innovation</em>—using low-cost DC motors and 3D-printed PETG structures to provide medical-grade support. Mynee aims to address this by answering:
            </p>
            <ul className="list-disc pl-6 space-y-4 font-medium text-gray-700 italic">
              <li>How effectively can a low-cost electromechanical system replicate the variable impedance of biological knee muscles during Osteoarthritic flares?</li>
              <li>Can local edge-processing on a Linux-based node achieve the deterministic timing required for safe joint assistance?</li>
            </ul>
          </motion.div>

          {/* REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Reflection</h2>
            <p>
              This week transformed my perspective. I realized that building Mynee isn't just about making a leg move; it’s about **Cognitive-Kinetic Harmony**. The literature reinforced that the device must be "Assist-As-Needed" (AAN). If the motor helps too much, the user's muscles will atrophy. If it helps too little, the user remains immobile.
            </p>
            <p>
              The research has given me a new-found confidence in my PG36 motor selection. The path is clear: next week, the coding of the PID control logic begins.
            </p>
          </motion.div>

          {/* REFERENCES SECTION */}
          <section className="bg-gray-100/50 p-8 rounded-3xl mb-16">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">References Sourced This Week</h4>
            <ul className="text-[10px] text-gray-500 space-y-2 list-none pl-0 font-mono">
              <li>• Dollar, A. M., & Herr, H. (2008). 'Lower extremity exoskeletons and active orthoses: Challenges and state-of-the-art', IEEE Transactions on Robotics.</li>
              <li>• Hussain, S. et al. (2013). 'Control of a robotic orthosis for gait rehabilitation', Robotics and Autonomous Systems.</li>
              <li>• Young, A. J., & Ferris, D. P. (2017). 'State of the art and future directions for lower limb robotic exoskeletons', IEEE Transactions on Neural Systems.</li>
              <li>• Huo, W. et al. (2016). 'Lower limb assistance and rehabilitation: Exoskeletons and their control', Control Engineering Practice.</li>
            </ul>
          </section>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-2">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 2
              </button>
            </Link>
            <Link href="/devlog/week-4">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 4 <span className="group-hover:translate-x-1 transition-transform">→</span>
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