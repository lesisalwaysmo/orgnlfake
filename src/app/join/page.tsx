"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function JoinUsPage() {
    const [formState, setFormState] = useState({
        name: "",
        instagram: "",
        email: "",
        phone: "",
        experience: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const benefits = [
        { label: "Media Kit", detail: "Auto-updating analytics dashboard with live social data" },
        { label: "In-House Studio", detail: "Professional portfolio shot by our team at no cost to you" },
        { label: "Set Your Rates", detail: "Full autonomy to declare your own pricing structure" },
        { label: "Shared Ownership", detail: "Publishing rights to all material co-produced in our studio" },
        { label: "Trained & Ready", detail: "Posing, angles, lighting, and social interaction coaching" },
        { label: "Pro-Choice", detail: "Your personal life is yours. We only care about your creative fire" },
    ];

    return (
        <div
            style={{
                background: "#080808",
                minHeight: "100vh",
                fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                color: "#e8e8e8",
            }}
        >
            {/* Hero */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    padding: "120px 40px 80px",
                    borderBottom: "1px solid #1a1a1a",
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        style={{
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5em",
                            color: "#c9a86c",
                            display: "block",
                            marginBottom: "24px",
                        }}
                    >
                        Why Join?
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
                        The Incubator for<br />
                        <em style={{ fontStyle: "italic", color: "#c9a86c" }}>the Empowered</em>
                    </motion.h1>
                </div>
            </motion.section>

            {/* Narrative */}
            <section style={{ padding: "80px 40px", borderBottom: "1px solid #1a1a1a" }}>
                <motion.div
                    style={{ maxWidth: "900px", margin: "0 auto" }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
                >
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.9, color: "#aaa", marginBottom: "30px" }}
                    >
                        Are you ready to stop being a product and start being a partner?{" "}
                        <strong style={{ color: "#e8e8e8" }}>Orgnlfake</strong> is inviting you to join a movement where your voice
                        matters and your rights are protected. We are looking for the 'Originals'—those who value their autonomy and
                        are ready to create without compromise. Whether you are a seasoned influencer or someone who has never stood
                        in front of a professional camera, there is a place for you here. We pride ourselves on being a learning
                        house; we are here to grow together. If you are starting from zero, we will help you learn how to pose, how
                        to master your angles, and how to socially interact in high-pressure professional environments. We don't just
                        give you a platform; we give you the skills to own it.
                    </motion.p>
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.9, color: "#aaa" }}
                    >
                        Our <strong style={{ color: "#e8e8e8" }}>Pro-Choice</strong> philosophy means that we respect your life
                        outside of the lens. We don't want to be your boss; we want to be your creative ally. As a member of the
                        Orgnlfake collective, you are a co-owner of the work we produce together. Our current mission is focused on
                        creating a powerhouse of female talent in South Africa, ensuring that women have the support, the rights, and
                        the production backing they need to lead the industry. Male creators—stay tuned. If you believe in shared
                        creativity, cultural pride, and the power of a collective that has your back, then Orgnlfake is your home.
                        Let's learn, let's get creative, and let's own our future together.
                    </motion.p>
                </motion.div>
            </section>

            {/* Benefits Grid */}
            <section style={{ padding: "80px 40px", borderBottom: "1px solid #1a1a1a" }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                        style={{
                            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                            fontWeight: 300,
                            letterSpacing: "-0.01em",
                            marginBottom: "60px",
                            color: "#fff",
                        }}
                    >
                        What You Receive
                    </motion.h2>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "1px",
                        }}
                    >
                        {benefits.map((b, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                transition={{ duration: 0.6 }}
                                whileHover={{ backgroundColor: "#111" }}
                                style={{
                                    padding: "40px 30px",
                                    border: "1px solid #1a1a1a",
                                    transition: "background 0.2s ease",
                                }}
                            >
                                <div style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#c9a86c", textTransform: "uppercase", marginBottom: "12px" }}>
                                    0{i + 1}
                                </div>
                                <h3 style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "10px", color: "#fff" }}>{b.label}</h3>
                                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#555" }}>{b.detail}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Application Form */}
            <section style={{ padding: "80px 40px" }}>
                <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                    >
                        <motion.h2
                            variants={fadeUp}
                            transition={{ duration: 0.8 }}
                            style={{
                                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                fontWeight: 300,
                                marginBottom: "12px",
                                color: "#fff",
                            }}
                        >
                            Apply to Join
                        </motion.h2>
                        <motion.p
                            variants={fadeUp}
                            transition={{ duration: 0.8 }}
                            style={{ color: "#555", marginBottom: "48px", fontSize: "0.9rem" }}
                        >
                            Fill in your details and we'll be in touch.
                        </motion.p>

                        {(["name", "instagram", "email", "phone"] as const).map((field) => (
                            <motion.div key={field} variants={fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: "20px" }}>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={formState[field]}
                                    onChange={handleChange}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                                    style={{
                                        width: "100%",
                                        background: "transparent",
                                        border: "none",
                                        borderBottom: "1px solid #2a2a2a",
                                        padding: "14px 0",
                                        color: "#e8e8e8",
                                        fontSize: "0.95rem",
                                        outline: "none",
                                        letterSpacing: "0.02em",
                                        transition: "border-color 0.3s ease",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c9a86c")}
                                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#2a2a2a")}
                                />
                            </motion.div>
                        ))}

                        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: "20px" }}>
                            <select
                                name="experience"
                                value={formState.experience}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    background: "#080808",
                                    border: "none",
                                    borderBottom: "1px solid #2a2a2a",
                                    padding: "14px 0",
                                    color: formState.experience ? "#e8e8e8" : "#555",
                                    fontSize: "0.95rem",
                                    outline: "none",
                                    cursor: "pointer",
                                    boxSizing: "border-box",
                                }}
                            >
                                <option value="" disabled>Experience Level</option>
                                <option value="beginner">Beginner — Never modeled professionally</option>
                                <option value="intermediate">Intermediate — Some experience</option>
                                <option value="seasoned">Seasoned — Full-time creator / influencer</option>
                            </select>
                        </motion.div>

                        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: "40px" }}>
                            <textarea
                                name="message"
                                rows={4}
                                value={formState.message}
                                onChange={handleChange}
                                placeholder="Tell us about yourself and your creative vision..."
                                style={{
                                    width: "100%",
                                    background: "transparent",
                                    border: "none",
                                    borderBottom: "1px solid #2a2a2a",
                                    padding: "14px 0",
                                    color: "#e8e8e8",
                                    fontSize: "0.95rem",
                                    outline: "none",
                                    resize: "none",
                                    fontFamily: "inherit",
                                    letterSpacing: "0.02em",
                                    boxSizing: "border-box",
                                }}
                                onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c9a86c")}
                                onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#2a2a2a")}
                            />
                        </motion.div>

                        <motion.button
                            variants={fadeUp}
                            transition={{ duration: 0.6 }}
                            whileHover={{ backgroundColor: "#c9a86c", color: "#080808", borderColor: "#c9a86c" }}
                            style={{
                                background: "transparent",
                                border: "1px solid #333",
                                padding: "18px 48px",
                                fontSize: "0.8rem",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#e8e8e8",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Submit Application
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
