import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Check user profile status
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Check if profile exists, if not create one
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('status')
                    .eq('id', user.id)
                    .single();

                if (!profile) {
                    // Create new profile for OAuth users
                    await supabase.from('profiles').insert({
                        id: user.id,
                        username: null,
                        status: 'pending',
                        social_stats: {},
                        rate_card: {},
                        media_assets: [],
                    });

                    return NextResponse.redirect(`${origin}/waiting-room`);
                }

                // Redirect based on status
                if (profile.status === 'pending') {
                    return NextResponse.redirect(`${origin}/waiting-room`);
                } else if (profile.status === 'active') {
                    return NextResponse.redirect(`${origin}${next}`);
                } else {
                    // Suspended or rejected
                    await supabase.auth.signOut();
                    return NextResponse.redirect(`${origin}/login?error=account_suspended`);
                }
            }

            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
