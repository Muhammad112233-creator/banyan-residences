'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { amenities } from '@/lib/data';
import { asset } from '@/lib/utils';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';

export default function Amenities() {
  const [active, setActive] = useState(0);
  const bg = useRef(null);
  const panel = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bg.current, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: bg.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!panel.current) return;
    gsap.fromTo(panel.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
  }, [active]);

  const item = amenities[active];

  return (
    <section id="amenities" className="relative z-[1]">
      {/* Hero */}
      <div className="relative flex h-[80vh] items-end overflow-hidden">
        <img ref={bg} src={asset('/images/amenity-rooftop.webp')} alt="Amenities" className="absolute inset-0 h-full w-full scale-110 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-green/85 via-pine-green/30 to-pine-green/20" />
        <div className="relative z-[2] w-full px-5 pb-14 md:px-10">
          <SplitHeading as="h2" className="hero-type uppercase text-cream-dark" type="chars" stagger={0.04}>
            Amenities
          </SplitHeading>
          <Reveal className="paragraph mt-6 max-w-xl text-cream/85" delay={0.1}>
            Banyan is more than a residence. Private gyms, exclusive rooftop parks and a top-floor café-restaurant — curated spaces
            for unwinding and socialising, a true sanctuary from the urban hustle, right at your doorstep.
          </Reveal>
        </div>
      </div>

      {/* Options */}
      <div className="bg-vanilla px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[110rem] gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-2">
            {amenities.map((a, i) => (
              <button
                key={a.label}
                onClick={() => setActive(i)}
                className={`flex items-baseline justify-between border-b border-pine-green/15 py-4 text-left transition-colors ${active === i ? 'text-golden' : 'text-pine-green hover:text-sage'}`}
              >
                <span className={`heading-3 ${active === i ? 'italic' : ''}`}>{a.label}</span>
                <span className="menu-type uppercase text-sage">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
          <div ref={panel} className="flex flex-col gap-6">
            <div className="img-zoom overflow-hidden">
              <img src={asset(item.image)} alt={item.label} className="aspect-[16/9] w-full object-cover" />
            </div>
            <p className="paragraph leading-relaxed text-sage">{item.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
