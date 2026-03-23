"use client";
import React, { useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const GRID_ITEMS = [
  { top: "15%", left: "12%", width: 140, height: 180, factor: 0.05 },
  { top: "5%", left: "75%", width: 160, height: 160, factor: -0.03 },
  { top: "55%", left: "5%", width: 200, height: 260, factor: 0.08 },
  { top: "70%", left: "80%", width: 180, height: 220, factor: -0.06 },
  { top: "25%", left: "45%", width: 100, height: 130, factor: 0.02 },
  { top: "60%", left: "38%", width: 220, height: 160, factor: -0.04 },
  { top: "35%", left: "85%", width: 130, height: 170, factor: 0.07 },
];

export default function TelescopeParallaxGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const moveX = e.clientX - window.innerWidth / 2;
      const moveY = e.clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center">

      {/* --- PARALLAX GRID LAYER --- */}
      <div className="absolute inset-0 pointer-events-none">
        {GRID_ITEMS.map((item, i) => (
          <Box
            key={i}
            item={item}
            smoothX={smoothX}
            smoothY={smoothY}
          />
        ))}
      </div>

      {/* --- CENTRAL HERO --- */}
      <div className="relative z-10 text-center pointer-events-auto">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-black mb-10 leading-[1.1]">
          Be among the first to <br />
          <span className="font-serif italic">try Telescope</span>
        </h1>
        <button className="bg-black text-white px-12 py-4 rounded-full text-[11px] font-bold tracking-[0.2em] transition-transform hover:scale-105 uppercase">
          Join Waitlist
        </button>
      </div>

      {/* --- FOOTER --- */}
      <div className="absolute bottom-10 w-full px-12 flex justify-between items-center z-20">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          Currently in private beta
        </div>
        <div className="flex items-center gap-10">
          <button className="text-[10px] font-bold uppercase tracking-widest text-black">Sign In</button>
          <button className="bg-[#BFFFA1] text-black px-6 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm hover:brightness-105 transition-all">
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
}

function Box({ item, smoothX, smoothY }: { item: typeof GRID_ITEMS[number]; smoothX: any; smoothY: any }) {
  // Use useTransform to derive x/y from the smooth mouse values, scaled by the item's depth factor
  const x = useTransform(smoothX, (v: number) => v * item.factor);
  const y = useTransform(smoothY, (v: number) => v * item.factor);

  // Add an extra spring layer for even smoother per-box movement
  const springX = useSpring(x, { damping: 30, stiffness: 200 });
  const springY = useSpring(y, { damping: 30, stiffness: 200 });

  return (
    <motion.div
      style={{
        top: item.top,
        left: item.left,
        width: item.width,
        height: item.height,
        x: springX,
        y: springY,
      }}
      className="absolute bg-zinc-100 border border-zinc-200/60 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="w-full h-full bg-gradient-to-br from-zinc-50 to-zinc-200 opacity-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border border-zinc-300 opacity-20" />
      </div>
    </motion.div>
  );
}
