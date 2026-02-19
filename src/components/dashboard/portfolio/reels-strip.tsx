"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export function ReelsStrip() {
    // Pre-fill with 5 empty slots as requested
    const slots = Array.from({ length: 5 });

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Featured Reels</h3>
                <button className="text-xs text-muted-foreground hover:text-white transition-colors">
                    View All
                </button>
            </div>

            <div className="relative w-full overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                    {userReels.length > 0 ? (
                        // Placeholder for real reels integration later
                        <div></div>
                    ) : (
                        slots.map((_, i) => (
                            <motion.div
                                key={i}
                                className="relative w-[180px] aspect-[9/16] rounded-xl overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center group cursor-pointer"
                                animate={{
                                    backgroundColor: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.08)", "rgba(255,255,255,0.05)"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2, // Stagger effect
                                }}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <div className="p-3 rounded-full bg-white/10">
                                        <Plus className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-white">Add Reel</span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// Temporary mock empty array to trigger the empty slots logic
const userReels: any[] = [];
