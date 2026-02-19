"use client";

import { motion } from "framer-motion";

interface ReelCardProps {
  index: number;
}

const ReelCard = ({ index }: ReelCardProps) => {
  return (
    <div
      className="flex-shrink-0 w-[180px] h-[320px] rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(
          ${135 + index * 15}deg,
          #1a1a1a ${10 + index * 5}%,
          #0a0a0a ${50 + index * 3}%,
          #000000 100%
        )`,
      }}
    >
      {/* Subtle inner glow effect */}
      <div className="w-full h-full relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(
              ellipse at ${30 + index * 10}% ${20 + index * 8}%,
              rgba(255, 255, 255, 0.05) 0%,
              transparent 50%
            )`,
          }}
        />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </div>
  );
};

interface MarqueeReelsProps {
  /** Speed of the scroll animation in seconds for one complete cycle */
  speed?: number;
  /** Number of cards to render */
  cardCount?: number;
  /** Gap between cards in pixels */
  gap?: number;
  /** Direction of scroll */
  direction?: "left" | "right";
  /** Additional className for the container */
  className?: string;
}

export default function MarqueeReels({
  speed = 30,
  cardCount = 8,
  gap = 16,
  direction = "left",
  className = "",
}: MarqueeReelsProps) {
  // Create array of cards
  const cards = Array.from({ length: cardCount }, (_, i) => i);

  // Calculate total width for animation
  const cardWidth = 180;
  const totalWidth = (cardWidth + gap) * cardCount;

  return (
    <div
      className={`overflow-hidden w-full ${className}`}
      style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
    >
      <motion.div
        className="flex"
        style={{ gap: `${gap}px` }}
        animate={{
          x: direction === "left" ? [-totalWidth, 0] : [0, -totalWidth],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Render cards twice for seamless loop */}
        {[...cards, ...cards].map((cardIndex, i) => (
          <ReelCard key={`${cardIndex}-${i}`} index={cardIndex} />
        ))}
      </motion.div>
    </div>
  );
}
