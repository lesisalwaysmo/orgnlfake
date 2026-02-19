"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import "./landing.css";

const categoryImages = {
  fashion: [
    '/landing/Fashion/1.png', '/landing/Fashion/11.jpg', '/landing/Fashion/12.jpg', '/landing/Fashion/6.jpg',
    '/landing/Fashion/Generated Image September 09, 2025 - 10_14PM.png', '/landing/Fashion/Generated Image September 09, 2025 - 9_53PM.png',
    '/landing/Fashion/_MG_0065.jpg', '/landing/Fashion/_MG_0076.jpg', '/landing/Fashion/_MG_0085 3.jpg',
    '/landing/Fashion/_MG_0246.jpg', '/landing/Fashion/_MG_0277.jpg', '/landing/Fashion/_MG_0735.jpg',
    '/landing/Fashion/ggggggggtgt.png', '/landing/Fashion/grddtcg.jpg', '/landing/Fashion/gtggtytfydt.jpg', '/landing/Fashion/jsuhfgsu.jpg',
    '/landing/Fashion/orgnlfake__1556513320_2032503501079625300_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1556513320_2032503501087915183_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1574136420_2180336779075770680_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1583303502_2257235838367082905_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1609993524_2481127968532090401_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1626670676_2621026062966327085_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1628225906_2634072276989489657_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1632804469_2672480049808409728_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1682571746_3089958225432590158_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1682571746_3089958225583576446_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1714929363_3361393591316894093_4183375751.webp',
    '/landing/Fashion/orgnlfake__1714929363_3361393591325294208_4183375751.webp',
    '/landing/Fashion/orgnlfake__1715061628_3361398108464821222_4183375751.webp',
    '/landing/Fashion/orgnlfake__1715061628_3361398108481531912_4183375751.webp',
    '/landing/Fashion/orgnlfake__1739033046_3563589939141926044_4183375751.webp',
    '/landing/Fashion/orgnlfake__1754570550_3693927968162571769_4183375751.jpg',
    '/landing/Fashion/orgnlfake__1756828805_3712408242753148550_4183375751.webp',
    '/landing/Fashion/orgnlfake__1756828805_3712408242761538995_4183375751.webp',
    '/landing/Fashion/orgnlfake__1757500272_3718504255729820216_4183375751.jpg',
    '/landing/Fashion/uhgajshgc.jpg', '/landing/Fashion/uyaguyga.jpg', '/landing/Fashion/yfdhffchct.jpg', '/landing/Fashion/yhfdugt.jpg'
  ],
  boudoir: [
    '/landing/Boudoir/IMG-20230326-WA0016.jpg', '/landing/Boudoir/IMG-20230326-WA0017.jpg',
    '/landing/Boudoir/IMG-20230814-WA0032.jpg', '/landing/Boudoir/IMG_0440 colorized.jpg',
    '/landing/Boudoir/htsyssf.jpg', '/landing/Boudoir/iuyhgfdt.jpg', '/landing/Boudoir/jujnbghytfk.jpg',
    '/landing/Boudoir/jukoiut.jpg', '/landing/Boudoir/juyyhgtrfdews.jpg',
    '/landing/Boudoir/orgnlfake__1737619218_3551684337159388122_4183375751.webp',
    '/landing/Boudoir/orgnlfake__1737619218_3551684337260161126_4183375751.webp',
    '/landing/Boudoir/orgnlfake__1756921600_3713650006348904412_4183375751.jpg',
    '/landing/Boudoir/reduyigsg.jpg', '/landing/Boudoir/yfytf.jpg', '/landing/Boudoir/ytgfree.jpg'
  ],
  active: [
    '/landing/Active/1.jpg', '/landing/Active/4.jpg'
  ],
  skincare: [
    '/landing/beauty/_MG_0067.jpg', '/landing/beauty/orgnlfake__1755259229_3699705145290302972_4183375751.webp'
  ],
  lingerie: [
    '/landing/Lingerie/_MG_0125.jpg', '/landing/Lingerie/_MG_0201.jpg', '/landing/Lingerie/_MG_0228.jpg',
    '/landing/Lingerie/hfdgrs.jpg', '/landing/Lingerie/hjgafueyffbc.jpg',
    '/landing/Lingerie/orgnlfake__1617164587_2541283206148515199_4183375751.jpg',
    '/landing/Lingerie/orgnlfake__1757347211_3717220285456862054_4183375751.jpg'
  ],
  beauty: [
    '/landing/beauty/_MG_0067.jpg', '/landing/beauty/orgnlfake__1755259229_3699705145290302972_4183375751.webp'
  ],
  portrait: [
    '/landing/CREATIVE POTRAIT/_MG_0020 2.jpg', '/landing/CREATIVE POTRAIT/_MG_0027.jpg',
    '/landing/CREATIVE POTRAIT/_MG_0574.jpg', '/landing/CREATIVE POTRAIT/orgnlfake__1699264943_3229990908790655262_4183375751.webp',
    '/landing/CREATIVE POTRAIT/orgnlfake__1699264943_3229990908807405092_4183375751.webp',
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
  { id: 'portrait', title: 'Creative Portrait' }
];

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
  const [activeFilter, setActiveFilter] = useState("fashion");
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
              <img src={img} alt="" />
            </div>
          ))}
        </div>
        <div className="hero-content reveal" ref={addToRefs}>
          <div className="hero-subtitle">High Fashion & Creative Arts</div>
          <h1 className="hero-title">Unfiltered<br />Reality</h1>
        </div>
      </section>

      <section id="about" className="reveal" ref={addToRefs}>
        <div className="about-img">
          <img src="/landing/orgnlfake__1582784388_2252881193439860909_4183375751.jpg" alt="Model Profile" />
        </div>
        <div className="about-text">
          <h2>About OrgnlFake</h2>
          <p>OrgnlFake represents the duality of the modern muse. We blur the lines between the organic self and the curated persona.</p>
          <p>Specializing in high-impact visual storytelling, our work spans across continents and genres. From the grit of urban streetwear to the delicate intimacy of boudoir, we create moments that provoke and inspire.</p>
          <br />
          <div style={{ display: "flex", gap: "30px" }}>
            <div>
              <h4 style={{ color: "var(--accent)" }}>Loc</h4>
              <span>JHB / Klerksdorp / Pretoria</span>
            </div>
            <div>
              <h4 style={{ color: "var(--accent)" }}>Exp</h4>
              <span>8 Years</span>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio">
        <div className="section-header reveal" ref={addToRefs}>
          <h2 className="section-title">The Collection</h2>
          <p style={{ color: "var(--text-muted)" }}>Select a category to filter the archives.</p>
        </div>

        <div className="filter-container reveal" ref={addToRefs}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? "active" : ""}`}
              onMouseEnter={() => setActiveFilter(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="gallery-grid" id="gallery-grid">
          {categories.map((cat) => (
            activeFilter === cat.id && categoryImages[cat.id as keyof typeof categoryImages].map((imgPath, i) => (
              <div key={`${cat.id}-${i}`} className="gallery-item reveal active" data-category={cat.id}>
                <img src={imgPath} alt={cat.title} loading="lazy" />
                <div className="overlay">
                  <span className="cat-label">{cat.title}</span>
                  <div className="img-title">Concept {i + 1}</div>
                </div>
              </div>
            ))
          ))}
        </div>
      </section>

      <section id="media-kits" className="reveal" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Media & Press</h2>
        </div>
        <div className="kits-grid">
          <div className="kit-card">
            <h3>Agency Book</h3>
            <p style={{ color: "#666" }}>PDF | 12.4MB</p>
            <a href="#" className="download-btn">Download</a>
          </div>
          <div className="kit-card">
            <h3>Social Statistics</h3>
            <p style={{ color: "#666" }}>PDF | 2.1MB</p>
            <a href="#" className="download-btn">Download</a>
          </div>
          <div className="kit-card">
            <h3>Raw Digitals</h3>
            <p style={{ color: "#666" }}>ZIP | 45MB</p>
            <a href="#" className="download-btn">Download</a>
          </div>
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
