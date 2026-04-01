"use client";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// --- UPGRADED SPRING PHYSICS ANIMATIONS ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// Added a subtle rotation and spring bounce for a much more premium feel
const slideInLeft = {
  hidden: { opacity: 0, x: -100, rotate: -3 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", bounce: 0.4, duration: 1.2 } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100, rotate: 3 },
  visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", bounce: 0.4, duration: 1.2 } }
};

export default function Week1Log() {
  const [scrolled, setScrolled] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col bg-slate-50 text-gray-900 font-sans">
      
     

      {/* MAIN LAYOUT GRID */}
      <div className="flex max-w-7xl mx-auto w-full px-8 pt-40 pb-32 gap-16 relative">
        
        {/* --- DYNAMIC LEFT SIDEBAR --- */}
       <Sidebar activeWeek={8} />

        {/* --- RIGHT COLUMN: BLOG CONTENT --- */}
        <article className="flex-1 max-w-3xl">
          
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
            <span className="text-yellow-500 font-bold tracking-widest uppercase text-xs mb-4 block">September 14, 2026</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tight leading-[1.1] mb-6">
              The Genesis: Establishing the Core Architecture.
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              In our first week of the SoC Design module, the primary objective was to finalize the hardware schematic and validate the IMU sensor constraints.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16">
            <p>
              The human knee is a complex hinge joint. To properly track its flexion and extension without restricting the user's natural gait, we realized that rigid PCBs would not suffice. We began researching flexible analog sensors that could be integrated directly into a breathable neoprene sleeve.
            </p>
          </motion.div>

          {/* FIX: amount: 0.3 ensures animation waits until 30% of the image is safely on screen */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={slideInLeft} 
            className="w-full relative aspect-video rounded-[30px] overflow-hidden shadow-2xl mb-16 border border-gray-100"
          >
            <Image src="/judhi.jpg" alt="Sensor Prototype" fill className="object-cover" />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-800">
              Fig 1.1 - Initial MPU6050 Testing
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-8">Microcontroller Selection</h3>
            <p>
              We debated between the standard Arduino Nano and the ESP32. We ultimately chose the ESP32 due to its native Bluetooth Low Energy (BLE) capabilities. Sending 60 frames per second of live telemetry data requires significant bandwidth, and the ESP32's dual-core processor handles the sensor fusion math effortlessly.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={slideInRight} 
            className="w-full relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl mb-16 border border-gray-100 md:w-3/4 md:ml-auto"
          >
            <Image src="/judhi.jpg" alt="ESP32 Board" fill className="object-cover" />
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-gray-800">
              Fig 1.2 - ESP32 Architecture
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="prose prose-lg text-gray-600 font-light mb-16">
            <p>
              By the end of the week, Dr. Judhi approved our initial ethics package. Moving into Week 2, our focus will shift to writing the VHDL code for the custom digital stopwatch IP to measure step timing exactly.
            </p>
          </motion.div>

          <div className="border-t border-gray-200 pt-8 mt-16 flex justify-between items-center">
            <div className="text-gray-400 text-sm font-bold tracking-widest uppercase">End of Log 1</div>
            <Link href="/devlog/week-2">
              <button className="px-8 py-3 bg-gray-900 hover:bg-emerald-500 text-white rounded-full font-bold transition-colors">
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