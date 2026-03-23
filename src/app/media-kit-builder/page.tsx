import { createClient } from "@/lib/supabase/server";
import { generateMockStats, generateMockAudienceData } from "@/lib/mock-data";
import { BackgroundFog } from "@/components/dashboard/background-fog";
import { BuilderTabs } from "@/components/dashboard/builder-tabs";
import { SocialPlatform } from "@/lib/config/social-platforms";

export default async function MediaKitBuilderPage() {
    const supabase = (await createClient()) as any;
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch real connected accounts
    let connectedPlatforms: SocialPlatform[] = [];
    let userProfile: any = null;

    // DEVELOPMENT BYPASS: Provide dummy data if not logged in
    if (!user) {
        connectedPlatforms = ["instagram", "tiktok", "youtube"];
        userProfile = {
            username: "Guest Creator",
            bio: "This is a preview of the Media Kit Builder. Connect your Supabase account to save your real data.",
            profile_image_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop",
            status: "active"
        };
    } else {
        const { data: accounts } = await supabase
            .from("connected_accounts")
            .select("platform")
            .eq("user_id", user.id);

        if (accounts) {
            connectedPlatforms = accounts.map((a: any) => a.platform as SocialPlatform);
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        userProfile = profile;
    }

    // TODO: Fetch real stats if available, otherwise mock
    const stats = generateMockStats("instagram");
    const audienceData = generateMockAudienceData();

    return (
        <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
            <BackgroundFog />

            <div className="relative z-10 container mx-auto px-4 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight glow-blue-text w-fit">Media Kit Builder</h1>
                    <p className="text-muted-foreground mt-2">
                        Customize your professional presence.
                    </p>
                </header>

                <BuilderTabs
                    mockStats={stats}
                    audienceData={audienceData}
                    connectedPlatforms={connectedPlatforms}
                    profile={userProfile}
                />
            </div>
        </div>
    );
}
