"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // State for our fake "Live Sensor Data"
  const [sensorData, setSensorData] = useState({
    flexionAngle: 45,
    gForce: 1.0,
    strainLevel: 20,
  });

  // Track mouse movement
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Simulate incoming data from the ESP32/Sensors every 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        flexionAngle: Math.floor(Math.random() * (120 - 10 + 1) + 10), // Random angle between 10 and 120 degrees
        gForce: (Math.random() * (2.5 - 0.8) + 0.8).toFixed(2), // Random G-force between 0.8 and 2.5
        strainLevel: Math.floor(Math.random() * (80 - 10 + 1) + 10), // Random strain %
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center bg-slate-50 text-gray-900 overflow-x-hidden"
    >
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

      {/* --- LIVE TELEMETRY DASHBOARD (NEW!) --- */}
      <div className="z-10 w-full max-w-5xl py-20 px-8">
        <h3 className="text-3xl font-bold mb-2 text-gray-800">Live Telemetry Simulation</h3>
        <p className="text-gray-500 mb-8">Real-time data streaming capabilities from the on-board IMU and Flex sensors.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Angle Sensor */}
          <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Flexion Angle</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-black text-yellow-500">{sensorData.flexionAngle}°</span>
            </div>
            {/* Animated Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-3 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${(sensorData.flexionAngle / 120) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* IMU Acceleration */}
          <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Impact Force (IMU)</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-black text-gray-800">{sensorData.gForce}</span>
              <span className="text-xl font-bold text-gray-400 mb-1">G</span>
            </div>
            {/* Animated Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-700 ease-out ${sensorData.gForce > 2.0 ? 'bg-red-400' : 'bg-green-400'}`} 
                style={{ width: `${(sensorData.gForce / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Strain Sensor */}
          <div className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-yellow-400 transition-colors">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Material Strain</h4>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-black text-yellow-600">{sensorData.strainLevel}%</span>
            </div>
            {/* Animated Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-yellow-400 h-3 rounded-full transition-all duration-700 ease-out" 
                style={{ width: `${sensorData.strainLevel}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- THE PROBLEM & SOLUTION SECTION --- */}
      <div className="z-10 w-full max-w-5xl py-20 px-8">
        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">Tackling Mobility Challenges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">1</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">The Challenge</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Joint degradation causes unpredictable pain. Traditional braces offer static support but lack dynamic monitoring and adaptability.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">2</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">Intelligent Sensing</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Embedded sensors track gait, joint angle, and strain in real-time, providing actionable data to prevent overexertion before pain sets in.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-yellow-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-300 group">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-black text-xl mb-6 group-hover:scale-110 transition-transform">3</div>
            <h4 className="text-xl font-bold mb-3 text-gray-800">Active Support</h4>
            <p className="text-gray-500 text-sm leading-relaxed">A lightweight, ergonomic design ensures all-day comfort while the smart modules work silently in the background to analyze movement patterns.</p>
          </div>
        </div>
      </div>

      {/* --- HARDWARE & TECH STACK SECTION --- */}
      <div className="z-10 w-full max-w-5xl py-20 px-8 mb-10">
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

    </main>
  );
}