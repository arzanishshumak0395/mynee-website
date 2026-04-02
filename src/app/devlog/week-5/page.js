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

export default function Week5Log() {
  const [methodologyHoloActive, setMethodologyHoloActive] = useState(false);
  const [mvpHoloActive, setMvpHoloActive] = useState(false);
  const [testingHoloActive, setTestingHoloActive] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative z-10">
        <Sidebar activeWeek={5} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-16">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-yellow-500 font-bold tracking-widest uppercase text-[10px]">Feb 20, 2026</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">6 min read</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Week 5: Methodologies & The Minimum Viable Prototype.
              </h1>
            </div>
          </motion.header>

          {/* OVERVIEW */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              This week marked the highly anticipated transition from conceptual planning to physical engineering. A project architecture is only theoretical until it is subjected to the uncompromising laws of physics and code execution. 
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Before wiring a single component, I formalized my development methodology (Chapter 3 of the report). With the framework established, I proceeded to build the <strong>Minimum Viable Prototype (MVP)</strong>—the first true bench-test of Mynee's intelligence and actuation loops.
            </p>
          </motion.div>

          {/* METHODOLOGY SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setMethodologyHoloActive(true)} onHoverEnd={() => setMethodologyHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${methodologyHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10">Software & Development Methodology</h2>
            <div className="relative z-10 space-y-4">
              <p>
                Developing a cyber-physical system like an exoskeleton presents unique challenges. I analyzed several methodologies:
              </p>
              <ul className="list-none pl-0 space-y-4">
                <li className="pl-4 border-l-2 border-gray-300">
                  <span className="font-bold text-gray-800">Waterfall:</span> Highly structured and sequential. However, it assumes perfect foresight. In robotics, hardware constraints (like motor stall currents or sensor noise) frequently force you to rewrite software specifications. Waterfall is too rigid for this.
                </li>
                <li className="pl-4 border-l-2 border-gray-300">
                  <span className="font-bold text-gray-800">Spiral:</span> Excellent for risk handling, but overly complex and documentation-heavy for a single-engineer prototype phase.
                </li>
                <li className="pl-4 border-l-2 border-yellow-500">
                  <span className="font-bold text-gray-900">Hardware-Adapted Agile (Selected):</span> Mynee will use an iterative Agile approach based on "micro-sprints." Because software logic is tightly coupled to physical hardware, I must build, test, and refine in small, verifiable loops.
                </li>
              </ul>
              <p className="text-sm mt-4 italic">
                <strong>Justification:</strong> Agile allows me to test the IMU sensor integration in Sprint 1, refine the data with a Kalman filter in Sprint 2, and test motor actuation in Sprint 3. If a physical component fails, the Agile framework absorbs the pivot without derailing the entire project timeline.
              </p>
            </div>
          </motion.div>

          {/* MVP PROTOTYPE SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setMvpHoloActive(true)} onHoverEnd={() => setMvpHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${mvpHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10">The Minimum Viable Prototype (MVP)</h2>
            <div className="relative z-10 space-y-4">
              <p>
                The objective of this week's prototype was not to build the full leg brace, but to validate the core <strong>Sense-Compute-Actuate</strong> loop. Can the Raspberry Pi read spatial data and spin a high-torque motor in response?
              </p>
              
              <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mt-6">Tools & Architecture Stack</h4>
              <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">💻 Raspberry Pi (Linux/Python)</div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">📡 MPU6050 IMU (I2C Protocol)</div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">⚡ IBT-2 Motor Driver (PWM)</div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">⚙️ PG36-555 Gear Motor</div>
              </div>

              <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mt-6">The Development Steps</h4>
              <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
                <li><strong>I2C Wiring:</strong> Connected the MPU6050 to the Pi's SDA/SCL pins.</li>
                <li><strong>Python Data Extraction:</strong> Wrote a script utilizing the `smbus` library to pull raw accelerometer and gyroscope registers.</li>
                <li><strong>PWM Output:</strong> Configured standard GPIO pins to output a Pulse Width Modulation (PWM) signal to the IBT-2 H-Bridge.</li>
                <li><strong>Bench Power:</strong> Powered the PG36 motor using a regulated 12V bench power supply to ensure safe testing before introducing LiPo batteries.</li>
              </ol>
            </div>
          </motion.div>

          {/* TESTING & VALIDATION SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setTestingHoloActive(true)} onHoverEnd={() => setTestingHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${testingHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10">Testing, Validation & Limitations</h2>
            <div className="relative z-10 space-y-4">
              <p>
                When testing the MVP, the system successfully registered movement and spun the motor. However, executing this in the physical world revealed immediate challenges:
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-sm text-gray-700">
                <li>
                  <strong className="text-gray-900">The Jitter Problem (Noise):</strong> Raw accelerometer data is incredibly noisy. Relying solely on raw values caused the motor to "stutter" violently. 
                  <br/><span className="text-yellow-600 font-bold">Refinement:</span> This confirmed my literature review from Week 3. I must implement a software Kalman Filter or Complementary Filter to fuse gyro and accelerometer data into a clean, smooth spatial angle.
                </li>
                <li>
                  <strong className="text-gray-900">Python Garbage Collection (Latency):</strong> Because Linux is not a Real-Time Operating System (RTOS), background processes occasionally stalled the Python loop for a few milliseconds, delaying the PWM signal.
                  <br/><span className="text-yellow-600 font-bold">Limitation Addressed:</span> I am restructuring the Python code to run the sensor-reading function on a dedicated thread to ensure the motor control loop remains deterministic.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Reflection</h2>
            <p>
              This week provided a massive morale boost. There is something profoundly satisfying about writing a line of code, tilting a sensor with your hand, and watching a heavy-duty industrial motor roar to life in response.
            </p>
            <p>
              The Agile methodology proved its worth immediately. Had I tried to build the whole system at once, the sensor noise would have masked the threading latency issues. By building this small, isolated MVP, I have a clear understanding of the software optimization required before mounting anything to the 3D-printed leg brace.
            </p>
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-4">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 4
              </button>
            </Link>
            <Link href="/devlog/week-6">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 6 <span className="group-hover:translate-x-1 transition-transform">→</span>
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