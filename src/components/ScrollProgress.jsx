import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Thin gradient progress bar fixed to the top of the viewport.
 * Width is driven by scroll position via GSAP ScrollTrigger.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      className="scroll-progress"
      ref={barRef}
      style={{
        width: '100%',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
      }}
    />
  );
}
