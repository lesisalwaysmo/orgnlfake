"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
    {
        id: 1,
        icon: "✦",
        title: "Creative Direction",
        description:
            "We provide high-end creative direction rooted in the power of a collective. Our creators arrive on your set ready to contribute—not just stand still.",
        bgColor: "#1a1812",
        accentColor: "#c9a86c",
        textColor: "#e8e8e8",
        frontBgPosition: "left center",
    },
    {
        id: 2,
        icon: "◈",
        title: "Bulk Booking",
        description:
            "Streamlined solutions for 10+, 20+, or 50+ creators for cohesive seasonal launches. We solve the logistical headaches of the South African retail market.",
        bgColor: "#111111",
        accentColor: "#c9a86c",
        textColor: "#e8e8e8",
        frontBgPosition: "33% center",
    },
    {
        id: 3,
        icon: "⬡",
        title: "E-Commerce at Scale",
        description:
            "We specialize in large-scale e-commerce and retail solutions where consistency and volume are key—executed with cultural nuance third-party agencies cannot match.",
        bgColor: "#0d0d0d",
        accentColor: "#c9a86c",
        textColor: "#e8e8e8",
        frontBgPosition: "66% center",
    },
    {
        id: 4,
        icon: "◎",
        title: "Brand Alignment",
        description:
            "By choosing Orgnlfake, brands align with a socially conscious movement that prioritizes women's empowerment, cultural diversity, and shared publishing rights.",
        bgColor: "#161413",
        accentColor: "#c9a86c",
        textColor: "#e8e8e8",
        frontBgPosition: "right center",
    },
];

// Local image uploaded to /public
const mainImage = "/servicespic.png";

export default function WhatWeOfferScroll() {
    const stickyRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const mm = gsap.matchMedia();

        // ─── ALL SCREEN SIZES ───
        mm.add("all", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stickyRef.current,
                    start: "top top",
                    end: "+=500%",
                    pin: true,
                    scrub: 1,
                },
            });

            // PHASE 1: Header fades out, container expands
            tl.to(headerRef.current, { opacity: 0, y: -40, duration: 1 }, 0);
            tl.to(containerRef.current, { width: "100%", duration: 1 }, 0);

            // PHASE 2: Gap opens, corners round
            tl.to(containerRef.current, { gap: "16px", duration: 1 }, 1.5);
            tl.to(cardsRef.current[0], { borderTopRightRadius: "20px", borderBottomRightRadius: "20px", duration: 1 }, 1.5);
            tl.to(cardsRef.current[1], { borderRadius: "20px", duration: 1 }, 1.5);
            tl.to(cardsRef.current[2], { borderRadius: "20px", duration: 1 }, 1.5);
            tl.to(cardsRef.current[3], { borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", duration: 1 }, 1.5);

            // PHASE 3: 3D flip + tilt
            tl.to(cardsRef.current, { rotateY: 180, duration: 2, stagger: 0.2, ease: "sine.inOut" }, 3);
            tl.to(cardsRef.current[0], { y: 28, rotationZ: -10, duration: 2, ease: "sine.inOut" }, 3);
            tl.to(cardsRef.current[1], { y: 14, rotationZ: -4, duration: 2, ease: "sine.inOut" }, 3.15);
            tl.to(cardsRef.current[2], { y: 14, rotationZ: 4, duration: 2, ease: "sine.inOut" }, 3.3);
            tl.to(cardsRef.current[3], { y: 28, rotationZ: 10, duration: 2, ease: "sine.inOut" }, 3.45);

            return () => { tl.kill(); };
        });

        return () => {
            mm.revert();
        };
    }, []);

    return (
        <section className="relative w-full" style={{ height: "600vh", background: "#080808" }}>
            <div
                ref={stickyRef}
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
                style={{ background: "#080808" }}
            >
                {/* Section header */}
                <div
                    ref={headerRef}
                    className="absolute z-20 text-center px-4"
                    style={{ top: "6%" }}
                >
                    <span
                        style={{
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5em",
                            color: "#c9a86c",
                            opacity: 0.8,
                            display: "block",
                            marginBottom: "16px",
                        }}
                    >
                        Our Methodology
                    </span>
                    <h2
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                            fontWeight: 300,
                            color: "#fff",
                            letterSpacing: "-0.01em",
                            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                        }}
                    >
                        What We Offer
                    </h2>
                </div>

                {/* Cards Container — horizontal on all screens */}
                <div
                    ref={containerRef}
                    style={{
                        display: "flex",
                        width: "88%",
                        perspective: "1200px",
                        transform: "translateY(5%)",
                        gap: "0px",
                    }}
                    className="flex-row aspect-[21/8]"
                >
                    {pillars.map((pillar, idx) => (
                        <div
                            key={pillar.id}
                            ref={(el) => { cardsRef.current[idx] = el; }}
                            style={{
                                position: "relative",
                                flex: 1,
                                width: "100%",
                                height: "100%",
                                transformStyle: "preserve-3d",
                                transformOrigin: "center center",
                                cursor: "default",
                                minHeight: 0,
                                /* Only outer edges rounded */
                                borderTopLeftRadius: idx === 0 ? "20px" : "0px",
                                borderBottomLeftRadius: idx === 0 ? "20px" : "0px",
                                borderTopRightRadius: idx === 3 ? "20px" : "0px",
                                borderBottomRightRadius: idx === 3 ? "20px" : "0px",
                            }}
                        >
                            {/* FRONT — image slice */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    overflow: "hidden",
                                    borderRadius: "inherit",
                                    backgroundImage: `url(${mainImage})`,
                                    backgroundSize: "400% 100%",
                                    backgroundPosition: pillar.frontBgPosition,
                                    backgroundRepeat: "no-repeat",
                                }}
                            />

                            {/* BACK — pillar content */}
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    backfaceVisibility: "hidden",
                                    WebkitBackfaceVisibility: "hidden",
                                    borderRadius: "inherit",
                                    transform: "rotateY(180deg)",
                                    backgroundColor: pillar.bgColor,
                                    border: "1px solid #1e1e1e",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                    boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                                    overflow: "hidden",
                                }}
                                className="p-[clamp(8px,1.5vw,16px)] min-[1000px]:p-[clamp(16px,3vw,40px)]"
                            >
                                {/* Card number */}
                                <span
                                    style={{
                                        position: "absolute",
                                        fontFamily: "monospace",
                                        opacity: 0.4,
                                        color: pillar.accentColor,
                                        letterSpacing: "0.1em",
                                    }}
                                    className="top-1.5 right-1.5 text-[8px] min-[1000px]:top-[clamp(10px,2vw,24px)] min-[1000px]:right-[clamp(10px,2vw,24px)] min-[1000px]:text-[11px]"
                                >
                                    0{pillar.id}
                                </span>

                                {/* Icon */}
                                <div
                                    style={{ color: pillar.accentColor }}
                                    className="text-[12px] mb-1 min-[1000px]:text-[clamp(18px,2vw,26px)] min-[1000px]:mb-[clamp(6px,1vw,18px)]"
                                >
                                    {pillar.icon}
                                </div>

                                {/* Title */}
                                <h3
                                    style={{
                                        fontWeight: 500,
                                        textTransform: "uppercase",
                                        color: "#ffffff",
                                        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                                    }}
                                    className="text-[0.45rem] tracking-[0.05em] mb-0.5 leading-[1.2] min-[1000px]:text-[clamp(0.75rem,1.1vw,1rem)] min-[1000px]:tracking-[0.07em] min-[1000px]:mb-[clamp(4px,0.8vw,14px)] min-[1000px]:leading-normal"
                                >
                                    {pillar.title}
                                </h3>

                                {/* Description */}
                                <p
                                    style={{
                                        color: "#666",
                                        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                                    }}
                                    className="text-[0.4rem] leading-[1.4] line-clamp-6 min-[1000px]:text-[clamp(0.65rem,0.9vw,0.85rem)] min-[1000px]:leading-[1.6] min-[1000px]:line-clamp-none overflow-hidden"
                                >
                                    {pillar.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
