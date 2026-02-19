"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Link2, Edit3, Image as ImageIcon, Eye } from "lucide-react";
import Link from "next/link";
import { BentoGrid, BentoCard } from "@/components/dashboard/bento-grid";
import { StatCard } from "@/components/dashboard/stat-card";
import { ConnectionCard } from "@/components/dashboard/connection-card";
import { SOCIAL_PLATFORMS, SocialPlatform } from "@/lib/config/social-platforms";

// Import ProfileForm
import { ProfileForm } from "@/components/dashboard/profile-form";
// Import ReelsStrip
import { ReelsStrip } from "@/components/dashboard/portfolio/reels-strip";
// Import MasonryGrid
import { MasonryGrid } from "@/components/dashboard/portfolio/masonry-grid";
import { AudienceStats } from "@/components/dashboard/audience-stats";
import { AudienceStats as AudienceStatsType } from "@/lib/mock-data";
import { Users } from "lucide-react";

interface BuilderTabsProps {
    mockStats: any; // Using any for simplicity now, strictly should be PlatformStats
    audienceData: AudienceStatsType;
    connectedPlatforms: SocialPlatform[];
    profile: any; // Ideally typed Profile
}

export function BuilderTabs({ mockStats, audienceData, connectedPlatforms, profile }: BuilderTabsProps) {
    const connectedSet = new Set(connectedPlatforms);

    return (
        <Tabs defaultValue="overview" className="w-full space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl w-full sm:w-auto grid grid-cols-4 sm:flex gap-1">
                    <TabsTrigger
                        value="overview"
                        className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground rounded-lg px-4 py-2 transition-all flex items-center justify-center gap-2"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="audience"
                        className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground rounded-lg px-4 py-2 transition-all flex items-center justify-center gap-2"
                    >
                        <Users className="w-4 h-4" />
                        <span className="hidden sm:inline">Audience</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="connections"
                        className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground rounded-lg px-4 py-2 transition-all flex items-center justify-center gap-2"
                    >
                        <Link2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Connections</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="edit"
                        className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground rounded-lg px-4 py-2 transition-all flex items-center justify-center gap-2"
                    >
                        <Edit3 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="portfolio"
                        className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground rounded-lg px-4 py-2 transition-all flex items-center justify-center gap-2"
                    >
                        <ImageIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Portfolio</span>
                    </TabsTrigger>
                </TabsList>

                <Link
                    href="/preview"
                    className="flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Eye className="w-4 h-4" />
                    View Public Preview
                </Link>
            </div>

            <TabsContent value="overview" className="mt-0 space-y-6">
                <BentoGrid>
                    {/* Total Reach */}
                    <StatCard
                        title="Total Reach"
                        value={(mockStats.followers * 3.5).toLocaleString()}
                        subtitle="Across all platforms"
                        trend="up"
                        trendValue="+12.5%"
                        glow="blue"
                    />

                    {/* Engagement Rate */}
                    <StatCard
                        title="Avg. Engagement"
                        value={`${mockStats.engagement_rate}%`}
                        subtitle="Last 30 days"
                        trend="up"
                        trendValue="+2.1%"
                        glow="green"
                    />

                    {/* Total Posts */}
                    <StatCard
                        title="Content Volume"
                        value={mockStats.posts.toLocaleString()}
                        subtitle="Posts published"
                        trend="neutral"
                        trendValue="+5 new"
                        glow="none"
                    />

                    {/* Recent Activity - Wide Card */}
                    <BentoCard colSpan={2} className="min-h-[200px] flex flex-col justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none" />
                        <h3 className="text-lg font-semibold mb-2 z-10">Recent Activity</h3>
                        <div className="space-y-3 z-10">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-sm">Viral Post Detected</span>
                                </div>
                                <span className="text-xs text-muted-foreground">2h ago</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-sm">Partnership Request</span>
                                </div>
                                <span className="text-xs text-muted-foreground">5h ago</span>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Audience Growth - Square Card */}
                    <StatCard
                        title="Audience Growth"
                        value="+1.2k"
                        subtitle="New followers"
                        trend="down"
                        trendValue="-0.5%"
                        glow="red"
                    />
                </BentoGrid>
            </TabsContent>

            <div className="min-h-[500px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6">
                <TabsContent value="connections" className="mt-0">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Platform Connections</h2>
                            <p className="text-sm text-muted-foreground">Manage your social media integrations.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Object.keys(SOCIAL_PLATFORMS).map((key) => {
                            const platform = key as SocialPlatform;
                            const isConnected = connectedSet.has(platform);
                            return (
                                <ConnectionCard
                                    key={platform}
                                    platform={platform}
                                    isConnected={isConnected}
                                    username={isConnected ? "Linked Account" : undefined}
                                />
                            );
                        })}
                    </div>
                </TabsContent>

                <TabsContent value="audience" className="mt-0">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">Audience Insights</h2>
                        <p className="text-sm text-muted-foreground">Understand who your followers are and where they come from.</p>
                    </div>
                    <AudienceStats data={audienceData} />
                </TabsContent>

                <TabsContent value="edit" className="mt-0">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                        <p className="text-sm text-muted-foreground">Update your public profile information.</p>
                    </div>
                    <ProfileForm
                        initialData={{
                            username: profile?.username || "",
                            bio: profile?.bio || "",
                            website: profile?.website || ""
                        }}
                    />
                </TabsContent>

                <TabsContent value="portfolio" className="mt-0">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">Portfolio Gallery</h2>
                        <p className="text-sm text-muted-foreground">Showcase your best content.</p>
                    </div>

                    <ReelsStrip />
                    <MasonryGrid />
                    <div className="mt-8 p-8 border border-white/5 rounded-xl bg-white/5 text-center text-muted-foreground">
                        {/* Grid for other media types will go here */}
                        <p>More media sections coming soon...</p>
                    </div>
                </TabsContent>
            </div>
        </Tabs>
    );
}
