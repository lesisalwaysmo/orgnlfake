import { createClient } from "@/lib/supabase/server";
import { EditorialPortfolio } from "@/components/portfolio/editorial-portfolio";
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
        description: `Explore the portfolio of ${username}`,
    };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
    const { username } = await params;
    const decodedUsername = decodeURIComponent(username);
    const supabase = (await createClient()) as any;

    // Mock data fallback (mirrors talent page pattern)
    const mockProfiles: Record<string, { username: string; media_assets: string[] }> = {
        "gorg_fox.rsa": {
            username: "gorg_fox.rsa",
            media_assets: [
                "/mediakits/2025-08-19-at-01.29.jpg",
                "/media/photos/_MG_0033.jpg",
                "/media/photos/_MG_0049.jpg",
                "/media/photos/_MG_0064.jpg",
                "/media/photos/_MG_0089.jpg",
                "/media/photos/_MG_0273.jpg",
                "/media/photos/_MG_0489.jpg",
                "/media/photos/_MG_0494.jpg",
                "/media/photos/_MG_0506.jpg",
                "/media/videos/0304.mp4",
            ],
        },
        momobabes21: {
            username: "momobabes21",
            media_assets: [
                "/mediakits/_MG_0048 2.jpg",
                "/media/photos/1771871549700.jpeg",
                "/media/photos/1771871554756.jpeg",
                "/media/photos/1771871576699.jpeg",
                "/media/photos/1771871586549.jpeg",
                "/media/photos/freepik__photo-a-19yearold-black-female-with-curly-dark-hai__61286.jpeg",
                "/media/photos/freepik__photo-a-20yearold-asian-woman-with-long-brown-hair__61285.jpeg",
                "/media/photos/hhhhvjcufcururfj.jpg",
                "/media/videos/0304(1).mp4",
            ],
        },
        "lion.paballo": {
            username: "lion.paballo",
            media_assets: [
                "/mediakits/_MG_0048.jpg",
                "/media/photos/bokgabane_thamare_1569517120_2141587287551777564_1806318688.jpg",
                "/media/photos/bokgabane_thamare_1616470041_2535456934228923747_1806318688.jpg",
                "/media/photos/bokgabane_thamare_1618133445_2549410579211492081_1806318688.jpg",
                "/media/photos/bokgabane_thamare_1632425540_2669301357070131930_1806318688.jpg",
                "/media/photos/IMG_0360.jpg",
                "/media/photos/jvskdvsad.jpg",
                "/media/photos/58769482_631323703962206.jpg",
                "/media/videos/0304(2).mp4",
            ],
        },
        "barbiie.stallion": {
            username: "barbiie.stallion",
            media_assets: [
                "/mediakits/9.jpg",
                "/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30018.png",
                "/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30019.png",
                "/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30020.png",
                "/media/photos/freepik__photo-a-22yearold-black-woman-with-dreadlocks-wear__19197.png",
                "/media/photos/509363616_23869832582706253_661189166926347597_n_1.jpg",
                "/media/photos/509369517_23870807502608761_7712008318399193067_n.jpg",
                "/media/photos/510739738_23874207035602141_2899064520723821852_n_1.jpg",
                "/media/videos/0304(3).mp4",
            ],
        },
        "boity_tlhasi": {
            username: "boity_tlhasi",
            media_assets: [
                "/media/photos/509369517_23870807502608761_7712008318399193067_n.jpg",
                "/media/photos/1771871576699.jpeg",
                "/media/photos/1771871586549.jpeg",
                "/media/videos/0304(1).mp4",
                "/media/photos/510979769_3859290037550394_1243527447896608524_n_1.jpg",
                "/media/photos/505997536_10021452084637537_3772584361098111414_n.jpg",
                "/media/photos/_MG_0033.jpg",
                "/media/photos/_MG_0089.jpg"
            ],
        },
        "koketso_.m_": {
            username: "koketso_.m_",
            media_assets: [
                "/media/photos/1771871549700.jpeg",
                "/media/photos/1771871554756.jpeg",
                "/media/videos/0304.mp4",
                "/media/photos/_MG_0273.jpg",
                "/media/photos/freepik__photo-a-19yearold-black-female-with-curly-dark-hai__61286.jpeg",
                "/media/photos/freepik__photo-a-20yearold-asian-woman-with-long-brown-hair__61285.jpeg",
                "/media/photos/hhhhvjcufcururfj.jpg"
            ],
        },
        zeloew: {
            username: "zeloew",
            media_assets: [
                "/media/photos/510739738_23874207035602141_2899064520723821852_n_1.jpg",
                "/media/photos/_MG_0049.jpg",
                "/media/photos/509363616_23869832582706253_661189166926347597_n_1.jpg",
                "/media/videos/0304(2).mp4",
                "/media/photos/jvskdvsad.jpg",
                "/media/photos/58769482_631323703962206.jpg",
                "/media/photos/IMG_0360.jpg",
                "/media/photos/_MG_0033.jpg"
            ],
        },
        luciazizipho: {
            username: "luciazizipho",
            media_assets: [
                "/media/photos/_MG_0064.jpg",
                "/media/photos/_MG_0089.jpg",
                "/media/photos/_MG_0273.jpg",
                "/media/videos/0304(3).mp4",
                "/media/photos/bokgabane_thamare_1569517120_2141587287551777564_1806318688.jpg",
                "/media/photos/bokgabane_thamare_1616470041_2535456934228923747_1806318688.jpg",
                "/media/photos/_MG_0489.jpg"
            ],
        },
        "thandeka_palesa": {
            username: "thandeka_palesa",
            media_assets: [
                "/media/photos/_MG_0489.jpg",
                "/media/photos/_MG_0494.jpg",
                "/media/photos/_MG_0506.jpg",
                "/media/videos/0304.mp4",
                "/media/photos/bokgabane_thamare_1618133445_2549410579211492081_1806318688.jpg",
                "/media/photos/bokgabane_thamare_1632425540_2669301357070131930_1806318688.jpg",
                "/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30018.png"
            ],
        },
        "taunyane_tumisang": {
            username: "taunyane_tumisang",
            media_assets: [
                "/media/photos/freepik__photo-a-19yearold-black-female-with-curly-dark-hai__61286.jpeg",
                "/media/photos/freepik__photo-a-20yearold-asian-woman-with-long-brown-hair__61285.jpeg",
                "/media/photos/hhhhvjcufcururfj.jpg",
                "/media/videos/0304(1).mp4",
                "/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30019.png",
                "/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30020.png",
                "/media/photos/freepik__photo-a-22yearold-black-woman-with-dreadlocks-wear__19197.png"
            ],
        },
    };

    // Fetch profile from Supabase, fall back to mock data
    let profileData: { username: string; media_assets: string[] };

    const { data: profile, error } = await supabase
        .from("profiles")
        .select("username, media_assets")
        .eq("username", decodedUsername)
        .single();

    if (error || !profile) {
        console.warn(`Supabase fetch failed for ${decodedUsername} portfolio, trying mock data...`, error);
        const mockProfile = mockProfiles[decodedUsername];
        if (!mockProfile) {
            notFound();
        }
        profileData = mockProfile;
    } else {
        profileData = profile as any;
    }

    // Parse media assets
    let mediaAssets: string[] = [];
    try {
        if (Array.isArray(profileData.media_assets)) {
            mediaAssets = profileData.media_assets.filter(
                (item: any): item is string => typeof item === "string"
            );
        }
    } catch (e) {
        console.error("Error parsing media_assets", e);
    }

    // Find the first video for the hero
    const videoExtensions = [".mp4", ".mov", ".webm"];
    const heroVideoUrl = mediaAssets.find((url) =>
        videoExtensions.some((ext) => url.toLowerCase().endsWith(ext))
    );

    return (
        <EditorialPortfolio
            username={profileData.username || decodedUsername}
            mediaAssets={mediaAssets}
            heroVideoUrl={heroVideoUrl}
        />
    );
}
