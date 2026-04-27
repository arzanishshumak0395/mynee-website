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

// --- SUPPLY CHAIN CRISIS ---
const SupplyChainCrisisBoard = () => (
  <div className="bg-orange-500/10 border border-orange-500/30 p-8 md:p-12 rounded-[40px] shadow-2xl hover:border-orange-500/50 transition-all duration-500 mb-16 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[80px] pointer-events-none transition-colors duration-700" />
    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
      <div className="shrink-0 mt-2">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-black text-orange-400 uppercase tracking-[0.2em] mb-2">Logistical Incident Report</h3>
        <h2 className="text-2xl font-bold text-white mb-4">The Supply Chain Crisis</h2>
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Before large-scale system testing could commence, a massive logistical hurdle threatened to derail the project. Due to severe supply chain disruptions and component shortages caused by ongoing geopolitical conflicts, sourcing specific high-torque electromechanical actuators locally within Dubai proved nearly impossible.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
          When the initial bench-test motor burned out during early prototype testing, procuring a replacement with the exact 70-100 RPM and torque specifications required drastic measures.
        </p>
        <div className="bg-black/50 border border-orange-500/20 p-5 rounded-2xl">
          <p className="text-orange-400 text-xs font-bold mb-2">Resolution: International Procurement</p>
          <p className="text-gray-400 text-[10px] font-mono leading-relaxed uppercase tracking-wider">
            Overcoming this bottleneck required traveling internationally to Pakistan to personally source the necessary raw materials and specialized electronic components directly from College Road and Gowalmandi. This added immense logistical complexity to the prototyping phase but successfully secured the required hardware to continue.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- VERIFICATION VS VALIDATION ---
const VerificationValidationBoard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-sky-500/40 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-[50px] pointer-events-none" />
      <h4 className="text-sky-400 font-black text-sm uppercase tracking-widest mb-4">Verification</h4>
      <p className="text-white text-lg font-bold mb-4">"Did we build the system right?"</p>
      <p className="text-gray-400 text-sm font-light leading-relaxed">
        Verification focuses on the internal logic and specific component functionality. This involves <strong>Unit Testing</strong> (ensuring the Python math in the Complementary Filter accurately fuses raw IMU data without throwing errors) and <strong>Integration Testing</strong> (ensuring the Raspberry Pi successfully transmits a stable PWM signal to the L298N driver without crashing the I2C bus).
      </p>
    </div>
    <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] pointer-events-none" />
      <h4 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-4">Validation</h4>
      <p className="text-white text-lg font-bold mb-4">"Did we build the right system?"</p>
      <p className="text-gray-400 text-sm font-light leading-relaxed">
        Validation focuses on external realities and user needs. This involves <strong>System & Acceptance Testing</strong>. Does the exoskeleton actually assist with the sit-to-stand motion under load? Does the mechanical bracket withstand the torque without buckling? Does the end-to-end latency meet the critical 20ms human response threshold?
      </p>
    </div>
  </div>
);

// --- INTERACTIVE TEST RUNNER ---
const InteractiveTestTerminal = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  const runTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    
    const sequence = [
      { text: "> python -m unittest test_mynee_sensors.py", delay: 200 },
      { text: "Loading complementary_filter module...", delay: 600 },
      { text: "test_complementary_filter_logic (__main__.TestMyneeSensors) ...", delay: 1200 },
      { text: "  -> Mock Accel: 45.0, Mock Gyro Rate: 10.0, dt: 0.02, Alpha: 0.98", delay: 1500 },
      { text: "  -> Calculating fused trajectory: (0.98 * (40.0 + 0.2)) + (0.02 * 45.0)", delay: 2200 },
      { text: "  -> Expected: 40.296 | Result: 40.296", delay: 2600 },
      { text: "ok", delay: 2800 },
      { text: "", delay: 2900 },
      { text: "----------------------------------------------------------------------", delay: 3000 },
      { text: "Ran 1 test in 0.014s", delay: 3100 },
      { text: "", delay: 3200 },
      { text: "OK", delay: 3300, color: "text-emerald-400 font-bold" }
    ];

    sequence.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === sequence.length - 1) setIsRunning(false);
      }, log.delay);
    });
  };

  return (
    <div className="w-full bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden mb-16 relative group">
      <div className="absolute top-0 left-0 w-32 h-32 bg-sky-500/5 blur-[50px] pointer-events-none" />
      
      <div className="bg-white/5 border-b border-white/5 flex items-center justify-between px-4 h-14">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <button 
          onClick={runTests}
          disabled={isRunning}
          className={`px-4 py-1.5 text-[10px] font-black font-mono uppercase tracking-widest rounded transition-all shadow-lg ${isRunning ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-black active:scale-95'}`}
        >
          {isRunning ? 'Running...' : 'Run Automated Tests'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row h-[400px]">
        {/* Left: Code */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar border-r border-white/5 bg-black/30">
          <pre className="text-xs font-mono leading-relaxed text-gray-300">
<span className="text-purple-400">import</span> unittest<br/>
<span className="text-purple-400">from</span> mynee_math <span className="text-purple-400">import</span> complementary_filter<br/>
<br/>
<span className="text-sky-400">class</span> <span className="text-yellow-300">TestMyneeSensors</span>(unittest.TestCase):<br/>
    <br/>
    <span className="text-blue-400">def</span> <span className="text-emerald-300">test_complementary_filter_logic</span>(self):<br/>
        <span className="text-gray-500 italic"># Arrange: Mock IMU data</span><br/>
        mock_accel_angle = <span className="text-yellow-400">45.0</span><br/>
        mock_gyro_rate = <span className="text-yellow-400">10.0</span><br/>
        dt = <span className="text-yellow-400">0.02</span><br/>
        alpha = <span className="text-yellow-400">0.98</span><br/>
        prev_angle = <span className="text-yellow-400">40.0</span><br/>
        <br/>
        <span className="text-gray-500 italic"># Act: Run function</span><br/>
        result = complementary_filter(<br/>
            alpha, prev_angle, mock_gyro_rate, <br/>
            dt, mock_accel_angle<br/>
        )<br/>
        <br/>
        <span className="text-gray-500 italic"># Assert: Check against expected manual calc</span><br/>
        <span className="text-gray-500 italic"># (0.98 * (40.0 + (10.0 * 0.02))) + (0.02 * 45.0)</span><br/>
        expected = <span className="text-yellow-400">40.296</span><br/>
        self.assertAlmostEqual(result, expected, places=<span className="text-yellow-400">3</span>)<br/>
<br/>
<span className="text-purple-400">if</span> __name__ == <span className="text-emerald-300">'__main__'</span>:<br/>
    unittest.main()<br/>
          </pre>
        </div>
        
        {/* Right: Console Output */}
        <div className="flex-1 p-6 bg-black/80 overflow-y-auto font-mono text-xs text-gray-400">
          {logs.length === 0 && !isRunning && (
            <div className="h-full flex items-center justify-center text-gray-600 italic">
              Click "Run Automated Tests" to execute.
            </div>
          )}
          {logs.map((log, i) => (
            <div key={i} className={`mb-1 ${log.color || ''}`}>{log.text}</div>
          ))}
          {isRunning && <div className="animate-pulse w-2 h-4 bg-gray-400 mt-1" />}
        </div>
      </div>
    </div>
  );
};

// --- NEW BLOCK: LIVE BIOMECHANICAL DIGITAL TWIN ---
const BiomechanicalSimulator = () => {
  const [fsrActive, setFsrActive] = useState(false);
  const [kneeAngle, setKneeAngle] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // FSM Logic
  const isStance = fsrActive && kneeAngle > 15 && kneeAngle <= 90;
  const isOverFlexed = fsrActive && kneeAngle > 90; 
  const pwm = isStance ? 80 : 0;
  
  let fsmState = "SWING PHASE (PASSIVE)";
  let statusColor = "text-emerald-500";
  let glowColor = "shadow-[0_0_40px_rgba(16,185,129,0.3)] border-emerald-500/50";

  if (isStance) {
    fsmState = "STANCE PHASE (ACTIVE)";
    statusColor = "text-yellow-400";
    glowColor = "shadow-[0_0_40px_rgba(250,204,21,0.3)] border-yellow-500/50";
  } else if (isOverFlexed) {
    fsmState = "SAFETY CUTOFF";
    statusColor = "text-red-500";
    glowColor = "shadow-[0_0_40px_rgba(239,68,68,0.3)] border-red-500/50";
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
      <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-sky-500 text-black py-1.5 px-4 flex items-center justify-center gap-3 z-20">
         <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Biomechanical Digital Twin</span>
         <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
      </div>

      <div className="flex items-center gap-3 mb-10 mt-6 border-b border-white/5 pb-6">
        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">FSM Validation Simulator</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Left: Inputs */}
        <div className="space-y-8 flex flex-col justify-center">
          <h4 className="text-gray-500 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            Simulated Sensor Inputs
            {!hasInteracted && <span className="ml-2 px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-full animate-pulse">Interact Below ↓</span>}
          </h4>
          
          <div className={`bg-white/5 border p-6 rounded-2xl transition-all duration-500 relative ${!hasInteracted ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'border-white/5'}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-300 text-xs font-bold">FSR Foot Pressure</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded transition-colors ${fsrActive ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}>
                {fsrActive ? 'HIGH (Strike)' : 'LOW (Toe-Off)'}
              </span>
            </div>
            <button 
              onClick={handleFsrToggle}
              className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 shadow-lg ${fsrActive ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/20' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
            >
              Toggle Foot Pressure
            </button>
          </div>

          <div className={`bg-white/5 border p-6 rounded-2xl transition-all duration-500 relative ${!hasInteracted ? 'border-teal-500/50 shadow-[0_0_20px_rgba(45,212,191,0.2)]' : 'border-white/5'}`}>
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300 text-xs font-bold">MPU6050 Angle</span>
              <span className="text-emerald-400 text-[10px] font-mono font-bold bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                {kneeAngle.toFixed(1)}°
              </span>
            </div>
            <input 
              type="range" min="0" max="120" step="0.5" value={kneeAngle} 
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-900 rounded-lg appearance-none cursor-pointer accent-teal-500 hover:accent-teal-400 transition-all"
            />
            <div className="flex justify-between mt-2 text-[8px] font-mono text-gray-500 uppercase tracking-widest">
              <span>0°</span>
              <span className="text-teal-500/50">| 15°-90° Limit |</span>
              <span>120°</span>
            </div>
          </div>
        </div>

        {/* Center: SVG Digital Twin */}
        <div className="bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-inner flex items-center justify-center p-4 relative overflow-hidden h-[400px]">
           {/* Grid background for technical feel */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(#2dd4bf 1px, transparent 1px), linear-gradient(90deg, #2dd4bf 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
           
           <svg viewBox="0 0 300 400" className="w-full h-full relative z-10 overflow-visible">
             <defs>
               <filter id="motorGlow" x="-50%" y="-50%" width="200%" height="200%">
                 <feGaussianBlur stdDeviation="8" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
               <filter id="fsrGlow" x="-50%" y="-50%" width="200%" height="200%">
                 <feGaussianBlur stdDeviation="6" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
             </defs>

             {/* Hip Joint */}
             <circle cx="150" cy="50" r="12" fill="#374151" />
             {/* Thigh (Fixed) */}
             <line x1="150" y1="50" x2="150" y2="200" stroke="#4B5563" strokeWidth="18" strokeLinecap="round" />
             {/* Exoskeleton Thigh Strut */}
             <line x1="168" y1="70" x2="168" y2="200" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />

             {/* Rotating Calf & Foot Group */}
             <g transform={`rotate(${kneeAngle}, 150, 200)`} style={{ transition: "transform 0.1s ease-out" }}>
               {/* Calf */}
               <line x1="150" y1="200" x2="150" y2="340" stroke="#4B5563" strokeWidth="14" strokeLinecap="round" />
               {/* Foot */}
               <path d="M 143 340 Q 150 330 190 340 L 190 355 L 143 355 Z" fill="#4B5563" />
               
               {/* Exoskeleton Calf Strut */}
               <line x1="168" y1="200" x2="168" y2="320" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" />
               
               {/* FSR Pressure Pad Glow (Under Foot) */}
               {fsrActive && (
                 <ellipse cx="165" cy="360" rx="35" ry="8" fill="#ef4444" filter="url(#fsrGlow)" className="animate-pulse" />
               )}
             </g>

             {/* Knee Joint / Motor Assembly (Drawn last to stay on top) */}
             <circle cx="168" cy="200" r="22" fill={isStance ? "#eab308" : "#1f2937"} stroke={isStance ? "#fef08a" : "#374151"} strokeWidth="4" filter={isStance ? "url(#motorGlow)" : ""} className={isStance ? "animate-pulse" : ""} />
             <circle cx="168" cy="200" r="8" fill="#111827" />
           </svg>
        </div>

        {/* Right: Logic Output */}
        <div className="flex flex-col justify-center">
          <div className={`bg-[#0a0a0a] border p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-500 h-full relative ${glowColor}`}>
            
            <p className="text-gray-500 text-[10px] font-mono uppercase tracking-widest mb-4">FSM Logic Engine</p>
            
            <h2 className={`text-xl font-black tracking-tight mb-8 transition-colors duration-300 ${statusColor}`}>
              {fsmState}
            </h2>
            
            <div className="w-full bg-black/80 rounded-2xl p-5 flex justify-between items-center border border-white/5 shadow-inner mb-6">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Motor PWM:</span>
              <span className={`text-2xl font-mono font-black transition-all duration-300 ${isStance ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'text-gray-600'}`}>
                {pwm}%
              </span>
            </div>
            
            <p className="text-[9px] text-gray-500 font-mono leading-relaxed text-left bg-white/5 p-3 rounded-xl border border-white/5">
              &gt; Evaluating thresholds...<br/>
              &gt; IF FSR == HIGH AND 15° &lt; Angle &lt;= 90°:<br/>
              &gt; &nbsp;&nbsp;ENGAGE STANCE (80%)<br/>
              &gt; ELSE:<br/>
              &gt; &nbsp;&nbsp;ENGAGE SWING (0%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- QA MATRIX ---
const QA_MatrixBoard = () => {
  const testCases = [
    { id: "TC-01", type: "Unit", desc: "Apply static physical pressure to the heel FSR.", expected: "GPIO reads HIGH (1) when >10N force applied.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-02", type: "Unit", desc: "Hold MPU6050 static for 5 mins to test gyroscopic drift.", expected: "Drift remains under 1.0° over 5 minutes.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-03", type: "Integrated", desc: "Tilt hinge to exactly 90° against physical goniometer.", expected: "IMU calculates angle within 2.0° margin of error.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-04", type: "Integrated", desc: "Boot Raspberry Pi and scan I2C bus at high baud rate.", expected: "Terminal returns address 0x68 without packet loss.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-05", type: "Integrated", desc: "Measure GPIO output to L298N ENA pin.", expected: "Clean square wave at 1000Hz frequency.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-06", type: "Integrated", desc: "Measure 12V line voltage sag when motor engages full torque.", expected: "Voltage drop does not fall below 11.0V.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-07", type: "Functional", desc: "Simulate standard gait: Heel strike + Bent Knee.", expected: "Terminal outputs 'ASSISTING'; actuator provides lifting torque.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-08", type: "Functional", desc: "Simulate toe-off / swing phase: Heel lifted.", expected: "Terminal outputs 'FREE SWING'; motor power cuts to 0%.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-09", type: "Functional", desc: "Abruptly unplug FSR wire during active Stance Phase.", expected: "System defaults to safe 'Swing' state (0% power) to prevent locking.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-10", type: "System", desc: "Trigger Ctrl+C hardware interrupt during active motor load.", expected: "Motor immediately halts; GPIO pins release securely.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-11", type: "System", desc: "Time delta from physical FSR press to motor spindle rotation.", expected: "Response time < 20 ms (human reaction baseline).", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { id: "TC-12", type: "System", desc: "Run L298N and motor at continuous stall-load for 5 mins.", expected: "Driver IC maintains safe temperature (< 60°C).", status: "FAIL", statusColor: "text-red-400 bg-red-500/10 border-red-500/30" },
    { id: "TC-13", type: "System", desc: "Apply 10kg lateral load to custom U-Bracket / Flange assembly.", expected: "No visible deflection or mechanical binding in the gears.", status: "PASS", statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  ];

  return (
    <div className="mb-16 bg-[#0a0a0a]/50 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="px-6 py-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-xs font-black text-teal-400 uppercase tracking-widest flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> Official Test Matrix (Table 4.1 Full Export)
        </h3>
      </div>
      <div className="overflow-x-auto custom-scrollbar h-[500px]">
        <table className="w-full text-left text-sm min-w-[800px]">
          <thead className="bg-black/50 border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider text-[10px] sticky top-0 backdrop-blur-md">
            <tr>
              <th className="p-5 w-1/12">Test ID</th>
              <th className="p-5 w-1/12">Type</th>
              <th className="p-5 w-1/3">Description</th>
              <th className="p-5 w-1/3">Expected Outcome</th>
              <th className="p-5 w-1/12 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 font-light divide-y divide-white/5">
            {testCases.map((tc, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors group">
                <td className="p-5 font-mono text-xs text-gray-400">{tc.id}</td>
                <td className="p-5 text-xs font-bold text-gray-500 uppercase">{tc.type}</td>
                <td className="p-5 text-xs text-gray-300 leading-relaxed pr-4">{tc.desc}</td>
                <td className="p-5 text-xs text-gray-400 leading-relaxed pr-4">{tc.expected}</td>
                <td className="p-5 text-center">
                  <span className={`px-3 py-1 border rounded-full text-[10px] font-black tracking-widest ${tc.statusColor}`}>
                    {tc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

export default function Week9Log() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="relative flex min-h-screen flex-col bg-[#030305] text-gray-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400 origin-left z-[100]" style={{ scaleX }} />
      <DataGridBackground />

      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto w-full px-6 md:px-12 pt-40 pb-32 gap-12 lg:gap-16 relative z-10">
        <Sidebar activeWeek={9} />

        <article className="flex-1 max-w-4xl flex flex-col items-start min-h-[60vh]">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full relative overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.5)] mb-16">
            <div className="mb-8 border-b border-white/5 pb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-black tracking-[0.3em] uppercase">Project Phase 3</span>
                <span className="text-gray-500 text-xs font-mono">7 MIN READ</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Week 9: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-yellow-400">QA & Performance Evaluation.</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed">
                With the hardware integrated and the Python FSM successfully processing telemetry, the project officially exits the building phase. A medical-grade assistive device requires more than just functional code; it requires empirical proof of safety and reliability.
              </p>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-teal-400 prose-p:text-gray-400 prose-p:font-light prose-p:leading-loose">
              
              <SupplyChainCrisisBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Verification vs. Validation</h2>
              <p>In the Software Development Lifecycle (SDLC), testing is broken down into two core philosophies. This week was dedicated to formalizing these testing protocols and establishing the strict physical environments required for the Performance Evaluation Setup.</p>
              
              <VerificationValidationBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Evaluation Setup: The Benchtop Rig</h2>
              <p>To ensure empirical rigor while adhering to the low-cost constraints of the project, I bypassed expensive digital diagnostic tools and utilized a highly methodical, frugal benchtop testing environment:</p>

              <ul className="list-none pl-0 space-y-6 my-8 font-medium text-gray-300">
                <li className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <span className="text-teal-400 font-bold block mb-2">Scenario A (Latency): Serial Timestamping</span>
                  <p className="text-gray-400 text-sm leading-relaxed mb-0">To measure latency without an oscilloscope, I utilized high-resolution Python `time.perf_counter()` timestamping. By calculating the microsecond delta between the physical FSR GPIO trigger and the precise moment the PWM signal was dispatched to the L298N driver, I could log the end-to-end processing delay directly via the serial monitor.</p>
                </li>
                <li className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <span className="text-emerald-400 font-bold block mb-2">Scenario B (Kinematic Accuracy): Manual Benchmarking</span>
                  <p className="text-gray-400 text-sm leading-relaxed mb-0">I mounted the MPU6050 on a simulated mechanical hinge joint on the workbench. Using a physical protractor, I swept the joint through exact 30°, 60°, and 90° angles, comparing the software's calculated Complementary Filter output directly against the absolute mechanical reality.</p>
                </li>
                <li className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <span className="text-orange-400 font-bold block mb-2">Scenario C (Thermal Load): Infrared Thermometry</span>
                  <p className="text-gray-400 text-sm leading-relaxed mb-0">Using an isolated 12V bench power supply, I commanded the actuator to hold a continuous stall-torque load for 5 minutes while monitoring the L298N driver heat sinks with an external infrared thermometer.</p>
                </li>
              </ul>

              <h2 className="text-3xl text-white mt-16 mb-6">System Validation: Live Biomechanical Simulator</h2>
              <p>To validate the system behavior without risking physical injury during the benchtop trials, I built this biomechanical simulator. It maps the Python FSM logic directly to a digital twin of the human leg, allowing me to observe the exact motor torque and gait phase states in real-time.</p>
              
              <BiomechanicalSimulator />

              <h2 className="text-3xl text-white mt-16 mb-6">Automated Unit Testing</h2>
              <p>While hardware testing handles the physical realities, the underlying mathematical models must be bulletproof. I utilized Python's native `unittest` framework to automatically verify the Complementary Filter logic before it is deployed to the edge device. The accurate execution of `(0.98 * (prev_angle + (gyro * dt))) + (0.02 * accel)` is paramount to preventing jitter.</p>
              
              <InteractiveTestTerminal />

              <h2 className="text-3xl text-white mt-16 mb-6">The Master QA Matrix</h2>
              <p>All test scenarios, spanning from basic sensor polling to maximum load thresholds, were compiled into a master Quality Assurance matrix. Note the explicit documentation of the thermal failure (TC-12)—documenting failures and defining future paths to resolve them is just as crucial as documenting successes in engineering.</p>
              
              <QA_MatrixBoard />

              <h2 className="text-3xl text-white mt-16 mb-6">Reflection & Next Steps</h2>
              <p>This week proved that writing code is only 50% of the battle; proving the code won't fail under physical and computational stress is the real engineering challenge. Overcoming the logistical nightmare of the supply chain crisis and establishing the benchtop testing rig transitions this project from a "hobby build" into a documented, scientifically sound prototype.</p>
              <p>Next week (Week 10), we run the final empirical data analysis and compile the results!</p>

            </div>

            {/* NAV FOOTER */}
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center w-full">
              <Link href="/devlog/week-8">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> Week 8
                </button>
              </Link>
              <Link href="/devlog/week-10">
                <button className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-teal-500 text-gray-300 hover:text-black rounded-full font-bold transition-all border border-white/10 hover:border-teal-500 shadow-xl hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] active:scale-95">
                  Read Week 10 <span className="group-hover:translate-x-1 transition-transform">→</span>
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
                <li><span className="cursor-default hover:text-teal-400 transition-colors">System Testing</span></li>
                <li><span className="cursor-default hover:text-teal-400 transition-colors">Quality Assurance</span></li>
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
      
      {/* Global CSS for custom scrollbars */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(45,212,191,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45,212,191,0.5); }
      `}</style>
    </main>
  );
}