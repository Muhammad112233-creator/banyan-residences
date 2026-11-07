'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { asset } from '@/lib/utils';
import Button from '@/components/Button';

function Cloud({ className, style }) {
  return (
    <svg viewBox="0 0 200 80" className={className} style={style} aria-hidden>
      <g fill="#fdfbef">
        <ellipse cx="60" cy="50" rx="50" ry="26" />
        <ellipse cx="110" cy="40" rx="42" ry="30" />
        <ellipse cx="150" cy="52" rx="38" ry="22" />
      </g>
    </svg>
  );
}

export default function Horizontal() {
  const root = useRef(null);
  const strip = useRef(null);

  useEffect(() => {
    const el = root.current;
    const ctx = gsap.context(() => {
      const getDistance = () => strip.current.scrollWidth - window.innerWidth;
      gsap.to(strip.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => '+=' + getDistance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      gsap.fromTo('.cloud-1', { x: 0 }, { x: -200, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: '+=200%', scrub: true } });
      gsap.fromTo('.cloud-2', { x: 0 }, { x: 160, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: '+=200%', scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="horizontal" className="relative z-[1] overflow-hidden bg-navy">
      <div className="relative flex h-screen items-center">
        <Cloud className="cloud-1 absolute left-[8%] top-[14%] w-40 opacity-30 md:w-64" />
        <Cloud className="cloud-2 absolute bottom-[16%] right-[10%] w-32 opacity-20 md:w-52" />

        <div ref={strip} className="flex h-full items-center will-change-transform">
          {/* Panel 1 */}
          <div className="flex h-full w-screen shrink-0 flex-col items-center justify-center px-6 text-center">
            <span className="huge absolute left-6 top-1/2 -translate-y-1/2 text-sand/20" style={{ fontSize: '18vw' }}>B</span>
            <p className="kicker mb-4 uppercase text-sand">The way of living</p>
            <h2 className="hero-type uppercase text-cream" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>View from above</h2>
          </div>
          {/* Panel 2 — panorama */}
          <div className="h-full w-[160vw] shrink-0 md:w-[140vw]">
            <img src={asset('/images/building-aerial.webp')} alt="Panorama" className="h-full w-full object-cover" />
          </div>
          {/* Panel 3 */}
          <div className="flex h-full w-screen shrink-0 flex-col items-center justify-center gap-8 px-6 text-center">
            <h3 className="heading-1 max-w-2xl uppercase text-cream">A skyline that grows with you</h3>
            <p className="paragraph max-w-md text-cream/70">
              Rooftop gardens, green terraces and light-filled homes — seen from above, Banyan reads as a single living canopy.
            </p>
            <Button href="/experience" invert>Explore in 3D</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
