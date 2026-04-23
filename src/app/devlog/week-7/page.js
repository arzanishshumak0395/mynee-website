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
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs uppercase tracking-wider ${type === 'PY' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-500'}`}>
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
export default function Week7Log() {
  const [codingHoloActive, setCodingHoloActive] = useState(false);
  const [telemetryHoloActive, setTelemetryHoloActive] = useState(false);
  
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
        
        <Sidebar activeWeek={7} />

        <article className="flex-1 max-w-3xl">
          
          {/* HEADER */}
          <motion.header initial="hidden" animate="visible" variants={fadeUp} className="mb-20 relative overflow-hidden bg-black border border-white/10 rounded-[40px] p-12 md:p-16 shadow-2xl">
            <StealthTechDust />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full font-bold tracking-widest uppercase text-[10px] border border-yellow-500/30">Coding Phase 1</span>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">8 min read</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
                Week 7: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Core Implementation & Telemetry.</span>
              </h1>
            </div>
          </motion.header>

          {/* INTRO TEXT */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 px-4">
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-6">
              With the UML architecture mapped out last week, Phase 1 of development is officially over. Week 7 marks the beginning of Phase 2: Heavy Implementation. 
            </p>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              The goal for this week was strictly programmatic: interface the sensors with the Raspberry Pi Zero, write the C++/Python Finite State Machine (FSM) to determine gait phases, and establish a local telemetry stream to visualize the data on a dashboard in real-time.
            </p>
          </motion.div>

          {/* HARDWARE INTERFACING & THRESHOLDS (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setCodingHoloActive(true)} onHoverEnd={() => setCodingHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-white p-10 md:p-12 rounded-[40px] border border-gray-100 cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${codingHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Sensor Interfacing & FSM Logic</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p>
                To build the "intent recognition" engine, the Raspberry Pi Zero needs to read two distinct data streams simultaneously: the MPU6050 (for joint angle via I2C) and the FSRs (for foot-strike pressure).
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-4">
                <h4 className="text-gray-900 font-black mb-2 uppercase text-xs tracking-widest">Engineering Challenge: FSR Conversion</h4>
                <p className="text-sm text-gray-700 m-0">
                  Force Sensitive Resistors output an analog voltage, but the Pi Zero lacks native Analog-to-Digital Converters (ADCs). Instead of complicating the I2C bus with an external ADC chip, I utilized a hardware workaround: configuring the FSRs as digital threshold switches (HIGH/LOW) using standard GPIO pins.
                </p>
              </div>

              <p className="pt-4">
                This binary input perfectly feeds into the <strong>Finite State Machine (FSM)</strong>. If the FSR reads HIGH (foot on the ground = Stance Phase), the motor is primed to assist. If it reads LOW (foot in the air = Swing Phase), the Pi instantly drops the PWM to the L298N driver, allowing the leg to free-spin.
              </p>
            </div>
          </motion.div>

          {/* CODE SNIPPET 1: SENSOR LOGIC */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Core Module: FSM & Complementary Filter Script</h3>
             <CodeBlock 
                language="Python 3 (Raspberry Pi Zero)" 
                code={`import RPi.GPIO as GPIO
import smbus
import math
import time

# Hardware Setup
FSR_PIN = 17       # Digital Input
PWM_PIN = 12       # L298N ENA
bus = smbus.SMBus(1)
MPU_ADDR = 0x68

GPIO.setmode(GPIO.BCM)
GPIO.setup(FSR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
motor_pwm = GPIO.PWM(PWM_PIN, 1000)
motor_pwm.start(0)

# Complementary Filter Variables
alpha = 0.98
filtered_angle = 0.0

def get_kinematics():
    # Read I2C from MPU6050 and apply Complementary Filter
    # (Simplified for log snippet)
    accel_x = bus.read_byte_data(MPU_ADDR, 0x3B)
    gyro_y = bus.read_byte_data(MPU_ADDR, 0x45)
    return (alpha * (filtered_angle + gyro_y * dt)) + ((1 - alpha) * accel_x)

# Finite State Machine Loop
try:
    while True:
        stance_active = GPIO.input(FSR_PIN)
        angle = get_kinematics()
        
        if stance_active and angle > 15.0:
            # STATE 1: Stance (Active Assist)
            motor_pwm.ChangeDutyCycle(60) 
        else:
            # STATE 2: Swing (Free Spin)
            motor_pwm.ChangeDutyCycle(0)
            
        time.sleep(0.02) # 50Hz Polling
except KeyboardInterrupt:
    motor_pwm.stop()
    GPIO.cleanup()`} 
             />
          </motion.div>

          {/* TELEMETRY DASHBOARD (INTERACTIVE) */}
          <motion.div 
            initial="initial" whileInView="visible" whileHover="hover" variants={holoHover}
            onHoverStart={() => setTelemetryHoloActive(true)} onHoverEnd={() => setTelemetryHoloActive(false)}
            className="relative prose prose-lg text-gray-600 font-light mb-16 bg-gray-900 p-10 md:p-12 rounded-[40px] border border-gray-800 shadow-xl cursor-default"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className={`absolute inset-0 rounded-[40px] pointer-events-none opacity-0 transition-opacity duration-700 ${telemetryHoloActive ? "opacity-[0.04]" : "opacity-0"}`} style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '15px 15px' }} />
            
            <h2 className="text-2xl font-bold text-white mb-6 mt-0 relative z-10" style={{ transform: "translateZ(20px)" }}>Live Data Display (Telemetry)</h2>
            <div className="relative z-10 space-y-4" style={{ transform: "translateZ(10px)" }}>
              <p className="text-gray-300">
                To evaluate the system latency without hooking up oscilloscopes, I expanded the Python script to include a lightweight <strong>WebSocket server</strong>. The Raspberry Pi Zero now broadcasts the Complementary Filter angle and the FSM state over the local WiFi network. 
              </p>
              <p className="text-gray-300">
                I then built a simple front-end Web Dashboard to catch this socket stream. 
              </p>
              <p className="text-yellow-500 font-medium">
                This allows me to wear the brace, walk around the lab, and watch the telemetry charts update in real-time on my laptop.
              </p>
            </div>
          </motion.div>

          {/* CODE SNIPPET 2: WEBSOCKET */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Telemetry: WebSocket Broadcast Script</h3>
             <CodeBlock 
                language="Python (Asyncio / Websockets)" 
                code={`import asyncio
import websockets
import json

async def broadcast_telemetry(websocket, path):
    while True:
        # Fetch clean data from FSM thread
        telemetry_data = {
            "flexion_angle": filtered_angle,
            "fsm_state": "STANCE" if stance_active else "SWING",
            "motor_pwm": current_pwm
        }
        
        # Serialize and transmit via WiFi
        payload = json.dumps(telemetry_data)
        await websocket.send(payload)
        await asyncio.sleep(0.02) # Match 50Hz hardware loop

start_server = websockets.serve(broadcast_telemetry, "0.0.0.0", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()`} 
             />
          </motion.div>

          {/* VISUAL ASSET FOR DASHBOARD */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
             <VisualAsset label="Insert Dashboard Video / Chart Screenshot Here" caption="Figure 7.1 - Real-time web dashboard displaying MPU6050 and FSR telemetry streams." />
          </motion.div>

          {/* REFLECTION */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16 px-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-8 uppercase tracking-tighter">Reflection</h2>
            <p>
              This week required a massive shift in mindset from system design to pure logic. Circumventing the Pi Zero's lack of ADCs by treating the FSR as a digital HIGH/LOW switch was a frugal, highly effective hack that perfectly feeds the Finite State Machine.
            </p>
            <p>
              Seeing the physical pressure of my foot hitting the floor instantly trigger a digital "STANCE" state on a web dashboard across the room was incredible. Next week, we move into Week 8: Integrating all the components onto the physical structure.
            </p>
          </motion.div>

          {/* DELIVERABLES UPLOAD BLOCK */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 px-4">Submitted Deliverables</h3>
            <DocAttachment title="Mynee_FSM_Logic.py" type="PY" fileSize="14 KB" />
            <DocAttachment title="WebSocket_Dashboard.zip" type="ZIP" fileSize="1.4 MB" />
          </motion.div>

          {/* FOOTER NAV */}
          <div className="border-t border-gray-200 pt-12 mt-16 flex justify-between items-center relative z-20">
            <Link href="/devlog/week-6">
              <button className="group flex items-center gap-4 px-8 py-3 bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 rounded-full font-bold transition-all active:scale-95">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 6
              </button>
            </Link>
            
            <Link href="/devlog/week-8">
              <button className="group flex items-center gap-4 px-10 py-4 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-yellow-500/40 active:scale-95">
                Read Week 8 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">FSM Logic</span></li>
                <li><span className="hover:text-yellow-500 transition-colors cursor-default">WebSockets</span></li>
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