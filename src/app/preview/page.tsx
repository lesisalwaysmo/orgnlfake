"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Share2, Globe } from "lucide-react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { RateCardDisplay } from "@/components/profile/rate-card-display";
import { AudienceStats } from "@/components/dashboard/audience-stats";
import { generateMockStats, generateMockAudienceData } from "@/lib/mock-data";
import { BackgroundFog } from "@/components/dashboard/background-fog";

export default function PreviewPage() {
    const mockStats = generateMockStats("instagram");
    const audienceData = generateMockAudienceData();

    const mockRateCard = [
        { service: "Instagram Reel", rate: "$2,500", description: "30-60 second high-energy reel with original audio and editing." },
        { service: "TikTok Integration", rate: "$1,800", description: "Seamless brand integration in a daily vlog style video." },
        { service: "Story Set (3-4 slides)", rate: "$800", description: "Engaging stories with link stickers and direct CTA." },
        { service: "YouTube Dedicated Video", rate: "$5,000", description: "8-12 minute deep dive into your product or service." }
    ];

    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-x-hidden">
            <BackgroundFog />

            {/* Admin/Preview Banner */}
            <div className="relative z-50 w-full bg-indigo-600/90 backdrop-blur-md px-4 py-2 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest italic">Viewer Preview Mode</span>
                </div>
                <Link
                    href="/media-kit-builder"
                    className="flex items-center gap-1.5 text-xs font-bold bg-white text-indigo-600 px-3 py-1 rounded-full hover:bg-white/90 transition-all"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Builder
                </Link>
            </div>

            <main className="relative z-10 container mx-auto px-4 py-16 max-w-5xl">
                {/* Profile Header */}
                <ProfileHeader
                    username="FlowCreator"
                    bio="Digital Content Creator & Lifestyle Influencer. Helping brands tell authentic stories through high-impact visual media. Specialized in cinematic storytelling and community engagement."
                    avatarUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop"
                    stats={{
                        followers: mockStats.followers,
                        engagement_rate: `${mockStats.engagement_rate}%`,
                        total_reach: mockStats.followers * 3.5
                    }}
                    className="mb-16"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Stats and Info */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Audience Section */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold tracking-tight glow-blue-text">Audience Insights</h2>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-semibold bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                    <Activity className="w-3 h-3 text-emerald-500" />
                                    Live Verified
                                </div>
                            </div>
                            <AudienceStats data={audienceData} />
                        </section>

                        {/* Rate Card Section */}
                        <section>
                            <h2 className="text-2xl font-bold tracking-tight glow-green-text mb-8">Offerings & Rates</h2>
                            <RateCardDisplay rateCard={mockRateCard} />
                        </section>
                    </div>

                    {/* Right Column: Sidebar Actions */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />

                                <h3 className="text-xl font-bold mb-4 relative z-10">Start a Partnership</h3>
                                <p className="text-muted-foreground text-sm mb-8 leading-relaxed relative z-10">
                                    Ready to collaborate? Request my current media kit PDF or send a direct partnership proposal.
                                </p>

                                <div className="space-y-4 relative z-10">
                                    <button className="w-full py-4 px-6 bg-white text-black font-bold uppercase tracking-tighter rounded-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-[0.98] flex items-center justify-center gap-2">
                                        Collaboration Request
                                        <ArrowRight className="w-4 h-4" />
                                    </button>

                                    <button className="w-full py-4 px-6 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-tighter rounded-xl transition-all hover:bg-white/10 flex items-center justify-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share Profile
                                    </button>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 text-center relative z-10">
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Responds within 24 hours</span>
                                </div>
                            </div>

                            {/* Verification Badge */}
                            <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                <Activity className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">Verified by FlowApp</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* External Icon Decoration */}
            <Activity className="absolute bottom-[-100px] right-[-100px] w-96 h-96 text-indigo-500/5 rotate-12 pointer-events-none" />
        </div>
    );
}

// Minimal Activity icon shim if lucide doesn't have it (it has Activity, but just in case)
function Activity(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    );
}
