"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function WaitingRoomPage() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Slow-breathing gradient background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        "radial-gradient(ellipse at 50% 50%, #1a1a1a 0%, #000000 100%)",
                        "radial-gradient(ellipse at 30% 70%, #0d0d0d 0%, #000000 100%)",
                        "radial-gradient(ellipse at 70% 30%, #1a1a1a 0%, #000000 100%)",
                        "radial-gradient(ellipse at 50% 50%, #0d0d0d 0%, #000000 100%)",
                        "radial-gradient(ellipse at 50% 50%, #1a1a1a 0%, #000000 100%)",
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Subtle animated grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                {/* Breathing clock icon */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="mb-8 flex justify-center"
                >
                    <div className="p-6 rounded-full border border-white/10 bg-white/5">
                        <Clock className="w-12 h-12 text-white/60" />
                    </div>
                </motion.div>

                {/* Main heading with fade in */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4"
                >
                    Application Under Review
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg text-white/50 max-w-md mx-auto mb-8"
                >
                    We&apos;re reviewing your application. You&apos;ll be notified once your profile is approved.
                </motion.p>

                {/* Breathing dots indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center gap-2"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-white/30"
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500/80 text-sm">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                        Pending Review
                    </span>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
}
