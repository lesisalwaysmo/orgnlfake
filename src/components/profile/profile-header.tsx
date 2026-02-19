"use client";

import React from "react";
import { User, MapPin, Link as LinkIcon, Users, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialStats {
    followers?: number;
    engagement_rate?: string;
    total_reach?: number;
}

interface ProfileHeaderProps {
    username: string;
    bio?: string | null;
    avatarUrl?: string | null;
    stats?: SocialStats | null;
    className?: string;
}

export function ProfileHeader({ username, bio, avatarUrl, stats, className }: ProfileHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-8 md:flex-row md:items-start md:gap-12", className)}>
            {/* Avatar Section */}
            <div className="shrink-0 flex justify-center md:justify-start">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-background shadow-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={username} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-white/50">
                            <User className="h-16 w-16" />
                        </div>
                    )}
                </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">@{username}</h1>
                    {bio && (
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto md:mx-0">
                            {bio}
                        </p>
                    )}
                </div>

                {/* Stats Grid */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10 mt-6">
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Followers</span>
                            <span className="text-xl font-bold text-white">
                                {stats.followers ? stats.followers.toLocaleString() : "—"}
                            </span>
                        </div>

                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Engagement</span>
                            <span className="text-xl font-bold text-white">
                                {stats.engagement_rate || "—"}
                            </span>
                        </div>

                        {/* Placeholder extra stats to fill grid if needed, or just show what we have */}
                        {stats.total_reach && (
                            <div className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Reach</span>
                                <span className="text-xl font-bold text-white">
                                    {stats.total_reach.toLocaleString()}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
