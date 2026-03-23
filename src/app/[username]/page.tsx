import { createClient } from "@/lib/supabase/server";
import { ProfileHeader } from "@/components/profile/profile-header";
import { RateCardDisplay } from "@/components/profile/rate-card-display";
import { InstagramAnalytics } from "@/components/profile/instagram-analytics";
import { generateAnalyticsData } from "@/lib/generate-analytics";
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

    const supabase = (await createClient()) as any;

    // Mock data fallback (matches talent page)
    const mockProfiles: Record<string, any> = {
        "gorg_fox.rsa": {
            username: "gorg_fox.rsa",
            social_stats: { followers: 37000, engagement_rate: "6.2%", total_reach: 55000 },
            rate_card: [],
        },
        "momobabes21": {
            username: "momobabes21",
            social_stats: { followers: 64000, engagement_rate: "8.1%", total_reach: 95000 },
            rate_card: [],
        },
        "lion.paballo": {
            username: "lion.paballo",
            social_stats: { followers: 89000, engagement_rate: "5.4%", total_reach: 135000 },
            rate_card: [],
        },
        "barbiie.stallion": {
            username: "barbiie.stallion",
            social_stats: { followers: 323000, engagement_rate: "4.8%", total_reach: 500000 },
            rate_card: [],
        },
        "boity_tlhasi": {
            username: "boity_tlhasi",
            social_stats: { followers: 2709, engagement_rate: "8.5%", total_reach: 4100 },
            rate_card: [],
        },
        "koketso_.m_": {
            username: "koketso_.m_",
            social_stats: { followers: 15000, engagement_rate: "6.2%", total_reach: 22000 },
            rate_card: [],
        },
        "zeloew": {
            username: "zeloew",
            social_stats: { followers: 9895, engagement_rate: "7.1%", total_reach: 14500 },
            rate_card: [],
        },
        "luciazizipho": {
            username: "luciazizipho",
            social_stats: { followers: 17000, engagement_rate: "5.8%", total_reach: 25000 },
            rate_card: [],
        },
        "thandeka_palesa": {
            username: "thandeka_palesa",
            social_stats: { followers: 57000, engagement_rate: "4.5%", total_reach: 82000 },
            rate_card: [],
        },
        "taunyane_tumisang": {
            username: "taunyane_tumisang",
            social_stats: { followers: 72000, engagement_rate: "4.2%", total_reach: 105000 },
            rate_card: [],
        },
        "_booysen": {
            username: "_booysen",
            social_stats: { followers: 12500, engagement_rate: "6.5%", total_reach: 18000 },
            rate_card: [],
        },
        "__bellaswrld": {
            username: "__bellaswrld",
            social_stats: { followers: 24000, engagement_rate: "5.8%", total_reach: 36000 },
            rate_card: [],
        },
        "they_adore_tshego": {
            username: "they_adore_tshego",
            social_stats: { followers: 41000, engagement_rate: "7.2%", total_reach: 62000 },
            rate_card: [],
        },
    };

    // Fetch profile from Supabase, fall back to mock data
    let profileData: any;
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", decodedUsername)
        .single();

    if (error || !profile) {
        console.warn(`Supabase fetch failed for ${decodedUsername}, trying mock data...`, error);
        const mockProfile = mockProfiles[decodedUsername];
        if (!mockProfile) {
            notFound();
        }
        profileData = mockProfile;
    } else {
        profileData = profile;
    }

    // Cast JSONB fields to appropriate types
    const socialStats: any = profileData.social_stats || {};
    const rateCard: any = profileData.rate_card || [];

    const mockAvatars: Record<string, string> = {
        "gorg_fox.rsa": "/images/profiles/gorg_fox.rsa.jpg",
        "momobabes21": "/images/profiles/momobabes21.jpg",
        "boity_tlhasi": "/images/profiles/boity_tlhasi.jpg",
        "koketso_.m_": "/images/profiles/koketso_.m_.jpg",
        "zeloew": "/images/profiles/zeloew.jpg",
        "luciazizipho": "/images/profiles/luciazizipho.jpg",
        "thandeka_palesa": "/images/profiles/thandeka_palesa.jpg",
        "taunyane_tumisang": "/images/profiles/taunyane_tumisang.jpg",
        "lion.paballo": "/media/photos/lion_paballo.jpg",
        "barbiie.stallion": "/media/photos/barbiie_stallion.jpg",
        "_booysen": "/Profile photos/@_booysen.jpg",
        "__bellaswrld": "/Profile photos/@__bellaswrld.jpg",
        "they_adore_tshego": "/Profile photos/@they_adore_tshego.jpg",
    };

    const avatarUrl = profileData.avatar_url || mockAvatars[decodedUsername] || null;

    // Generate estimated Instagram analytics from the creator's social stats
    const analyticsData = generateAnalyticsData(
        {
            followers: socialStats.followers,
            engagement_rate: socialStats.engagement_rate,
            total_reach: socialStats.total_reach,
        },
        decodedUsername
    );

    return (
        <div className="min-h-screen pb-20">
            {/* Hero / Header Section */}
            <div className="relative pt-24 pb-12 overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <ProfileHeader
                        username={profileData.username || decodedUsername}
                        bio={null}
                        stats={{
                            followers: socialStats.followers,
                            engagement_rate: socialStats.engagement_rate,
                            total_reach: socialStats.total_reach
                        }}
                        avatarUrl={avatarUrl}
                        className="mb-12"
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content: Rate Card + Analytics */}
                        <div className="lg:col-span-2 space-y-8">
                            <RateCardDisplay rateCard={rateCard} />

                            {/* Instagram Analytics Graph */}
                            <InstagramAnalytics
                                analytics={analyticsData}
                                username={decodedUsername}
                            />
                        </div>

                        {/* Sidebar / Actions */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-6 rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm sticky top-24">
                                <h3 className="text-lg font-medium text-white mb-4">Interested in working with me?</h3>
                                <Link
                                    href={`/${decodedUsername}/portfolio`}
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
