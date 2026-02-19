import { createClient } from "@/lib/supabase/server";
import { PortfolioClientWrapper } from "@/components/portfolio/portfolio-client-wrapper";
import { notFound } from "next/navigation";

interface PortfolioPageProps {
    params: Promise<{
        username: string;
    }>;
}

export async function generateMetadata({ params }: PortfolioPageProps) {
    const { username } = await params;
    return {
        title: `${username}'s Portfolio | Orgnlfake`,
        description: `Explore the portfolio of ${username}`
    }
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);
    const supabase = await createClient();

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("username, media_assets")
        .eq("username", decodedUsername)
        .single();

    if (error || !profile) {
        notFound();
    }

    // Parse media assets
    // Validating that it's an array of strings
    let mediaAssets: string[] = [];
    try {
        if (Array.isArray(profile.media_assets)) {
            mediaAssets = profile.media_assets.filter((item): item is string => typeof item === 'string');
        }
    } catch (e) {
        console.error("Error parsing media_assets", e);
    }

    // Identify videos for the Hero Loop
    // Simple check for file extensions
    const videoExtensions = ['.mp4', '.mov', '.webm'];
    const reels = mediaAssets.filter(url => videoExtensions.some(ext => url.toLowerCase().endsWith(ext)));

    return (
        <PortfolioClientWrapper
            username={profile.username || decodedUsername}
            mediaAssets={mediaAssets}
            reels={reels}
        />
    );
}
