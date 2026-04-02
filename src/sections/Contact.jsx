import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const channels = [
  { icon: '✉️', label: 'Email', value: 'hello@nexus.studio', href: 'mailto:hello@nexus.studio' },
  { icon: '💼', label: 'LinkedIn', value: '/in/nexus-studio', href: '#' },
  { icon: '🐙', label: 'GitHub', value: '@nexus-studio', href: '#' },
  { icon: '🐦', label: 'Twitter', value: '@nexusstudio', href: '#' },
];

const formVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Contact() {
  const sectionRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(infoRef.current.children, {
        opacity: 0, y: 50, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
      gsap.from('.contact-channel', {
        opacity: 0, x: -30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-channels', start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission placeholder
    const btn = e.currentTarget.querySelector('button[type="submit"]');
    btn.textContent = '✓ Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
    }, 3000);
  };

  return (
    <section className="contact-section section" id="contact" ref={sectionRef}>
      {/* Glow */}
      <div className="glow-blob" style={{
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(244,114,182,0.12) 0%, transparent 70%)',
        top: '10%', right: '-10%',
      }} />

      <div className="container">
        <div className="contact-grid">

          {/* ── Left: Info ── */}
          <div className="contact-info" ref={infoRef}>
            <div className="section-label">Contact</div>
            <h2 className="h2" style={{ marginTop: '1rem' }}>
              Let's Build Something <span className="text-gradient">Amazing</span>
            </h2>
            <p>
              Have a project in mind? We'd love to hear about it. Drop us a message and
              we'll get back to you within 24 hours.
            </p>

            <div className="contact-channels">
              {channels.map((ch) => (
                <a key={ch.label} href={ch.href} className="contact-channel">
                  <div className="contact-channel-icon">{ch.icon}</div>
                  <div>
                    <div className="contact-channel-label">{ch.label}</div>
                    <div className="contact-channel-value">{ch.value}</div>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: 'var(--clr-text-muted)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input id="name" type="text" className="form-input" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" type="email" className="form-input" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input id="subject" type="text" className="form-input" placeholder="Project Inquiry" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" className="form-textarea" placeholder="Tell us about your project..." required />
              </div>

              <MagneticButton strength={0.2}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', transition: 'background 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease' }}
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
                  </svg>
                </button>
              </MagneticButton>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
