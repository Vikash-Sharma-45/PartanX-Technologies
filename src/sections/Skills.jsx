import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    icon: '⚡',
    title: 'Frontend',
    skills: [
      { name: 'React / Next.js', pct: 95 },
      { name: 'Three.js / WebGL', pct: 85 },
      { name: 'TypeScript', pct: 90 },
      { name: 'CSS / Animation', pct: 92 },
    ],
  },
  {
    icon: '🛠',
    title: 'Backend',
    skills: [
      { name: 'Node.js / Express', pct: 88 },
      { name: 'PostgreSQL', pct: 80 },
      { name: 'MongoDB', pct: 82 },
      { name: 'REST / GraphQL', pct: 87 },
    ],
  },
  {
    icon: '🎨',
    title: 'Creative Tech',
    skills: [
      { name: 'GSAP / Motion', pct: 93 },
      { name: 'Framer Motion', pct: 90 },
      { name: 'Blender / 3D', pct: 70 },
      { name: 'Figma / Design', pct: 78 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(headerRef.current.children, {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      });

      // Skill category cards
      gsap.from('.skill-category', {
        opacity: 0, y: 60, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 78%', toggleActions: 'play none none reverse' },
      });

      // Skill bars animate in on scroll
      document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        const pct = parseFloat(bar.dataset.pct) / 100;
        gsap.to(bar, {
          scaleX: pct,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills-section section" id="skills" ref={sectionRef}>
      {/* Glow */}
      <div className="glow-blob" style={{
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
        bottom: '0%', left: '-10%',
      }} />

      <div className="container">
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Expertise</div>
          <h2 className="h2" style={{ marginTop: '1rem' }}>
            What We <span className="text-gradient">Excel At</span>
          </h2>
          <p style={{ color: 'var(--clr-text-muted)', maxWidth: 520, margin: '1rem auto 0', lineHeight: 1.75, fontSize: '0.95rem' }}>
            A curated set of technologies and tools we've mastered over years of building production systems.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-category" key={group.title}>
              <div className="skill-category-icon">{group.icon}</div>
              <h3 className="skill-category-title">{group.title}</h3>
              {group.skills.map((s) => (
                <div className="skill-item" key={s.name}>
                  <div className="skill-header">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-pct">{s.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      data-pct={s.pct}
                      style={{ transform: 'scaleX(0)' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
