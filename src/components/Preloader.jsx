'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { brand } from '@/lib/data';

export default function Preloader() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    window.__lenis?.stop();
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
        window.__appReady = true;
        window.dispatchEvent(new Event('app:ready'));
        window.__lenis?.start();
      },
    });
    tl.to(obj, {
      v: 100,
      duration: 1.9,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(obj.v)),
    });
    tl.to(ref.current, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, '+=0.2');
    return () => tl.kill();
  }, []);

  if (done) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-8 bg-vanilla"
    >
      <p className="heading-3 text-golden">{count}%</p>
      <h1
        className="huge text-sand text-center uppercase"
        style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
      >
        {brand.name}
      </h1>
      <p className="menu-type uppercase tracking-widest text-golden">{brand.tagline}</p>
    </div>
  );
}
