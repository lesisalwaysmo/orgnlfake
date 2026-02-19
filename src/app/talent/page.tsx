import { createClient } from "@/lib/supabase/server";
import { CreatorCard } from "@/components/creators/creator-card";
import { CreatorSearch } from "@/components/creators/creator-search";

export const metadata = {
    title: "Content Creators | Orgnlfake",
    description: "Media Kits: Analytics, Portfolios, Affiliations, & Rates",
};

export default async function TalentPage() {
    const supabase = await createClient();

    // Define the shape of the data we're selecting
    type CreatorRow = {
        id: string;
        username: string | null;
        media_assets: unknown;
        social_stats: unknown;
    };

    const { data: creators, error } = await supabase
        .from("profiles")
        .select("id, username, media_assets, social_stats")
        .eq("status", "active")
        .order("created_at", { ascending: false }) as { data: CreatorRow[] | null; error: unknown };

    if (error) {
        console.error("Error fetching creators:", error);
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-red-500">
                Failed to load creators.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Content Creators</h1>
                <p className="text-muted-foreground text-lg mb-6">
                    Explore media kits, analytics, portfolios, and rates from our talented creators.
                </p>

                {/* Search Bar */}
                <CreatorSearch className="max-w-2xl mx-auto" />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-sm text-muted-foreground">Featured Creators</span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            {!creators || creators.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center border rounded-xl border-dashed p-8">
                    <h3 className="text-xl font-medium mb-2">No creators found</h3>
                    <p className="text-muted-foreground">Check back later for new featured creators.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {creators.map((creator) => {
                        // Parse media_assets
                        const images = Array.isArray(creator.media_assets)
                            ? creator.media_assets.filter((item): item is string => typeof item === 'string')
                            : [];

                        // social_stats is JSONB, cast appropriately
                        const socialStats = creator.social_stats as {
                            followers?: number;
                            engagement_rate?: string;
                            total_reach?: number;
                        } | null;

                        return (
                            <CreatorCard
                                key={creator.id}
                                username={creator.username || "Creator"}
                                images={images}
                                socialStats={socialStats}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
