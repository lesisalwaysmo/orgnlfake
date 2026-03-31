import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import db from "@/lib/db";
import AccessRequestForm from "@/components/AccessRequestForm";
import { getCategoryGalleryImages, RESTRICTED_CATEGORIES } from "@/lib/portfolio-utils";
import { PortfolioMasonry } from "@/components/portfolio/portfolio-masonry";

interface CategoryPageProps {
    params: Promise<{
        username: string;
        category: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
    const { username, category } = await params;
    const decodedCategory = decodeURIComponent(category);
    return {
        title: `${decodedCategory} - ${username}'s Portfolio | Orgnlfake`,
        description: `${username}'s ${decodedCategory} photography portfolio`,
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { username, category } = await params;
    const resolvedSearchParams = await searchParams;
    const urlToken = typeof resolvedSearchParams.token === 'string' ? resolvedSearchParams.token : null;
    
    const decodedUsername = decodeURIComponent(username);
    const decodedCategory = decodeURIComponent(category);
    
    const isRestricted = RESTRICTED_CATEGORIES.some(c => 
        decodedCategory.toLowerCase().includes(c.toLowerCase())
    );

    const safeCategoryName = decodedCategory.replace(/[^a-zA-Z0-9]/g, '');
    const cookieName = `access_${decodedUsername}_${safeCategoryName}`; 

    let accessGranted = !isRestricted;
    let linkUsedError = false;
    let invalidTokenError = false;

    if (isRestricted) {
        const cookieStore = await cookies();
        const accessCookie = cookieStore.get(cookieName);

        if (accessCookie) {
            const linkRecord = await db.getTokenRecord(accessCookie.value);
            if (
                linkRecord && 
                linkRecord.creatorUsername === decodedUsername &&
                linkRecord.category === decodedCategory && 
                Date.now() < linkRecord.expiresAt
            ) {
                accessGranted = true;
            }
        }

        if (!accessGranted && urlToken) {
            const linkRecord = await db.getTokenRecord(urlToken);
            if (
                linkRecord && 
                linkRecord.creatorUsername === decodedUsername && 
                linkRecord.category === decodedCategory && 
                Date.now() < linkRecord.expiresAt
            ) {
                if (linkRecord.viewCount < 2) {
                    await db.markTokenAsUsed(urlToken);
                    // Drop the secure creator-specific cookie
                    cookieStore.set({
                        name: cookieName,
                        value: urlToken,
                        expires: new Date(linkRecord.expiresAt),
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        path: '/',
                    });
                    accessGranted = true;
                } else if (!accessCookie) {
                    linkUsedError = true;
                }
            } else {
                invalidTokenError = true;
            }
        }
    }

    let categoryAssets: { url: string; category: string }[] = [];
    if (accessGranted) {
        // Fetch all unfiltered images inside the secure directory
        categoryAssets = await getCategoryGalleryImages(decodedUsername, decodedCategory);
    }

    return (
        <div className="min-h-screen bg-[#f0ede6] text-[#1a1a1a] flex flex-col pt-24 px-6 md:px-12 font-['Inter']">
            <div className="mb-12">
                <Link
                    href={`/${username}/portfolio`}
                    className="inline-flex items-center text-[11px] tracking-[0.2em] uppercase font-semibold hover:opacity-60 transition-opacity"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-center pb-32">
                <p className="text-[11px] text-[#8a7350] tracking-[0.4em] uppercase font-bold mb-4">
                    @{decodedUsername}
                </p>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 uppercase" style={{ textShadow: "0 0 40px rgba(0,0,0,0.05)" }}>
                    {decodedCategory}
                </h1>
                
                {accessGranted ? (
                    categoryAssets.length > 0 ? (
                        <div className="w-full mt-4 max-w-7xl mx-auto px-2">
                            <PortfolioMasonry items={categoryAssets.map((asset, idx) => ({ id: `img-${idx}`, url: asset.url }))} />
                        </div>
                    ) : (
                        <>
                            <p className="text-base md:text-lg opacity-60 max-w-md mx-auto leading-relaxed mt-12">
                                Photographs for this category are currently being curated and will be available soon.
                            </p>
                            <div className="w-16 h-px bg-black mt-10 opacity-20 mx-auto" />
                        </>
                    )
                ) : linkUsedError ? (
                    <div className="text-center mt-6 p-10 max-w-md mx-auto border border-red-500/20 bg-red-50/50 rounded-lg backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-red-600 tracking-tight">Access Denied</h2>
                        <p className="mt-4 opacity-70 text-sm">This link has already been used on another device. Links are strictly single-device.</p>
                    </div>
                ) : invalidTokenError ? (
                    <div className="text-center mt-6 p-10 max-w-md mx-auto border border-red-500/20 bg-red-50/50 rounded-lg backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-red-600 tracking-tight">Link Invalid</h2>
                        <p className="mt-4 opacity-70 text-sm">This access link does not exist, has expired, or is for the wrong portfolio.</p>
                    </div>
                ) : (
                    <div className="w-full">
                        <AccessRequestForm 
                            creatorId={decodedUsername} 
                            category={decodedCategory} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
