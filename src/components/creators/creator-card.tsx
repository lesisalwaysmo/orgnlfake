"use client";

import React from "react";
import Link from "next/link";
import { CoverSlide } from "@/components/creators/cover-slide";
import { Users, TrendingUp, Eye, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialStats {
    followers?: number;
    engagement_rate?: string;
    total_reach?: number;
}

interface CreatorCardProps {
    username: string;
    images: string[];
    avatar?: string;
    socialStats?: SocialStats | null;
    className?: string;
}

export function CreatorCard({ username, images, avatar, socialStats, className }: CreatorCardProps) {
    return (
        <div className={cn(
            "group relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/10 no-reveal",
            className
        )}>
            {/* Cover Slide */}
            <div className="relative">
                <CoverSlide images={images} username={username} className="rounded-none" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                {/* Username Badge & Avatar */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10 flex items-center gap-2 sm:gap-3">
                    {avatar && (
                        <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 sm:border-2 shadow-lg shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={avatar} alt={username} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <h3 className="text-base sm:text-xl font-bold text-white truncate">@{username}</h3>
                </div>
            </div>

            {/* Stats Section */}
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                {socialStats && (
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                            <Users className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-indigo-400" />
                            <p className="text-[9px] sm:text-xs text-muted-foreground">Followers</p>
                            <p className="text-xs sm:text-sm font-semibold text-white">
                                {socialStats.followers ? formatNumber(socialStats.followers) : "—"}
                            </p>
                        </div>
                        <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-green-400" />
                            <p className="text-[9px] sm:text-xs text-muted-foreground">Engagement</p>
                            <p className="text-xs sm:text-sm font-semibold text-white">
                                {socialStats.engagement_rate || "—"}
                            </p>
                        </div>
                        <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4 mx-auto mb-1 text-purple-400" />
                            <p className="text-[9px] sm:text-xs text-muted-foreground">Reach</p>
                            <p className="text-xs sm:text-sm font-semibold text-white">
                                {socialStats.total_reach ? formatNumber(socialStats.total_reach) : "—"}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-1.5 sm:gap-2">
                    <Link
                        href={`/${username}`}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:py-2.5 sm:px-4 rounded-lg bg-white text-black font-medium text-[10px] sm:text-sm transition-all hover:bg-white/90 active:scale-[0.98]"
                    >
                        Media Kit
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                    <Link
                        href={`/${username}/portfolio`}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:py-2.5 sm:px-4 rounded-lg border border-white/20 text-white font-medium text-[10px] sm:text-sm transition-all hover:bg-white/10 active:scale-[0.98]"
                    >
                        Portfolio
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
}
