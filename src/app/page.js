"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Text, Environment, Sphere, RoundedBox } from "@react-three/drei";

// ==========================================
// 1. ISOLATED 60FPS TELEMETRY COMPONENT 
// ==========================================
function TelemetrySection() {
  const [sensorData, setSensorData] = useState({ flexionAngle: 120, gForce: "0.00", strainLevel: 50 });

  useEffect(() => {
    let animationFrameId;
    let tick = 0;
    const speed = 0.02; // Slower, smoother wave speed
    
    // requestAnimationFrame forces the browser to update at 60FPS for maximum fluidity
    const renderLoop = () => {
      tick += speed; 
      
      setSensorData({
        flexionAngle: Math.floor(((Math.cos(tick) + 1) / 2) * 120),
        gForce: (((-Math.cos(tick) + 1) / 2) * 3.0).toFixed(2),
        strainLevel: Math.floor(((Math.sin(tick) + 1) / 2) * 100),
      });
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const getDynamicColor = (val, max) => {
    const ratio = val / max;
    if (ratio < 0.30) return { text: "text-gray-800", bg: "bg-gray-800" };         
    if (ratio < 0.60) return { text: "text-green-500", bg: "bg-green-500" }; 
    if (ratio < 0.85) return { text: "text-yellow-500", bg: "bg-yellow-500" };
    return { text: "text-red-500", bg: "bg-red-500" };                       
  };

  const flexColors = getDynamicColor(sensorData.flexionAngle, 120);
  const impactColors = getDynamicColor(sensorData.gForce, 3.0);
  const strainColors = getDynamicColor(sensorData.strainLevel, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Flexion Angle</h4>
        <div className="flex items-end gap-2 mb-6">
          <span className={`text-7xl font-black ${flexColors.text}`}>{sensorData.flexionAngle}°</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className={`h-2 rounded-full ${flexColors.bg}`} style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Impact Force</h4>
        <div className="flex items-end gap-2 mb-6">
          <span className={`text-7xl font-black ${impactColors.text}`}>{sensorData.gForce}</span>
          <span className="text-xl font-bold text-gray-400 mb-2">G</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className={`h-2 rounded-full ${impactColors.bg}`} style={{ width: `${(sensorData.gForce / 3) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Material Strain</h4>
        <div className="flex items-end gap-2 mb-6">
          <span className={`text-7xl font-black ${strainColors.text}`}>{sensorData.strainLevel}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className={`h-2 rounded-full ${strainColors.bg}`} style={{ width: `${sensorData.strainLevel}%` }}></div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. REFINED WEBGL 3D SCENE
// ==========================================
function GlassBackdrop() {
  const glassRef = useRef();

  useFrame((state) => {
    // Very subtle parallax tracking so the glass feels alive
    glassRef.current.rotation.x = state.mouse.y * 0.05;
    glassRef.current.rotation.y = state.mouse.x * 0.05;
  });

  return (
    // Moved slightly down to align with the HTML search bar
    <group position={[0, -0.2, 2.5]}> 
      {/* Flat Rounded Box instead of a thick capsule prevents the black void effect */}
      <RoundedBox ref={glassRef} args={[7, 1.2, 0.1]} radius={0.5} smoothness={4}>
        <MeshTransmissionMaterial 
          transmission={1} 
          roughness={0.08} 
          thickness={0.5} // Thinner = more realistic glass
          ior={1.15}      // Lower IOR = subtle warping instead of extreme distortion
          chromaticAberration={0.04} 
          clearcoat={1}
          color="#ffffff"
        />
      </RoundedBox>
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Set the canvas background to match the slate-50 color to prevent black refractions */}
      <color attach="background" args={['#f8fafc']} />
      <Environment preset="city" /> 
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere position={[-4, 2, -2]} args={[1.2, 32, 32]}>
          <meshStandardMaterial color="#fef08a" emissive="#ca8a04" emissiveIntensity={0.6} />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere position={[4, -1.5, -3]} args={[2, 32, 32]}>
          <meshStandardMaterial color="#eab308" emissive="#a16207" emissiveIntensity={0.4} />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text position={[0, 1.5, -1]} fontSize={2.2} color="#ca8a04" fontWeight="bold" letterSpacing={-0.05}>
          Mynee
        </Text>
        <Text position={[0, 0.2, -1]} fontSize={0.35} color="#4b5563" maxWidth={7} textAlign="center">
          Smart Knee Brace Technology & Intelligent Sensing
        </Text>
        <Text position={[0, 2.8, -1]} fontSize={0.2} color="#ca8a04" letterSpacing={0.2}>
          PROJECT IN DEVELOPMENT
        </Text>
      </Float>

      <GlassBackdrop />
    </>
  );
}

// ==========================================
// 3. MAIN PAGE LAYOUT
// ==========================================
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex flex-col items-center bg-slate-50 text-gray-900 overflow-x-hidden min-h-screen">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm py-4 saturate-200" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center gap-8">
          <div className="text-2xl font-black text-yellow-600 tracking-tighter">MYNEE</div>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-yellow-600">Home</a>
            <a href="#vision" className="hover:text-yellow-600">Vision</a>
            <a href="#telemetry" className="hover:text-yellow-600">Telemetry</a>
            <a href="#hardware" className="hover:text-yellow-600">Hardware</a>
            <button className="ml-2 px-6 py-2 bg-yellow-500 text-white rounded-full">Dev Log</button>
          </div>
        </div>
      </nav>

      {/* 3D HERO CANVAS */}
      <div className="relative w-full h-screen overflow-hidden bg-slate-50">
        
        {/* --- DECOUPLED HTML SEARCH BAR --- */}
        {/* This floats precisely over the 3D glass in the background so it never resizes strangely */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-full max-w-2xl px-4">
          <div className="relative w-full flex items-center group">
            <input 
              type="text" 
              placeholder="Search telemetry, hardware..." 
              className="w-full py-4 pl-8 pr-16 bg-white/10 rounded-full text-lg font-bold text-gray-800 placeholder-gray-800/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all shadow-lg"
            />
            <svg className="absolute right-6 w-6 h-6 text-gray-800 group-hover:text-yellow-500 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full z-0">
          <Scene />
        </Canvas>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 pointer-events-none z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
        </div>
      </div>

      {/* HTML CONTENT BLOCK */}
      <div className="relative w-full bg-slate-50 z-10 flex flex-col items-center">
        
        {/* VISION SECTION */}
        <motion.div id="vision" className="w-full max-w-6xl py-32 px-12 border-t border-gray-100" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h3 className="text-5xl font-black text-gray-800 tracking-tight leading-none">Engineering for the <span className="text-yellow-500">Human Form.</span></h3>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                Combining 3D-printed lightweight structures with flexible sensor arrays. Our prototype focuses on the pivot point of the knee, ensuring zero restriction in natural gait.
              </p>
              <div className="grid grid-cols-1 gap-4">
                 {['Ergonomic 3D Mesh Housing', 'Breathable Bio-compatible Material', 'Low-Latency Bluetooth 5.0'].map((item) => (
                   <div key={item} className="flex items-center gap-4 text-gray-700 font-medium">
                     <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">✓</div>
                     {item}
                   </div>
                 ))}
              </div>
            </div>
            <div className="aspect-video bg-white rounded-[40px] shadow-2xl border border-gray-100 flex items-center justify-center text-gray-300 font-mono text-xs uppercase tracking-widest p-12 text-center overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02]">
               <video src="/prototype.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover relative z-10" />
               <span className="absolute z-0">Prototype Visual</span>
            </div>
          </div>
        </motion.div>

        {/* TELEMETRY DASHBOARD */}
        <motion.div id="telemetry" className="w-full max-w-5xl py-20 px-8 flex flex-col items-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-3xl font-bold mb-2 text-gray-800 text-center">Live Telemetry Simulation</h3>
          <p className="text-gray-500 mb-16 text-center">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</p>
          <TelemetrySection />
        </motion.div>

        {/* CORE ENGINEERING */}
        <motion.div id="hardware" className="w-full max-w-5xl py-32 px-8 mb-10" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Core Engineering</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Microcontroller', 'Flex Sensors', 'IMU Module', 'Software'].map((tech, i) => (
              <div key={tech} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300">
                <p className="font-bold text-gray-800">{tech}</p>
                <p className="text-xs text-gray-500 mt-2 font-mono">{['ESP32', 'Analog', 'MPU6050', 'C++/Python'][i]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer className="w-full py-20 bg-white border-t border-gray-100 text-center">
          <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Mynee Smart Tech. Developed by Syed Arzanish.</p>
        </footer>

      </div>
    </main>
  );
}