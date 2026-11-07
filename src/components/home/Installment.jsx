'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { installment } from '@/lib/data';
import { asset } from '@/lib/utils';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

export default function Installment() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.installment-step', { y: 40, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="installment" className="relative z-[1] bg-cream-dark px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[110rem] items-center gap-12 lg:grid-cols-2">
        <Reveal className="img-zoom overflow-hidden">
          <img src={asset('/images/building-day.webp')} alt="Construction" className="aspect-[3/4] w-full object-cover" />
        </Reveal>

        <div>
          <SplitHeading as="h2" className="heading-1 mb-12 uppercase text-pine-green" type="words">
            Installment plan
          </SplitHeading>
          <div className="flex flex-col">
            {installment.map((step, i) => (
              <div key={step.label} className="installment-step flex items-baseline justify-between gap-6 border-b border-pine-green/15 py-5">
                <span className="heading-2 italic text-golden">{step.percent}</span>
                <span className="heading-3 text-right text-pine-green">{step.label}</span>
              </div>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-10">
            <Button href="/contact" className="border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">
              Request the plan
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
