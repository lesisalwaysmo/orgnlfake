"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalReveal() {
    useGSAP(() => {
        // Select all text elements you want to automate, but exclude anything inside a .no-reveal container
        const targets = gsap.utils.toArray<HTMLElement>("h1, h2, h3, p, .vibe-text")
            .filter(el => !el.closest(".no-reveal"));

        targets.forEach((target) => {
            // 1. Split text into lines using the free open-source SplitType
            const split = new SplitType(target, {
                types: "lines",
                lineClass: "lineChild",
            });

            // 2. Wrap each line in a parent div to act as an overflow mask
            if (split.lines && split.lines.length > 0) {
                split.lines.forEach((line) => {
                    const wrapper = document.createElement("div");
                    wrapper.classList.add("gsap-reveal-mask");
                    line.parentNode?.insertBefore(wrapper, line);
                    wrapper.appendChild(line);
                });

                // 3. Determine if this element is in the hero (above the fold = instant play)
                const isHero = target.closest(".banner") !== null;

                if (isHero) {
                    // Hero text: animate immediately on page load with a slight delay for polish
                    gsap.from(split.lines, {
                        y: "100%",
                        duration: 1.2,
                        ease: "power4.out",
                        stagger: 0.15,
                        delay: 0.3, // Small delay so the page settles before the reveal
                    });
                } else {
                    // Everything else: scroll-triggered reveal
                    gsap.from(split.lines, {
                        y: "100%",
                        duration: 1,
                        ease: "power4.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: target,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    });
                }
            }
        });
    });

    return null; // This is a logic-only component
}
