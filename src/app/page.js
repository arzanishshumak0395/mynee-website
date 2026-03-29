"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Text, Environment, Sphere, Html } from "@react-three/drei";

// --- 3D PRISM SEARCH BAR COMPONENT ---
function GlassSearchBar() {
  const glassRef = useRef();

  // Make the glass tilt slightly based on mouse movement
  useFrame((state) => {
    glassRef.current.rotation.x = state.mouse.y * 0.1;
    glassRef.current.rotation.y = state.mouse.x * 0.1;
  });

  return (
    <group position={[0, 0, 2]}>
      <mesh ref={glassRef} rotation={[0, 0, Math.PI / 2]}>
        {/* The Capsule shape (Radius, Length, Cap Segments, Radial Segments) */}
        <capsuleGeometry args={[0.7, 5, 32, 64]} />
        {/* The insanely complex physics material that creates true optical refraction */}
        <MeshTransmissionMaterial 
          backside
          thickness={1.5} 
          roughness={0.05} 
          transmission={1} 
          ior={1.4} // Index of Refraction (Glass is ~1.5)
          chromaticAberration={0.08} // Splits light into RGB rainbow edges!
          distortion={0.2}
          distortionScale={0.5}
        />
      </mesh>
      
      {/* We layer an invisible, clickable HTML input perfectly over the 3D glass */}
      <Html transform center position={[0, 0, 0.8]}>
        <div className="relative w-[500px] flex items-center group pointer-events-auto">
          <input 
            type="text" 
            placeholder="Search telemetry, hardware..." 
            className="w-full py-4 pl-8 pr-16 bg-transparent rounded-full text-lg font-bold text-gray-800 placeholder-gray-800/50 focus:outline-none transition-all"
          />
          <svg className="absolute right-6 w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </Html>
    </group>
  );
}

// --- 3D BACKGROUND SCENE ---
function Scene() {
  return (
    <>
      <Environment preset="city" /> {/* Lighting for the glass */}
      
      {/* Floating 3D Orbs */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[-4, 2, -2]} args={[1.5, 32, 32]}>
          <meshBasicMaterial color="#fef08a" transparent opacity={0.8} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[4, -2, -4]} args={[2.5, 32, 32]}>
          <meshBasicMaterial color="#eab308" transparent opacity={0.6} />
        </Sphere>
      </Float>

      {/* 3D Background Text to be refracted */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text position={[0, 1.5, -1]} fontSize={2} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" color="#1f2937" fontWeight={900} letterSpacing={-0.05}>
          Mynee
        </Text>
        <Text position={[0, 0, -1]} fontSize={0.4} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" color="#4b5563" maxWidth={6} textAlign="center">
          Smart Knee Brace Technology & Intelligent Sensing
        </Text>
      </Float>

      <GlassSearchBar />
    </>
  );
}


// --- MAIN PAGE (Combining 3D Hero and HTML Telemetry) ---
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  
  const [sensorData, setSensorData] = useState({
    flexionAngle: 120,
    gForce: "0.00",    
    strainLevel: 50,  
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.04; 
      setSensorData({
        flexionAngle: Math.floor(((Math.cos(t) + 1) / 2) * 120),
        gForce: (((-Math.cos(t) + 1) / 2) * 3.0).toFixed(2),
        strainLevel: Math.floor(((Math.sin(t) + 1) / 2) * 100),
      });
    }, 50); 
    return () => clearInterval(interval);
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
    <main className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 overflow-x-hidden">
      
      {/* HTML NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/30 backdrop-blur-xl border-b border-white/40 shadow-sm py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center">
          <div className="text-2xl font-black text-yellow-600 tracking-tighter">MYNEE</div>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-yellow-600">Home</a>
            <a href="#vision" className="hover:text-yellow-600">Vision</a>
            <a href="#telemetry" className="hover:text-yellow-600">Telemetry</a>
            <button className="px-6 py-2 bg-yellow-500 text-white rounded-full">Dev Log</button>
          </div>
        </div>
      </nav>

      {/* --- THE WEBGL HERO SECTION --- */}
      <div className="relative w-full h-screen bg-slate-50">
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
          <Scene />
        </Canvas>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-xs font-bold uppercase tracking-widest animate-bounce pointer-events-none">
          Scroll Down
        </div>
      </div>

      {/* --- HTML TELEMETRY SECTION --- */}
      <div id="telemetry" className="z-10 w-full max-w-5xl py-32 px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black mb-4 text-gray-800">Live Telemetry Simulation</h3>
          <p className="text-gray-500">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flexion Angle */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Flexion Angle</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black transition-colors duration-[400ms] ${flexColors.text}`}>{sensorData.flexionAngle}°</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={`h-3 rounded-full transition-all duration-[400ms] ease-out ${flexColors.bg}`} style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}></div>
            </div>
          </div>

          {/* Impact Force */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Impact Force (IMU)</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black transition-colors duration-[400ms] ${impactColors.text}`}>{sensorData.gForce}</span>
              <span className="text-xl font-bold text-gray-400 mb-1">G</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={`h-3 rounded-full transition-all duration-[400ms] ease-out ${impactColors.bg}`} style={{ width: `${(sensorData.gForce / 3) * 100}%` }}></div>
            </div>
          </div>

          {/* Material Strain */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Material Strain</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black transition-colors duration-[400ms] ${strainColors.text}`}>{sensorData.strainLevel}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div className={`h-3 rounded-full transition-all duration-[400ms] ease-out ${strainColors.bg}`} style={{ width: `${sensorData.strainLevel}%` }}></div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}