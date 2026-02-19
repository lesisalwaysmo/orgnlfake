"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    subtitle?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    glow?: "green" | "red" | "blue" | "none";
    className?: string;
}

export function StatCard({
    title,
    value,
    subtitle,
    trend = "neutral",
    trendValue,
    glow = "none",
    className,
}: StatCardProps) {
    // Generate random points for the ghost chart to ensure it looks different each render/card
    // In a real app, this could be strictly deterministic based on the 'value' or passed as a prop
    const chartPath = "M0,50 Q25,45 50,55 T100,40 T150,60 T200,30 T250,50 T300,40";

    return (
        <div
            className={cn(
                "relative flex flex-col justify-between h-full rounded-2xl border bg-black/40 backdrop-blur-md p-6 overflow-hidden hover:bg-black/50 transition-colors",
                glow === "green" && "border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]",
                glow === "red" && "border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]",
                glow === "blue" && "border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]",
                glow === "none" && "border-white/10",
                className
            )}
        >
            {/* Ghost Chart Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg
                    viewBox="0 0 300 100"
                    className="w-full h-full preserve-3d"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <motion.path
                        d={chartPath}
                        fill="none"
                        stroke="url(#gradient-chart)"
                        strokeWidth="3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className={cn(
                            glow === "green" && "stroke-emerald-400",
                            glow === "red" && "stroke-red-400",
                            glow === "blue" && "stroke-blue-400",
                            glow === "none" && "stroke-white/30"
                        )}
                    />
                </svg>
            </div>

            {/* Header */}
            <div className="relative z-10">
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            </div>

            {/* Value & Trend */}
            <div className="relative z-10 mt-4">
                <h2 className={cn(
                    "text-3xl font-bold tracking-tight",
                    glow === "green" && "glow-green-text",
                    glow === "red" && "glow-red-text",
                    glow === "blue" && "glow-blue-text",
                    glow === "none" && "text-white"
                )}>
                    {value}
                </h2>
                {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                )}

                {trendValue && (
                    <div className="flex items-center gap-1 mt-2">
                        {trend === "up" && <ArrowUp className="w-3 h-3 text-emerald-400" />}
                        {trend === "down" && <ArrowDown className="w-3 h-3 text-red-400" />}
                        {trend === "neutral" && <Minus className="w-3 h-3 text-muted-foreground" />}
                        <span
                            className={cn(
                                "text-xs font-medium",
                                trend === "up" && "text-emerald-400",
                                trend === "down" && "text-red-400",
                                trend === "neutral" && "text-muted-foreground"
                            )}
                        >
                            {trendValue}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
