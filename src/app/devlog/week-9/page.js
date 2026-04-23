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
// REUSABLE UI BLOCKS
// ==========================================
const DocAttachment = ({ title, type, fileSize }) => (
  <motion.a href="#" whileHover={{ scale: 1.02, y: -2 }} className="flex items-center justify-between p-5 mb-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:border-yellow-400 transition-all group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'PY' ? 'bg-yellow-100 text-yellow-600' : type === 'DOCX' ? 'bg-blue-100 text-blue-500' : 'bg-red-100 text-red-500'}`}>
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

const VisualAsset = ({ caption, label }) => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 group cursor-default">
    <div className="w-full aspect-video bg-gray-900 rounded-[30px] border border-gray-800 shadow-xl overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer pointer-events-none" />
      <span className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10 group-hover:text-yellow-500 transition-colors duration-500">{label}</span>
    </div>
    <p className="text-center text-xs text-gray-400 mt-4 font-light tracking-wide">{caption}</p>
  </motion.div>
);

const TestingTable = () => (
  <motion.div initial="initial" whileInView="visible" whileHover="hover" variants={holoHover} className="mb-8 overflow-hidden rounded-[30px] border border-gray-200 shadow-sm bg-white overflow-x-auto cursor-default">
    <table className="w-full text-left text-sm min-w-[600px]">
      <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[10px]">
        <tr>
          <th className="p-6 w-1/6">Test ID</th>
          <th className="p-6 w-1/4">Type</th>
          <th className="p-6 w-1/3">Description & Expected Result</th>
          <th className="p-6 w-1/4">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 font-light divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-mono text-xs font-bold text-gray-800">TC-001</td>
          <td className="p-6"><span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-[10px] font-bold uppercase">Unit Test</span></td>
          <td className="p-6 text-xs leading-relaxed"><strong>Complementary Filter Math:</strong> Inject static raw IMU values. Expected return: Correctly fused angle without crash.</td>
          <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Passed</span></td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-mono text-xs font-bold text-gray-800">TC-002</td>
          <td className="p-6"><span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold uppercase">Integration Test</span></td>
          <td className="p-6 text-xs leading-relaxed"><strong>FSR to PWM Trigger:</strong> Trigger GPIO pin HIGH. Expected result: Motor driver instantly receives PWM signal &gt; 0.</td>
          <td className="p-6"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">Passed</span></td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="p-6 font-mono text-xs font-bold text-gray-800">TC-003</td>
          <td className="p-6"><span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold uppercase">System Test</span></td>
          <td className="p-6 text-xs leading-relaxed"><strong>Thermal Load:</strong> Run motor continuously for 5 mins. Expected result: L298N stays within safe operating temp.</td>
          <td className="p-6"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-bold uppercase">Flagged (74.2°C)</span></td>
        </tr>
      </tbody>
    </table>
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

// ==========================================
// MAIN PAGE LAYOUT
// ==========================================
export default function Week9Log() {
  const [testingTheoryHoloActive, setTestingTheoryHoloActive] = useState(false);
  const [chapter4HoloActive, setChapter4HoloActive] = useState(false);
  
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
        
        <Sidebar activeWeek={9} />

        <article className="flex-1 max-w-3xl">
          
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full font-bold tracking-widest uppercase text-[10px] border border-yellow-500/30">Phase 3: QA & Evaluation</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">7 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Week 9: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">QA Testing & Evaluation Setup.</span>
              </h1>
            </div>
          </motion.header>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              With the hardware integrated and the Python FSM successfully processing telemetry, the project enters Phase 3. A medical-grade assistive device requires more than just functional code; it requires empirical proof of safety and reliability. 
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              This week was dedicated to formal Software Testing protocols (Unit vs. Integration) and establishing the strict physical testing environments required for <strong>Chapter 4: Performance Evaluation Setup</strong> of my dissertation.
            </p>
          </motion.div>

          {/* TESTING THEORY SECTION (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setTestingTheoryHoloActive(true)} onHoverEnd={() => setTestingTheoryHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${testingTheoryHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Verification vs. Validation</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                In the Software Development Lifecycle (SDLC), testing is broken down into two core philosophies: Verification and Validation.
              </p>
              <ul className="list-none pl-0 space-y-4 my-6">
                <li className="pl-4 border-l-2 border-indigo-400">
                  <strong className="text-gray-900 block text-sm uppercase tracking-wider">Verification (Did we build the system right?)</strong>
                  <span className="text-sm">This involves <strong>Unit Testing</strong> (testing individual Python functions, like ensuring the math in my Complementary Filter doesn't throw a divide-by-zero error) and <strong>Integration Testing</strong> (ensuring the Raspberry Pi successfully sends a PWM signal to the L298N driver).</span>
                </li>
                <li className="pl-4 border-l-2 border-emerald-400">
                  <strong className="text-gray-900 block text-sm uppercase tracking-wider">Validation (Did we build the right system?)</strong>
                  <span className="text-sm">This involves <strong>System & Acceptance Testing</strong>. Does the exoskeleton actually assist with gait? Does it feel comfortable to the user? Does it meet the parameters set in our Week 6 SRS?</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* TESTING TABLE */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Executed Test Cases</h3>
             <TestingTable />
          </motion.div>

          {/* PYTHON UNIT TEST CODE SNIPPET */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Automated Unit Testing (Python unittest)</h3>
             <CodeBlock 
                language="Python 3 (unittest)" 
                code={`import unittest
from mynee_math import complementary_filter

class TestMyneeSensors(unittest.TestCase):
    
    def test_complementary_filter_logic(self):
        # Arrange: Mock IMU data
        mock_accel_angle = 45.0
        mock_gyro_rate = 10.0
        dt = 0.02
        alpha = 0.98
        prev_angle = 40.0
        
        # Act: Run function
        result = complementary_filter(alpha, prev_angle, mock_gyro_rate, dt, mock_accel_angle)
        
        # Assert: Check against expected manual calculation
        expected = (0.98 * (40.0 + (10.0 * 0.02))) + (0.02 * 45.0)
        self.assertAlmostEqual(result, expected, places=2)

if __name__ == '__main__':
    unittest.main()`} 
             />
          </motion.div>

          {/* CHAPTER 4: EVALUATION SETUP (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setChapter4HoloActive(true)} onHoverEnd={() => setChapter4HoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-gray-900 p-10 md:p-12 rounded-[40px] border border-gray-800 shadow-xl cursor-default"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Chapter 4: Evaluation Setup</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-gray-300">
                To satisfy the requirements for Chapter 4 of my dissertation, I formalized the physical testing environment. To ensure empirical rigor, I bypassed standard debugging tools and utilized specialized hardware diagnostics:
              </p>
              
              <ul className="list-disc pl-6 space-y-4 text-sm text-gray-300">
                <li><strong className="text-white">Scenario A (Latency):</strong> I connected <strong>oscilloscope probes</strong> to the Pi Zero's GPIO pins to measure the exact millisecond delay between the FSR trigger and the generation of the PWM signal.</li>
                <li><strong className="text-white">Scenario B (Kinematic Accuracy):</strong> I mounted a <strong>high-precision mechanical goniometer</strong> parallel to the MPU6050 on a simulated hinge joint. By sweeping the joint from 0° to 90°, I can compare the software's calculated angle against the absolute mechanical reality.</li>
                <li><strong className="text-white">Scenario C (Thermal Load):</strong> I used an isolated 12V bench power supply to mimic the LiPo battery, commanding the actuator to hold a continuous stall-torque load for 5 minutes while monitoring the L298N driver with an infrared thermometer.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Reflection</h2>
            <p>
              This week proved that writing code is only 50% of the battle; proving the code won't fail under stress is the real engineering challenge. Setting up the oscilloscope and the goniometer transitions this project from a "hobby build" into a documented, scientifically sound medical prototype.
            </p>
            <p>
              Next week, we run the tests and analyze the empirical data for Chapter 5!
            </p>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Submitted Deliverables</h3>
            <DocAttachment title="Chapter 4: Performance Evaluation Setup" type="DOCX" fileSize="1.9 MB" />
            <DocAttachment title="Automated Unit Test Scripts" type="PY" fileSize="8 KB" />
            <DocAttachment title="Formal Test Case Results Log" type="PDF" fileSize="500 KB" />
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-8">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 8
              </button>
            </Link>
            
            <Link href="/devlog/week-10">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 10 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </Link>
          </div>

        </article>
      </div>

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
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">Unit Testing</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">QA Validation</span></li>
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