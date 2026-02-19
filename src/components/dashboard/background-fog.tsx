"use client";

import { motion } from "framer-motion";

export function BackgroundFog() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neutral-900/50 via-neutral-800/20 to-neutral-900/50 blur-3xl"
                animate={{
                    x: ["-10%", "10%", "-10%"],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
        </div>
    );
}
