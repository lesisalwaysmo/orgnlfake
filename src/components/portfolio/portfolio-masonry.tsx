"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface MediaItem {
    id: string;
    url: string;
    type?: "image" | "video";
    category?: string; // Optional, for filtering
}

interface PortfolioMasonryProps {
    items: MediaItem[];
    className?: string;
}

export function PortfolioMasonry({ items, className }: PortfolioMasonryProps) {
    if (!items || items.length === 0) {
        return (
            <div className="min-h-[300px] flex items-center justify-center text-muted-foreground w-full">
                <p>No work to display yet.</p>
            </div>
        )
    }

    return (
        <div className={cn("columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 p-4 md:p-8", className)}>
            <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: index * 0.1, // Staggered delay
                        }}
                        className="break-inside-avoid relative group rounded-xl overflow-hidden mb-6 bg-white/5"
                    >
                        {/* Media Content */}
                        <img
                            src={item.url}
                            alt="Portfolio Item"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button className="px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                View
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
