"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardsProps {
    selectedCategory?: string;
    onSelectCategory: (category: string) => void;
    className?: string;
}

const CATEGORIES = [
    { id: "fashion", label: "Fashion", color: "from-red-600/80 to-red-900/80", shadow: "shadow-red-900/40" },
    { id: "beauty", label: "Beauty", color: "from-emerald-600/80 to-emerald-900/80", shadow: "shadow-emerald-900/40" },
    { id: "commercial", label: "Commercial", color: "from-blue-600/80 to-blue-900/80", shadow: "shadow-blue-900/40" },
];

export function CategoryCards({ selectedCategory, onSelectCategory, className }: CategoryCardsProps) {
    return (
        <div className={cn("flex flex-wrap justify-center gap-6 md:gap-12 py-12 px-4", className)}>
            {CATEGORIES.map((cat, index) => {
                const isSelected = selectedCategory === cat.id;

                return (
                    <motion.div
                        key={cat.id}
                        initial={{ y: 0 }}
                        animate={{
                            y: [0, -10, 0], // Floating bounce
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5, // Stagger the bounce
                        }}
                        whileHover={{ scale: 1.05, y: -15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectCategory(cat.id === selectedCategory ? "" : cat.id)} // Toggle
                        className={cn(
                            "relative group cursor-pointer w-[280px] h-[160px] rounded-2xl overflow-hidden backdrop-blur-xl border border-white/10 transition-all duration-300",
                            isSelected ? `ring-2 ring-white ring-offset-2 ring-offset-black ${cat.shadow} shadow-lg` : "opacity-80 hover:opacity-100"
                        )}
                    >
                        {/* Background Gradient */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br transition-opacity duration-300", cat.color, isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-90")} />

                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-widest uppercase items-center flex gap-2">
                                {cat.label}
                            </h3>
                        </div>

                        {/* Glass shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    </motion.div>
                );
            })}
        </div>
    );
}
