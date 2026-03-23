"use client";

import React, { useEffect, useRef, useState } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
    /** Distance in px before the element enters the viewport to start loading */
    rootMargin?: string;
}

/**
 * A video element that only sets its `src` (and starts downloading)
 * once it scrolls within `rootMargin` of the viewport.
 */
export default function LazyVideo({
    src,
    rootMargin = "200px",
    ...props
}: LazyVideoProps) {
    const ref = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <video
            ref={ref}
            src={isVisible ? src : undefined}
            preload="none"
            {...props}
        />
    );
}
