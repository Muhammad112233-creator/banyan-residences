'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { intro, brand } from '@/lib/data';
import { asset } from '@/lib/utils';
import Button from '@/components/Button';
import { splitText } from '@/lib/split';

export default function Introduction() {
  const root = useRef(null);
  const wordmark = useRef(null);

  useEffect(() => {
    const el = root.current;
    let split;

    const start = () => {
      const ctx = gsap.context(() => {
        // Wordmark letters rise in once the preloader is done
        split = splitText(wordmark.current, { type: 'chars' });
        gsap.fromTo(
          split.chars,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.06, ease: 'power4.out', delay: 0.1 }
        );

        const slides = gsap.utils.toArray('.intro-slide', el);
        gsap.set(slides[0], { autoAlpha: 1 });
        gsap.set([slides[1], slides[2]], { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.to('.intro-bg', { yPercent: 12, scale: 1.12, ease: 'none' }, 0)
          .to('.intro-frame-1', { yPercent: -30, ease: 'none' }, 0)
          .to('.intro-frame-2', { yPercent: 24, ease: 'none' }, 0)
          .to(wordmark.current, { yPercent: -24, opacity: 0.25, ease: 'none' }, 0)
          // slide 1 -> 2
          .to(slides[0], { autoAlpha: 0, y: -40, ease: 'power2.in', duration: 0.4 }, 0.55)
          .fromTo(slides[1], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.4 }, 0.85)
          // slide 2 -> 3
          .to(slides[1], { autoAlpha: 0, y: -40, ease: 'power2.in', duration: 0.4 }, 1.55)
          .fromTo(slides[2], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.4 }, 1.85)
          // progress
          .to('.intro-progress-bar', { scaleX: 1, ease: 'none' }, 0);
      }, el);
      return ctx;
    };

    let ctx;
    if (window.__appReady) {
      ctx = start();
    } else {
      const onReady = () => { ctx = start(); };
      window.addEventListener('app:ready', onReady, { once: true });
      // safety: if preloader already gone
      const t = setTimeout(() => { if (!ctx) ctx = start(); }, 3200);
      return () => {
        window.removeEventListener('app:ready', onReady);
        clearTimeout(t);
        ctx?.revert();
        split?.revert();
      };
    }
    return () => { ctx?.revert(); split?.revert(); };
  }, []);

  return (
    <section ref={root} id="introduction" className="relative h-screen w-full overflow-hidden bg-pine-green">
      {/* Background */}
      <div className="intro-bg absolute inset-0">
        <img src={asset('/images/hero-canopy.webp')} alt="Tree canopy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-green/85 via-pine-green/30 to-pine-green/40" />
      </div>

      {/* Floating frames */}
      <div className="intro-frame-1 absolute right-[4%] top-[16%] z-[2] hidden w-[22vw] max-w-[320px] overflow-hidden border border-cream/20 lg:block">
        <img src={asset('/images/building-day.webp')} alt="Facade" className="aspect-[3/4] w-full object-cover" />
      </div>
      <div className="intro-frame-2 absolute bottom-[12%] left-[4%] z-[2] hidden w-[18vw] max-w-[260px] overflow-hidden border border-cream/20 lg:block">
        <img src={asset('/images/building-aerial.webp')} alt="Aerial" className="aspect-[4/3] w-full object-cover" />
      </div>

      {/* Wordmark */}
      <div className="pointer-events-none absolute inset-x-0 top-[14%] z-[1] flex justify-center">
        <h1 ref={wordmark} className="hero-type uppercase text-cream/90" style={{ fontSize: 'clamp(4rem, 15vw, 15rem)' }}>
          {brand.name}
        </h1>
      </div>

      {/* Rotating slides */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center px-6">
        <div className="intro-slide absolute max-w-3xl text-center">
          <p className="kicker mb-6 uppercase text-sand">{intro.kicker}</p>
          <h2 className="heading-2 text-cream">{intro.heading1}</h2>
          <div className="mt-10 flex justify-center">
            <Button href="/experience" invert>Explore in 3D</Button>
          </div>
        </div>
        <div className="intro-slide absolute max-w-3xl text-center">
          <h2 className="heading-2 text-cream">{intro.heading2}</h2>
          <div className="mt-10 flex justify-center">
            <Button href="/residences" invert>Explore residences</Button>
          </div>
        </div>
        <div className="intro-slide absolute max-w-4xl text-center">
          <h2 className="hero-type uppercase text-cream" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>{intro.heading3}</h2>
          <p className="paragraph mx-auto mt-6 max-w-xl text-cream/80">{intro.paragraph}</p>
          <div className="mt-10 flex justify-center">
            <Button href="/residences" invert>Explore our apartments</Button>
          </div>
        </div>
      </div>

      {/* Progress + scroll hint */}
      <div className="absolute bottom-8 left-1/2 z-[4] flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="menu-type uppercase tracking-widest text-cream/70">Scroll</span>
        <div className="h-px w-40 overflow-hidden bg-cream/20">
          <div className="intro-progress-bar h-full w-full origin-left scale-x-0 bg-golden" />
        </div>
      </div>
    </section>
  );
}
