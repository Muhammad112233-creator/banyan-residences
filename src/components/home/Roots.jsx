'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { asset } from '@/lib/utils';
import { splitText } from '@/lib/split';
import Button from '@/components/Button';

export default function Roots() {
  const root = useRef(null);
  const statement = useRef(null);

  useEffect(() => {
    const el = root.current;
    let split;
    const ctx = gsap.context(() => {
      split = splitText(statement.current, { type: 'words' });
      gsap.set(split.words, { opacity: 0.15 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: '+=180%', pin: true, scrub: 1 },
      });
      tl.fromTo('.roots-img-1', { yPercent: 10 }, { yPercent: -10, ease: 'none' }, 0)
        .fromTo('.roots-img-2', { yPercent: -8 }, { yPercent: 12, ease: 'none' }, 0)
        .to(split.words, { opacity: 1, stagger: 0.06, ease: 'none' }, 0)
        .fromTo('.roots-heading', { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'power2.out' }, 0.2);
    }, el);
    return () => { ctx.revert(); split?.revert(); };
  }, []);

  return (
    <section ref={root} id="roots" className="relative z-[1] h-screen overflow-hidden bg-navy">
      <div className="roots-img-1 absolute right-[6%] top-[10%] w-[30vw] max-w-[420px] overflow-hidden">
        <img src={asset('/images/roots-lifestyle.webp')} alt="Living" className="aspect-[3/4] w-full object-cover" />
      </div>
      <div className="roots-img-2 absolute bottom-[8%] left-[6%] hidden w-[24vw] max-w-[340px] overflow-hidden md:block">
        <img src={asset('/images/interior-living.webp')} alt="Interior" className="aspect-[4/3] w-full object-cover" />
      </div>

      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="roots-heading kicker mb-6 uppercase text-sand">The way of living</p>
        <h2 className="roots-heading hero-type mb-10 uppercase text-cream" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
          Your roots
        </h2>
        <p ref={statement} className="heading-2 max-w-3xl text-sand">
          In Banyan, each residence is crafted not merely for living, but as a space that evolves alongside you.
        </p>
        <div className="mt-12">
          <Button href="/about" invert>Our philosophy</Button>
        </div>
      </div>
    </section>
  );
}
