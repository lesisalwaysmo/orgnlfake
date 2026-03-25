'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BlockReveal from '@/components/BlockReveal';
import './bank.css';

const TrailContainer = dynamic(() => import('@/components/TrailContainer'), { ssr: false });

export default function BankClient() {
    const brandRef = useRef<HTMLDivElement>(null);

    // "Anti-gravity" floating animation for the brand name
    useGSAP(() => {
        gsap.to(brandRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
        });
    });

    return (
        <main className="bank-page min-h-screen text-white flex flex-col justify-between p-10 md:p-24 overflow-hidden relative">
            {/* The Trail Container running in the background */}
            <TrailContainer />

            {/* Top Section: The Technical Emphasis */}
            <div ref={brandRef} className="flex items-center gap-3 relative z-10 mt-8 md:mt-0">
                <div className="h-[1px] w-12 bg-cyan-500 opacity-50" />
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-cyan-400">
                    Engineered on <span className="font-bold text-white">Antigravity NextJS</span>
                </p>
            </div>

            {/* Center Section: Main Content */}
            <div className="flex flex-col gap-16 relative z-10">
                <div>
                    <BlockReveal color="#ffffff" delay={0.2}>
                        <h1 className="text-6xl md:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter">
                            Something
                        </h1>
                        <h1 className="text-6xl md:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter">
                            Original
                        </h1>
                        <h1 className="text-6xl md:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter">
                            Coming!!
                        </h1>
                    </BlockReveal>
                </div>

                <div className="max-w-xl">
                    <BlockReveal color="#22d3ee" delay={1.2} stagger={0.08}>
                        <p className="text-lg md:text-xl font-medium text-gray-300">
                            Arriving with purpose. This isn’t a launch,
                        </p>
                        <p className="text-lg md:text-xl font-medium text-gray-300">
                            it’s a culture shift in motion.
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-white mt-4 uppercase tracking-widest italic">
                            Raw. Real. Original.
                        </p>
                    </BlockReveal>
                </div>
            </div>

            {/* Bottom Section: Footer Metadata */}
            <div className="flex justify-between items-end border-t border-white/20 pt-6 relative z-10 mb-8 md:mb-0">
                <div className="text-[10px] font-mono text-gray-400 uppercase">
                    001 // Core v.1.0.4
                </div>
                <div className="text-[10px] font-mono text-gray-400 uppercase text-right">
                    Antigravity Framework <br /> NextJS App Structure
                </div>
            </div>
        </main>
    );
}
