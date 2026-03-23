"use client";

import React, { useEffect, useRef } from "react";
import Script from "next/script";
import Image from "next/image";

interface EditorialPortfolioProps {
    username: string;
    mediaAssets: string[];
    heroVideoUrl?: string;
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

export function EditorialPortfolio({ username, mediaAssets, heroVideoUrl }: EditorialPortfolioProps) {
    const initialized = useRef(false);

    // Separate images from videos
    const videoExtensions = [".mp4", ".mov", ".webm"];
    const images = mediaAssets.filter(
        (url) => !videoExtensions.some((ext) => url.toLowerCase().endsWith(ext))
    );

    // Ensure we have enough images for 12 thumbnail positions
    const thumbImages: string[] = [];
    for (let i = 0; i < THUMBNAIL_POSITIONS.length; i++) {
        thumbImages.push(images[i % images.length] || `https://picsum.photos/200/${250 + i}`);
    }

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

                /* --- Center text --- */
                .waabi-center-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 20;
                    text-align: center;
                    width: 42%;
                    max-width: 520px;
                    opacity: 0;
                    pointer-events: none;
                }

                .waabi-center-text p {
                    font-family: 'Georgia', 'Times New Roman', serif;
                    font-style: italic;
                    font-size: clamp(1.4rem, 2.8vw, 2.2rem);
                    line-height: 1.45;
                    color: #1a1a1a;
                    font-weight: 400;
                    letter-spacing: -0.01em;
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
                        {thumbImages.map((src, i) => {
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
                                        src={src}
                                        alt={`${username} work ${i + 1}`}
                                        fill
                                        sizes="120px"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Center text (appears after hero shrinks) */}
                    <div className="waabi-center-text">
                        <p>
                            Fragments of motion and atmosphere gathered into a drifting
                            collection of quiet visual moments.
                        </p>
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
                            const colImages = images.filter((_, i) => i % 4 === colIdx);
                            // Pad if needed
                            while (colImages.length < 3) {
                                colImages.push(
                                    `https://picsum.photos/400/${610 + colIdx * 10 + colImages.length}`
                                );
                            }
                            const aspects = [
                                "waabi-gallery-item-tall",
                                "waabi-gallery-item-wide",
                                "waabi-gallery-item-sq",
                            ];
                            return (
                                <div key={colIdx} className="waabi-gallery-col">
                                    {colImages.map((src, imgIdx) => (
                                        <div
                                            key={imgIdx}
                                            className={`waabi-gallery-item ${aspects[(colIdx + imgIdx) % 3]}`}
                                        >
                                            <Image
                                                src={src}
                                                alt={`${username} portfolio ${colIdx * 3 + imgIdx + 1}`}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    ))}
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
