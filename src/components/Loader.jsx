import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

/**
 * Full-screen loader with animated progress bar.
 * Exits with a smooth wipe using Framer Motion.
 */
export default function Loader({ onComplete }) {
  const barRef = useRef(null);
  const pctRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      },
    });

    // Animate progress bar fill
    tl.to(barRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: 'power2.inOut',
    });

    // Animate percentage counter
    let count = { val: 0 };
    tl.to(
      count,
      {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (pctRef.current) {
            pctRef.current.textContent = `${Math.round(count.val)}%`;
          }
        },
      },
      '<'
    );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <motion.div
        className="loader-logo"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        PARTANX TECHNOLOGIES
      </motion.div>

      {/* Progress bar */}
      <div className="loader-bar-track">
        <div
          className="loader-bar-fill"
          ref={barRef}
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Percentage */}
      <div className="loader-text">
        <span ref={pctRef}>0%</span>
      </div>
    </motion.div>
  );
}
