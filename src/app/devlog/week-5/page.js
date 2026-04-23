"use client";

import Sidebar from "../Sidebar";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// ==========================================
// ANIMATIONS & EFFECTS
// ==========================================
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

const holoHover = {
  initial: { scale: 1, y: 0, rotateX: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)", borderColor: "rgba(243, 244, 246, 1)" },
  hover: { scale: 1.015, y: -6, rotateX: -1, borderColor: "rgba(234, 179, 8, 0.6)", boxShadow: "0 30px 60px -15px rgba(234, 179, 8, 0.2), 0 10px 20px -5px rgba(234, 179, 8, 0.1)", transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 } }
};

// Custom dark hover for the Code Block
const darkHoloHover = {
  initial: { scale: 1, y: 0, rotateX: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.1)" },
  hover: { scale: 1.015, y: -6, rotateX: -1, borderColor: "rgba(234, 179, 8, 0.5)", boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(234, 179, 8, 0.15)", transition: { type: "spring", stiffness: 350, damping: 25, mass: 1 } }
};

const StealthTechDust = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(80)].map((_, i) => (
      <motion.div key={i} initial={{ opacity: 0.2 }} animate={{ y: [0, -40, 0], x: [0, Math.random() * 30 - 15, 0], opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 4 + Math.random() * 8, repeat: Infinity, delay: i * 0.05 }} className="absolute bg-white rounded-full shadow-[0_0_4px_rgba(255,255,255,0.4)]" style={{ width: `${0.5 + Math.random() * 1.3}px`, height: `${0.5 + Math.random() * 1.3}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
    ))}
  </div>
);

const FooterDust = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => { setParticles([...Array(30)].map(() => ({ tx: `${Math.random() * 30 - 15}px`, dur: `${5 + Math.random() * 7}s`, del: `${Math.random() * 1}s`, size: `${1 + Math.random() * 1.5}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }))); }, []);
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <style>{`@keyframes floatFooterDust { 0%, 100% { transform: translate(0px, 0px); opacity: 0.1; } 50% { transform: translate(var(--tx), -30px); opacity: 0.8; } }`}</style>
      {particles.map((p, i) => (<div key={i} className="absolute bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)] will-change-transform" style={{ width: p.size, height: p.size, left: p.left, top: p.top, '--tx': p.tx, animation: `floatFooterDust ${p.dur} infinite ease-in-out ${p.del}` }} />))}
    </div>
  );
};

// ==========================================
// REUSABLE UI BLOCKS (Now Fully Animated)
// ==========================================

const DocAttachment = ({ title, type, fileSize }) => (
  <motion.a href="#" whileHover={{ scale: 1.02, y: -2 }} className="flex items-center justify-between p-5 mb-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-yellow-400 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'XLSX' || type === 'CSV' ? 'bg-green-100 text-green-600' : type === 'DOCX' ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'}`}>
        {type}
      </div>
      <div>
        <h4 className="text-gray-900 font-bold group-hover:text-yellow-600 transition-colors">{title}</h4>
        <p className="text-gray-400 text-xs uppercase tracking-widest">{fileSize}</p>
      </div>
    </div>
    <svg className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
  </motion.a>
);

const VisualAsset = ({ caption }) => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 group cursor-default">
    <div className="w-full aspect-video bg-gray-900 rounded-[30px] border border-gray-800 shadow-xl overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
      <span className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10 group-hover:text-yellow-500 transition-colors duration-500">Insert System Architecture Diagram Here</span>
    </div>
    <p className="text-center text-xs text-gray-400 mt-4 font-light tracking-wide">{caption}</p>
  </motion.div>
);

const CodeBlock = ({ language, code }) => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={darkHoloHover} className="mb-8 rounded-[30px] overflow-hidden bg-[#1e1e1e] border border-white/10 shadow-xl cursor-default">
    <div className="flex items-center justify-between px-6 py-3 bg-[#2d2d2d] border-b border-white/5">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{language}</span>
    </div>
    <div className="p-8 overflow-x-auto">
      <pre className="text-sm font-mono text-green-400 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </motion.div>
);

const MethodologyTable = () => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 overflow-hidden rounded-[30px] border border-gray-200 shadow-sm bg-white overflow-x-auto cursor-default">
    <table className="w-full text-left text-sm min-w-[600px]">
      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-6 w-1/4">Methodology</th>
          <th className="p-6 w-1/3">Analysis (Pros/Cons)</th>
          <th className="p-6 w-5/12">Suitability for Mynee</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 font-light divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-gray-800">Waterfall</td>
          <td className="p-6 text-xs leading-relaxed">Highly structured and sequential. Difficult to adapt to mid-project errors.</td>
          <td className="p-6 text-xs leading-relaxed text-red-500 font-medium">Rejected for software. Hardware-software integration is too unpredictable for a rigid workflow.</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-bold text-gray-800">Scrum</td>
          <td className="p-6 text-xs leading-relaxed">Excellent for large teams, relies heavily on daily standups and strict sprint roles.</td>
          <td className="p-6 text-xs leading-relaxed text-red-500 font-medium">Rejected. Creates unnecessary administrative overhead for a solo engineering project.</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors bg-emerald-50/30">
          <td className="p-6 font-bold text-emerald-700">Agile (Iterative)</td>
          <td className="p-6 text-xs leading-relaxed">Focuses on rapid prototyping, continuous testing, and adapting to empirical data.</td>
          <td className="p-6 text-xs leading-relaxed font-medium"><strong>*Selected Approach*</strong> Allows me to build an MVP, test IMU noise, and adjust Python filters iteratively.</td>
        </tr>
      </tbody>
    </table>
  </motion.div>
);

// ==========================================
// MAIN PAGE LAYOUT
// ==========================================
export default function Week5Log() {
  const [methodologyHoloActive, setMethodologyHoloActive] = useState(false);
  const [mvpHoloActive, setMvpHoloActive] = useState(false);
  const [testingHoloActive, setTestingHoloActive] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 origin-left z-[100]" style={{ scaleX }} />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/20 rounded-full blur-[140px]" />
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-8 pt-52 pb-32 gap-16 relative z-10">
        
        <Sidebar activeWeek={5} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full font-bold tracking-widest uppercase text-[10px] border border-yellow-500/30">Project Phase 2</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">7 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Week 5: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Methodologies & The MVP.</span>
              </h1>
            </div>
          </motion.header>

          {/* INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              This week marked the highly anticipated transition from conceptual planning to physical engineering. A project architecture is only theoretical until it is subjected to the uncompromising laws of physics and code execution. 
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              Before wiring a single component, I formalized my development methodology (Chapter 3 of the report). With the framework established, I proceeded to build the <strong>Minimum Viable Prototype (MVP)</strong>—the first true bench-test of Mynee's intelligence and actuation loops.
            </p>
          </motion.div>

          {/* SOFTWARE METHODOLOGY (Interactive Box) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setMethodologyHoloActive(true)} onHoverEnd={() => setMethodologyHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${methodologyHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Selecting the Software Framework</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                Developing software that interfaces with the physical world is inherently unpredictable. Sensor noise, power fluctuations, and mechanical friction mean that code which works perfectly in a simulation will almost certainly fail on real hardware. I evaluated several software methodologies to determine the best approach for programming the Raspberry Pi:
              </p>
            </div>
          </motion.div>

          {/* METHODOLOGY TABLE (Now Animated) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <MethodologyTable />
             <p className="text-sm text-gray-500 px-4 mt-6 leading-relaxed font-light">
               By selecting an <strong>Agile</strong> methodology for the software layer, I can build and test incrementally. Rather than writing the entire PID controller at once, I will work in micro-sprints: Sprint 1 is reading the IMU. Sprint 2 is filtering the data. Sprint 3 is sending a PWM signal to the motor driver based on that data.
             </p>
          </motion.div>

          {/* PROTOTYPE PLANNING & DIAGRAM */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
             <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Prototype Planning (The Blueprint)</h2>
             <p>
               The goal of the MVP is not to be wearable, but to be functional. I drafted a system architecture block diagram mapping the exact power and data routes:
             </p>
             <ul className="list-disc pl-6 space-y-2 mb-8 font-medium text-gray-700">
               <li><strong>Power:</strong> A 3S LiPo battery (11.1V) supplying the IBT-2 motor driver, stepped down via a buck converter to 5V to safely power the Raspberry Pi.</li>
               <li><strong>Data (I2C):</strong> The MPU6050 IMU communicating with the Pi over the SDA/SCL pins.</li>
               <li><strong>Control (PWM):</strong> The Pi sending Pulse Width Modulation signals to the IBT-2 to regulate motor speed and direction.</li>
             </ul>
             
             {/* VISUAL ASSET (Now Animated) */}
             <VisualAsset caption="Figure 5.1 - MVP Hardware Architecture Block Diagram." />
          </motion.div>

          {/* BUILDING THE MVP (Interactive Box) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} viewport={{ once: true, amount: 0.2 }}
            onHoverStart={() => setMvpHoloActive(true)} onHoverEnd={() => setMvpHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-gray-900 p-10 md:p-12 rounded-[40px] border border-gray-800 shadow-xl cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Developing the MVP</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-gray-300">
                With the blueprint established, I assembled the hardware on a benchtop rig. The most critical test was establishing communication between the Raspberry Pi and the PG36-555 motor via the IBT-2 driver. 
              </p>
              <p className="text-gray-300">
                A common risk in robotics is "shoot-through" logic—sending a forward and reverse signal simultaneously, which instantly fries the H-bridge. To mitigate this, I wrote a foundational Python script to safely initialize the PWM pins and ramp up the motor speed gradually, validating that the compute unit can safely control the actuation unit.
              </p>
            </div>
          </motion.div>

          {/* CODE SNIPPET SHOWCASE (Now Animated) */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">MVP Validation: Motor Control Script</h3>
             <CodeBlock 
                language="Python 3 (Raspberry Pi)" 
                code={`import RPi.GPIO as GPIO
import time

# IBT-2 Motor Driver Pins
RPWM_PIN = 12 # Right PWM
LPWM_PIN = 13 # Left PWM
EN_PIN = 22   # Enable Pin

# Setup GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(RPWM_PIN, GPIO.OUT)
GPIO.setup(LPWM_PIN, GPIO.OUT)
GPIO.setup(EN_PIN, GPIO.OUT)

# Initialize PWM at 1KHz
motor_fw = GPIO.PWM(RPWM_PIN, 1000)
motor_fw.start(0)

print("System Armed: Initiating MVP Torque Test...")
GPIO.output(EN_PIN, GPIO.HIGH)

# Ramp up motor speed safely
try:
    for duty_cycle in range(0, 51, 5): # Max 50% power for safety
        motor_fw.ChangeDutyCycle(duty_cycle)
        print(f"Torque Output: {duty_cycle}%")
        time.sleep(0.5)
finally:
    motor_fw.stop()
    GPIO.cleanup()
    print("Test Complete. System Disarmed.")`} 
             />
          </motion.div>

          {/* TESTING & VALIDATION SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setTestingHoloActive(true)} onHoverEnd={() => setTestingHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${testingHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Testing, Validation & Limitations</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                When testing the MVP, the system successfully registered movement and spun the motor. However, executing this in the physical world revealed immediate challenges:
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-sm text-gray-700">
                <li>
                  <strong className="text-gray-900">The Jitter Problem (Noise):</strong> Raw accelerometer data is incredibly noisy. Relying solely on raw values caused the motor to "stutter" violently. 
                  <br/><span className="text-yellow-600 font-bold">Refinement:</span> This confirmed my literature review from Week 3. I must implement a software Kalman Filter to fuse gyro and accelerometer data into a clean, smooth spatial angle.
                </li>
                <li>
                  <strong className="text-gray-900">Python Garbage Collection (Latency):</strong> Because Linux is not a Real-Time Operating System (RTOS), background processes occasionally stalled the Python loop for a few milliseconds, delaying the PWM signal.
                  <br/><span className="text-yellow-600 font-bold">Limitation Addressed:</span> I am restructuring the Python code to run the sensor-reading function on a dedicated thread to ensure the motor control loop remains deterministic.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* DRAFTING CHAPTER 3 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Drafting Chapter 3: Design</h2>
            <p>
              Simultaneous to the physical build, I drafted Chapter 3 of my dissertation. This chapter formally documents the MVP process. It details the objective of the prototype, the justification for the hardware stack (e.g., choosing a planetary gear over a worm gear for back-drivability), and includes the initial block diagrams.
            </p>
            <p>
              Seeing the motor spin autonomously based on code I wrote was the highlight of the project so far. The MVP is functional. Next week, we introduce the IMU to close the feedback loop.
            </p>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Submitted Deliverables</h3>
            <DocAttachment title="Software Methodology Analysis" type="PDF" fileSize="600 KB" />
            <DocAttachment title="Chapter 3: System Design Draft" type="DOCX" fileSize="2.8 MB" />
            <DocAttachment title="MVP Testing & Validation Logs" type="XLSX" fileSize="450 KB" />
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

      {/* --- MEGA FOOTER --- */}
      <footer className="relative z-10 w-full bg-gray-950 border-t border-white/10 pt-20 pb-10 overflow-hidden">
        <FooterDust />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-yellow-500 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link></li>
                <li><Link href="/sessions" className="hover:text-yellow-500 transition-colors">Sessions</Link></li>
                <li><Link href="/devlog" className="hover:text-yellow-500 transition-colors">Dev Log</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Prototyping</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Python Edge Control</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">GitHub ↗</a></li>
                <li><a href="#" className="hover:text-yellow-500 transition-colors flex items-center gap-1">University ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
            <p>© 2026 MYNEE | Syed Arzanish</p>
            <p>Built with <span className="text-gray-300 font-medium">Next.js</span></p>
          </div>
        </div>
      </footer>
    </main>
  );
}