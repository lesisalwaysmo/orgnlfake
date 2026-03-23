export type MediaType = 'image' | 'video';

export interface PortfolioProject {
    id: string;
    title: string;
    year: string;
    type: MediaType;
    src: string;
}

// 33 actual photos from public/media/photos/ (excluding .DS_Store)
const photos = [
    '/media/photos/1771871549700.jpeg',
    '/media/photos/1771871549700_1.jpeg',
    '/media/photos/1771871554756.jpeg',
    '/media/photos/1771871576699.jpeg',
    '/media/photos/1771871586549.jpeg',
    '/media/photos/505997536_10021452084637537_3772584361098111414_n.jpg',
    '/media/photos/509363616_23869832582706253_661189166926347597_n_1.jpg',
    '/media/photos/509369517_23870807502608761_7712008318399193067_n.jpg',
    '/media/photos/510739738_23874207035602141_2899064520723821852_n_1.jpg',
    '/media/photos/510979769_3859290037550394_1243527447896608524_n_1.jpg',
    '/media/photos/58769482_631323703962206.jpg',
    '/media/photos/IMG_0360.jpg',
    '/media/photos/_MG_0033.jpg',
    '/media/photos/_MG_0049.jpg',
    '/media/photos/_MG_0064.jpg',
    '/media/photos/_MG_0089.jpg',
    '/media/photos/_MG_0273.jpg',
    '/media/photos/_MG_0489.jpg',
    '/media/photos/_MG_0494.jpg',
    '/media/photos/_MG_0506.jpg',
    '/media/photos/bokgabane_thamare_1569517120_2141587287551777564_1806318688.jpg',
    '/media/photos/bokgabane_thamare_1616470041_2535456934228923747_1806318688.jpg',
    '/media/photos/bokgabane_thamare_1618133445_2549410579211492081_1806318688.jpg',
    '/media/photos/bokgabane_thamare_1632425540_2669301357070131930_1806318688.jpg',
    '/media/photos/freepik__photo-a-19yearold-black-female-with-curly-dark-hai__61286.jpeg',
    '/media/photos/freepik__photo-a-20yearold-asian-woman-with-long-brown-hair__61285.jpeg',
    '/media/photos/freepik__photo-a-22yearold-black-woman-with-dreadlocks-wear__19197.png',
    '/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30018.png',
    '/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30019.png',
    '/media/photos/freepik__the-model-in-img2-is-dressed-in-the-exact-outfit-f__30020.png',
    '/media/photos/hhhhvjcufcururfj.jpg',
    '/media/photos/jvskdvsad.jpg',
    '/media/photos/pexels-andrew-neel-7932264_upscayl_16x_realesrgan-x4plus.png',
];

// 12 actual videos from public/media/videos/ (excluding .DS_Store)
const videos = [
    '/media/videos/0304.mp4',
    '/media/videos/0304(1).mp4',
    '/media/videos/0304(2).mp4',
    '/media/videos/0304(3).mp4',
    '/media/videos/0304(4).mp4',
    '/media/videos/0304(5).mp4',
    '/media/videos/0304(6).mp4',
    '/media/videos/0304(7).mp4',
    '/media/videos/0305.mp4',
    '/media/videos/0310_bbbbb.mp4',
    '/media/videos/0310_web.mp4',
    '/media/videos/0310_web_2.mp4',
];

// Interleave them to make exactly 45 items (9 rows of 5)
// Roughly 3 photos then 1 video pattern matches the ratio 33:12
export const portfolioData: PortfolioProject[] = (() => {
    const items: PortfolioProject[] = [];
    let pIdx = 0;
    let vIdx = 0;
    let id = 1;

    while (pIdx < photos.length || vIdx < videos.length) {
        // Add 3 photos
        for (let i = 0; i < 3; i++) {
            if (pIdx < photos.length) {
                items.push({
                    id: `proj-${id++}`,
                    title: `Project ${id - 1}`,
                    year: '2025',
                    type: 'image',
                    src: photos[pIdx++],
                });
            }
        }
        // Add 1 video
        if (vIdx < videos.length) {
            items.push({
                id: `proj-${id++}`,
                title: `Project ${id - 1}`,
                year: '2025',
                type: 'video',
                src: videos[vIdx++],
            });
        }
    }

    // Double check: if it stopped before 45 for some reason, just loop the arrays
    while (items.length < 45) {
        const type = items.length % 4 === 0 ? 'video' : 'image';
        items.push({
            id: `proj-${id++}`,
            title: `Project ${id - 1}`,
            year: '2025',
            type,
            src: type === 'video'
                ? videos[vIdx++ % videos.length]
                : photos[pIdx++ % photos.length]
        });
    }

    let finalItems = items.slice(0, 45);

    // Helper to swap two items by their 1-based index (e.g. "Project 1" is at index 0)
    const swap = (idxA: number, idxB: number) => {
        // adjust to 0-based index
        const a = idxA - 1;
        const b = idxB - 1;

        if (a >= 0 && a < finalItems.length && b >= 0 && b < finalItems.length) {
            const temp = finalItems[a];
            finalItems[a] = finalItems[b];
            finalItems[b] = temp;
        }
    };

    // Requested swaps:
    // 4 with 2
    swap(4, 2);
    // 1 with 6
    swap(1, 6);
    // 44 with 19
    swap(44, 19);
    // 45 with 16
    swap(45, 16);
    // 36 with 43
    swap(36, 43);

    // Explicitly set project 43 to use project43.png
    const proj43 = finalItems.find(p => p.title === 'Project 43');
    if (proj43) {
        proj43.src = '/media/photos/project43.png';
        proj43.type = 'image';
    }

    return finalItems;
})();
