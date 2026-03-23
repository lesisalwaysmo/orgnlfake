import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * CONSTRUCTION MODE
 * ─────────────────
 * Set to `true`  → all visitors redirected to /construction
 * Set to `false` → normal site operation
 */
const CONSTRUCTION_MODE = true;

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // ── Construction mode gate ──────────────────────────
    if (CONSTRUCTION_MODE) {
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
    return await updateSession(request);
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
