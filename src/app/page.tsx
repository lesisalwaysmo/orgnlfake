"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import PhotonScrollEffect from "@/components/PhotonScrollEffect";
import "./landing.css";

const animationImages = [
  '/landing/ANIMATION/6.jpg',
  '/landing/ANIMATION/_MG_0085 3.jpg',
  '/landing/ANIMATION/_MG_0125.jpg',
  '/landing/ANIMATION/_MG_0246.jpg',
  '/landing/ANIMATION/_MG_0574.jpg',
  '/landing/ANIMATION/_MG_0735.jpg',
  '/landing/ANIMATION/htsyssf.jpg',
  '/landing/ANIMATION/orgnlfake__1574136420_2180336779075770680_4183375751.jpg',
  '/landing/ANIMATION/orgnlfake__1628225906_2634072276989489657_4183375751.jpg',
  '/landing/ANIMATION/orgnlfake__1737619218_3551684337159388122_4183375751.webp',
  '/landing/ANIMATION/orgnlfake__1756828805_3712408242753148550_4183375751.webp',
  '/landing/ANIMATION/yfytf.jpg'
];

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Custom Cursor
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Intersection Observer for Reveal Animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const currentRefs = revealRefs.current;
    currentRefs.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      currentRefs.forEach(el => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="landing-body">
      <div
        className="landing-cursor"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      ></div>

      <section id="home" className="banner">
        <div className="slider" style={{ "--quantity": animationImages.length } as any}>
          {animationImages.map((img, index) => (
            <div key={index} className="item" style={{ "--position": index + 1 } as any}>
              <Image 
                src={img} 
                alt="Orgnlfake Model" 
                fill 
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
                priority={index < 4} 
              />
            </div>
          ))}
        </div>
        <div className="hero-content reveal" ref={addToRefs}>
          <div className="hero-subtitle">High Fashion & Creative Arts</div>
          <h1 className="hero-title">Unfiltered<br />Reality</h1>
        </div>
      </section>

      <section className="banner-paragraph reveal no-reveal" ref={addToRefs}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          In an industry often defined by rigid expectations and artificial standards, <strong>Orgnlfake</strong> was born to serve as a sanctuary for the authentic. Based in the vibrant creative landscape of South Africa, we are more than an agency; we are a <strong>Pro-Choice Collective</strong>. We believe that every individual has the right to navigate their career without surrendering their autonomy. To us, &apos;Original&apos; isn&apos;t just a name—it&apos;s a commitment to the unfiltered, culturally diverse, and beautifully complex reality of Mzansi.
        </motion.p>
      </section>

      {/* Photon Scroll Animation Section */}
      <PhotonScrollEffect />

      <section className="manifesto-paragraph reveal no-reveal" ref={addToRefs}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          We stand firmly against the &apos;fake&apos; hierarchies of the past. Here, there are no bosses and no subordinates. We operate as a horizontal partnership, where the vision of the brand and the soul of the creator meet as equals. We are a house built on the belief that your personal life, your choices, and your private journey are yours alone; they do not define your talent, but they do fuel your unique creative fire.
        </motion.p>
      </section>

      <section id="about" className="reveal no-reveal" ref={addToRefs}>
        <div className="about-img" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image 
            src="/landing/orgnlfake__1582784388_2252881193439860909_4183375751.jpg" 
            alt="Model Profile" 
            width={800}
            height={1000}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
        <motion.div
          className="about-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            The Orgnlfake Manifesto
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            We are a home for the pioneers and the pupils alike. Orgnlfake serves as a creative incubator where the next generation of South African icons comes to find their footing. Many of the women on our board started right here—learning how to command a room, how to pose with intention, how to navigate social interactions, and how to build a professional brand from the ground up.
          </motion.p>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
            style={{ marginBottom: "30px" }}
          >
            We aren't just looking for 'finished products'; we are looking for people ready to learn, evolve, and create. By fostering a safe space where cultural differences are celebrated and empowerment is the baseline, we are rewriting the script. While our current focus is on the radical empowerment of women, we are an ever-evolving house, soon expanding our partnership model to men who believe in a world where creativity is a shared currency and respect is non-negotiable.
          </motion.p>
          <motion.div
            style={{ display: "flex", gap: "30px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
            }}
          >
            <div>
              <h4 style={{ color: "var(--accent)" }}>Loc</h4>
              <span>JHB / Klerksdorp / Pretoria</span>
            </div>
            <div>
              <h4 style={{ color: "var(--accent)" }}>Exp</h4>
              <span>8 Years</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="portfolio-link" className="reveal no-reveal" ref={addToRefs}>
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center border-t border-b border-[#222] my-12 bg-[#0a0a0a]">
          <h2 className="section-title mb-6">The Collection</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
            Explore our curated portfolio of High Fashion, Boudoir, Active Wear, and Creative Portraits shot by our agency.
          </p>
          <a
            href="/production"
            className="inline-block border border-white/30 px-10 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            View Production Portfolio
          </a>
        </div>
      </section>

      <section id="contact">
        <div className="contact-wrapper reveal" ref={addToRefs}>
          <h2 className="section-title">Collaborate</h2>
          <p style={{ marginBottom: "40px", color: "var(--text-muted)" }}>Available for bookings worldwide.</p>
          <form>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input type="text" placeholder="Name" className="landing-input" />
              <input type="email" placeholder="Email" className="landing-input" />
            </div>
            <input type="text" placeholder="Subject / Category" className="landing-input" />
            <textarea rows={6} placeholder="Tell us about your vision..." className="landing-textarea"></textarea>
            <button type="button" className="send-btn">Send Request</button>
          </form>
        </div>
      </section>
    </div>
  );
}
