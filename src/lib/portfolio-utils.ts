import fs from 'fs';
import path from 'path';

export const RESTRICTED_CATEGORIES = [
    "Boudoir",
    "Lingerie",
    "Conceptual",
    "Artistic",
    "Swimwear"
];

const CATEGORIES = [
    { name: "Beauty", folder: "Beauty" },
    { name: "Boudoir", folder: "Boudoir" },
    { name: "Commercial", folder: "Commercial" },
    { name: "Conceptual : Artistic", folder: "Conceptual : Artistic" },
    { name: "Cultural : Identity", folder: "Cultural : Identity" },
    { name: "Fashion Editorial", folder: "Fashion Editorial" },
    { name: "Fitness : Sport", folder: "Fitness : Sport" },
    { name: "Influencer : Social", folder: "Influencer : Social" },
    { name: "Lifestyle", folder: "Lifestyle" },
    { name: "Lingerie : Swimwear", folder: "Lingerie : Swimwear" },
    { name: "Street Style", folder: "Street Style" },
    { name: "MOTION PICTURE", folder: "Motion picture" }, 
];

const PLACEHOLDERS = [
    "/Placeholders/blueplaceholder.png",
    "/Placeholders/greenplaceholder.png",
    "/Placeholders/redplaceholder.png",
    "/Placeholders/yellowplaceholder.png",
];

export async function getCreatorPortfolioAssets(username: string) {
    const dirName = username.startsWith('@') ? username : `@${username}`;
    const baseDir = path.join(process.cwd(), 'public', 'Creators Portfolios', dirName);
    
    const mediaAssets: { url: string; category: string }[] = [];
    const creatorExists = fs.existsSync(baseDir);

    let looseVideos: string[] = [];
    
    if (creatorExists) {
        try {
            const rootFiles = fs.readdirSync(baseDir, { withFileTypes: true });
            rootFiles.forEach(dirent => {
                if (dirent.isFile() && !dirent.name.startsWith('.')) {
                    if (/\.(mp4|mov|webm)$/i.test(dirent.name)) {
                        looseVideos.push(dirent.name);
                    }
                }
            });
        } catch (e) {
            console.error("Error reading root directory:", e);
        }
    }

    CATEGORIES.forEach((cat, index) => {
        let assignedUrl: string | null = null;
        
        // We ALWAYS draw a cover from the folder natively, regardless of its restrictions, as per user specification.
        if (creatorExists) {
            const catDir = path.join(baseDir, cat.folder);
            if (fs.existsSync(catDir)) {
                try {
                    const files = fs.readdirSync(catDir);
                    const mediaFiles = files.filter(f => /\.(jpg|jpeg|png|webp|mp4|mov|webm)$/i.test(f) && !f.startsWith('.'));
                    
                    if (mediaFiles.length > 0) {
                        assignedUrl = `/Creators%20Portfolios/${encodeURIComponent(dirName)}/${encodeURIComponent(cat.folder)}/${encodeURIComponent(mediaFiles[0])}`;
                    }
                } catch (e) {
                    console.error(`Error reading directory ${catDir}:`, e);
                }
            }
        }
        
        // If the 'Motion picture' folder is empty but a loose video exists in root, use it as the cover
        if (!assignedUrl && cat.name.toLowerCase() === "motion picture" && looseVideos.length > 0) {
            assignedUrl = `/Creators%20Portfolios/${encodeURIComponent(dirName)}/${encodeURIComponent(looseVideos.shift()!)}`;
        }

        // Final fallback to colored placeholder
        if (!assignedUrl) {
            assignedUrl = PLACEHOLDERS[index % PLACEHOLDERS.length];
        }

        mediaAssets.push({
            url: assignedUrl,
            category: cat.name
        });
    });

    return mediaAssets;
}

export async function getCategoryGalleryImages(username: string, categoryDecoded: string) {
    const dirName = username.startsWith('@') ? username : `@${username}`;
    
    // Find the right category folder name
    const catDef = CATEGORIES.find(c => c.name.toLowerCase() === categoryDecoded.toLowerCase());
    if (!catDef) return [];

    const catDir = path.join(process.cwd(), 'public', 'Creators Portfolios', dirName, catDef.folder);
    const mediaAssets: { url: string; category: string }[] = [];

    if (fs.existsSync(catDir)) {
        try {
            const files = fs.readdirSync(catDir);
            const mediaFiles = files.filter(f => /\.(jpg|jpeg|png|webp|mp4|mov|webm)$/i.test(f) && !f.startsWith('.'));
            mediaFiles.forEach(file => {
                mediaAssets.push({
                    url: `/Creators%20Portfolios/${encodeURIComponent(dirName)}/${encodeURIComponent(catDef.folder)}/${encodeURIComponent(file)}`,
                    category: catDef.name
                });
            });
        } catch (e) {}
    }
    return mediaAssets;
}

export async function getCreatorScatterAssets(username: string) {
    const dirName = username.startsWith('@') ? username : `@${username}`;
    const baseDir = path.join(process.cwd(), 'public', 'Creators Portfolios', dirName);
    
    const scatterImages: string[] = [];
    let heroVideoUrl: string | null = null;
    
    if (fs.existsSync(baseDir)) {
        try {
            const rootFiles = fs.readdirSync(baseDir, { withFileTypes: true });
            rootFiles.forEach(dirent => {
                if (dirent.isFile() && !dirent.name.startsWith('.')) {
                    if (/\.(mp4|mov|webm)$/i.test(dirent.name)) {
                        if (!heroVideoUrl) {
                            heroVideoUrl = `/Creators%20Portfolios/${encodeURIComponent(dirName)}/${encodeURIComponent(dirent.name)}`;
                        }
                    } else if (/\.(jpg|jpeg|png|webp)$/i.test(dirent.name)) {
                        scatterImages.push(`/Creators%20Portfolios/${encodeURIComponent(dirName)}/${encodeURIComponent(dirent.name)}`);
                    }
                }
            });
        } catch (e) {
            console.error("Error reading root directory:", e);
        }
    }

    return { scatterImages, heroVideoUrl };
}
