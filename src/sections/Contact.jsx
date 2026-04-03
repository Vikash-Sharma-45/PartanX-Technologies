import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// ── Web3Forms Access Key ──
// Get your FREE access key at https://web3forms.com
// 1. Go to web3forms.com → Enter "tech.partanx@gmail.com" → Verify email
// 2. Copy the access key and paste it below
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';

const channels = [
  { icon: '✉️', label: 'Email', value: 'tech.partanx@gmail.com', href: 'mailto:tech.partanx@gmail.com' },
  { icon: '💼', label: 'LinkedIn', value: 'PartanX', href: 'https://www.linkedin.com/company/partanx/' },
  { icon: '📷', label: 'Instagram', value: '@tech.partanx', href: 'https://www.instagram.com/tech.partanx/' },
  { icon: '🐦', label: 'Twitter', value: '@PartanX_', href: 'https://x.com/PartanX_' },
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
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add Web3Forms access key and settings
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('from_name', 'PartanX Website');
    formData.append('subject', formData.get('subject') || 'New Contact Form Submission — PartanX');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'sending':
        return (
          <>
            Sending...
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </>
        );
      case 'success':
        return (
          <>
            ✓ Message Sent!
          </>
        );
      case 'error':
        return (
          <>
            ✕ Failed to Send
          </>
        );
      default:
        return (
          <>
            Send Message
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
            </svg>
          </>
        );
    }
  };

  const getButtonStyle = () => {
    const base = { width: '100%', justifyContent: 'center', borderRadius: '12px', transition: 'background 0.4s ease, box-shadow 0.3s ease, transform 0.2s ease' };
    if (status === 'success') return { ...base, background: 'linear-gradient(135deg, #10b981, #06b6d4)' };
    if (status === 'error') return { ...base, background: 'linear-gradient(135deg, #ef4444, #f97316)' };
    return base;
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
                <a key={ch.label} href={ch.href} className="contact-channel" target="_blank" rel="noopener noreferrer">
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
              {/* Honeypot spam protection */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" className="form-input" placeholder="John Doe" required disabled={status === 'sending'} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" className="form-input" placeholder="john@example.com" required disabled={status === 'sending'} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input id="subject" name="subject" type="text" className="form-input" placeholder="Project Inquiry" disabled={status === 'sending'} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" name="message" className="form-textarea" placeholder="Tell us about your project..." required disabled={status === 'sending'} />
              </div>

              {/* Status message */}
              {status === 'success' && (
                <div style={{ color: '#10b981', fontSize: '0.9rem', textAlign: 'center', padding: '0.5rem 0' }}>
                  🎉 Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', padding: '0.5rem 0' }}>
                  {errorMsg}
                </div>
              )}

              <MagneticButton strength={0.2}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={getButtonStyle()}
                  disabled={status === 'sending'}
                >
                  {getButtonContent()}
                </button>
              </MagneticButton>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Spinner keyframe for loading state */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
