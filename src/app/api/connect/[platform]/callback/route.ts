import { NextRequest, NextResponse } from "next/server";
import { SOCIAL_PLATFORMS, SocialPlatform } from "@/lib/config/social-platforms";
import { createClient } from "@/lib/supabase/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ platform: string }> }
) {
    const { platform } = await params;
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // 1. Validate Request
    if (error) {
        return NextResponse.redirect(
            new URL(`/dashboard?error=${platform}_auth_failed`, request.url)
        );
    }

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    if (!Object.keys(SOCIAL_PLATFORMS).includes(platform as string)) {
        return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const config = SOCIAL_PLATFORMS[platform as SocialPlatform];
    const clientId = process.env[config.clientIdEnv];
    const clientSecret = process.env[config.clientSecretEnv];

    if (!clientId || !clientSecret) {
        return NextResponse.json(
            { error: "Server misconfiguration" },
            { status: 500 }
        );
    }

    // 2. Exchange Code for Token
    try {
        const redirectUri = config.getRedirectUrl(process.env.NEXT_PUBLIC_SITE_URL!);

        // Prepare token request params
        const tokenParams = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
        });

        // Twitter requires Basic Auth header usually, but simple POST body works for many
        // Note: Some providers might need specific tweaks here.

        const response = await fetch(config.tokenUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
            },
            body: tokenParams.toString(),
        });

        const tokens = await response.json();

        if (!response.ok) {
            console.error(`${platform} Token Error:`, tokens);
            throw new Error(`Failed to get access token from ${platform}`);
        }

        // 3. Authentication Check
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // 4. Store in Database
        // We map the various possible token field names to our schema
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token; // Might be null
        const expiresIn = tokens.expires_in; // Seconds

        // Calculate expiration date
        let tokenExpiresAt = null;
        if (expiresIn) {
            const date = new Date();
            date.setSeconds(date.getSeconds() + expiresIn);
            tokenExpiresAt = date.toISOString();
        }

        const { error: dbError } = await supabase
            .from("connected_accounts")
            .upsert(
                {
                    user_id: user.id,
                    platform: platform as SocialPlatform,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    token_expires_at: tokenExpiresAt,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: "user_id, platform" }
            );

        if (dbError) {
            console.error("DB Upsert Error:", dbError);
            throw new Error("Failed to save tokens");
        }

        // 5. Success Redirect
        return NextResponse.redirect(
            new URL(`/dashboard?success=${platform}_connected`, request.url)
        );

    } catch (err) {
        console.error("OAuth Callback Error:", err);
        return NextResponse.redirect(
            new URL(`/dashboard?error=${platform}_connection_error`, request.url)
        );
    }
}
