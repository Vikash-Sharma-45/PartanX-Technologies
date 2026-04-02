import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import CustomCursor from '../components/CustomCursor';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';

// Sections
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';

// Hooks
import { useLenis } from '../hooks/useLenis';

export default function Home() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('loaderDone'));

  // Initialize smooth scroll
  useLenis();

  // Refresh ScrollTrigger after content renders to reset animation triggers
  useEffect(() => {
    if (!loading) {
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [loading]);

  return (
    <>
      {/* ── Custom cursor (desktop only) ── */}
      <CustomCursor />

      {/* ── Page loader ── */}
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => {
            sessionStorage.setItem('loaderDone', 'true');
            setLoading(false);
          }} />
        )}
      </AnimatePresence>

      {/* ── Main site (rendered beneath loader, visible after) ── */}
      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Skills />
            <Contact />
          </main>

          <Footer />
        </>
      )}
    </>
  );
}
