import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom cursor: small dot + trailing ring.
 * Uses GSAP for buttery-smooth lag on the ring.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    // Mouse position
    let mouseX = 0, mouseY = 0;

    // Quick set for the dot
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY });

      // Ring follows with lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.18,
        ease: 'power2.out',
      });
    };

    // Hover states on interactive elements
    const addHover = () => ring.classList.add('hover');
    const removeHover = () => ring.classList.remove('hover');

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor-hover], .project-card, .glass-card'
    );

    window.addEventListener('mousemove', onMove);
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
