"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CoverSlideProps {
    images?: string[];
    username?: string;
    className?: string;
}

const PLACEHOLDER_IMAGES = [
    "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop", // B&W Texture
    "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1000&auto=format&fit=crop", // Abstract Architecture
    "https://images.unsplash.com/photo-1507838573173-19af7233f23f?q=80&w=1000&auto=format&fit=crop", // Shadows
    "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?q=80&w=1000&auto=format&fit=crop"  // Minimalist
];

export function CoverSlide({ images = [], username, className }: CoverSlideProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Use placeholders if no images provided
    const displayImages = images.length > 0 ? images : PLACEHOLDER_IMAGES;

    useEffect(() => {
        // Only cycle if we have more than one image
        if (displayImages.length <= 1) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % displayImages.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [displayImages.length]);

    return (
        <div className={cn("relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-black/5 shadow-sm group", className)}>
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={currentIndex}
                    src={displayImages[currentIndex]}
                    alt={`Cover slide for ${username || "creator"}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </AnimatePresence>

            {/* Overlay for text legibility if needed, or hover effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {username && (
                <div className="absolute bottom-4 left-4 right-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-medium text-lg truncate">@{username}</p>
                </div>
            )}
        </div>
    );
}
