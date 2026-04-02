import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    tag: 'Web App',
    title: 'Nebula Dashboard',
    desc: 'Real-time analytics platform with 3D data visualizations and live WebSocket feeds.',
    tech: ['React', 'Three.js', 'Node'],
    emoji: '🌌',
    color: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
  },
  {
    tag: 'E-Commerce',
    title: 'Aura Store',
    desc: 'Luxury fashion brand with immersive product showcases and silky checkout animations.',
    tech: ['Next.js', 'GSAP', 'Stripe'],
    emoji: '✨',
    color: 'linear-gradient(135deg, #f472b6, #7c3aed)',
  },
  {
    tag: 'SaaS',
    title: 'Synapse AI',
    desc: 'AI writing assistant with generative UI, real-time streaming, and smart suggestions.',
    tech: ['React', 'OpenAI', 'Supabase'],
    emoji: '🧠',
    color: 'linear-gradient(135deg, #06b6d4, #10b981)',
  },
  {
    tag: 'Portfolio',
    title: 'Prism Creative',
    desc: 'Award-winning creative agency portfolio with WebGL shaders and scroll storytelling.',
    tech: ['Three.js', 'GLSL', 'GSAP'],
    emoji: '🔮',
    color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
  {
    tag: 'Mobile',
    title: 'Pulse Fitness',
    desc: 'Cross-platform fitness tracker with animated progress rings and AR body scanner.',
    tech: ['React Native', 'Reanimated', 'AR'],
    emoji: '💪',
    color: 'linear-gradient(135deg, #10b981, #06b6d4)',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade up
      gsap.from(headerRef.current.children, {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Horizontal scroll pin
      const totalWidth = trackRef.current.scrollWidth - wrapRef.current.clientWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${totalWidth + 300}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects-header" ref={headerRef}>
          <div>
            <div className="section-label">Selected Work</div>
            <h2 className="h2" style={{ marginTop: '1rem' }}>
              Projects That <span className="text-gradient">Define Us</span>
            </h2>
          </div>
          <p style={{ color: 'var(--clr-text-muted)', maxWidth: 300, fontSize: '0.9rem', lineHeight: 1.7 }}>
            Scroll horizontally through our featured work
          </p>
        </div>
      </div>

      {/* Horizontal scroll wrapper */}
      <div ref={wrapRef} style={{ overflow: 'hidden', width: '100%' }}>
        <div
          ref={trackRef}
          className="horizontal-scroll-container"
          style={{ paddingLeft: 'max(2rem, calc((100vw - 1280px)/2 + 2rem))' }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              className="project-card"
              data-cursor-hover
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image placeholder with gradient */}
              <div className="project-card-img-placeholder" style={{ background: p.color }}>
                <span style={{ fontSize: '4rem' }}>{p.emoji}</span>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(6,6,14,0.8))',
                }} />
              </div>

              <div className="project-card-body">
                <span className="project-tag">{p.tag}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-footer">
                  <div className="project-tech-stack">
                    {p.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                  <a href="#" className="project-link-icon" aria-label="View project">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Padding end card */}
          <div style={{ width: '4rem', flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}
