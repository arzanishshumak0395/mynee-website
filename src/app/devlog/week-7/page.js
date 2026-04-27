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

// --- NEW BLOCK: Modular Architecture Board ---
const ModularArchitectureBoard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-teal-500/50 transition-all group">
        <h4 className="text-teal-400 font-bold text-sm uppercase tracking-widest mb-2">config.py</h4>
        <p className="text-gray-400 text-xs font-light leading-relaxed">Defines all global shared variables, including I2C addresses, GPIO pin mappings, and the strict 15° to 90° safety thresholds used by the FSM.</p>
      </div>
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-emerald-500/50 transition-all group">
        <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-2">hardware.py</h4>
        <p className="text-gray-400 text-xs font-light leading-relaxed">Manages the low-level hardware abstraction layer. Handles safe initialization of the L298N motor driver PWM channels and the MPU6050 bus connection.</p>
      </div>
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-yellow-500/50 transition-all group">
        <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2">fsm_logic.py</h4>
        <p className="text-gray-400 text-xs font-light leading-relaxed">The brain of the exoskeleton. Executes the Complementary Filter on the IMU data and houses the decision trees for Stance vs. Swing phase transitions.</p>
      </div>
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-sky-500/50 transition-all group">
        <h4 className="text-sky-400 font-bold text-sm uppercase tracking-widest mb-2">telemetry.py</h4>
        <p className="text-gray-400 text-xs font-light leading-relaxed">Operates a dedicated Asyncio WebSocket server. Packages the processed kinematic data and current FSM state into JSON payloads for the live dashboard.</p>
      </div>
    </div>
  );
};

// --- UPGRADED BLOCK: Highly Interactive Telemetry Simulator (With 90° Safety Cutoff) ---
const TelemetrySimulator = () => {
  const [fsrActive, setFsrActive] = useState(false);
  const [kneeAngle, setKneeAngle] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // UPDATED FSM Logic: Only active between 15 and 90 degrees
  const isStance = fsrActive && kneeAngle > 15 && kneeAngle <= 90;
  const isOverFlexed = fsrActive && kneeAngle > 90; // Just for visual cue
  const pwm = isStance ? 80 : 0;
  
  let fsmState = "SWING PHASE (PASSIVE)";
  let statusColor = "text-emerald-500";
  let glowColor = "shadow-[0_0_40px_rgba(16,185,129,0.4)]";

  if (isStance) {
    fsmState = "STANCE PHASE (ACTIVE)";
    statusColor = "text-red-500";
    glowColor = "shadow-[0_0_40px_rgba(239,68,68,0.4)]";
  } else if (isOverFlexed) {
    fsmState = "SAFETY CUTOFF (OVER-FLEX)";
    statusColor = "text-yellow-500";
    glowColor = "shadow-[0_0_40px_rgba(250,204,21,0.4)]";
  }

  const handleFsrToggle = () => {
    setFsrActive(!fsrActive);
    setHasInteracted(true);
  };

  const handleSliderChange = (e) => {
    setKneeAngle(parseFloat(e.target.value));
    setHasInteracted(true);
  };

  return (
    <div className="bg-[#050505] border border-white/10 rounded-[40px] p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden group/board">
      
      {/* Live Demo Banner */}
      <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 text-black py-1.5 px-4 flex items-center justify-center gap-3">
         <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Interactive Demo • Try Adjusting The Controls</span>
         <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
      </div>

      <div className="flex items-center gap-3 mb-10 mt-6 border-b border-white/5 pb-6">
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">FSM Telemetry Dashboard</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
        {/* Left: Inputs */}
        <div className="space-y-8">
          <h4 className="text-gray-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            Simulated Sensor Inputs
            {!hasInteracted && <span className="ml-2 px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-full animate-pulse">Interact Below ↓</span>}
          </h4>
          
          {/* FSR Toggle */}
          <div className={`bg-white/5 border p-6 rounded-2xl transition-all duration-500 relative ${!hasInteracted ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/5'}`}>
            {!hasInteracted && <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75" />}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300 text-sm font-bold">FSR Foot Pressure</span>
              <span className={`text-xs font-mono font-bold px-2 py-1 rounded transition-colors ${fsrActive ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}>
                {fsrActive ? 'HIGH (Heel Strike)' : 'LOW (Toe-Off)'}
              </span>
            </div>
            <button 
              onClick={handleFsrToggle}
              className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-lg ${fsrActive ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/20' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
            >
              Toggle Foot Pressure
            </button>
          </div>

          {/* Angle Slider - UPDATED TO 120 DEGREES */}
          <div className={`bg-white/5 border p-6 rounded-2xl transition-all duration-500 relative ${!hasInteracted ? 'border-teal-500/50 shadow-[0_0_20px_rgba(45,212,191,0.2)]' : 'border-white/5'}`}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300 text-sm font-bold">MPU6050 Knee Angle</span>
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded border shadow-inner ${isOverFlexed ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'}`}>
                {kneeAngle.toFixed(1)}°
              </span>
            </div>
            <div className="relative">
               {!hasInteracted && <div className="absolute top-1/2 left-1/4 w-12 h-4 bg-teal-400/30 blur-md rounded-full animate-pulse -translate-y-1/2 pointer-events-none" />}
               <input 
                 type="range" min="0" max="120" step="0.5" value={kneeAngle} 
                 onChange={handleSliderChange}
                 className="w-full h-3 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-teal-500 border border-white/5 shadow-inner hover:accent-teal-400 transition-all"
               />
            </div>
            <div className="flex justify-between mt-3 text-[9px] font-mono text-gray-500">
              <span>0° (Straight)</span>
              <span className="text-teal-500/50 hidden md:block">| 15° to 90° Limits |</span>
              <span>120° (Over-Flex)</span>
            </div>
          </div>
        </div>

        {/* Right: Logic Output */}
        <div className="space-y-8">
          <h4 className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">FSM Logic Engine Output</h4>
          
          <div className={`bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-500 h-full relative ${glowColor}`}>
            
            {/* Background glowing orb reflecting state */}
            <div className={`absolute inset-0 opacity-20 blur-[80px] pointer-events-none transition-colors duration-700 ${isStance ? 'bg-red-500' : isOverFlexed ? 'bg-yellow-500' : 'bg-emerald-500'}`} />

            <div className="relative z-10 w-full flex flex-col items-center">
              <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-4">Current System State</p>
              
              <h2 className={`text-xl md:text-2xl font-black tracking-tight mb-10 transition-colors duration-300 ${statusColor}`}>
                {fsmState}
              </h2>
              
              <div className="w-full bg-black/80 rounded-2xl p-6 flex justify-between items-center border border-white/5 shadow-inner">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Motor PWM Output:</span>
                <span className={`text-3xl font-mono font-black transition-all duration-300 ${isStance ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'text-gray-600'}`}>
                  {pwm}%
                </span>
              </div>
              
              <p className="text-[10px] text-gray-600 font-mono mt-8 leading-relaxed px-4 border-t border-white/5 pt-4">
                *Logic: If FSR is HIGH and 15.0° &lt; Angle &lt;= 90.0°, trigger Stance Phase. Otherwise, default to Swing Phase failsafe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Multi-Tab Code Terminal (UPDATED LOGIC) ---
const CodeTerminal = () => {
  const [activeTab, setActiveTab] = useState('fsm');

  return (
    <div className="w-full bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden mb-16 relative group hover:border-teal-500/30 transition-colors duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-[50px] pointer-events-none group-hover:bg-teal-500/10 transition-colors duration-700" />
      
      {/* Terminal Header & Tabs */}
      <div className="bg-white/5 border-b border-white/5 flex items-center justify-between pr-4">
        <div className="flex overflow-x-auto custom-scrollbar">
          <button onClick={() => setActiveTab('fsm')} className={`px-6 py-4 text-[10px] font-mono tracking-widest uppercase transition-colors border-r border-white/5 whitespace-nowrap ${activeTab === 'fsm' ? 'bg-white/10 text-teal-400 border-t-2 border-t-teal-400' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>fsm_logic.py</button>
          <button onClick={() => setActiveTab('socket')} className={`px-6 py-4 text-[10px] font-mono tracking-widest uppercase transition-colors border-r border-white/5 whitespace-nowrap ${activeTab === 'socket' ? 'bg-white/10 text-sky-400 border-t-2 border-t-sky-400' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>telemetry.py</button>
        </div>
        <div className="flex gap-2 hidden md:flex">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 overflow-x-auto custom-scrollbar relative z-10 h-80">
        <pre className="text-xs font-mono leading-relaxed">
          {activeTab === 'fsm' ? (
            <code className="text-gray-300">
<span className="text-gray-500 italic"># Core Finite State Machine Loop</span><br/>
<span className="text-purple-400">try</span>:<br/>
    <span className="text-purple-400">while</span> <span className="text-yellow-300">True</span>:<br/>
        <span className="text-gray-500 italic"># Step 1: Poll Hardware Sensors</span><br/>
        stance_active = GPIO.input(FSR_PIN)<br/>
        angle = get_kinematics_filtered()<br/>
        <br/>
        <span className="text-gray-500 italic"># Step 2: FSM Decision Tree (With 90° Safety Cutoff)</span><br/>
        <span className="text-purple-400">if</span> stance_active <span className="text-purple-400">and</span> <span className="text-yellow-300">15.0</span> &lt; angle &lt;= <span className="text-yellow-300">90.0</span>:<br/>
            <span className="text-gray-500 italic"># STATE 1: Stance Phase (Active Assist)</span><br/>
            motor_pwm.ChangeDutyCycle(<span className="text-yellow-300">80</span>) <br/>
        <span className="text-purple-400">else</span>:<br/>
            <span className="text-gray-500 italic"># STATE 2: Swing Phase / Safety Cutoff (Failsafe Free Spin)</span><br/>
            motor_pwm.ChangeDutyCycle(<span className="text-yellow-300">0</span>)<br/>
            <br/>
        <span className="text-gray-500 italic"># 50Hz Polling keeps latency &lt; 20ms</span><br/>
        time.sleep(<span className="text-yellow-300">0.02</span>) <br/>
<span className="text-purple-400">except</span> KeyboardInterrupt:<br/>
    motor_pwm.stop()<br/>
    GPIO.cleanup()<br/>
            </code>
          ) : (
            <code className="text-gray-300">
<span className="text-gray-500 italic"># WebSocket Telemetry Broadcast</span><br/>
<span className="text-purple-400">import</span> asyncio<br/>
<span className="text-purple-400">import</span> websockets<br/>
<span className="text-purple-400">import</span> json<br/>
<br/>
<span className="text-purple-400">async def</span> <span className="text-blue-300">broadcast_telemetry</span>(websocket, path):<br/>
    <span className="text-purple-400">while</span> <span className="text-yellow-300">True</span>:<br/>
        <span className="text-gray-500 italic"># Package clean data from FSM thread</span><br/>
        payload = json.dumps(&#123;<br/>
            <span className="text-emerald-300">"angle"</span>: filtered_angle,<br/>
            <span className="text-emerald-300">"state"</span>: <span className="text-emerald-300">"STANCE"</span> <span className="text-purple-400">if</span> stance_active <span className="text-purple-400">else</span> <span className="text-emerald-300">"SWING"</span>,<br/>
            <span className="text-emerald-300">"pwm"</span>: current_pwm<br/>
        &#125;)<br/>
        <br/>
        <span className="text-gray-500 italic"># Transmit via Local WiFi</span><br/>
        <span className="text-purple-400">await</span> websocket.send(payload)<br/>
        <span className="text-purple-400">await</span> asyncio.sleep(<span className="text-yellow-300">0.02</span>)<br/>
<br/>
server = websockets.serve(broadcast_telemetry, <span className="text-emerald-300">"0.0.0.0"</span>, <span className="text-yellow-300">8765</span>)<br/>
asyncio.get_event_loop().run_until_complete(server)<br/>
asyncio.get_event_loop().run_forever()<br/>
            </code>
          )}
        </pre>
      </div>
    </div>
  );
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week7Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={7} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 2</span>
                <span className="text-gray-500 text-xs font-mono">6 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 7: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">Software Integration.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                With the UML architecture mapped out last week, Phase 1 of development is officially over. Week 7 marks the beginning of Phase 2: Heavy Implementation. The goal for this week was strictly programmatic: interface the sensors with the Raspberry Pi Zero, write the Python Finite State Machine (FSM) to determine gait phases, and establish a local telemetry stream.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <h2 className="text-3xl text-white mt-12 mb-8">Modular Code Architecture</h2>
              <p>To prevent spaghetti code and ensure the system remains highly maintainable, I rejected writing a monolithic script. Instead, the software logic driving the exoskeleton was strictly divided into decoupled core modules.</p>
              
              <ModularArchitectureBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Sensor Interfacing & The FSR Hack</h2>
              <p>To build the "intent recognition" engine, the Raspberry Pi Zero needs to read two distinct data streams simultaneously: the MPU6050 (for joint angle via I2C) and the FSRs (for foot-strike pressure).</p>
              
              <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-6 rounded-r-2xl my-8">
                <h4 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-widest">Engineering Challenge: Analog to Digital</h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-0">
                  Force Sensitive Resistors output an analog voltage, but as noted in my hardware research, the Pi Zero lacks native Analog-to-Digital Converters (ADCs). Instead of complicating the I2C bus with an external ADC chip, I utilized a hardware workaround: configuring the FSRs as digital threshold switches (HIGH/LOW) using standard GPIO pins with 10kΩ pull-down resistors.
                </p>
              </div>

              <p>This binary input perfectly feeds into the Finite State Machine (FSM). If the FSR reads HIGH (foot on the ground = Stance Phase), the motor is primed to assist. If it reads LOW (foot in the air = Swing Phase), the Pi instantly drops the PWM to the motor driver, allowing the leg to free-spin.</p>

              <h2 className="text-3xl text-white mt-16 mb-8">Core Logic & Telemetry Implementation</h2>
              <p>With the physical pins wired, I wrote the FSM loop in Python. To evaluate the system latency without hooking up oscilloscopes, I expanded the software architecture to include a lightweight <strong>Asyncio WebSocket server</strong>. The Raspberry Pi Zero now continuously broadcasts the Complementary Filter angle and the FSM state over the local WiFi network at 50Hz.</p>
              
              <CodeTerminal />

              <h2 className="text-3xl text-white mt-16 mb-8">Live Telemetry Dashboard (Interactive Simulator)</h2>
              <p>To catch this WebSocket stream, I built a local HTML/JS front-end Dashboard. This allows me to wear the brace, walk around the lab, and watch the telemetry metrics update in real-time. Below is a live interactive simulation of that dashboard demonstrating the strict FSM logic that controls the exoskeleton.</p>

              <TelemetrySimulator />

              <h2 className="text-3xl text-white mt-16 mb-6">Reflection & Next Steps</h2>
              <p>This week required a massive shift in mindset from system design to pure logic. Circumventing the Pi Zero's lack of ADCs by treating the FSR as a digital HIGH/LOW switch was a frugal, highly effective hack that perfectly feeds the Finite State Machine.</p>
              <p>Seeing the physical pressure of my foot hitting the floor instantly trigger a digital "STANCE" state on a web dashboard across the room was incredible. Next week, we move into Week 8: Translating this software intelligence into mechanical fabrication and integrating all the components onto the physical iron structure.</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-6">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 6
                </button>
              </Link>
              <Link href="/devlog/week-8">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 8 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Software Integration</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">WebSocket Telemetry</span></li>
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