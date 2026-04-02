import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import MagneticButton from '../components/MagneticButton';

// Text animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 2.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="hero-section noise" id="hero">
      {/* ── Three.js background ── */}
      <div className="hero-canvas-wrapper">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* ── Gradient glow blobs ── */}
      <div
        className="glow-blob"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          top: '30%',
          right: '-5%',
        }}
      />

      {/* ── Hero content ── */}
      <div className="container hero-content">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">

          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Available for new projects
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span>Crafting</span>
            <span className="text-gradient">Digital</span>
            <span>Experiences.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            We build immersive, high-performance web experiences that push the
            boundaries of what's possible — blending 3D artistry with
            cutting-edge frontend engineering.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-actions" variants={itemVariants}>
            <MagneticButton>
              <a href="#projects" className="btn-primary" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                View Our Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a href="#contact" className="btn-outline" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Get in Touch
              </a>
            </MagneticButton>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll-indicator">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
