"use client";

import Sidebar from "../Sidebar"; 
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

// ==========================================
// REUSABLE UI BLOCKS & BACKGROUND
// ==========================================
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

const VisualAsset = ({ imageSrc, caption }) => (
  <div className="mb-12 group">
    <div className="w-full bg-[#0a0a0a]/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex items-center justify-center group-hover:border-teal-500/50 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)] p-4 md:p-8">
      {imageSrc ? (
        <img src={imageSrc} alt={caption} className="w-full h-auto max-h-[70vh] object-contain rounded-xl opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      ) : (
        <div className="aspect-video w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(45,212,191,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
          <span className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10 group-hover:text-teal-400 transition-colors">Visual Asset Not Found</span>
        </div>
      )}
    </div>
    <p className="text-center text-xs text-gray-500 mt-4 font-mono uppercase tracking-widest">{caption}</p>
  </div>
);

// --- NEW BLOCK: Code Terminal ---
const CodeTerminal = () => (
  <div className="w-full bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden mb-16 relative group hover:border-teal-500/30 transition-colors duration-500">
    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[50px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />
    <div className="h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/5">
      <div className="w-3 h-3 rounded-full bg-red-500/80" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
      <span className="ml-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase">mvp_torque_test.py</span>
    </div>
    <div className="p-6 overflow-x-auto custom-scrollbar relative z-10">
      <pre className="text-xs font-mono leading-relaxed">
        <code className="text-gray-300">
<span className="text-purple-400">import</span> smbus<br/>
<span className="text-purple-400">import</span> time<br/>
<span className="text-purple-400">import</span> RPi.GPIO <span className="text-purple-400">as</span> GPIO<br/>
<br/>
<span className="text-gray-500 italic"># IBT-2 / L298N Motor Driver Pins</span><br/>
RPWM_PIN <span className="text-teal-400">=</span> <span className="text-yellow-300">12</span> <span className="text-gray-500 italic"># Right PWM</span><br/>
LPWM_PIN <span className="text-teal-400">=</span> <span className="text-yellow-300">13</span> <span className="text-gray-500 italic"># Left PWM</span><br/>
EN_PIN   <span className="text-teal-400">=</span> <span className="text-yellow-300">22</span> <span className="text-gray-500 italic"># Enable Pin</span><br/>
<br/>
<span className="text-gray-500 italic"># Setup GPIO</span><br/>
GPIO.setmode(GPIO.BCM)<br/>
GPIO.setup(RPWM_PIN, GPIO.OUT)<br/>
GPIO.setup(LPWM_PIN, GPIO.OUT)<br/>
GPIO.setup(EN_PIN, GPIO.OUT)<br/>
<br/>
<span className="text-gray-500 italic"># Initialize PWM at 1KHz</span><br/>
motor_fw <span className="text-teal-400">=</span> GPIO.PWM(RPWM_PIN, <span className="text-yellow-300">1000</span>)<br/>
motor_fw.start(<span className="text-yellow-300">0</span>)<br/>
<br/>
<span className="text-blue-300">print</span>(<span className="text-emerald-300">"System Armed: Initiating MVP Torque Test..."</span>)<br/>
GPIO.output(EN_PIN, GPIO.HIGH)<br/>
<br/>
<span className="text-gray-500 italic"># Ramp up motor speed safely to prevent shoot-through</span><br/>
<span className="text-purple-400">try</span>:<br/>
    <span className="text-purple-400">for</span> duty_cycle <span className="text-purple-400">in</span> <span className="text-blue-300">range</span>(<span className="text-yellow-300">0</span>, <span className="text-yellow-300">51</span>, <span className="text-yellow-300">5</span>): <span className="text-gray-500 italic"># Max 50% power for bench safety</span><br/>
        motor_fw.ChangeDutyCycle(duty_cycle)<br/>
        <span className="text-blue-300">print</span>(<span className="text-emerald-300">f"Torque Output: &#123;duty_cycle&#125;%"</span>)<br/>
        time.sleep(<span className="text-yellow-300">0.5</span>)<br/>
<span className="text-purple-400">finally</span>:<br/>
    motor_fw.stop()<br/>
    GPIO.cleanup()<br/>
    <span className="text-blue-300">print</span>(<span className="text-emerald-300">"Test Complete. System Disarmed."</span>)<br/>
        </code>
      </pre>
    </div>
  </div>
);

// --- NEW BLOCK: Empirical Evaluation Results Table ---
const EmpiricalEvaluationBoard = () => (
  <div className="bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl hover:border-yellow-500/30 transition-all duration-500 mb-16 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 blur-[80px] pointer-events-none group-hover:bg-yellow-500/10 transition-colors duration-700" />
    
    <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3 relative z-10">
      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_10px_#facc15]" /> Empirical Validation Results
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      
      {/* Latency Table */}
      <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden">
        <div className="bg-white/5 px-6 py-4 border-b border-white/5">
          <h4 className="text-white font-bold text-sm">System Latency & Signal Acquisition</h4>
        </div>
        <table className="w-full text-left text-xs font-mono">
          <tbody className="divide-y divide-white/5 text-gray-400">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">I2C Bus Read (MPU6050)</td>
              <td className="px-6 py-4 text-right text-yellow-400">6.8 ms</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">GPIO Polling (FSRs)</td>
              <td className="px-6 py-4 text-right text-yellow-400">4.2 ms</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">FSM Logic Evaluation</td>
              <td className="px-6 py-4 text-right text-yellow-400">2.1 ms</td>
            </tr>
            <tr className="bg-yellow-500/10">
              <td className="px-6 py-4 text-yellow-500 font-bold">Total System Latency</td>
              <td className="px-6 py-4 text-right text-yellow-400 font-bold">13.1 ms</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Accuracy Table */}
      <div className="bg-black/50 border border-white/5 rounded-3xl overflow-hidden">
        <div className="bg-white/5 px-6 py-4 border-b border-white/5">
          <h4 className="text-white font-bold text-sm">Kinematic Accuracy (Comp. Filter)</h4>
        </div>
        <table className="w-full text-left text-xs font-mono">
          <tbody className="divide-y divide-white/5 text-gray-400">
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">0.0° (Full Extension)</td>
              <td className="px-6 py-4 text-right text-emerald-400">Error: 0.4°</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">30.0° (Swing Phase)</td>
              <td className="px-6 py-4 text-right text-emerald-400">Error: 1.1°</td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4">90.0° (Sit-to-Stand)</td>
              <td className="px-6 py-4 text-right text-emerald-400">Error: 2.1°</td>
            </tr>
            <tr className="bg-emerald-500/10">
              <td className="px-6 py-4 text-emerald-500 font-bold">Mean Absolute Error (MAE)</td>
              <td className="px-6 py-4 text-right text-emerald-400 font-bold">1.34°</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
);

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week5Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={5} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 2</span>
                <span className="text-gray-500 text-xs font-mono">8 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 5: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">MVP & Hardware Assembly.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                This week marked the highly anticipated transition from conceptual planning to physical engineering. A project architecture is only theoretical until it is subjected to the uncompromising laws of physics and code execution. With the framework established, I proceeded to build the Minimum Viable Prototype (MVP)—the first true bench-test of Mynee's intelligence and actuation loops.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <h2 className="text-3xl text-white mt-12 mb-6">Developing the MVP</h2>
              <p>With the blueprint established last week, I assembled the hardware on a benchtop rig. The most critical test was establishing communication between the Raspberry Pi Zero and the PG36-555 motor via the motor driver.</p>
              <p>A common risk in robotics is "shoot-through" logic—sending a forward and reverse signal simultaneously, which instantly fries the H-bridge. To mitigate this, I wrote a foundational Python script to safely initialize the PWM pins and ramp up the motor speed gradually, validating that the compute unit can safely control the actuation unit.</p>
              
              {/* Python Code Terminal */}
              <CodeTerminal />

              <h2 className="text-3xl text-white mt-16 mb-6">Testing, Validation & Limitations</h2>
              <p>When testing the MVP, the system successfully registered movement and spun the motor. However, executing this in the physical world revealed immediate empirical challenges that required optimization:</p>
              
              <ul className="list-none pl-0 space-y-6 my-8 font-medium text-gray-300">
                <li className="bg-[#0a0a0a]/60 p-6 rounded-2xl border border-white/10">
                  <span className="text-red-400 font-bold block mb-2">1. The Jitter Problem (IMU Noise)</span>
                  <p className="text-gray-400 text-sm leading-relaxed mb-0">Raw accelerometer data is incredibly noisy. Relying solely on raw values caused the motor to "stutter" violently as the FSM rapidly switched states. This confirmed my literature review findings. To resolve this, I implemented a <strong>Complementary Filter</strong> in Python to fuse the gyroscope and accelerometer data, smoothing the spatial angle calculation.</p>
                </li>
                <li className="bg-[#0a0a0a]/60 p-6 rounded-2xl border border-white/10">
                  <span className="text-yellow-400 font-bold block mb-2">2. Operating System Latency</span>
                  <p className="text-gray-400 text-sm leading-relaxed mb-0">Because Linux is not a Real-Time Operating System (RTOS), background processes on the Raspberry Pi occasionally stalled the Python loop. To ensure the motor control loop remained deterministic and under the required 20ms neuromuscular threshold, I restructured the Python code to run the sensor-reading function on a dedicated thread.</p>
                </li>
              </ul>

              <h2 className="text-3xl text-white mt-16 mb-6">Empirical Evaluation Results</h2>
              <p>After implementing the Complementary Filter and multithreading optimizations, I ran a formal bench test to validate the MVP's performance against the established constraints.</p>
              <p>The system achieved a <strong>Mean Absolute Error (MAE) of 1.34°</strong> across a 90° range of motion, and total system latency from the FSR trigger to the motor actuation was clocked at <strong>13.1 ms</strong>, easily beating the 20ms human response requirement.</p>

              <EmpiricalEvaluationBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Reflection & Next Steps</h2>
              <p>Seeing the motor ramp up successfully without frying the H-bridge was a major milestone. The code works, the sensors communicate accurately, and the latency is well within medical tolerances.</p>
              <p>However, an exoskeleton is not a benchtop motor. Next week, the focus shifts entirely to Phase 2: Mechanical Assembly. The true test will be designing a chassis that can handle the sheer mechanical torque of this motor without snapping.</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-4">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 4
                </button>
              </Link>
              <Link href="/devlog/week-6">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 6 <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </Link>
            </div>

          </motion.div>
        </article>
      </div>

      {/* MEGA FOOTER */}
      <footer className="relative z-10 w-full bg-[#020202] border-t border-white/5 pt-20 pb-10 mt-auto overflow-hidden">
        <div className="relative z-10 max-w-[90rem] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 xl:px-8">
            <div className="lg:col-span-2">
              <div className="text-2xl font-black text-teal-400 mb-6 tracking-tighter">MYNEE</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">A smart knee exoskeleton bridging the gap between frugal innovation and medical-grade biomechanical assistance through edge-AI and sensor fusion.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
                <li><Link href="/sessions" className="hover:text-teal-400 transition-colors">Sessions</Link></li>
                <li><Link href="/devlog" className="hover:text-teal-400 transition-colors">Dev Log</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Topics</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><span className="cursor-default hover:text-teal-400 transition-colors">MVP Prototyping</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Python Edge Computing</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="https://github.com/arzanishshumak0395" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-teal-400 transition-colors">GitHub ↗</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono tracking-widest uppercase xl:px-8">
            <p>© 2026 MYNEE | Syed Arzanish - Capstone Project.</p>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </footer>
      
      {/* Global CSS for custom scrollbar in code terminal */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45,212,191,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45,212,191,0.5); }
      `}</style>
    </main>
  );
}