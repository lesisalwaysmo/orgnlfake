'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface TrailImage {
    element: HTMLDivElement;
    maskLayers: HTMLDivElement[];
    removeTime: number;
}

const IMAGES = [
    '/portfolio 2/1234.jpg',
    '/portfolio 2/_MG_0101.jpg',
    '/portfolio 2/2025-08-02-at-20.00.jpg',
    '/portfolio 2/_MG_0146.jpg',
    '/portfolio 2/Generated-Image-August-30,-2025---10_08PM.jpg',
    '/portfolio 2/_MG_0089.jpg',
    '/portfolio 2/2025-08-02-at-19.jpg',
    '/portfolio 2/_MG_0166.jpg',
    '/portfolio 2/_MG_0190.jpg',
    '/portfolio 2/jyfyudruur.jpg',
    '/portfolio 2/kilojh.jpg',
    '/portfolio 2/kshbvs.jpg',
    '/portfolio 2/kshgfhugd.jpg',
    '/portfolio 2/siuhdggsd.jpg',
    '/portfolio 2/2025-08-05-at-13.jpg',
];

const CONFIG = {
    imageLifespan: 1500,
    mouseThreshold: 40, // Trigger twice as often as before
    inDuration: 750,
    outDuration: 1000,
    staggerIn: 100,
    staggerOut: 25,
    slideDuration: 1000,
    slideEasing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
    numLayers: 10,
};

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
const getDistance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.hypot(x2 - x1, y2 - y1);

export default function TrailContainer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const animFrameRef = useRef<number>(0);
    const trailRef = useRef<TrailImage[]>([]);
    const imgIndexRef = useRef(0);
    const mousePosRef = useRef({ x: 0, y: 0 });
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const interpMouseRef = useRef({ x: 0, y: 0 });
    const isDesktopRef = useRef(false);

    const isInContainer = useCallback((x: number, y: number) => {
        if (!containerRef.current) return false;
        const rect = containerRef.current.getBoundingClientRect();
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }, []);

    const createTrailImage = useCallback((x: number, y: number) => {
        const container = containerRef.current;
        if (!container) return;

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('trail-img');

        const imgSrc = IMAGES[imgIndexRef.current];
        imgIndexRef.current = (imgIndexRef.current + 1) % IMAGES.length;

        const rect = container.getBoundingClientRect();
        const halfSize = 87.5;
        const startX = interpMouseRef.current.x - rect.left - halfSize;
        const startY = interpMouseRef.current.y - rect.top - halfSize;
        const targetX = x - rect.left - halfSize;
        const targetY = y - rect.top - halfSize;

        imgContainer.style.left = `${startX}px`;
        imgContainer.style.top = `${startY}px`;
        imgContainer.style.transition = `left ${CONFIG.slideDuration}ms ${CONFIG.slideEasing}, top ${CONFIG.slideDuration}ms ${CONFIG.slideEasing}`;

        const maskLayers: HTMLDivElement[] = [];

        for (let i = 0; i < CONFIG.numLayers; i++) {
            const layer = document.createElement('div');
            layer.classList.add('mask-layer');

            const imageLayer = document.createElement('div');
            imageLayer.classList.add('image-layer');
            imageLayer.style.backgroundImage = `url(${imgSrc})`;

            const startYPerc = i * 10;
            const endYPerc = (i + 1) * 10;
            layer.style.clipPath = `polygon(50% ${startYPerc}%, 50% ${startYPerc}%, 50% ${endYPerc}%, 50% ${endYPerc}%)`;
            layer.style.transition = `clip-path ${CONFIG.inDuration}ms ${CONFIG.easing}`;

            layer.appendChild(imageLayer);
            imgContainer.appendChild(layer);
            maskLayers.push(layer);
        }

        container.appendChild(imgContainer);

        requestAnimationFrame(() => {
            imgContainer.style.left = `${targetX}px`;
            imgContainer.style.top = `${targetY}px`;

            maskLayers.forEach((layer, i) => {
                const startYPerc = i * 10;
                const endYPerc = (i + 1) * 10;
                const delay = Math.abs(i - 4.5) * CONFIG.staggerIn;

                setTimeout(() => {
                    layer.style.clipPath = `polygon(0% ${startYPerc}%, 100% ${startYPerc}%, 100% ${endYPerc}%, 0% ${endYPerc}%)`;
                }, delay);
            });
        });

        trailRef.current.push({
            element: imgContainer,
            maskLayers,
            removeTime: Date.now() + CONFIG.imageLifespan,
        });
    }, []);

    const removeOldImages = useCallback(() => {
        const now = Date.now();
        if (trailRef.current.length === 0) return;

        const oldest = trailRef.current[0];
        if (now >= oldest.removeTime) {
            const imgToRemove = trailRef.current.shift()!;

            imgToRemove.maskLayers.forEach((layer, i) => {
                const startYPerc = i * 10;
                const endYPerc = (i + 1) * 10;
                const delay = Math.abs(i - 4.5) * CONFIG.staggerOut;

                layer.style.transition = `clip-path ${CONFIG.outDuration}ms ${CONFIG.easing}`;
                const imageLayer = layer.querySelector('.image-layer') as HTMLElement;
                if (imageLayer) {
                    imageLayer.style.transition = `opacity ${CONFIG.outDuration}ms ${CONFIG.easing}`;
                }

                setTimeout(() => {
                    layer.style.clipPath = `polygon(50% ${startYPerc}%, 50% ${startYPerc}%, 50% ${endYPerc}%, 50% ${endYPerc}%)`;
                    if (imageLayer) imageLayer.style.opacity = '0';
                }, delay);
            });

            setTimeout(() => {
                if (imgToRemove.element.parentNode) {
                    imgToRemove.element.parentNode.removeChild(imgToRemove.element);
                }
            }, CONFIG.outDuration + 500);
        }
    }, []);

    useEffect(() => {
        const render = () => {
            if (!isDesktopRef.current) return;

            const distance = getDistance(
                mousePosRef.current.x,
                mousePosRef.current.y,
                lastMousePosRef.current.x,
                lastMousePosRef.current.y
            );

            interpMouseRef.current.x = lerp(interpMouseRef.current.x, mousePosRef.current.x, 0.1);
            interpMouseRef.current.y = lerp(interpMouseRef.current.y, mousePosRef.current.y, 0.1);

            if (distance > CONFIG.mouseThreshold && isInContainer(mousePosRef.current.x, mousePosRef.current.y)) {
                createTrailImage(mousePosRef.current.x, mousePosRef.current.y);
                lastMousePosRef.current = { ...mousePosRef.current };
            }

            removeOldImages();
            animFrameRef.current = requestAnimationFrame(render);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            isDesktopRef.current = window.innerWidth > 0;
            if (!isDesktopRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            } else {
                animFrameRef.current = requestAnimationFrame(render);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, [isInContainer, createTrailImage, removeOldImages]);

    return <div ref={containerRef} className="trail-container" />;
}
