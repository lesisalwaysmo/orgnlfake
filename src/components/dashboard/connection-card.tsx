"use client";

import { useState } from "react";
import { SocialPlatform } from "@/lib/config/social-platforms";
import { cn } from "@/lib/utils";
import { Loader2, Plus, Unplug, Check } from "lucide-react";
import { disconnectPlatform } from "@/app/dashboard/actions";
import {
    Youtube,
    Instagram,
    Facebook,
    Twitter,
    Twitch,
    Video // Placeholder for TikTok if Lucide doesn't have it
} from "lucide-react";

interface ConnectionCardProps {
    platform: SocialPlatform;
    isConnected: boolean;
    username?: string;
    className?: string;
}

const PlatformIcons: Record<SocialPlatform, any> = {
    youtube: Youtube,
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    twitch: Twitch,
    tiktok: Video, // Lucide doesn't have TikTok yet, using Video as generic
};

const PlatformColors: Record<SocialPlatform, string> = {
    youtube: "text-red-500",
    instagram: "text-pink-500",
    facebook: "text-blue-600",
    twitter: "text-sky-500",
    twitch: "text-violet-500",
    tiktok: "text-teal-400",
};

const PlatformLabels: Record<SocialPlatform, string> = {
    youtube: "YouTube",
    instagram: "Instagram",
    facebook: "Facebook",
    twitter: "X (Twitter)",
    twitch: "Twitch",
    tiktok: "TikTok",
};

export function ConnectionCard({
    platform,
    isConnected,
    username,
    className,
}: ConnectionCardProps) {
    const [loading, setLoading] = useState(false);
    const Icon = PlatformIcons[platform];

    const handleConnect = () => {
        // Navigate to the Connect API route
        window.location.href = `/api/connect/${platform}`;
    };

    const handleDisconnect = async () => {
        if (!confirm(`Disconnect ${PlatformLabels[platform]}? Stats will no longer update.`)) return;

        setLoading(true);
        await disconnectPlatform(platform);
        setLoading(false);
    };

    return (
        <div
            className={cn(
                "relative group overflow-hidden rounded-2xl border bg-black/40 backdrop-blur-md p-6 transition-all hover:bg-white/5",
                isConnected ? "border-emerald-500/20" : "border-white/10",
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-white/5", PlatformColors[platform])}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white">{PlatformLabels[platform]}</h3>
                        {isConnected ? (
                            <p className="text-xs text-emerald-400 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Connected
                            </p>
                        ) : (
                            <p className="text-xs text-muted-foreground">Not connected</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8">
                {isConnected ? (
                    <div className="space-y-4">
                        <div className="text-sm text-white/80 font-medium">
                            @{username || "User"}
                        </div>
                        <button
                            onClick={handleDisconnect}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Unplug className="w-4 h-4" />}
                            <span>Disconnect</span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleConnect}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Connect</span>
                    </button>
                )}
            </div>
        </div>
    );
}
