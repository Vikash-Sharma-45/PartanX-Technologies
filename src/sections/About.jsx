import { useRef, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

/* ── Interactive 3D blob for the About visual ── */
function AnimatedBlob() {
  const meshRef = useRef(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    // React to mouse
    meshRef.current.position.x = state.mouse.x * 0.3;
    meshRef.current.position.y = state.mouse.y * 0.2;
  });
  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.45}
        speed={2}
        roughness={0.05}
        metalness={0.9}
        emissive="#5b21b6"
        emissiveIntensity={0.6}
        transparent
        opacity={0.95}
      />
    </Sphere>
  );
}

const stats = [
  { number: '50+', label: 'Projects Shipped' },
  { number: '5yr', label: 'Experience' },
  { number: '30+', label: 'Happy Clients' },
  { number: '∞', label: 'Creativity' },
];

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading & paragraphs fade up
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stat cards stagger
      gsap.from(statsRef.current.children, {
        opacity: 0,
        scale: 0.85,
        stagger: 0.1,
        duration: 0.7,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section section" id="about" ref={sectionRef}>
      {/* Glow */}
      <div className="glow-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
        top: '20%', right: '-10%',
      }} />

      <div className="container">
        <div className="about-grid">

          {/* ── 3D Visual ── */}
          <div className="about-visual">
            <div className="about-3d-wrapper">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} dpr={[1, 1.5]}>
                  <ambientLight intensity={1.2} />
                  <pointLight position={[4, 4, 4]} intensity={3} color="#a78bfa" />
                  <pointLight position={[-4, -4, -4]} intensity={2} color="#06b6d4" />
                  <pointLight position={[0, 4, 2]} intensity={1.5} color="#f472b6" />
                  <AnimatedBlob />
                </Canvas>
              </Suspense>
            </div>

            {/* Floating label */}
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '1.5rem',
              background: 'rgba(6,6,14,0.8)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 12, padding: '0.75rem 1.25rem',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--clr-accent)', letterSpacing: '0.15em', marginBottom: '0.2rem' }}>STATUS</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--clr-text)' }}>🟢 Open to Work</div>
            </div>
          </div>

          {/* ── Text content ── */}
          <div ref={textRef}>
            <div className="section-label">About Us</div>
            <h2 className="h2" style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              We Build the <span className="text-gradient">Future</span> of the Web
            </h2>
            <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
              We're a team of passionate engineers and designers who live at the intersection
              of art and technology. Every pixel we push, every line of code we write — it's
              crafted with intention and precision.
            </p>
            <p style={{ color: 'var(--clr-text-muted)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
              From immersive 3D experiences to blazing-fast web applications, we
              create digital products that leave a lasting impression.
            </p>

            {/* Stats */}
            <div className="about-stats" ref={statsRef}>
              {stats.map((s) => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <Link to="/about" style={{ 
              display: 'inline-block',
              marginTop: '2.5rem',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--clr-text)',
              padding: '0.8rem 1.8rem',
              borderRadius: '100px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.95rem'
            }}>
              Discover Our Story →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
