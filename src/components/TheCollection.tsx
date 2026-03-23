"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categoryImages = {
    fashion: [
        '/landing/Fashion/1.png', '/landing/Fashion/11.jpg', '/landing/Fashion/12.jpg', '/landing/Fashion/6.jpg',
        '/landing/Fashion/Generated Image September 09, 2025 - 10_14PM.png',
        '/landing/Fashion/_MG_0065.jpg', '/landing/Fashion/_MG_0076.jpg', '/landing/Fashion/_MG_0085 3.jpg',
        '/landing/Fashion/_MG_0246.jpg', '/landing/Fashion/_MG_0277.jpg', '/landing/Fashion/_MG_0735.jpg',
        '/landing/Fashion/grddtcg.jpg', '/landing/Fashion/gtggtytfydt.jpg', '/landing/Fashion/jsuhfgsu.jpg',
        '/landing/Fashion/orgnlfake__1556513320_2032503501079625300_4183375751.jpg',
        '/landing/Fashion/orgnlfake__1574136420_2180336779075770680_4183375751.jpg',
        '/landing/Fashion/orgnlfake__1583303502_2257235838367082905_4183375751.jpg',
        '/landing/Fashion/orgnlfake__1609993524_2481127968532090401_4183375751.jpg',
        '/landing/Fashion/orgnlfake__1626670676_2621026062966327085_4183375751.jpg',
        '/landing/Fashion/orgnlfake__1628225906_2634072276989489657_4183375751.jpg',
        '/landing/Fashion/orgnlfake__1682571746_3089958225432590158_4183375751.jpg',
        '/landing/Fashion/orgnlfake__1714929363_3361393591316894093_4183375751.webp',
        '/landing/Fashion/orgnlfake__1715061628_3361398108464821222_4183375751.webp',
        '/landing/Fashion/orgnlfake__1739033046_3563589939141926044_4183375751.webp',
        '/landing/Fashion/orgnlfake__1754570550_3693927968162571769_4183375751.jpg',
        '/landing/Fashion/uhgajshgc.jpg', '/landing/Fashion/uyaguyga.jpg',
    ],
    boudoir: [
        '/landing/Boudoir/IMG-20230326-WA0016.jpg', '/landing/Boudoir/IMG-20230326-WA0017.jpg',
        '/landing/Boudoir/IMG-20230814-WA0032.jpg', '/landing/Boudoir/IMG_0440 colorized.jpg',
        '/landing/Boudoir/htsyssf.jpg', '/landing/Boudoir/iuyhgfdt.jpg', '/landing/Boudoir/jujnbghytfk.jpg',
        '/landing/Boudoir/jukoiut.jpg', '/landing/Boudoir/juyyhgtrfdews.jpg',
        '/landing/Boudoir/orgnlfake__1737619218_3551684337159388122_4183375751.webp',
        '/landing/Boudoir/orgnlfake__1756921600_3713650006348904412_4183375751.jpg',
        '/landing/Boudoir/reduyigsg.jpg', '/landing/Boudoir/yfytf.jpg', '/landing/Boudoir/ytgfree.jpg'
    ],
    active: ['/landing/Active/1.jpg', '/landing/Active/4.jpg'],
    skincare: [
        '/landing/beauty/_MG_0067.jpg',
        '/landing/beauty/orgnlfake__1755259229_3699705145290302972_4183375751.webp'
    ],
    lingerie: [
        '/landing/Lingerie/_MG_0125.jpg', '/landing/Lingerie/_MG_0201.jpg', '/landing/Lingerie/_MG_0228.jpg',
        '/landing/Lingerie/hfdgrs.jpg', '/landing/Lingerie/hjgafueyffbc.jpg',
        '/landing/Lingerie/orgnlfake__1617164587_2541283206148515199_4183375751.jpg',
        '/landing/Lingerie/orgnlfake__1757347211_3717220285456862054_4183375751.jpg'
    ],
    beauty: [
        '/landing/beauty/_MG_0067.jpg',
        '/landing/beauty/orgnlfake__1755259229_3699705145290302972_4183375751.webp'
    ],
    portrait: [
        '/landing/CREATIVE POTRAIT/_MG_0020 2.jpg', '/landing/CREATIVE POTRAIT/_MG_0027.jpg',
        '/landing/CREATIVE POTRAIT/_MG_0574.jpg',
        '/landing/CREATIVE POTRAIT/orgnlfake__1699264943_3229990908790655262_4183375751.webp',
        '/landing/CREATIVE POTRAIT/orgnlfake__1754985609_3697409823724286995_4183375751.webp',
        '/landing/PORTRAITS/orgnlfake__1756657576_3711435212652554445_4183375751.webp',
        '/landing/PORTRAITS/orgnlfake__1756657576_3711435212660967385_4183375751.webp',
        '/landing/PORTRAITS/orgnlfake__1756657576_3711435212669380630_4183375751.webp'
    ]
};

const categories = [
    { id: 'fashion', title: 'High Fashion' },
    { id: 'boudoir', title: 'Boudoir' },
    { id: 'active', title: 'Active Wear' },
    { id: 'skincare', title: 'Skin Care' },
    { id: 'lingerie', title: 'Lingerie' },
    { id: 'beauty', title: 'Beauty' },
    { id: 'portrait', title: 'Creative Portrait' },
];

const MAX_VISIBLE = 4;

export default function TheCollection() {
    const [activeFilter, setActiveFilter] = useState("fashion");
    const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const revealRefs = useRef<HTMLElement[]>([]);

    const displayFilter = hoveredFilter ?? activeFilter;
    const currentImages = categoryImages[displayFilter as keyof typeof categoryImages];
    const visibleCount = Math.min(currentImages.length, MAX_VISIBLE);
    const hasMore = currentImages.length > MAX_VISIBLE;

    const startSlide = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setSlideIndex(prev => (prev + 1) % currentImages.length);
        }, 2000);
    }, [currentImages.length]);

    const stopSlide = () => {
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    };

    useEffect(() => {
        if (!expanded) {
            startSlide();
        } else {
            stopSlide();
        }
        return stopSlide;
    }, [activeFilter, expanded, startSlide]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
        }, { threshold: 0.1 });
        const refs = revealRefs.current;
        refs.forEach(el => { if (el) observer.observe(el); });
        setTimeout(() => refs.forEach(el => { if (el) el.classList.add('active'); }), 100);
        return () => refs.forEach(el => { if (el) observer.unobserve(el); });
    }, []);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
    };

    const getSlideImages = () => {
        return Array.from({ length: visibleCount }, (_, k) => {
            const idx = (slideIndex + k) % currentImages.length;
            return { src: currentImages[idx], idx };
        });
    };

    const handleFilter = (id: string) => {
        setSlideIndex(0);
        setActiveFilter(id);
        setHoveredFilter(null);
        setExpanded(false);
    };

    const handleHoverEnter = (id: string) => {
        setHoveredFilter(id);
    };

    const handleHoverLeave = () => {
        setHoveredFilter(null);
    };

    return (
        <section id="the-collection">
            {/* Header */}
            <motion.div
                className="section-header"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ textAlign: "center", padding: "0 20px", marginBottom: "40px" }}
            >
                <h2 className="section-title text-center">The Collection</h2>
                <p className="text-center" style={{ color: "var(--text-muted)" }}>
                    Business Portfolio — Work shot by our in-house studio.
                </p>
            </motion.div>

            {/* Category tabs */}
            <div className="filter-container reveal justify-center mb-12" ref={addToRefs}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`filter-btn ${activeFilter === cat.id ? "active" : ""}`}
                        onClick={() => handleFilter(cat.id)}
                        onMouseEnter={() => handleHoverEnter(cat.id)}
                        onMouseLeave={handleHoverLeave}
                    >
                        {cat.title}
                    </button>
                ))}
            </div>

            {/* ── Gallery ── */}
            <AnimatePresence mode="wait">
                {!expanded ? (
                    /* Auto-slide view: 4 images cycling every 2s */
                    <motion.div
                        key={`slide-${activeFilter}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        {/* Responsive 4-image grid: 4 cols desktop / 2 cols mobile */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: "6px",
                            padding: "0 12px",
                        }}
                            className="gallery-slide-grid"
                        >
                            <AnimatePresence mode="popLayout">
                                {getSlideImages().map(({ src, idx }) => (
                                    <motion.div
                                        key={`${activeFilter}-${idx}-${src}`}
                                        className="gallery-item"
                                        style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.45, ease: "easeInOut" }}
                                        layout
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <Image
                                            src={src}
                                            alt={activeFilter}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            style={{ objectFit: "cover" }}
                                        />
                                        <div className="overlay">
                                            <span className="cat-label">
                                                {categories.find(c => c.id === activeFilter)?.title}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* View More */}
                        {hasMore && !hoveredFilter && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                style={{ textAlign: "center", marginTop: "40px" }}
                            >
                                <button
                                    onClick={() => setExpanded(true)}
                                    className="gallery-view-more-btn"
                                >
                                    View More
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    /* Expanded: all images in full grid */
                    <motion.div
                        key={`expanded-${activeFilter}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <div className="gallery-grid">
                            {currentImages.map((imgPath, i) => (
                                <motion.div
                                    key={`${activeFilter}-${i}`}
                                    className="gallery-item reveal active"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.45 }}
                                    style={{ position: 'relative' }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <Image 
                                        src={imgPath} 
                                        alt={activeFilter} 
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="overlay">
                                        <span className="cat-label">
                                            {categories.find(c => c.id === activeFilter)?.title}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ textAlign: "center", marginTop: "40px" }}>
                            <button
                                onClick={() => setExpanded(false)}
                                className="gallery-view-more-btn"
                            >
                                View Less
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 640px) {
                    .gallery-slide-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                }
                .gallery-view-more-btn {
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.25);
                    color: #e8e8e8;
                    padding: 14px 44px;
                    font-size: 0.78rem;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: background 0.3s ease, color 0.3s ease;
                }
                .gallery-view-more-btn:hover {
                    background: #fff;
                    color: #000;
                }
            `}</style>
        </section>
    );
}
