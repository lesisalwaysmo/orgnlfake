"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { portfolioData, PortfolioProject } from '@/data/portfolio';

const START_WIDTH_PERCENT = 80;
const END_WIDTH_PERCENT = 100;
const SCROLL_SPEED = 0.5; // pixels per frame for the auto-scrolling images

export default function AnimatedPortfolioGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const animationFrameRef = useRef<number>(0);

    // Dynamic row distribution: e.g., 3 cards, then 5, then 7 to create a growing effect
    const rowDistribution = [3, 5, 7, 5];
    const rows: PortfolioProject[][] = [];
    let currentIndex = 0;
    let distributionIndex = 0;

    while (currentIndex < portfolioData.length) {
        let count = rowDistribution[distributionIndex % rowDistribution.length];
        // If we are at the end, just take everything remaining instead of blindly pushing a slice that might be incomplete or skip the last item.
        if (currentIndex + count > portfolioData.length) {
            count = portfolioData.length - currentIndex;
        }
        rows.push(portfolioData.slice(currentIndex, currentIndex + count));
        currentIndex += count;
        distributionIndex++;
    }

    useEffect(() => {
        const calculateHeight = () => {
            if (!sectionRef.current || rowRefs.current.length === 0) return;

            let totalExpandedHeight = 0;
            const rowGap = 16;
            const paddingY = 64;

            // Since rows have different amounts of items (3, 5, 7), they have different heights.
            // We must measure each one.
            rowRefs.current.forEach((row) => {
                if (!row) return;
                const originalWidth = row.style.width;
                row.style.width = `${END_WIDTH_PERCENT}%`;
                totalExpandedHeight += row.offsetHeight;
                row.style.width = originalWidth;
            });

            const totalHeight = totalExpandedHeight + rowGap * (rows.length - 1) + paddingY;
            sectionRef.current.style.height = `${totalHeight}px`;
        };

        const animateScroll = () => {
            const viewportHeight = window.innerHeight;
            rowRefs.current.forEach((row) => {
                if (!row) return;
                const rect = row.getBoundingClientRect();

                // Normal progress from 0 (bottom of screen) to 1 (top of screen)
                let progress =
                    (viewportHeight - rect.top) / (viewportHeight + rect.height);
                progress = Math.max(0, Math.min(1, progress));

                const currentWidth =
                    START_WIDTH_PERCENT +
                    (END_WIDTH_PERCENT - START_WIDTH_PERCENT) * progress;
                row.style.width = `${currentWidth}%`;
            });
            animationFrameRef.current = requestAnimationFrame(animateScroll);
        };

        // We run height calculation once images might be loaded or layout changes
        setTimeout(calculateHeight, 100);
        window.addEventListener('resize', calculateHeight);
        animationFrameRef.current = requestAnimationFrame(animateScroll);

        return () => {
            window.removeEventListener('resize', calculateHeight);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [rows.length]);

    return (
        <ReactLenis root>
            <div className="bg-[#FFFDD0] text-black min-h-screen font-sans">
                {/* Hero / intro */}
                <div className="h-[40vh] flex flex-col items-center justify-center pt-32">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">
                        Portfolio
                    </h1>
                    <p className="text-lg md:text-xl text-black/70">
                        A curated collection of our creative work.
                    </p>
                </div>

                {/* Scroll-expanding grid */}
                <section
                    ref={sectionRef}
                    className="relative w-full overflow-hidden py-8 flex flex-col gap-4 items-center"
                >
                    {rows.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            ref={(el) => {
                                rowRefs.current[rowIndex] = el;
                            }}
                            className="flex gap-4 justify-center"
                            style={{ width: `${START_WIDTH_PERCENT}%` }}
                        >
                            {row.map((project, colIndex) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    panDirection={(rowIndex + colIndex) % 2 === 0 ? 'left' : 'right'}
                                />
                            ))}
                        </div>
                    ))}
                </section>

                {/* Extra Feature Video */}
                <div className="w-full max-w-6xl mx-auto px-4 py-32 flex justify-center">
                    <div className="w-full relative aspect-video overflow-hidden rounded-lg bg-black/10 shadow-2xl">
                        <video
                            src="/media/videos/rose.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Footer spacer */}
                <div className="h-[20vh] flex items-center justify-center">
                    <p className="text-sm uppercase tracking-widest text-black/40">
                        End of Projects
                    </p>
                </div>
            </div>
        </ReactLenis>
    );
}

function ProjectCard({
    project,
    panDirection,
}: {
    project: PortfolioProject;
    panDirection: 'left' | 'right';
}) {
    const [imgError, setImgError] = useState(false);
    const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const positionRef = useRef(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const media = mediaRef.current;
        const container = containerRef.current;
        if (!media || !container) return;

        // Since the image is scaled up by 1.3x, we have 15% extra space on left and 15% on right
        // to pan before hitting the edge of the image.
        let direction = panDirection === 'left' ? -1 : 1;

        const animate = () => {
            if (!isHovered) {
                // Determine max pan bounds based on actual pixel width
                const maxPan = (container.clientWidth * 1.3 - container.clientWidth) / 2;

                positionRef.current += SCROLL_SPEED * direction;

                // Ping-pong if we hit the edge
                if (Math.abs(positionRef.current) >= maxPan) {
                    positionRef.current = Math.sign(positionRef.current) * maxPan;
                    direction *= -1; // Reverse direction
                }

                media.style.transform = `translateX(${positionRef.current}px) scale(1.3)`;
            } else {
                // On hover, gently recenter and zoom
                media.style.transform = `translateX(0px) scale(1.05)`;
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        // Start from an off-center position to immediately look dynamic
        positionRef.current = (Math.random() * 0.5 - 0.25) * ((container.clientWidth * 1.3 - container.clientWidth) / 2);

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, [panDirection, isHovered]);

    return (
        <div
            className="flex-1 flex flex-col group overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Fixed 7/5 aspect-ratio media box */}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden bg-black/10 rounded-lg flex items-center justify-center"
                style={{ aspectRatio: '7 / 5' }}
            >
                {project.type === 'video' ? (
                    <video
                        ref={mediaRef as React.RefObject<HTMLVideoElement>}
                        src={project.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute w-[130%] h-[130%] object-cover transition-transform duration-[1500ms] ease-out"
                        style={{ transform: 'scale(1.3)' }}
                    />
                ) : imgError ? (
                    <div className="w-full h-full flex items-center justify-center bg-black/5">
                        <span className="text-black/30 text-xs uppercase tracking-widest">
                            {project.title}
                        </span>
                    </div>
                ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        ref={mediaRef as React.RefObject<HTMLImageElement>}
                        src={project.src}
                        alt={project.title}
                        className="absolute w-[130%] h-[130%] object-cover transition-transform duration-[1500ms] ease-out"
                        style={{ transform: 'scale(1.3)' }}
                        onError={() => setImgError(true)}
                    />
                )}
            </div>

            {/* Caption */}
            <div className="flex justify-between items-center pt-2 text-xs md:text-sm uppercase tracking-wider text-black/50">
                <span className="truncate pr-4 text-black">{project.title}</span>
                <span>{project.year}</span>
            </div>
        </div>
    );
}
