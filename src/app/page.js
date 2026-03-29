"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Text, Environment, TorusKnot, Icosahedron, RoundedBox, Sparkles, Html } from "@react-three/drei";

// ==========================================
// 1. ISOLATED 60FPS TELEMETRY COMPONENT 
// ==========================================
function TelemetrySection() {
  const [sensorData, setSensorData] = useState({ flexionAngle: "120.0", gForce: "0.00", strainLevel: "50.0" });

  useEffect(() => {
    let animationFrameId;
    let tick = 0;
    
    const renderLoop = () => {
      tick += 0.05; 
      
      const flex = (Math.cos(tick) * 60 + 60); 
      const impact = (Math.sin(tick * 0.8) * 1.5 + 1.5);
      const strain = (Math.sin(tick * 1.2) * 50 + 50);

      setSensorData({
        flexionAngle: flex.toFixed(1),
        gForce: impact.toFixed(2),
        strainLevel: strain.toFixed(1),
      });
      
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    
    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const getDynamicColor = (val, max) => {
    const ratio = parseFloat(val) / max;
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
      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50 hover:border-yellow-400 transition-colors duration-500 group">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Flexion Angle</h4>
        <div className="flex items-baseline gap-2 mb-6">
          <span className={`text-6xl font-black ${flexColors.text} tabular-nums`}>{sensorData.flexionAngle}</span>
          <span className="text-xl font-bold text-gray-300 mb-1">°</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className={`h-full rounded-full ${flexColors.bg}`} style={{ width: `${(parseFloat(sensorData.flexionAngle) / 120) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50 hover:border-yellow-400 transition-colors duration-500 group">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Impact Force (IMU)</h4>
        <div className="flex items-baseline gap-2 mb-6">
          <span className={`text-6xl font-black ${impactColors.text} tabular-nums`}>{sensorData.gForce}</span>
          <span className="text-xl font-bold text-gray-300 mb-1">G</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className={`h-full rounded-full ${impactColors.bg}`} style={{ width: `${(parseFloat(sensorData.gForce) / 3) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-50 hover:border-yellow-400 transition-colors duration-500 group">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Material Strain</h4>
        <div className="flex items-baseline gap-2 mb-6">
          <span className={`text-6xl font-black ${strainColors.text} tabular-nums`}>{sensorData.strainLevel}</span>
          <span className="text-xl font-bold text-gray-300 mb-1">%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className={`h-full rounded-full ${strainColors.bg}`} style={{ width: `${parseFloat(sensorData.strainLevel)}%` }}></div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. HIGH-END 3D WEBGL SCENE
// ==========================================
function GlidingGlassSearchBar() {
  const glassRef = useRef();
  const isFocused = useRef(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    let targetX = 0;
    let targetY = -0.5;

    // If the user isn't typing in it, let it glide beautifully across the screen
    if (!isFocused.current) {
      targetX = Math.sin(t * 0.4) * 3.5; // Glides left and right
      targetY = Math.sin(t * 0.7) * 1.5; // Glides up and down
    }

    // Smoothly animate the glass to its target position
    glassRef.current.position.x += (targetX - glassRef.current.position.x) * 0.05;
    glassRef.current.position.y += (targetY - glassRef.current.position.y) * 0.05;

    // Give it a subtle, continuous 3D tilt
    glassRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    glassRef.current.rotation.y = Math.cos(t * 0.5) * 0.1;
  });

  return (
    <group ref={glassRef} position={[0, -0.5, 2.5]}>
      {/* 3D Glass Pill */}
      <RoundedBox args={[5.5, 0.85, 0.1]} radius={0.4} smoothness={16}>
        <MeshTransmissionMaterial 
          transmission={1} 
          roughness={0.02} 
          thickness={1.5} // High thickness creates the heavy prism distortion
          ior={1.3}       // Real-world glass refraction index
          chromaticAberration={0.06} // Splits edges into RGB
          clearcoat={1}
          color="#ffffff"
        />
      </RoundedBox>

      {/* The Fix: Using `center` instead of `transform`. 
        This perfectly syncs the HTML input to the 3D glass, but prevents 
        it from resizing into a giant billboard! 
      */}
      <Html center zIndexRange={[100, 0]}>
        <div className="w-[450px] flex items-center pointer-events-auto group">
          <input 
            type="text" 
            placeholder="" // Empty as requested!
            onFocus={() => (isFocused.current = true)}
            onBlur={() => (isFocused.current = false)}
            className="w-full py-3.5 pl-6 pr-14 bg-white/5 border border-white/20 rounded-full text-base font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-sm"
          />
          <svg className="absolute right-5 w-5 h-5 text-gray-400 group-hover:text-yellow-600 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </Html>
    </group>
  );
}

function TechScene() {
  return (
    <>
      <color attach="background" args={['#fafafa']} />
      <Environment preset="city" /> 

      <Sparkles count={100} scale={12} size={1.5} speed={0.4} opacity={0.2} color="#ca8a04" />
      
      {/* Background Geometries for the glass to refract */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <TorusKnot position={[-4, 1.5, -3]} args={[1.2, 0.3, 128, 16]}>
          <meshStandardMaterial color="#fef08a" metalness={0.8} roughness={0.2} wireframe={true} opacity={0.3} transparent />
        </TorusKnot>
      </Float>
      
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <Icosahedron position={[3.5, -1.5, -4]} args={[1.8, 0]}>
          <meshStandardMaterial color="#eab308" metalness={0.5} roughness={0.1} />
        </Icosahedron>
      </Float>

      {/* The 3D Mynee Text */}
      <Float speed={1} rotationIntensity={0.02} floatIntensity={0.1}>
        <Text position={[0, 1.4, -1]} fontSize={2.5} color="#ca8a04" fontWeight="900" letterSpacing={-0.08}>
          Mynee
        </Text>
        <Text position={[0, 0.3, -1]} fontSize={0.3} color="#6b7280" maxWidth={6} textAlign="center" fontWeight="500">
          Smart Knee Brace Technology & Intelligent Sensing
        </Text>
        <Text position={[0, 2.6, -1]} fontSize={0.18} color="#a16207" letterSpacing={0.3} fontWeight="bold">
          PROJECT IN DEVELOPMENT
        </Text>
      </Float>

      {/* The Gliding Glass component we built above */}
      <GlidingGlassSearchBar />
    </>
  );
}

// ==========================================
// 3. MAIN PAGE ARCHITECTURE
// ==========================================
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex flex-col items-center bg-slate-50 text-gray-900 overflow-x-hidden min-h-screen font-sans">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm py-4 saturate-150" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center gap-8">
          <div className="text-2xl font-black text-yellow-600 tracking-tighter">MYNEE</div>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-yellow-600 transition-colors">Home</a>
            <a href="#vision" className="hover:text-yellow-600 transition-colors">Vision</a>
            <a href="#telemetry" className="hover:text-yellow-600 transition-colors">Telemetry</a>
            <a href="#hardware" className="hover:text-yellow-600 transition-colors">Hardware</a>
            <button className="ml-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full transition-all shadow-[0_4px_14px_rgba(234,179,8,0.3)]">Dev Log</button>
          </div>
        </div>
      </nav>

      {/* WEBGL HERO */}
      <div className="relative w-full h-screen overflow-hidden">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} className="w-full h-full">
          <TechScene />
        </Canvas>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 pointer-events-none animate-pulse">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-800 mb-3">Scroll</span>
          <div className="w-[1.5px] h-10 bg-gradient-to-b from-gray-800 to-transparent"></div>
        </div>
      </div>

      {/* HTML CONTENT BELOW HERO */}
      <div className="relative w-full bg-slate-50 z-10 flex flex-col items-center">
        
        {/* VISION */}
        <motion.div id="vision" className="w-full max-w-6xl py-32 px-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h3 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tighter leading-[1.1]">Engineering for the <span className="text-yellow-500">Human Form.</span></h3>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                Combining 3D-printed lightweight structures with flexible sensor arrays. Our prototype focuses on the pivot point of the knee, ensuring zero restriction in natural gait.
              </p>
              <div className="grid grid-cols-1 gap-5 mt-8">
                 {['Ergonomic 3D Mesh Housing', 'Breathable Bio-compatible Material', 'Low-Latency Bluetooth 5.0'].map((item) => (
                   <div key={item} className="flex items-center gap-4 text-gray-700 font-semibold text-sm uppercase tracking-wide">
                     <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm font-bold">✓</div>
                     {item}
                   </div>
                 ))}
              </div>
            </div>
            <div className="aspect-video bg-gray-100 rounded-[40px] shadow-2xl flex items-center justify-center text-gray-300 font-mono text-xs uppercase tracking-widest p-12 text-center overflow-hidden relative group">
               <video src="/prototype.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover relative z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
               <span className="absolute z-0">Prototype Visual</span>
            </div>
          </div>
        </motion.div>

        {/* TELEMETRY */}
        <motion.div id="telemetry" className="w-full max-w-6xl py-24 px-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="flex flex-col items-center text-center mb-16">
            <h3 className="text-4xl font-black mb-4 text-gray-800 tracking-tight">Live Telemetry Simulation</h3>
            <p className="text-gray-500 max-w-2xl font-light text-lg">Real-time dynamic data streaming simulated directly from the IMU and Flex sensor arrays.</p>
          </div>
          <TelemetrySection />
        </motion.div>

        {/* HARDWARE */}
        <motion.div id="hardware" className="w-full max-w-5xl py-32 px-12 mb-10 border-t border-gray-200/50 mt-10" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-3xl font-black mb-16 text-center text-gray-800 tracking-tight">Core Architecture</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {['Microcontroller', 'Flex Sensors', 'IMU Module', 'Software'].map((tech, i) => (
              <div key={tech} className="p-8 bg-white border border-gray-100 rounded-[30px] hover:border-yellow-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-10 h-10 mx-auto bg-slate-50 rounded-full mb-4 flex items-center justify-center group-hover:bg-yellow-50 transition-colors">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <p className="font-bold text-gray-800 mb-1">{tech}</p>
                <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{['ESP32', 'Analog', 'MPU6050', 'C++/Python'][i]}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FOOTER */}
        <footer className="w-full py-16 bg-white border-t border-gray-100 flex flex-col items-center">
          <div className="text-2xl font-black text-yellow-600 mb-2 tracking-tighter">MYNEE</div>
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">© 2026 Syed Arzanish.</p>
        </footer>

      </div>
    </main>
  );
}