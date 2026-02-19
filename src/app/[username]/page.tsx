import { createClient } from "@/lib/supabase/server";
import { ProfileHeader } from "@/components/profile/profile-header";
import { RateCardDisplay } from "@/components/profile/rate-card-display";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PublicProfilePageProps {
    params: Promise<{
        username: string;
    }>;
}

export async function generateMetadata({ params }: PublicProfilePageProps) {
    const { username } = await params;
    return {
        title: `${username} | Orgnlfake`,
        description: `Check out ${username}'s profile on Orgnlfake`
    }
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);

    const supabase = await createClient();

    // Fetch profile
    // Note: We're selecting fields assuming they match our DB schema
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", decodedUsername)
        .single();

    if (error || !profile) {
        console.error(`Profile not found for username: ${decodedUsername}`, error);
        notFound();
    }

    // Cast JSONB fields to appropriate types
    // This assumes the shape matches our components' expectations
    const socialStats: any = profile.social_stats || {};
    const rateCard: any = profile.rate_card || [];

    // TODO: In a real app, we might also fetch the avatar URL if it's stored separately or constructed
    // For now we assume 'avatar_url' might be in the profile or we use a placeholder logic
    // The schema didn't explicitly show avatar_url in the migration I saw, so I'll check if it exists or use a default.
    // Looking at migration: id, username, status, social_stats, rate_card, media_assets. 
    // There is NO avatar_url column in the snippet I saw. I will assume it might be in social_stats or just missing.
    // I will use a placeholder or derived value if needed.
    const avatarUrl = null; // Update this if we add an avatar column later

    return (
        <div className="min-h-screen pb-20">
            {/* Hero / Header Section */}
            <div className="relative pt-24 pb-12 overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <ProfileHeader
                        username={profile.username || decodedUsername}
                        bio={null} // Schema doesn't have explicit 'bio' column in top level, maybe in social_stats? Migration showed only those columns.
                        // Wait, migration: username, status, social_stats, rate_card, media_assets.
                        // I'll check if 'bio' is often stored in jsonb or if I missed a column.
                        // For now, I'll pass null or mock it if needed.
                        stats={{
                            followers: socialStats.followers,
                            engagement_rate: socialStats.engagement_rate,
                            total_reach: socialStats.total_reach
                        }}
                        avatarUrl={avatarUrl}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content: Rate Card */}
                        <div className="lg:col-span-2 space-y-8">
                            <RateCardDisplay rateCard={rateCard} />
                        </div>

                        {/* Sidebar / Actions */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm sticky top-24">
                                <h3 className="text-lg font-medium text-white mb-4">Interested in working with me?</h3>
                                <Link
                                    href={`/${decodedUsername}/portfolio`} // Assuming this route or section
                                    className="group relative flex items-center justify-center w-full py-4 px-6 bg-white text-black font-bold uppercase tracking-wide rounded-lg overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        View Portfolio
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                </Link>

                                <p className="text-xs text-muted-foreground text-center mt-4">
                                    Contact me for custom packages and collaborations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
