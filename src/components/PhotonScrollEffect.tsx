'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function PhotonScrollEffect() {
    const containerRef = useRef<HTMLElement>(null);
    const imgContainerRef = useRef<HTMLDivElement>(null);
    const textLeftRef = useRef<HTMLHeadingElement>(null);
    const textRightRef = useRef<HTMLHeadingElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const maskRefs = useRef<(HTMLImageElement | null)[]>([]);

    useGSAP(() => {
        // We create a ScrollTrigger exactly like the tutorial's vanilla JS
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: '+=400%', // Makes the section scroll for 4 full viewport heights
            pin: true,     // Locks the section in place
            scrub: 1,      // Smooth scrubbing
            onUpdate: (self) => {
                const progress = self.progress;

                // 1. Scale the main image container from 0 to 1
                if (imgContainerRef.current) {
                    gsap.set(imgContainerRef.current, { scale: progress });
                }

                // 2. Animate the layered depth masks
                maskRefs.current.forEach((layer, i) => {
                    if (!layer) return;
                    // The top layer starts smallest, creating the trippy 3D stacking effect
                    const initialScale = 0.9 - i * 0.15;
                    const layerProgress = Math.min(progress / 0.9, 1.0);
                    const currentScale = initialScale + layerProgress * (1.0 - initialScale);

                    gsap.set(layer, { scale: currentScale });
                });

                // 3. Move the Intro Text (Surface / Layered) outward
                const textProgress = Math.min(progress / 0.9, 1.0);
                const moveDistance = window.innerWidth * 0.5; // Move half the screen width
                if (textLeftRef.current) {
                    gsap.set(textLeftRef.current, { x: -textProgress * moveDistance });
                }
                if (textRightRef.current) {
                    gsap.set(textRightRef.current, { x: textProgress * moveDistance });
                }

                // 4. Word-by-Word Header Reveal (Free alternative to GSAP SplitText)
                if (headerRef.current) {
                    const headerProgress = Math.max(0, (progress - 0.7) / 0.2);
                    const words = headerRef.current.querySelectorAll('.word');
                    const totalWords = words.length;

                    words.forEach((word, i) => {
                        const startDelay = i / totalWords;
                        const endDelay = (i + 1) / totalWords;
                        let wordOpacity = 0;

                        if (headerProgress >= endDelay) {
                            wordOpacity = 1;
                        } else if (headerProgress >= startDelay) {
                            wordOpacity = (headerProgress - startDelay) / (endDelay - startDelay);
                        }
                        gsap.set(word, { opacity: wordOpacity });
                    });
                }
            },
        });
    }, { scope: containerRef });

    // Custom text for your Photon animation
    const titleWords = "The Photon Wears Confidence".split(" ");

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#e3e3db] text-[#141414] overflow-hidden flex items-center justify-center font-serif"
        >
            {/* Pushing Intro Text */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between px-[15%] z-10 pointer-events-none">
                <h2 ref={textLeftRef} className="text-4xl md:text-5xl">Surface</h2>
                <h2 ref={textRightRef} className="text-4xl md:text-5xl">Layered</h2>
            </div>

            {/* Main Image Container */}
            <div
                ref={imgContainerRef}
                className="relative w-full h-full will-change-transform scale-0 flex items-center justify-center"
            >
                {/* Base Image (With Background) */}
                <Image
                    src="/photon-base.jpg"
                    alt="Photon Base"
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                />

                {/* 6 Masked Image Copies for the 3D Stacking Effect */}
                {[...Array(6)].map((_, i) => (
                    <Image
                        key={i}
                        ref={(el) => { maskRefs.current[i] = el; }}
                        src="/photon-base.jpg"
                        alt="Photon Mask Layer"
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover will-change-transform"
                        style={{
                            // This CSS applies your transparent PNG as a mask over the base image
                            WebkitMaskImage: 'url(/photon-mask.png)',
                            WebkitMaskSize: 'cover',
                            WebkitMaskPosition: 'center',
                            maskImage: 'url(/photon-mask.png)',
                            maskSize: 'cover',
                            maskPosition: 'center',
                        }}
                    />
                ))}
            </div>

            {/* Final Reveal Header Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[80%] text-center pointer-events-none">
                <h1 ref={headerRef} className="text-5xl md:text-7xl font-bold leading-tight text-white drop-shadow-lg">
                    {titleWords.map((word, i) => (
                        <span key={i} className="word opacity-0 inline-block mr-4">
                            {word}
                        </span>
                    ))}
                </h1>
            </div>
        </section>
    );
}
