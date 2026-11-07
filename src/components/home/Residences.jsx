'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { residenceTypes } from '@/lib/data';
import { asset } from '@/lib/utils';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

export default function Residences() {
  const [active, setActive] = useState(0);
  const imgWrap = useRef(null);
  const hero = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(hero.current, { yPercent: -6 }, {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: hero.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!imgWrap.current) return;
    gsap.fromTo(imgWrap.current, { opacity: 0.3, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' });
  }, [active]);

  const type = residenceTypes[active];
  const gallery = ['/images/apt-studio.webp', '/images/apt-twobed.webp', '/images/interior-living.webp', '/images/apt-penthouse.webp', '/images/office-space.webp', '/images/building-day.webp'];

  return (
    <section id="residences" className="relative z-[1] bg-vanilla">
      {/* Hero */}
      <div className="relative h-[70vh] overflow-hidden md:h-[85vh]">
        <img ref={hero} src={asset('/images/interior-living.webp')} alt="Residences" className="h-full w-full scale-110 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-green/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10">
          <SplitHeading as="h2" className="hero-type uppercase text-golden" type="chars" stagger={0.04}>
            Residences
          </SplitHeading>
        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-5 py-16 md:px-10 md:py-24">
        <Reveal className="paragraph max-w-2xl text-lg leading-relaxed text-sage">
          Designed with contemporary living in mind, each apartment at Banyan balances functionality, comfort and aesthetics.
          Open-plan layouts, excellent natural light, refined materials and carefully considered details create spaces that feel
          both welcoming and enduring.
        </Reveal>

        {/* Type tabs */}
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-pine-green/15 pb-5">
          {residenceTypes.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`heading-3 transition-colors duration-300 ${active === i ? 'italic text-golden' : 'text-pine-green hover:text-sage'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Active display */}
        <div className="mt-10 grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div ref={imgWrap} className="img-zoom overflow-hidden">
            <img src={asset(type.image)} alt={type.label} className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className="flex flex-col gap-6">
            <p className="heading-1 text-golden">{type.units}</p>
            <p className="kicker uppercase text-sage">units available</p>
            <p className="heading-3 text-pine-green">{type.label}</p>
            <Button href="/residences" className="self-start border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">
              View all
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.05} className="img-zoom overflow-hidden">
              <img src={asset(src)} alt={`Interior ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
