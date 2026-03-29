"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  
  // State for our fake "Live Sensor Data"
  const [sensorData, setSensorData] = useState({
    flexionAngle: 45,
    gForce: 1.0,
    strainLevel: 20,
  });

  // Handle Scroll for Navbar effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track mouse movement
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Simulate incoming data from the ESP32/Sensors every 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        flexionAngle: Math.floor(Math.random() * (120 - 10 + 1) + 10),
        gForce: (Math.random() * (2.5 - 0.8) + 0.8).toFixed(2),
        strainLevel: Math.floor(Math.random() * (80 - 10 + 1) + 10),
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 overflow-x-hidden"
    >
      {/* --- FIXED NAVIGATION MENU --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-6xl mx-auto px-8 flex justify-between items-center">
          <div className="text-2xl font-black text-yellow-600 tracking-tighter">MYNEE</div>
          <div className="hidden md:flex gap-8 items-center text-sm font-bold text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-yellow-500 transition-colors">Home</a>
            <a href="#vision" className="hover:text-yellow-500 transition-colors">Vision</a>
            <a href="#telemetry" className="hover:text-yellow-500 transition-colors">Telemetry</a>
            <a href="#hardware" className="hover:text-yellow-500 transition-colors">Hardware</a>
            <button className="px-5 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all shadow-lg shadow-yellow-500/20">Dev Log</button>
          </div>
        </div>
      </nav>

      {/* --- INTERACTIVE PARALLAX ORBS (BACKGROUND) --- */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)` }}
      />
      <div 
        className="absolute bottom-40 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)` }}
      />

      {/* --- THE SMOOTH SPOTLIGHT EFFECT (PULSING & LAGGING) --- */}
      <div 
        className="pointer-events-none fixed z-0 transition-all duration-1000 ease-out animate-pulse" 
        style={{
          width: "400px",
          height: "400px",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(209, 223, 102, 0.75) 0%, transparent 70%)"
        }}
      />

      {/* --- HERO SECTION --- */}
      <div className="z-10 min-h-screen w-full max-w-5xl flex flex-col items-center justify-center font-sans p-8 md:p-24 text-center">
        <div className="inline-block mb-6 px-5 py-1.5 rounded-full bg-yellow-100/50 border border-yellow-200 text-yellow-700 text-[10px] font-bold tracking-[0.3em] uppercase animate-bounce">
          Project In Development
        </div>
        <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-600">
            Mynee
          </span>
        </h1>
        <h2 className="text-xl md:text-2xl mb-8 text-gray-500 font-light tracking-wide max-w-3xl">
          Smart Knee Brace Technology & Intelligent Sensing
        </h2>
        <p className="text-base md:text-lg max-w-xl mx-auto mb-12 text-gray-400 leading-relaxed font-light">
          A device designed to provide real-time monitoring and physical support to improve daily mobility.
        </p>
        <button className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full font-bold transition-all shadow-[0_20px_40px_rgba(234,179,8,0.3)] hover:scale-105 active:scale-95">
          Explore Hardware
        </button>
      </div>

      {/* --- VISION & PROTOTYPE SECTION --- */}
      <div id="vision" className="z-10 w-full max-w-6xl py-32 px-12 border-t border-gray-100">
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
          {/* VIDEO / IMAGE CONTAINER */}
          <div className="aspect-video bg-white rounded-[40px] shadow-2xl border border-gray-100 flex items-center justify-center text-gray-300 font-mono text-xs uppercase tracking-widest p-12 text-center overflow-hidden relative group transition-transform duration-500 hover:scale-[1.02]">
             <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-transparent transition-all"></div>
             <video src="/prototype.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
             {/* Fallback text if video doesn't load */}
             <span className="absolute">Prototype Visual</span>
          </div>
        </div>
      </div>

      {/* --- TELEMETRY DASHBOARD (RESTORED COLORS) --- */}
      <div id="telemetry" className="z-10 w-full max-w-5xl py-32 px-8">
        <div className="text-center mb-16">
            <h3 className="text-4xl font-black mb-4 text-gray-800">Live Telemetry</h3>
            <p className="text-gray-400 font-light">Real-time data streaming from on-board sensors.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Flexion Angle Card */}
          <div className="bg-white p-10 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 hover:border-yellow-400 transition-all duration-500">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Flexion Angle</h4>
            <div className="text-7xl font-black text-gray-800 mb-6">{sensorData.flexionAngle}<span className="text-xl text-gray-300 ml-1 font-light">°</span></div>
            <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full transition-all duration-700 ease-out" 
                style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Impact Force Card (With Red High-G Alert) */}
          <div className="bg-white p-10 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 hover:border-yellow-400 transition-all duration-500">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Impact Force</h4>
            <div className="text-7xl font-black text-gray-800 mb-6">{sensorData.gForce}<span className="text-xl text-gray-300 ml-1 font-light">G</span></div>
            <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ease-out ${sensorData.gForce > 2.0 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-green-400'}`} 
                style={{ width: `${(sensorData.gForce / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Material Strain Card */}
          <div className="bg-white p-10 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-yellow-400 transition-all duration-500">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Material Strain</h4>
            <div className="text-7xl font-black text-gray-800 mb-6">{sensorData.strainLevel}<span className="text-xl text-gray-300 ml-1 font-light">%</span></div>
            <div className="w-full bg-gray-50 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-yellow-400 h-full transition-all duration-700 ease-out" 
                style={{ width: `${sensorData.strainLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CORE ENGINEERING --- */}
      <div id="hardware" className="z-10 w-full max-w-5xl py-32 px-8 mb-10">
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Core Engineering</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {['Microcontroller', 'Flex Sensors', 'IMU Module', 'Software'].map((tech, i) => (
            <div key={tech} className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300">
              <p className="font-bold text-gray-800">{tech}</p>
              <p className="text-xs text-gray-500 mt-2 font-mono">{['ESP32', 'Analog', 'MPU6050', 'C++/Python'][i]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="z-10 w-full py-20 bg-white border-t border-gray-100 text-center">
        <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Mynee Smart Tech. Developed by Syed Arzanish.</p>
      </footer>
    </main>
  );
}