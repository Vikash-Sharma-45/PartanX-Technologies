import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Sticky navbar that gains a glass backdrop on scroll.
 * Framer Motion handles the mount animation.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled navbar-glass' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar-inner">
        {/* Logo */}
        <a href="#hero" className="navbar-logo" onClick={(e) => handleNav(e, '#hero')}>
          PARTANX TECHNOLOGIES
        </a>

        {/* Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => handleNav(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          className="navbar-cta"
          href="#contact"
          onClick={(e) => handleNav(e, '#contact')}
        >
          Let's Talk
        </a>
      </div>
    </motion.nav>
  );
}
