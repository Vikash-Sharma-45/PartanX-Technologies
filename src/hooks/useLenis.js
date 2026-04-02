import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initializes Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 *
 * Key fixes:
 *  1. GSAP ticker gives time in SECONDS — Lenis.raf() needs MILLISECONDS → multiply by 1000.
 *  2. ScrollTrigger scroller proxy ensures pin/scrub animations use Lenis scroll values.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // ✅ Fix: GSAP time is in seconds, Lenis.raf() wants milliseconds
    function rafLoop(time) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(rafLoop);
    gsap.ticker.lagSmoothing(0);

    // ✅ ScrollTrigger proxy: feed Lenis scroll position to GSAP
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    // Sync ScrollTrigger whenever Lenis scrolls
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Refresh ScrollTrigger after first render
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafLoop);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return lenisRef;
}
