"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// 18 images from the portfolio 2 folder
const IMAGES = [
    { id: 0, src: "/portfolio 2/1234.jpg" },
    { id: 1, src: "/portfolio 2/139610883_1084843505276888_2207708932972902933_n (1).jpg" },
    { id: 2, src: "/portfolio 2/2025-08-02-at-19.jpg" },
    { id: 3, src: "/portfolio 2/2025-08-02-at-20.00.jpg" },
    { id: 4, src: "/portfolio 2/2025-08-05-at-13.jpg" },
    { id: 5, src: "/portfolio 2/509369517_23870807502608761_7712008318399193067_n.jpg" },
    { id: 6, src: "/portfolio 2/77425164_762934027467839_2139241906406686720_n (1).jpg" },
    { id: 7, src: "/portfolio 2/Generated-Image-August-30,-2025---10_08PM.jpg" },
    { id: 8, src: "/portfolio 2/_MG_0089.jpg" },
    { id: 9, src: "/portfolio 2/_MG_0101.jpg" },
    { id: 10, src: "/portfolio 2/_MG_0146.jpg" },
    { id: 11, src: "/portfolio 2/_MG_0166.jpg" },
    { id: 12, src: "/portfolio 2/_MG_0190.jpg" },
    { id: 13, src: "/portfolio 2/jyfyudruur.jpg" },
    { id: 14, src: "/portfolio 2/kilojh.jpg" },
    { id: 15, src: "/portfolio 2/kshbvs.jpg" },
    { id: 16, src: "/portfolio 2/kshgfhugd.jpg" },
    { id: 17, src: "/portfolio 2/siuhdggsd.jpg" },
];

export default function PortfolioGallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const orbitWrapperRef = useRef<HTMLDivElement>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const centerImgRefs = useRef<(HTMLImageElement | null)[]>([]);
    const counterRef = useRef<HTMLSpanElement>(null);
    const prevActiveRef = useRef<number>(0);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const orbitWrapper = orbitWrapperRef.current;
        if (!section || !orbitWrapper) return;

        const total = IMAGES.length;
        const angleStep = (2 * Math.PI) / total;

        const getRadius = () => {
            const vw = window.innerWidth;
            if (vw < 768) return 280;
            return 380;
        };

        const getCardSize = () => {
            const vw = window.innerWidth;
            if (vw < 768) return { w: 180, h: 240 };
            return { w: 240, h: 320 };
        };

        const positionAll = (scrollProgress: number) => {
            const radius = getRadius();
            const card = getCardSize();
            const rotationOffset = scrollProgress * Math.PI * 2;

            let closestIndex = 0;
            let closestDist = Infinity;

            imageRefs.current.forEach((wrapper, i) => {
                if (!wrapper) return;

                const angle = (i * angleStep) + rotationOffset;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                // Depth: right side = front
                const depthFactor = (Math.cos(angle) + 1) / 2;
                const scale = 0.5 + depthFactor * 0.5;
                const opacity = 0.15 + depthFactor * 0.85;
                const zIndex = Math.round(depthFactor * 100);

                gsap.set(wrapper, {
                    x: x - card.w / 2,
                    y: y - card.h / 2,
                    scale,
                    opacity,
                    zIndex,
                });

                const frontDist = Math.abs(Math.cos(angle) - 1);
                if (frontDist < closestDist) {
                    closestDist = frontDist;
                    closestIndex = i;
                }
            });

            // Update center featured image — crossfade to the active one
            if (closestIndex !== prevActiveRef.current) {
                centerImgRefs.current.forEach((img, i) => {
                    if (!img) return;
                    if (i === closestIndex) {
                        gsap.to(img, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
                    } else {
                        gsap.to(img, { opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.in" });
                    }
                });
                prevActiveRef.current = closestIndex;
            }

            if (counterRef.current) {
                counterRef.current.textContent = `${String(closestIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
            }
        };

        // Set initial state: first center image visible, rest hidden
        centerImgRefs.current.forEach((img, i) => {
            if (!img) return;
            gsap.set(img, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.95 });
        });

        positionAll(0);

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "+=5000",
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    positionAll(self.progress);
                },
            });
        }, section);

        const handleResize = () => {
            positionAll(0);
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            ctx.revert();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <style>{`
                .orbit-section {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    background: #0a0a0a;
                    overflow: hidden;
                }

                .orbit-center {
                    position: absolute;
                    top: 50%;
                    left: 62%;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                }

                @media (max-width: 767px) {
                    .orbit-center {
                        left: 58%;
                    }
                }

                .orbit-card {
                    position: absolute;
                    width: 240px;
                    height: 320px;
                    will-change: transform, opacity;
                }

                @media (max-width: 767px) {
                    .orbit-card {
                        width: 180px;
                        height: 240px;
                    }
                }

                .orbit-card img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 6px;
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
                }

                /* Card-sized background featured image — behind the orbit */
                .center-featured {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 620px;
                    height: 615px;
                    z-index: 3;
                    pointer-events: none;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
                }

                @media (max-width: 767px) {
                    .center-featured {
                        width: 280px;
                        height: 380px;
                    }
                }

                .center-featured-img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 0;
                    box-shadow: none;
                    opacity: 0;
                    will-change: transform, opacity;
                }

                .orbit-left-text {
                    position: absolute;
                    left: 6%;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 200;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.5);
                    pointer-events: none;
                }

                .orbit-counter-text {
                    position: absolute;
                    bottom: 6%;
                    right: 8%;
                    z-index: 200;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.85rem;
                    letter-spacing: 0.15em;
                    font-family: monospace;
                    pointer-events: none;
                }
            `}</style>

            <section ref={sectionRef} className="orbit-section">
                {/* Left side text */}
                <div className="orbit-left-text">
                    <p style={{
                        color: "rgba(255,255,255,0.35)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                    }}>
                        Portfolio
                    </p>
                    <h2 style={{
                        color: "#fff",
                        fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontWeight: 300,
                        lineHeight: 1.1,
                        letterSpacing: "-0.03em",
                        margin: 0,
                    }}>
                        Selected<br />Works
                    </h2>
                    <p style={{
                        color: "rgba(255,255,255,0.25)",
                        fontSize: "0.75rem",
                        marginTop: "24px",
                        letterSpacing: "0.12em",
                    }}>
                        Scroll to explore
                    </p>
                </div>

                {/* Center featured image — shows the active orbit image large */}
                <div className="center-featured">
                    {IMAGES.map((img, i) => (
                        <Image
                            key={`center-${img.id}`}
                            ref={(el) => { centerImgRefs.current[i] = el; }}
                            src={img.src}
                            alt={`Featured ${img.id + 1}`}
                            className="center-featured-img"
                            draggable={false}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={i === 0}
                        />
                    ))}
                </div>

                {/* The orbit — images circling on the right side */}
                <div ref={orbitWrapperRef} className="orbit-center">
                    {IMAGES.map((img, i) => (
                        <div
                            key={img.id}
                            ref={(el) => { imageRefs.current[i] = el; }}
                            className="orbit-card"
                        >
                            <Image
                                src={img.src}
                                alt={`Production work ${img.id + 1}`}
                                loading={i < 4 ? "eager" : "lazy"}
                                draggable={false}
                                fill
                                sizes="(max-width: 768px) 180px, 240px"
                            />
                        </div>
                    ))}
                </div>

                {/* Image counter */}
                <div className="orbit-counter-text">
                    <span ref={counterRef}>01 / 18</span>
                </div>
            </section>
        </>
    );
}
