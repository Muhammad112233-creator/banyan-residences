'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { location } from '@/lib/data';
import { asset } from '@/lib/utils';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';

export default function Location() {
  const img = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(img.current, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: img.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="location" className="relative z-[1] bg-vanilla px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[110rem]">
        <div className="grid items-end gap-10 md:grid-cols-2">
          <Reveal className="paragraph max-w-xl text-lg leading-relaxed text-sage md:text-xl">
            {location.paragraph}
          </Reveal>
          <SplitHeading as="h2" className="hero-type text-right uppercase text-cream-dark" type="chars" stagger={0.04}>
            {location.heading}
          </SplitHeading>
        </div>
        <div className="img-zoom mt-12 overflow-hidden">
          <img ref={img} src={asset('/images/building-aerial.webp')} alt="Banyan location" className="h-[50vh] w-full scale-110 object-cover md:h-[75vh]" />
        </div>
      </div>
    </section>
  );
}
