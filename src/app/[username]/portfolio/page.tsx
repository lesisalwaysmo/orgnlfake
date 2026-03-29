import { createClient } from "@/lib/supabase/server";
import { EditorialPortfolio } from "@/components/portfolio/editorial-portfolio";
import { notFound } from "next/navigation";
import { getCreatorPortfolioAssets, getCreatorScatterAssets } from "@/lib/portfolio-utils";

interface PortfolioPageProps {
    params: Promise<{
        username: string;
    }>;
}

export async function generateMetadata({ params }: PortfolioPageProps) {
    const { username } = await params;
    return {
        title: `${username}'s Portfolio | Orgnlfake`,
        description: `Explore the portfolio of ${username}`,
    };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);
    const supabase = (await createClient()) as any;

    // Fetch profile from Supabase, fall back to mock data
    let profileData: { username: string; media_assets: (string | { url: string; category?: string })[] };

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("username, media_assets")
        .eq("username", decodedUsername)
        .single();

    if (error || !profile || !profile.media_assets || (Array.isArray(profile.media_assets) && profile.media_assets.length === 0)) {
        console.warn(`Supabase fetch failed or empty for ${decodedUsername} portfolio, falling back to dynamic filesystem mapping...`);
        const dynamicAssets = await getCreatorPortfolioAssets(decodedUsername);
        
        if (dynamicAssets.length === 0) {
            notFound();
        }
        profileData = { username: decodedUsername, media_assets: dynamicAssets };
    } else {
        profileData = profile as any;
    }

    // Parse media assets
    let mediaAssets: (string | { url: string; category?: string })[] = [];
    try {
        if (Array.isArray(profileData.media_assets)) {
            mediaAssets = profileData.media_assets as any;
        }
    } catch (e) {
        console.error("Error parsing media_assets", e);
    }

    // Fetch scatter images explicitly
    const { scatterImages, heroVideoUrl: dynamicHeroVideoUrl } = await getCreatorScatterAssets(decodedUsername);

    // Find the first video from legacy mediaAssets if necessary
    const videoExtensions = [".mp4", ".mov", ".webm"];
    const fallbackHeroVideoFromAssets = mediaAssets.find((item) => {
        const url = typeof item === 'string' ? item : item.url;
        return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
    }) as string | undefined;

    return (
        <EditorialPortfolio
            username={profileData.username || decodedUsername}
            mediaAssets={mediaAssets}
            scatterImages={scatterImages}
            heroVideoUrl={dynamicHeroVideoUrl || (typeof fallbackHeroVideoFromAssets === 'string' ? fallbackHeroVideoFromAssets : (fallbackHeroVideoFromAssets as any)?.url) || undefined}
        />
    );
}
