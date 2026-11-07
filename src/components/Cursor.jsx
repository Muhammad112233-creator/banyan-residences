'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.body.classList.add('has-cursor');

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      ring.current.classList.remove('is-hidden');
      dot.current.style.opacity = '1';
    };
    const over = (e) => {
      if (e.target.closest('a, button, [role="button"], input, label, [data-cursor]')) {
        ring.current.classList.add('is-hover');
      }
    };
    const out = (e) => {
      if (e.target.closest('a, button, [role="button"], input, label, [data-cursor]')) {
        ring.current.classList.remove('is-hover');
      }
    };
    const leave = () => {
      ring.current.classList.add('is-hidden');
      dot.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden />
      <div ref={ring} className="cursor-ring is-hidden" aria-hidden />
    </>
  );
}
