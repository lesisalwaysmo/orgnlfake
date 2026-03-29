import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * CONSTRUCTION MODE
 * ─────────────────
 * Set to `true`  → all visitors redirected to /construction
 * Set to `false` → normal site operation
 */
const CONSTRUCTION_MODE = true;

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    const isDeveloperParam = searchParams.get('developer') === 'true';
    const isDeveloperCookie = request.cookies.get('developer_mode')?.value === 'true';
    const isDeveloper = isDeveloperParam || isDeveloperCookie;

    // ── Construction mode gate ──────────────────────────
    if (CONSTRUCTION_MODE && !isDeveloper) {
        const isAllowed =
            pathname === '/construction' ||
            pathname.startsWith('/_next') ||
            pathname.startsWith('/api') ||
            pathname.startsWith('/favicon') ||
            /\.(ico|png|jpg|jpeg|svg|gif|webp|avif|mp4|webm|css|js|woff|woff2|ttf)$/.test(pathname);

        if (!isAllowed) {
            const url = request.nextUrl.clone();
            url.pathname = '/construction';
            return NextResponse.redirect(url);
        }
    }

    // ── Normal Supabase session handling ────────────────
    const response = await updateSession(request);

    // If developer mode is enabled via query param, set a cookie for future requests
    if (isDeveloperParam && !isDeveloperCookie) {
        response.cookies.set('developer_mode', 'true', {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'lax',
        });
    }

    return response;
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
