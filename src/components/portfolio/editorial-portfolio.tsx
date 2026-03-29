"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

interface EditorialPortfolioProps {
    username: string;
    mediaAssets: (string | { url: string; category?: string })[];
    heroVideoUrl?: string;
    scatterImages?: string[];
}

/*
 * Positions for scattered thumbnails around the viewport edges.
 * Each position is { top, left, width, height } in % of the viewport,
 * arranged to frame the center text — exactly like the Waabi/Codegrid reference.
 */
const THUMBNAIL_POSITIONS = [
    // Top-left corner
    { top: "2%", left: "1%", w: 100, h: 120 },
    // Top row, slightly right of left
    { top: "3%", left: "16%", w: 110, h: 130 },
    // Top row, right side
    { top: "2%", left: "68%", w: 110, h: 130 },
    // Top-right corner
    { top: "3%", left: "86%", w: 100, h: 120 },

    // Middle-left, upper
    { top: "28%", left: "0%", w: 110, h: 140 },
    // Middle-left, lower
    { top: "52%", left: "3%", w: 105, h: 125 },

    // Middle-right, upper
    { top: "30%", left: "88%", w: 105, h: 130 },
    // Middle-right, lower
    { top: "55%", left: "85%", w: 110, h: 135 },

    // Bottom-left
    { top: "76%", left: "1%", w: 100, h: 120 },
    // Bottom, slightly right of left
    { top: "78%", left: "20%", w: 115, h: 135 },
    // Bottom-right
    { top: "75%", left: "80%", w: 110, h: 130 },
];

export function EditorialPortfolio({ username, mediaAssets, heroVideoUrl, scatterImages }: EditorialPortfolioProps) {
    const initialized = useRef(false);
    // Use state to track the auto-slide offset
    const [offset, setOffset] = React.useState(0);

    // Keep all assets for the masonry grid, no filtering out!
    const images = mediaAssets;

    // Use a pool of images for the scattered grid (upper grid)
    const sourceThumbPool = scatterImages && scatterImages.length > 0 ? scatterImages : images;

    // Auto-slide effect for the 11 thumbnails
    useEffect(() => {
        if (sourceThumbPool.length <= 11) return; // Only slide if we have more than 11 images
        
        const intervalId = setInterval(() => {
            setOffset(prev => (prev + 1) % sourceThumbPool.length);
        }, 3000); // Cycle every 3 seconds

        return () => clearInterval(intervalId);
    }, [sourceThumbPool.length]);

    // Ensure we have enough images for 11 thumbnail positions, cycling through the pool
    const thumbImages = THUMBNAIL_POSITIONS.map((_, i) => {
        const item = sourceThumbPool[(i + offset) % Math.max(1, sourceThumbPool.length)];
        if (typeof item === "string") {
            return { url: item };
        } else if (item) {
            return item;
        } else {
            const PLACEHOLDERS = ["/Placeholders/blueplaceholder.png", "/Placeholders/greenplaceholder.png", "/Placeholders/redplaceholder.png", "/Placeholders/yellowplaceholder.png"];
            return { url: PLACEHOLDERS[i % PLACEHOLDERS.length] };
        }
    });

    const fallbackVideo =
        "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-posing-in-a-studio-setting-34443-large.mp4";
    const heroVideo = heroVideoUrl || fallbackVideo;

    function initAnimations() {
        if (initialized.current) return;
        if (typeof window === "undefined") return;

        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;
        const Lenis = (window as any).Lenis;

        if (!gsap || !ScrollTrigger || !Lenis) return;

        initialized.current = true;
        gsap.registerPlugin(ScrollTrigger);

        // Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        lenis.on("scroll", ScrollTrigger.update);
        const requestAnimationFrameId = gsap.ticker.add((time: number) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        // ——— MAIN TIMELINE ———
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".waabi-pin-wrapper",
                start: "top top",
                end: "+=250%",
                pin: true,
                scrub: 0.6,
            },
        });

        // Phase 1: Hero video scales down from fullscreen to a small thumbnail at top center
        tl.to(
            ".waabi-hero-video",
            {
                scale: 0.12,
                yPercent: -42,
                borderRadius: "32px", // Compensates for scale to still look rounded
                duration: 1.5,
                ease: "power3.inOut",
            },
            0
        );

        // Hero overlay text fades
        tl.to(
            ".waabi-hero-text",
            {
                opacity: 0,
                y: -80,
                duration: 0.5,
                ease: "power2.in",
            },
            0
        );

        // Phase 2: Background transitions from black to cream
        tl.to(
            ".waabi-pin-wrapper",
            {
                backgroundColor: "#f0ede6",
                duration: 1,
                ease: "power2.inOut",
            },
            0.3
        );

        // Phase 3: Thumbnail images fly in from outside
        tl.fromTo(
            ".waabi-thumb",
            {
                scale: 0,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: {
                    each: 0.06,
                    from: "random",
                },
                ease: "back.out(1.4)",
            },
            0.5
        );

        // Phase 4: Center text fades in
        tl.fromTo(
            ".waabi-center-text",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            1.0
        );

        // ——— PARALLAX on the gallery section below ———
        const galleryItems = document.querySelectorAll(".waabi-gallery-item");
        galleryItems.forEach((item, i) => {
            const direction = i % 2 === 0 ? -1 : 1;
            const distance = 30 + (i % 3) * 20;
            gsap.to(item, {
                y: direction * distance,
                scrollTrigger: {
                    trigger: ".waabi-gallery-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }

    function handleScriptLoad() {
        let attempts = 0;
        const tryInit = () => {
            attempts++;
            if (initialized.current) return;
            initAnimations();
            if (!initialized.current && attempts < 30) {
                setTimeout(tryInit, 150);
            }
        };
        tryInit();
    }

    useEffect(() => {
        initAnimations();
    }, []);

    return (
        <>
            {/* CDN Scripts */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
                strategy="afterInteractive"
                onLoad={handleScriptLoad}
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
                strategy="afterInteractive"
                onLoad={handleScriptLoad}
            />
            <Script
                src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.19/bundled/lenis.min.js"
                strategy="afterInteractive"
                onLoad={handleScriptLoad}
            />

            <style jsx global>{`
                /* =============================================
                   WAABI-STYLE: scattered thumbnails + center text
                   ============================================= */

                .waabi-portfolio-root {
                    background: #000;
                    color: #fff;
                    overflow-x: hidden;
                    font-family: 'Inter', -apple-system, sans-serif;
                }

                /* --- Pinned wrapper (hero → scattered grid) --- */
                .waabi-pin-wrapper {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background: #000;
                }

                /* --- Hero video (fullscreen, scales down) --- */
                .waabi-hero-video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    overflow: hidden;
                    transform-origin: center center;
                    background: #000;
                }

                .waabi-hero-video video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .waabi-hero-video::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(0,0,0,0.35) 0%,
                        rgba(0,0,0,0) 40%,
                        rgba(0,0,0,0.6) 100%
                    );
                    pointer-events: none;
                }

                .waabi-hero-text {
                    position: absolute;
                    bottom: 12%;
                    left: 6%;
                    z-index: 15;
                    max-width: 700px;
                }

                .waabi-hero-text h1 {
                    font-size: clamp(2.8rem, 7vw, 5.5rem);
                    font-weight: 300;
                    line-height: 1.05;
                    letter-spacing: -0.03em;
                    margin-bottom: 1.2rem;
                    color: #fff;
                }

                .waabi-hero-text p {
                    font-size: clamp(0.95rem, 1.4vw, 1.15rem);
                    line-height: 1.6;
                    color: rgba(255,255,255,0.7);
                    font-weight: 300;
                }

                /* --- Scattered thumbnail layer --- */
                .waabi-thumbs-layer {
                    position: absolute;
                    inset: 0;
                    z-index: 5;
                    pointer-events: none;
                }

                .waabi-thumb {
                    position: absolute;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
                    opacity: 0;
                    transform: scale(0);
                    pointer-events: auto;
                    will-change: transform, opacity;
                }

                .waabi-thumb-label {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-weight: 600;
                    text-shadow: 0 0 15px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.9);
                    pointer-events: none;
                    text-align: center;
                    width: 90%;
                    padding: 0;
                    opacity: 0.95;
                    z-index: 10;
                }

                .waabi-thumb:hover {
                    z-index: 30;
                }
                
                .waabi-thumb:hover img {
                    transform: scale(1.08);
                }

                .waabi-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    will-change: transform;
                }

                /* --- Center text/image --- */
                .waabi-center-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 20;
                    text-align: center;
                    width: 55%;
                    max-width: 800px;
                    opacity: 0;
                    pointer-events: none;
                }

                .waabi-center-image-wrapper {
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    pointer-events: auto;
                }

                .waabi-center-image {
                    width: 100%;
                    height: auto;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                    opacity: 0.95;
                }

                /* Invisible overlay buttons */
                .waabi-cover-btn {
                    position: absolute;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    z-index: 25;
                    border-radius: 12px;
                    transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    text-decoration: none;
                    display: block;
                }

                .waabi-cover-btn:hover {
                    background: rgba(255, 255, 255, 0.25);
                    box-shadow: 0 0 25px rgba(255, 255, 255, 0.5), 0 0 50px rgba(255, 255, 255, 0.2);
                    backdrop-filter: brightness(1.3) blur(2px);
                }

                /* BOOK ME button — pill shape, top center */
                .waabi-cover-btn--book {
                    top: 18%;
                    left: 33%;
                    width: 14%;
                    height: 12%;
                    border-radius: 20px;
                }

                /* VIEW THE WHOLE PORTFOLIO — large label, center */
                .waabi-cover-btn--portfolio {
                    top: 42%;
                    left: 34%;
                    width: 26%;
                    height: 22%;
                    border-radius: 14px;
                }

                /* GO BACK TO CREATORS — pill shape, right side */
                .waabi-cover-btn--creators {
                    top: 42%;
                    left: 69%;
                    width: 13%;
                    height: 16%;
                    border-radius: 20px;
                }

                /* --- Gallery section (scrollable, below pinned) --- */
                .waabi-gallery-section {
                    position: relative;
                    padding: 100px 0 60px;
                    background: #f0ede6;
                }

                .waabi-gallery-grid {
                    display: flex;
                    gap: 20px;
                    padding: 0 3vw;
                    align-items: flex-start;
                }

                .waabi-gallery-col {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .waabi-gallery-item {
                    width: 100%;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #ddd;
                    will-change: transform;
                }

                .waabi-gallery-item img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    will-change: transform;
                }

                .waabi-gallery-item:hover img {
                    transform: scale(1.04);
                }

                .waabi-gallery-item-tall { aspect-ratio: 2/3; }
                .waabi-gallery-item-wide { aspect-ratio: 4/3; }
                .waabi-gallery-item-sq   { aspect-ratio: 1/1; }

                /* --- Outro --- */
                .waabi-outro {
                    padding: 100px 20px;
                    text-align: center;
                    background: #f0ede6;
                    border-top: 1px solid rgba(0,0,0,0.08);
                }

                .waabi-outro h2 {
                    font-size: 1.6rem;
                    font-weight: 300;
                    color: #1a1a1a;
                    margin-bottom: 14px;
                    letter-spacing: -0.02em;
                }

                .waabi-outro a {
                    color: #8a7350;
                    font-size: 1.05rem;
                    text-decoration: none;
                    border-bottom: 1px solid rgba(138,115,80,0.3);
                    padding-bottom: 2px;
                    transition: border-color 0.3s, color 0.3s;
                }

                .waabi-outro a:hover {
                    border-color: #8a7350;
                    color: #5a4a30;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .waabi-center-text {
                        width: 75%;
                    }

                    .waabi-center-text p {
                        font-size: clamp(1.1rem, 4vw, 1.6rem);
                    }

                    .waabi-hero-video {
                        will-change: transform;
                    }

                    .waabi-hero-text {
                        left: 5%;
                        bottom: 8%;
                    }

                    .waabi-gallery-grid {
                        gap: 10px;
                        padding: 0 2vw;
                    }

                    .waabi-gallery-col {
                        gap: 10px;
                    }
                }
            `}</style>

            <div className="waabi-portfolio-root">

                {/* ====== PINNED SECTION ====== */}
                <div className="waabi-pin-wrapper">

                    {/* Scattered thumbnails layer */}
                    <div className="waabi-thumbs-layer">
                        {thumbImages.map((img, i) => {
                            const pos = THUMBNAIL_POSITIONS[i];
                            return (
                                <div
                                    key={i}
                                    className="waabi-thumb"
                                    style={{
                                        top: pos.top,
                                        left: pos.left,
                                        width: `${pos.w}px`,
                                        height: `${pos.h}px`,
                                    }}
                                >
                                    <Image
                                        src={img.url}
                                        alt={`${username} work ${i + 1}`}
                                        fill
                                        sizes="120px"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Center image (appears after hero shrinks) */}
                    <div className="waabi-center-text">
                        <div className="waabi-center-image-wrapper">
                            <Image
                                src="/covers/cover1.jpg"
                                alt="Orgnlfake cover"
                                width={1312}
                                height={529}
                                className="waabi-center-image"
                            />
                            {/* Invisible overlay buttons */}
                            <a
                                href={`mailto:bookings@orgnlfake.agency?subject=Booking%20${username}`}
                                className="waabi-cover-btn waabi-cover-btn--book"
                                aria-label="Book Me"
                            />
                            <a
                                href="#gallery"
                                className="waabi-cover-btn waabi-cover-btn--portfolio"
                                aria-label="View the whole portfolio"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('.waabi-gallery-section')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            />
                            <a
                                href="/talent"
                                className="waabi-cover-btn waabi-cover-btn--creators"
                                aria-label="Go back to creators"
                            />
                        </div>
                    </div>

                    {/* Hero video (starts fullscreen, scales to tiny) */}
                    <div className="waabi-hero-video">
                        <video autoPlay muted loop playsInline preload="metadata">
                            <source src={heroVideo} type="video/mp4" />
                        </video>
                        <div className="waabi-hero-text">
                            <h1>@{username}</h1>
                            <p>
                                A curated collection of creative work — capturing style,
                                movement, and storytelling through editorial photography
                                and motion.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ====== SCROLLABLE GALLERY ====== */}
                <section className="waabi-gallery-section">
                    <div className="waabi-gallery-grid">
                        {[0, 1, 2, 3].map((colIdx) => {
                            const colItems = images.filter((_, i) => i % 4 === colIdx);
                            // Pad if needed
                            while (colItems.length < 3) {
                                const PLACEHOLDERS = ["/Placeholders/blueplaceholder.png", "/Placeholders/greenplaceholder.png", "/Placeholders/redplaceholder.png", "/Placeholders/yellowplaceholder.png"];
                                colItems.push(
                                    PLACEHOLDERS[(colIdx * 10 + colItems.length) % PLACEHOLDERS.length]
                                );
                            }
                            const aspects = [
                                "waabi-gallery-item-tall",
                                "waabi-gallery-item-wide",
                                "waabi-gallery-item-sq",
                            ];
                            return (
                                <div key={colIdx} className="waabi-gallery-col">
                                    {colItems.map((item, imgIdx) => {
                                        const src = typeof item === "string" ? item : item.url;
                                        const category = typeof item === "string" ? null : item.category;
                                        const needsBlur = category && (category.toLowerCase().includes("boudoir") || category.toLowerCase().includes("lingerie"));
                                        const blurStyle = needsBlur ? { filter: 'blur(12px)', transform: 'scale(1.1)' } : {};
                                        return (
                                            <div
                                                key={imgIdx}
                                                className={`waabi-gallery-item ${aspects[(colIdx + imgIdx) % 3]} relative group`}
                                            >
                                                {category ? (
                                                    <Link href={`/${username}/portfolio/${encodeURIComponent(category)}`} className="block w-full h-full relative cursor-pointer">
                                                        {src.match(/\.(mp4|mov|webm)$/i) ? (
                                                            <video
                                                                src={src}
                                                                autoPlay
                                                                muted
                                                                loop
                                                                playsInline
                                                                className="w-full h-full object-cover"
                                                                style={blurStyle}
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={src}
                                                                alt={`${username} portfolio ${category}`}
                                                                fill
                                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                                style={{ objectFit: 'cover', ...blurStyle }}
                                                            />
                                                        )}
                                                        <div className="waabi-thumb-label">
                                                            {category}
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    <>
                                                        {src.match(/\.(mp4|mov|webm)$/i) ? (
                                                            <video
                                                                src={src}
                                                                autoPlay
                                                                muted
                                                                loop
                                                                playsInline
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={src}
                                                                alt={`${username} portfolio ${colIdx * 3 + imgIdx + 1}`}
                                                                fill
                                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ====== OUTRO ====== */}
                <div className="waabi-outro">
                    <h2>Bookings &amp; Inquiries</h2>
                    <a
                        href={`mailto:bookings@orgnlfake.agency?subject=Booking%20${username}`}
                    >
                        bookings@orgnlfake.agency
                    </a>
                </div>
            </div>
        </>
    );
}
