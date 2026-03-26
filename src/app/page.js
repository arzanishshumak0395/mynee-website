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
            <button className="px-5 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-all">Dev Log</button>
          </div>
        </div>
      </nav>

      {/* --- INTERACTIVE PARALLAX ORBS --- */}
      <div 
        className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)` }}
      />
      <div 
        className="absolute bottom-40 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)` }}
      />

      {/* --- THE SMOOTH SPOTLIGHT EFFECT --- */}
      <div 
        className="pointer-events-none fixed z-0 transition-all duration-500 ease-out"
        style={{
          width: "800px",
          height: "800px",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)"
        }}
      />

      {/* --- HERO SECTION --- */}
      <div className="z-10 min-h-screen w-full max-w-5xl flex flex-col items-center justify-center font-sans p-8 md:p-24">
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-700 text-sm font-bold tracking-widest uppercase animate-bounce">
          Project In Development
        </div>
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-center tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-400">
            Mynee
          </span>
        </h1>
        <h2 className="text-xl md:text-3xl text-center mb-6 text-gray-600 font-medium">
          Smart Knee Brace Technology & Intelligent Sensing
        </h2>
        <p className="text-center text-base md:text-lg max-w-2xl mx-auto mb-10 text-gray-500 leading-relaxed">
          A device designed to provide real-time monitoring, physical support, and actionable insights to improve daily mobility without compromising comfort.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:scale-105">
            Explore the Hardware
          </button>
        </div>
      </div>

      {/* --- VISION & PROTOTYPE IMAGES (NEW!) --- */}
      <div id="vision" className="z-10 w-full max-w-6xl py-20 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-4xl font-black text-gray-800 tracking-tight">Engineering for the Human Form.</h3>
            <p className="text-gray-500 text-lg">
              Combining 3D-printed lightweight structures with flexible sensor arrays. Our prototype focuses on the pivot point of the knee, ensuring zero restriction in natural gait.
            </p>
            <ul className="space-y-4 font-bold text-gray-700">
              <li className="flex gap-3 items-center"><span className="text-yellow-500">✔</span> Ergonomic 3D Mesh Housing</li>
              <li className="flex gap-3 items-center"><span className="text-yellow-500">✔</span> Breathable Bio-compatible Material</li>
              <li className="flex gap-3 items-center"><span className="text-yellow-500">✔</span> Low-Latency Bluetooth 5.0</li>
            </ul>
          </div>
          {/* PLACEHOLDER FOR IMAGE/VIDEO */}
          <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-2xl relative group border-4 border-white">
            <div className="absolute inset-0 bg-yellow-500/10 group-hover:bg-transparent transition-all"></div>
            <div className="flex items-center justify-center h-full text-gray-400 font-bold italic uppercase tracking-tighter text-2xl">
              [ Insert Prototype Video / Image ]
            </div>
            {/* When you have a file, use: <img src="/mynee-proto.jpg" className="object-cover w-full h-full" /> */}
          </div>
        </div>
      </div>

      {/* --- LIVE TELEMETRY DASHBOARD --- */}
      <div id="telemetry" className="z-10 w-full max-w-5xl py-20 px-8">
        <h3 className="text-3xl font-bold mb-2 text-gray-800">Live Telemetry Simulation</h3>
        <p className="text-gray-500 mb-8">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Flexion Angle</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-black text-yellow-500">{sensorData.flexionAngle}°</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Impact Force (IMU)</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-black text-gray-800">{sensorData.gForce}</span>
              <span className="text-xl font-bold text-gray-400 mb-1">G</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-700 ease-out ${sensorData.gForce > 2.0 ? 'bg-red-400' : 'bg-green-400'}`} 
                style={{ width: `${(sensorData.gForce / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Material Strain</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-black text-yellow-600">{sensorData.strainLevel}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-yellow-400 h-3 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${sensorData.strainLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PROBLEM & SOLUTION --- */}
      <div className="z-10 w-full max-w-5xl py-20 px-8">
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Tackling Mobility Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">1</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">The Challenge</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Joint degradation causes unpredictable pain. Traditional braces lack dynamic monitoring.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">2</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">Intelligent Sensing</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Embedded sensors track gait and joint angle, providing data to prevent overexertion.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">3</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">Active Support</h4>
            <p className="text-gray-500 text-sm leading-relaxed">A lightweight, ergonomic design ensures all-day comfort while analyzing patterns.</p>
          </div>
        </div>
      </div>

      {/* --- CORE ENGINEERING --- */}
      <div id="hardware" className="z-10 w-full max-w-5xl py-20 px-8 mb-10">
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Core Engineering</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300">
            <p className="font-bold text-gray-800">Microcontroller</p>
            <p className="text-xs text-gray-500 mt-2 font-mono">ESP32 / Arduino</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300">
            <p className="font-bold text-gray-800">Flex Sensors</p>
            <p className="text-xs text-gray-500 mt-2 font-mono">Analog Interface</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300">
            <p className="font-bold text-gray-800">IMU Module</p>
            <p className="text-xs text-gray-500 mt-2 font-mono">MPU6050</p>
          </div>
          <div className="p-6 bg-white border border-gray-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-300">
            <p className="font-bold text-gray-800">Software</p>
            <p className="text-xs text-gray-500 mt-2 font-mono">C++ & Python</p>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="z-10 w-full py-10 bg-white border-t border-gray-200 text-center">
        <p className="text-gray-400 text-sm">© 2026 Mynee Smart Tech. Developed by Syed Arzanish.</p>
      </footer>
    </main>
  );
}