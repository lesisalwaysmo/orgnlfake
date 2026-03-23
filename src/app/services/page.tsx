"use client";

import { motion } from "framer-motion";
import WhatWeOfferScroll from "@/components/WhatWeOfferScroll";

export default function ServicesPage() {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    return (
        <div
            style={{
                background: "#080808",
                minHeight: "100vh",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                color: "#e8e8e8",
            }}
        >
            {/* Hero Banner */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    borderBottom: "1px solid #1a1a1a",
                    padding: "120px 40px 80px",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, #c9a86c, transparent)",
                        transformOrigin: "left",
                    }}
                />
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <motion.span
                        initial={{ opacity: 0, letterSpacing: "0.3em" }}
                        animate={{ opacity: 0.5, letterSpacing: "0.5em" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        style={{
                            fontSize: "11px",
                            textTransform: "uppercase",
                            display: "block",
                            marginBottom: "24px",
                            color: "#c9a86c",
                        }}
                    >
                        Our Methodology
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            fontWeight: 300,
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            marginBottom: "40px",
                        }}
                    >
                        The Partnership<br />
                        <em style={{ fontStyle: "italic", color: "#c9a86c" }}>Solution</em>
                    </motion.h1>
                </div>
            </motion.section>

            {/* What We Offer — GSAP Scroll Animation */}
            <WhatWeOfferScroll />

            {/* Narrative Block */}
            <section style={{ padding: "80px 40px", borderBottom: "1px solid #1a1a1a" }}>
                <motion.div
                    style={{ maxWidth: "900px", margin: "0 auto" }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                >
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontSize: "clamp(1rem, 2vw, 1.2rem)",
                            lineHeight: 1.9,
                            color: "#aaa",
                            marginBottom: "30px",
                        }}
                    >
                        For Brands, Designers, and Retail Houses, Orgnlfake offers a radical departure from the standard
                        talent-vendor relationship. We provide high-end <strong style={{ color: "#e8e8e8" }}>Creative Direction</strong>{" "}
                        and <strong style={{ color: "#e8e8e8" }}>Bulk Booking</strong> solutions that are rooted in the power of a
                        collective. When you book through Orgnlfake, you are not just 'hiring a model'; you are partnering with an
                        empowered creator who has been trained within our house to understand the business of fashion. Our creators are
                        educated in the art of social interaction and professional presence, meaning they arrive on your set ready to
                        contribute, not just stand still.
                    </motion.p>
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontSize: "clamp(1rem, 2vw, 1.2rem)",
                            lineHeight: 1.9,
                            color: "#aaa",
                        }}
                    >
                        Our 'Pro-Choice' philosophy extends to our brand partners as well. We offer you the choice to work with talent
                        that is genuinely invested in your vision. Our Bulk Booking service is designed to solve the logistical
                        headaches of the South African retail market, providing a streamlined path to 10+, 20+, or 50+ creators for
                        cohesive seasonal launches. By choosing Orgnlfake, brands align themselves with a socially conscious movement
                        that prioritizes women's empowerment and cultural diversity. You aren't just buying content; you are supporting
                        a creative economy where talent is respected, rights are shared, and the final output is a true reflection of
                        modern, diverse South African excellence. We handle the casting, the direction, and the delivery, all while
                        ensuring that the spirit of partnership remains at the forefront of every frame.
                    </motion.p>
                </motion.div>
            </section>

            {/* CTA */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                style={{
                    padding: "80px 40px",
                    borderTop: "1px solid #1a1a1a",
                    textAlign: "center",
                }}
            >
                <motion.p
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: "0.85rem", letterSpacing: "0.3em", color: "#555", textTransform: "uppercase", marginBottom: "24px" }}
                >
                    Ready to Partner?
                </motion.p>
                <motion.a
                    variants={fadeUp}
                    transition={{ duration: 0.8 }}
                    href="/contact"
                    whileHover={{ backgroundColor: "#e8e8e8", color: "#080808" }}
                    style={{
                        display: "inline-block",
                        border: "1px solid #333",
                        padding: "18px 48px",
                        fontSize: "0.8rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "#e8e8e8",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                    }}
                >
                    Begin the Conversation
                </motion.a>
            </motion.section>
        </div>
    );
}
