'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { businessWings } from '@/lib/data';
import { asset } from '@/lib/utils';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

export default function Business() {
  const [active, setActive] = useState(0);
  const hero = useRef(null);
  const panel = useRef(null);

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
    if (!panel.current) return;
    gsap.fromTo(panel.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  }, [active]);

  const wing = businessWings[active];

  return (
    <section id="business" className="relative z-[1] bg-cream-dark">
      <div className="relative h-[65vh] overflow-hidden md:h-[80vh]">
        <img ref={hero} src={asset('/images/office-space.webp')} alt="Business spaces" className="h-full w-full scale-110 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-green/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-12 md:px-10">
          <SplitHeading as="h2" className="hero-type uppercase text-cream-dark" type="chars" stagger={0.03}>
            Office spaces &amp; retail
          </SplitHeading>
        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-5 py-16 md:px-10 md:py-24">
        <Reveal className="paragraph max-w-2xl text-lg leading-relaxed text-sage">
          Business spaces and retail units at Banyan are designed for companies of all sizes that see their address as more than
          just a location — it is a reflection of their identity, reputation and long-term vision.
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-2">
            {businessWings.map((w, i) => (
              <button
                key={w.label}
                onClick={() => setActive(i)}
                className={`flex items-baseline justify-between border-b border-pine-green/15 py-4 text-left transition-colors ${active === i ? 'text-golden' : 'text-pine-green hover:text-sage'}`}
              >
                <span className={`heading-3 ${active === i ? 'italic' : ''}`}>{w.label}</span>
                <span className="menu-type uppercase text-sage">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
            <Button href="/business" className="mt-8 self-start border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">
              Explore spaces
            </Button>
          </div>

          <div ref={panel} className="flex flex-col gap-6">
            <div className="img-zoom overflow-hidden">
              <img src={asset('/images/office-space.webp')} alt={wing.label} className="aspect-[16/9] w-full object-cover" />
            </div>
            <p className="kicker uppercase text-golden">{wing.stat}</p>
            <p className="paragraph leading-relaxed text-sage">{wing.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
