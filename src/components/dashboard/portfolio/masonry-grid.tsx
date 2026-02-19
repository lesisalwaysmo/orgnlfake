"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

export function MasonryGrid() {
    // 8 Skeleton items with pre-defined heights for masonry effect
    const skeletons = [
        "h-64", "h-40", "h-80", "h-56",
        "h-72", "h-48", "h-60", "h-44"
    ];

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4 mt-8">
                <h3 className="text-lg font-semibold text-white">Media Gallery</h3>
                <button className="text-xs text-muted-foreground hover:text-white transition-colors">
                    Manage
                </button>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {skeletons.map((height, i) => (
                    <motion.div
                        key={i}
                        className={`w-full ${height} rounded-xl overflow-hidden bg-white/5 border border-white/5 break-inside-avoid relative group`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                        {/* Loading/Pulse Effect */}
                        <motion.div
                            className="absolute inset-0 bg-white/5"
                            animate={{ opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                            <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
