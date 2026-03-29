"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Text, Environment, Sphere, Html } from "@react-three/drei";

// --- ANIMATION VARIANTS ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// ==========================================
// 1. WEBGL 3D COMPONENTS
// ==========================================

function GlassSearchBar() {
  const glassRef = useRef();

  // Subtly tilt the physical glass based on mouse movement
  useFrame((state) => {
    glassRef.current.rotation.x = state.mouse.y * 0.15;
    glassRef.current.rotation.y = state.mouse.x * 0.15;
  });

  return (
    <group position={[0, -0.5, 2]}>
      {/* The 3D Glass Object */}
      <mesh ref={glassRef} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.5, 6, 32, 64]} />
        <MeshTransmissionMaterial 
          backside
          thickness={2.5} 
          roughness={0.02} 
          transmission={1} 
          ior={1.3} // Index of Refraction (Bends the light)
          chromaticAberration={0.06} // RGB edge splitting
          distortion={0.1}
          distortionScale={0.2}
          color="#ffffff"
        />
      </mesh>
      
      {/* The interactive HTML input projected onto the 3D glass */}
      <Html transform center position={[0, 0, 0.6]} scale={0.9}>
        <div className="w-[600px] flex items-center pointer-events-auto">
          <input 
            type="text" 
            placeholder="Search telemetry, hardware..." 
            className="w-full py-4 pl-10 pr-16 bg-transparent rounded-full text-xl font-medium text-gray-900 placeholder-gray-800/60 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          />
          <svg className="absolute right-6 w-7 h-7 text-gray-800 hover:text-yellow-500 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </Html>
    </group>
  );
}

function Scene() {
  return (
    <>
      <Environment preset="city" /> {/* Real-world lighting reflections for the glass */}
      
      {/* 3D Background Elements to be refracted */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[-5, 2, -3]} args={[1.5, 32, 32]}>
          <meshStandardMaterial color="#fef08a" emissive="#ca8a04" emissiveIntensity={0.5} />
        </Sphere>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[4, -2, -5]} args={[2.5, 32, 32]}>
          <meshStandardMaterial color="#eab308" emissive="#a16207" emissiveIntensity={0.2} />
        </Sphere>
      </Float>

      {/* 3D Text */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text 
          position={[0, 1.2, -1]} 
          fontSize={2.5} 
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" 
          color="#1f2937" 
          fontWeight={900} 
          letterSpacing={-0.05}
        >
          Mynee
        </Text>
        <Text 
          position={[0, -0.2, -1]} 
          fontSize={0.4} 
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" 
          color="#6b7280" 
          maxWidth={7} 
          textAlign="center"
        >
          Smart Knee Brace Technology & Intelligent Sensing
        </Text>
        {/* Development Badge */}
        <Text position={[0, 2.8, -1]} fontSize={0.2} color="#ca8a04" letterSpacing={0.2}>
          PROJECT IN DEVELOPMENT
        </Text>
      </Float>

      <GlassSearchBar />
    </>
  );
}

// ==========================================
// 2. MAIN PAGE LAYOUT
// ==========================================

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  const [sensorData, setSensorData] = useState({
    flexionAngle: 120,
    gForce: "0.00",    
    strainLevel: 50,  
  });

  // Nav scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- SMOOTH SINE WAVE TELEMETRY ENGINE ---
  useEffect(() => {
    let tick = 0;
    const speed = 0.04; 
    
    const interval = setInterval(() => {
      tick += speed; 
      const flexVal = ((Math.cos(tick) + 1) / 2) * 120; 
      const impactVal = ((-Math.cos(tick) + 1) / 2) * 3.0; 
      const strainVal = ((Math.sin(tick) + 1) / 2) * 100;

      setSensorData({
        flexionAngle: Math.floor(flexVal),
        gForce: impactVal.toFixed(2),
        strainLevel: Math.floor(strainVal),
      });
    }, 50); 
    return () => clearInterval(interval);
  }, []);

  // --- DYNAMIC COLOR LOGIC ---
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
    <main className="relative flex flex-col items-center bg-slate-50 text-gray-900 overflow-x-hidden min-h-screen">
      
      {/* --- FIXED NAVIGATION MENU --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/50 backdrop-blur-xl border-b border-white/40 shadow-sm py-4 saturate-200" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center gap-8">
          <div className="text-2xl font-black text-yellow-600 tracking-tighter shrink-0 cursor-pointer">MYNEE</div>
          
          <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em] shrink-0">
            <a href="#" className="hover:text-yellow-600 transition-colors">Home</a>
            <a href="#vision" className="hover:text-yellow-600 transition-colors">Vision</a>
            <a href="#telemetry" className="hover:text-yellow-600 transition-colors">Telemetry</a>
            <a href="#hardware" className="hover:text-yellow-600 transition-colors">Hardware</a>
            <button className="ml-2 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20">Dev Log</button>
          </div>
        </div>
      </nav>

      {/* --- SECTION 1: THE WEBGL 3D HERO (Trapped in exactly 100vh) --- */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Subtle radial gradient background behind the 3D canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full">
          <Scene />
        </Canvas>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
        </div>
      </div>

      {/* --- SECTION 2: THE HTML CONTENT (Sits safely below the 3D Canvas) --- */}
      <div className="relative w-full bg-slate-50 z-10 flex flex-col items-center">
        
        {/* --- VISION & PROTOTYPE SECTION --- */}
        <motion.div 
          id="vision" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full max-w-6xl py-32 px-12 border-t border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <motion.h3 variants={fadeUpVariant} className="text-5xl font-black text-gray-800 tracking-tight leading-none">Engineering for the <span className="text-yellow-500">Human Form.</span></motion.h3>
              <motion.p variants={fadeUpVariant} className="text-gray-500 text-lg leading-relaxed font-light">
                Combining 3D-printed lightweight structures with flexible sensor arrays. Our prototype focuses on the pivot point of the knee, ensuring zero restriction in natural gait.
              </motion.p>
              <motion.div variants={fadeUpVariant} className="grid grid-cols-1 gap-4">
                 {['Ergonomic 3D Mesh Housing', 'Breathable Bio-compatible Material', 'Low-Latency Bluetooth 5.0'].map((item) => (
                   <div key={item} className="flex items-center gap-4 text-gray-700 font-medium">
                     <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">✓</div>
                     {item}
                   </div>
                 ))}
              </motion.div>
            </div>
            <motion.div variants={fadeUpVariant} className="aspect-video bg-white rounded-[40px] shadow-2xl border border-gray-100 flex items-center justify-center text-gray-300 font-mono text-xs uppercase tracking-widest p-12 text-center overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02]">
               <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-transparent transition-all"></div>
               <video src="/prototype.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover relative z-10" />
               <span className="absolute z-0">Prototype Visual</span>
            </motion.div>
          </div>
        </motion.div>

        {/* --- LIVE TELEMETRY DASHBOARD --- */}
        <motion.div 
          id="telemetry" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full max-w-5xl py-20 px-8"
        >
          <motion.h3 variants={fadeUpVariant} className="text-3xl font-bold mb-2 text-gray-800 text-center">Live Telemetry Simulation</motion.h3>
          <motion.p variants={fadeUpVariant} className="text-gray-500 mb-16 text-center">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={fadeUpVariant} className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-yellow-400 transition-colors">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Flexion Angle</h4>
              <div className="flex items-end gap-2 mb-6">
                <span className={`text-7xl font-black ${flexColors.text}`}>{sensorData.flexionAngle}°</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full ${flexColors.bg}`} style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-yellow-400 transition-colors">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Impact Force (IMU)</h4>
              <div className="flex items-end gap-2 mb-6">
                <span className={`text-7xl font-black ${impactColors.text}`}>{sensorData.gForce}</span>
                <span className="text-xl font-bold text-gray-400 mb-2">G</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full ${impactColors.bg}`} style={{ width: `${(sensorData.gForce / 3) * 100}%` }}></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant} className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-yellow-400 transition-colors">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Material Strain</h4>
              <div className="flex items-end gap-2 mb-6">
                <span className={`text-7xl font-black ${strainColors.text}`}>{sensorData.strainLevel}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className={`h-2 rounded-full ${strainColors.bg}`} style={{ width: `${sensorData.strainLevel}%` }}></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* --- CORE ENGINEERING --- */}
        <motion.div 
          id="hardware" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="w-full max-w-5xl py-32 px-8 mb-10"
        >
          <motion.h3 variants={fadeUpVariant} className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Core Engineering</motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['Microcontroller', 'Flex Sensors', 'IMU Module', 'Software'].map((tech, i) => (
              <motion.div key={tech} variants={fadeUpVariant} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300">
                <p className="font-bold text-gray-800">{tech}</p>
                <p className="text-xs text-gray-500 mt-2 font-mono">{['ESP32', 'Analog', 'MPU6050', 'C++/Python'][i]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- FOOTER --- */}
        <footer className="w-full py-20 bg-white border-t border-gray-100 text-center">
          <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Mynee Smart Tech. Developed by Syed Arzanish.</p>
        </footer>

      </div>
    </main>
  );
}