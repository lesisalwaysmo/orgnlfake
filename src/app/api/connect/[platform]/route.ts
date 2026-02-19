import { NextRequest, NextResponse } from "next/server";
import { SOCIAL_PLATFORMS, SocialPlatform } from "@/lib/config/social-platforms";
import { createClient } from "@/lib/supabase/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ platform: string }> }
) {
    const { platform } = await params;

    // 1. Validate Platform
    if (!Object.keys(SOCIAL_PLATFORMS).includes(platform as string)) {
        return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const config = SOCIAL_PLATFORMS[platform as SocialPlatform];
    const clientId = process.env[config.clientIdEnv];

    if (!clientId) {
        return NextResponse.json(
            { error: `Missing configuration for ${platform}` },
            { status: 500 }
        );
    }

    // 2. Security Check (Must be logged in)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 3. Construct OAuth URL
    const state = crypto.randomUUID(); // In production, store this in a cookie/db to verify later
    const redirectUri = config.getRedirectUrl(process.env.NEXT_PUBLIC_SITE_URL!);

    const paramsObj = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: config.scopes.join(" "),
        state: state,
        access_type: "offline", // Request refresh token (where applicable)
        prompt: "consent", // Force consent screen to ensure we get refresh token
    });

    // Unique handling for Twitter code challenge if needed (PKCE), keeping simple for now
    if (platform === "twitter") {
        paramsObj.append("code_challenge", "challenge"); // Placeholder: In real PKCE, this needs actual hashing
        paramsObj.append("code_challenge_method", "plain"); // Should be S256 in prod
    }

    return NextResponse.redirect(`${config.authUrl}?${paramsObj.toString()}`);
}
