'use client';

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface BlockRevealProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  stagger?: number;
}

const BlockReveal: React.FC<BlockRevealProps> = ({ children, color = "#ffffff", delay = 0, stagger = 0.15 }) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    const lines = container.current.querySelectorAll(".reveal-line");

    lines.forEach((line, index) => {
      const text = line.querySelector(".reveal-text");
      const block = line.querySelector(".reveal-block");

      const tl = gsap.timeline({ delay: delay + index * stagger });

      tl.set(block, { scaleX: 0, transformOrigin: "left" })
        .set(text, { opacity: 0 })
        .to(block, { scaleX: 1, duration: 0.5, ease: "power3.inOut" })
        .set(text, { opacity: 1 })
        .set(block, { transformOrigin: "right" })
        .to(block, { scaleX: 0, duration: 0.5, ease: "power3.inOut" });
    });
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col gap-1 overflow-hidden">
      {React.Children.map(children, (child) => (
        <div className="reveal-line relative inline-block w-fit">
          <span className="reveal-text block">{child}</span>
          <div className="reveal-block absolute inset-0 z-10" style={{ backgroundColor: color }} />
        </div>
      ))}
    </div>
  );
};

export default BlockReveal;
