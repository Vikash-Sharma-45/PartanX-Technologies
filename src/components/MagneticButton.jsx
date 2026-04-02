import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Magnetic button wrapper.
 * Children gravitate toward the cursor on hover.
 * Uses GSAP for smooth elastic movement.
 */
export default function MagneticButton({ children, strength = 0.35 }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      gsap.to(el, {
        x: dx,
        y: dy,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return (
    <span className="magnetic-wrap" ref={wrapRef}>
      {children}
    </span>
  );
}
