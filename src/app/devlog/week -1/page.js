"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// --- ANIMATION VARIANTS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Week1Log() {
  const [scrolled, setScrolled] = useState(false);
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
      {/* NAVIGATION MENU */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm py-4 saturate-150" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex justify-between items-center gap-8">
          <Link href="/" className="text-2xl font-black text-yellow-600 tracking-tighter shrink-0">MYNEE</Link>
          <div className="hidden md:flex gap-8 items-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em] shrink-0">
            <Link href="/" className="hover:text-yellow-600 transition-colors">Home</Link>
            <Link href="/sessions" className="hover:text-yellow-600 transition-colors">Sessions</Link>
            <Link href="/devlog" className="text-yellow-600 transition-colors">Dev Log</Link>
          </div>
        </div>
      </nav>

      {/* MAIN LAYOUT GRID (Sidebar + Content) */}
      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative">
        
        {/* --- LEFT SIDEBAR: 12-WEEK NAVIGATION --- */}
        <aside className="w-56 shrink-0 hidden lg:block">
          <div className="sticky top-32 p-6 bg-white border border-gray-100 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Log Index</h4>
            <div className="flex flex-col gap-3">
              {weeks.map((week) => (
                <Link 
                  key={week} 
                  href={`/devlog/week-${week}`}
                  className={`text-sm font-semibold transition-all flex items-center gap-3 ${
                    week === 1 
                      ? "text-yellow-600 translate-x-2" // Active State styling for Week 1
                      : "text-gray-400 hover:text-gray-800 hover:translate-x-1"
                  }`}
                >
                  {week === 1 && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>}
                  Week {week}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* --- RIGHT COLUMN: BLOG CONTENT --- */}
        <article className="flex-1 max-w-3xl">
          
          {/* Blog Header */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-xs mb-4 block">September 14, 2026</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tight leading-[1.1] mb-6">
              The Genesis: Establishing the Core Architecture.
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              In our first week of the SoC Design module, the primary objective was to finalize the hardware schematic and validate the IMU sensor constraints.
            </p>
          </motion.div>

          {/* Blog Paragraph 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16">
            <p>
              The human knee is a complex hinge joint. To properly track its flexion and extension without restricting the user's natural gait, we realized that rigid PCBs would not suffice. We began researching flexible analog sensors that could be integrated directly into a breathable neoprene sleeve.
            </p>
          </motion.div>

          {/* --- POP-UP IMAGE (Sliding in from the left) --- */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={slideInLeft} 
            className="w-full relative aspect-video rounded-[30px] overflow-hidden shadow-2xl mb-16 border border-gray-100"
          >
            {/* Replace /judhi.jpg with your own image, like /week1-sensor.jpg */}
            <Image src="/judhi.jpg" alt="Sensor Prototype" fill className="object-cover" />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-800">
              Fig 1.1 - Initial MPU6050 Testing
            </div>
          </motion.div>

          {/* Blog Paragraph 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Microcontroller Selection</h3>
            <p>
              We debated between the standard Arduino Nano and the ESP32. We ultimately chose the ESP32 due to its native Bluetooth Low Energy (BLE) capabilities. Sending 60 frames per second of live telemetry data requires significant bandwidth, and the ESP32's dual-core processor handles the sensor fusion math effortlessly.
            </p>
          </motion.div>

          {/* --- POP-UP IMAGE (Sliding in from the right) --- */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={slideInRight} 
            className="w-full relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl mb-16 border border-gray-100 md:w-3/4 md:ml-auto"
          >
            {/* Replace /judhi.jpg with your own image */}
            <Image src="/judhi.jpg" alt="ESP32 Board" fill className="object-cover" />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-800">
              Fig 1.2 - ESP32 Architecture
            </div>
          </motion.div>

          {/* Blog Paragraph 3 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16">
            <p>
              By the end of the week, Dr. Judhi approved our initial ethics package. Moving into Week 2, our focus will shift to writing the VHDL code for the custom digital stopwatch IP to measure step timing exactly.
            </p>
          </motion.div>

          {/* End of Post Navigation */}
          <div className="border-t border-gray-200 pt-8 mt-16 flex justify-between items-center">
            <div className="text-gray-400 text-sm font-bold tracking-widest uppercase">End of Log 1</div>
            <Link href="/devlog/week-2">
              <button className="px-8 py-3 bg-gray-900 hover:bg-yellow-500 text-white rounded-full font-bold transition-colors">
                Read Week 2 →
              </button>
            </Link>
          </div>

        </article>
      </div>

      <footer className="w-full py-16 bg-white border-t border-gray-100 text-center">
        <div className="text-xl font-black text-yellow-600 mb-4 tracking-tighter">MYNEE</div>
        <p className="text-gray-400 text-[10px] uppercase tracking-widest">© 2026 Syed Arzanish.</p>
      </footer>
    </main>
  );
}