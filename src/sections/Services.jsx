import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Web Development',
    desc: 'We build fast, responsive, and high-converting websites and web applications tailored to your business needs, ensuring a stunning visual experience and solid architecture.',
    emoji: '💻',
    color: 'linear-gradient(135deg, #7c3aed, #f472b6)',
    features: ['Custom React/Vite Sites', 'Interactive 3D UI', 'Performance Optimization']
  },
  {
    title: 'Social Media Management',
    desc: 'Elevate your online presence with data-driven social media strategies. We manage your content, engage with your audience, and grow your brand organically and effectively.',
    emoji: '📱',
    color: 'linear-gradient(135deg, #06b6d4, #10b981)',
    features: ['Content Strategy', 'Community Engagement', 'Analytics & Reporting']
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

      // Cards stagger
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="services" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">Our Expertise</div>
          <h2 className="h2" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            Our <span className="text-gradient">Services</span>
          </h2>
          <p style={{ color: 'var(--clr-text-muted)', maxWidth: 600, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            We provide top-tier solutions to help your business thrive in the digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem' 
        }}>
          {services.map((s, i) => {
            const serviceId = s.title.toLowerCase().replace(/\s+/g, '-');
            return (
            <Link to={`/services/${serviceId}`} key={s.title} style={{ textDecoration: 'none', display: 'flex' }}>
              <motion.div
                className="project-card"
                style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                data-cursor-hover
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="project-card-img-placeholder" style={{ background: s.color, height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ fontSize: '3.5rem', zIndex: 10 }}>{s.emoji}</span>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 20%, rgba(6,6,14,0.95))',
                    zIndex: 5
                  }} />
                </div>

                <div className="project-card-body" style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 className="project-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h3>
                  <p className="project-desc" style={{ marginBottom: '1.5rem', lineHeight: 1.6, flexGrow: 1 }}>{s.desc}</p>
                  <div className="project-tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {s.features.map((f) => (
                      <span key={f} className="tech-pill" style={{ background: 'rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>{f}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
