import { createClient } from "@/lib/supabase/server";
import { CreatorCard } from "@/components/creators/creator-card";
import { CreatorSearch } from "@/components/creators/creator-search";
import { getCreatorPortfolioAssets, getCreatorScatterAssets } from "@/lib/portfolio-utils";

export const metadata = {
    title: "Content Creators | Orgnlfake",
    description: "Media Kits: Analytics, Portfolios, Affiliations, & Rates",
};

export default async function TalentPage() {
    const supabase = (await createClient()) as any;

    // Define the shape of the data we're selecting
    type CreatorRow = {
        id: string;
        username: string | null;
        avatar?: string;
        media_assets: unknown;
        social_stats: unknown;
    };

    const { data: creators, error } = await supabase
        .from("profiles")
        .select("id, username, media_assets, social_stats")
        .eq("status", "active")
        .order("created_at", { ascending: false }) as { data: CreatorRow[] | null; error: unknown };

    let creatorsData = creators;
    let isMockData = false;

    if (error) {
        console.warn("Error fetching creators, falling back to mock data:", error);
        isMockData = true;
        creatorsData = [
            {
                id: "creator-gorg-fox",
                username: "gorg_fox.rsa",
                avatar: "/images/profiles/gorg_fox.rsa.jpg",
                media_assets: ["/mediakits/2025-08-19-at-01.29.jpg"],
                social_stats: { followers: 37000, engagement_rate: "6.2%", total_reach: 55000 }
            },
            {
                id: "creator-momobabes21",
                username: "momobabes21",
                avatar: "/images/profiles/momobabes21.jpg",
                media_assets: ["/mediakits/_MG_0048 2.jpg"],
                social_stats: { followers: 64000, engagement_rate: "8.1%", total_reach: 95000 }
            },
            {
                id: "creator-lion-paballo",
                username: "lion.paballo",
                avatar: "/media/photos/lion_paballo.jpg",
                media_assets: ["/mediakits/_MG_0048.jpg"],
                social_stats: { followers: 89000, engagement_rate: "5.4%", total_reach: 135000 }
            },
            {
                id: "creator-barbiie-stallion",
                username: "barbiie.stallion",
                avatar: "/media/photos/barbiie_stallion.jpg",
                media_assets: ["/mediakits/9.jpg"],
                social_stats: { followers: 323000, engagement_rate: "4.8%", total_reach: 500000 }
            },
            {
                id: "creator-boity-tlhasi",
                username: "boity_tlhasi",
                avatar: "/images/profiles/boity_tlhasi.jpg",
                media_assets: ["/mediakits/@boity_tlhasi.jpg"],
                social_stats: { followers: 2709, engagement_rate: "8.5%", total_reach: 4100 }
            },
            {
                id: "creator-koketso-m",
                username: "koketso_.m_",
                avatar: "/images/profiles/koketso_.m_.jpg",
                media_assets: [
                    "/Creators Portfolios/Koketso/gwekhjbeeher.jpg",
                    "/Creators Portfolios/Koketso/hbsdhshe.jpg",
                    "/Creators Portfolios/Koketso/hydtydrrr.jpg",
                    "/Creators Portfolios/Koketso/jhgsfjkhas.jpg",
                    "/Creators Portfolios/Koketso/jkhasfbsjhhd.jpg",
                    "/Creators Portfolios/Koketso/jyfydccfg.jpg",
                    "/Creators Portfolios/Koketso/khbsdkhbvds.jpg",
                    "/Creators Portfolios/Koketso/khzvb.jpg",
                    "/Creators Portfolios/Koketso/kokie-finalle.jpg",
                    "/Creators Portfolios/Koketso/kshgfhugd.jpg",
                    "/Creators Portfolios/Koketso/ugsdjhdhdh.jpg"
                ],
                social_stats: { followers: 15000, engagement_rate: "6.2%", total_reach: 22000 }
            },
            {
                id: "creator-zeloew",
                username: "zeloew",
                avatar: "/images/profiles/zeloew.jpg",
                media_assets: ["/mediakits/@zeloew.jpg"],
                social_stats: { followers: 9895, engagement_rate: "7.1%", total_reach: 14500 }
            },
            {
                id: "creator-luciazizipho",
                username: "luciazizipho",
                avatar: "/images/profiles/luciazizipho.jpg",
                media_assets: ["/mediakits/@luciazizipho.jpg"],
                social_stats: { followers: 17000, engagement_rate: "5.8%", total_reach: 25000 }
            },
            {
                id: "creator-thandeka-palesa",
                username: "thandeka_palesa",
                avatar: "/images/profiles/thandeka_palesa.jpg",
                media_assets: ["/Placeholders/greenplaceholder.png"],
                social_stats: { followers: 57000, engagement_rate: "4.5%", total_reach: 82000 }
            },
            {
                id: "creator-taunyane-tumisang",
                username: "taunyane_tumisang",
                avatar: "/images/profiles/taunyane_tumisang.jpg",
                media_assets: ["/mediakits/@taunyane_tumisang.jpg"],
                social_stats: { followers: 72000, engagement_rate: "4.2%", total_reach: 105000 }
            },
            {
                id: "creator-booysen",
                username: "_booysen",
                avatar: "/Profile photos/@_booysen.jpg",
                media_assets: ["/mediakits/@_booysen.jpg"],
                social_stats: { followers: 12500, engagement_rate: "6.5%", total_reach: 18000 }
            },
            {
                id: "creator-bellaswrld",
                username: "__bellaswrld",
                avatar: "/Profile photos/@__bellaswrld.jpg",
                media_assets: ["/mediakits/@__bellaswrld.jpg"],
                social_stats: { followers: 24000, engagement_rate: "5.8%", total_reach: 36000 }
            },
            {
                id: "creator-they-adore-tshego",
                username: "they_adore_tshego",
                avatar: "/Profile photos/@they_adore_tshego.jpg",
                media_assets: ["/mediakits/@they_adore_tshego.jpg"],
                social_stats: { followers: 41000, engagement_rate: "7.2%", total_reach: 62000 }
            }
        ];
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="mb-8 text-center" style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: "60px", marginBottom: "60px" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <p style={{
                        fontSize: "11px",
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.5em",
                        color: "#c9a86c",
                        marginBottom: "24px",
                    }}>
                        The Talent Board
                    </p>
                    <h1 className="text-3xl font-bold tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                        The Media Kit Hub
                    </h1>
                </div>

                {/* Search Bar */}
                <CreatorSearch className="max-w-2xl mx-auto" />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-sm text-muted-foreground">Featured Creators</span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* The mock data fallback note was removed for a cleaner UI */}

            {!creatorsData || creatorsData.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center border rounded-xl border-dashed p-8">
                    <h3 className="text-xl font-medium mb-2">No creators found</h3>
                    <p className="text-muted-foreground">Check back later for new featured creators.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {await Promise.all(creatorsData.map(async (creator) => {
                        // Dynamically load media assets from filesystem overriding mock
                        const { scatterImages } = await getCreatorScatterAssets(creator.username || "");
                        let previewImages = (scatterImages || [])
                            .filter(url => !url.match(/\.(mp4|mov|webm)$/i))
                            .slice(0, 3);
                        
                        // Fallback to category grid if no scatter images exist
                        if (previewImages.length === 0) {
                            const dynamicAssets = await getCreatorPortfolioAssets(creator.username || "");
                            previewImages = dynamicAssets
                                .filter(a => typeof a.url === 'string' && !a.url.toLowerCase().includes('placeholder') && !a.url.match(/\.(mp4|mov|webm)$/i))
                                .map(a => a.url)
                                .slice(0, 3);
                        }

                        const avatar = creator.avatar;

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
                                avatar={avatar}
                                images={previewImages.length > 0 ? previewImages : ["/Placeholders/blueplaceholder.png"]}
                                socialStats={socialStats}
                            />
                        );
                    }))}
                </div>
            )}

            {/* Description Section */}
            <div className="mt-16 text-center" style={{ borderTop: "1px solid #1a1a1a", paddingTop: "60px", maxWidth: "800px", margin: "60px auto 0" }}>
                <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight: 1.9, color: "#888", marginBottom: "20px" }}>
                    The Orgnlfake Talent Board is a living tapestry of South African culture. We believe that creativity has no single look, no single background, and no single story. Our roster is a collection of diverse voices—Models, Influencers, and Content Creators who have found a home where their individuality is their greatest asset. We have stripped away the gatekeeping of the 'fake' agency model to provide Brands with direct, data-backed access to our collective.
                </p>
                <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight: 1.9, color: "#888", marginBottom: "20px" }}>
                    Every profile here is a comprehensive <strong style={{ color: "#e8e8e8" }}>Media Kit</strong> built on four unshakeable pillars: <strong style={{ color: "#e8e8e8" }}>Integrated Analytics</strong> that provide a real-time pulse on reach and engagement; a <strong style={{ color: "#e8e8e8" }}>Professional Portfolio</strong> of work shot right here in our studio; a history of <strong style={{ color: "#e8e8e8" }}>Brand Affiliations</strong> that prove industry experience; and transparent, creator-led <strong style={{ color: "#e8e8e8" }}>Rates</strong>.
                </p>
                <p style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight: 1.9, color: "#888", marginBottom: "40px" }}>
                    Many of the faces you see here began their journey with us as beginners. Today, they stand as independent business partners. This isn't just a list of names; it's a directory of empowered partners ready to bring your brand to life with authenticity and data-driven precision.
                </p>
            </div>
        </div>
    );
}
