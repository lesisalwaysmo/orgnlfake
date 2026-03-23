"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        brand: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid #2a2a2a",
        padding: "14px 0",
        color: "#e8e8e8",
        fontSize: "0.95rem",
        outline: "none",
        letterSpacing: "0.02em",
        fontFamily: "inherit",
        transition: "border-color 0.3s ease",
        boxSizing: "border-box",
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
                        The Alliance Gateway
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
                        Let's Build<br />
                        <em style={{ fontStyle: "italic", color: "#c9a86c" }}>Something Original</em>
                    </motion.h1>
                </div>
            </motion.section>

            {/* Alliance Narrative */}
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
                        Every great campaign starts with a conversation between equals. At Orgnlfake, we are ready to listen.
                        Whether you are a Brand looking for a creative partner who understands the South African retail landscape,
                        or a Designer seeking a diverse collective of empowered talent, we are here to execute your vision. We
                        don't believe in the standard client-vendor relationship; we believe in <strong style={{ color: "#e8e8e8" }}>alliances</strong>.
                    </motion.p>
                    <motion.p
                        variants={fadeUp}
                        transition={{ duration: 0.8 }}
                        style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.9, color: "#aaa" }}
                    >
                        Use this space to tell us about your project, your goals, and how you want to disrupt the status quo. If
                        you are a creator with questions about our partnership model, our in-house training, or how we share
                        publishing rights, don't hesitate to reach out. We are a house of learning, creation, and radical respect.
                        Let's leave the 'fake' standards behind and build something that is Original to the core.
                    </motion.p>
                </motion.div>
            </section>

            {/* Two-Column Layout */}
            <section style={{ padding: "80px 40px" }}>
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "1fr 1.4fr",
                        gap: "80px",
                        alignItems: "start",
                    }}
                >
                    {/* Left: Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                    >
                        <motion.h2
                            variants={fadeUp}
                            transition={{ duration: 0.8 }}
                            style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: "40px", color: "#fff" }}
                        >
                            Get In Touch
                        </motion.h2>
                        {[
                            { label: "General Inquiries", value: "info@orgnlfake.agency" },
                            { label: "Bookings & Casting", value: "bookings@orgnlfake.agency" },
                            { label: "Creator Applications", value: "join@orgnlfake.agency" },
                            { label: "Location", value: "JHB / Klerksdorp / Pretoria" },
                        ].map((item) => (
                            <motion.div
                                key={item.label}
                                variants={fadeUp}
                                transition={{ duration: 0.6 }}
                                style={{ marginBottom: "30px", borderBottom: "1px solid #1a1a1a", paddingBottom: "24px" }}
                            >
                                <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a86c", marginBottom: "8px" }}>
                                    {item.label}
                                </p>
                                <p style={{ fontSize: "0.95rem", color: "#888" }}>{item.value}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                    >
                        {["name", "email", "brand"].map((field) => (
                            <motion.div key={field} variants={fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: "24px" }}>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={(form as any)[field]}
                                    onChange={handleChange}
                                    placeholder={
                                        field === "brand"
                                            ? "Brand / Company Name"
                                            : field.charAt(0).toUpperCase() + field.slice(1)
                                    }
                                    style={inputStyle}
                                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c9a86c")}
                                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "#2a2a2a")}
                                />
                            </motion.div>
                        ))}

                        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: "24px" }}>
                            <select
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                style={{ ...inputStyle, background: "#080808", cursor: "pointer", color: form.subject ? "#e8e8e8" : "#555" }}
                            >
                                <option value="" disabled>Subject / Category</option>
                                <option value="booking">Brand Booking</option>
                                <option value="creative">Creative Direction</option>
                                <option value="bulk">Bulk Booking</option>
                                <option value="creator">Creator Partnership Question</option>
                                <option value="other">Other</option>
                            </select>
                        </motion.div>

                        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} style={{ marginBottom: "40px" }}>
                            <textarea
                                name="message"
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Tell us about your vision..."
                                style={{ ...inputStyle, resize: "none" }}
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
                            Send Message
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
