"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroLoopProps {
    videos?: string[];
    className?: string;
}

const PLACEHOLDER_VIDEO = "https://cdn.coverr.co/videos/coverr-black-liquid-ink-4548/1080p.mp4"; // Abstract black liquid

export function HeroLoop({ videos = [], className }: HeroLoopProps) {
    // If no videos, we show a large single placeholder hero or a marquee of the same placeholder?
    // "Placeholder: If no video, show flowing abstract black liquid video (stock footage)."
    // A marquee of one video implies repeating the same video. 
    // Let's create a list of items to scroll.

    const hasVideos = videos.length > 0;
    // If no videos, we can just effectively show the placeholder video as a background or repeated items. 
    // A marquee implies movement. Let's repeat the placeholder if empty.

    const displayItems = hasVideos ? videos : Array(5).fill(PLACEHOLDER_VIDEO);

    // We need enough items to fill the screen width + buffer for smooth looping.
    // We'll duplicate the list a few times.
    const loopItems = [...displayItems, ...displayItems, ...displayItems, ...displayItems];

    return (
        <div className={cn("w-full h-[40vh] md:h-[50vh] overflow-hidden bg-black relative", className)}>
            {/* Overlay gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black pointer-events-none" />

            <div className="flex items-center h-full">
                <motion.div
                    className="flex gap-4 px-4"
                    animate={{
                        x: ["-50%", "0%"], // Moves left to right as requested: "Auto-scrolls slowly left-to-right" 
                        // Usually marquee moves right to left (0 -> -50%). 
                        // To move left-to-right, we start at -50% and go to 0%.
                    }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    style={{ width: "max-content" }}
                >
                    {loopItems.map((src, index) => (
                        <div
                            key={index}
                            className="relative w-[200px] md:w-[280px] aspect-[9/16] rounded-xl overflow-hidden shadow-2xl shrink-0 border border-white/5"
                        >
                            <video
                                src={src}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
