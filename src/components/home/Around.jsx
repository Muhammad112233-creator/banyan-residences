'use client';

import { useState } from 'react';
import { around } from '@/lib/data';
import { asset } from '@/lib/utils';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';

function MapSVG({ active }) {
  const pins = [
    { x: 150, y: 120 }, { x: 320, y: 90 }, { x: 250, y: 220 },
    { x: 430, y: 180 }, { x: 360, y: 320 }, { x: 120, y: 330 },
  ];
  return (
    <svg viewBox="0 0 560 440" className="h-full w-full" role="img" aria-label="Neighbourhood map">
      <rect width="560" height="440" fill="#f4f0db" />
      {/* river */}
      <path d="M0 360 C 120 320, 200 400, 320 360 S 520 320, 560 350 L 560 440 L 0 440 Z" fill="#ccbf99" opacity="0.5" />
      {/* roads */}
      <g stroke="#ccbf99" strokeWidth="6" fill="none" opacity="0.8">
        <path d="M40 60 H 520" /><path d="M40 180 H 520" /><path d="M40 300 H 520" />
        <path d="M120 40 V 400" /><path d="M280 40 V 400" /><path d="M440 40 V 400" />
      </g>
      <g stroke="#e7e0c8" strokeWidth="2" fill="none">
        <path d="M40 120 H 520" /><path d="M40 240 H 520" /><path d="M200 40 V 400" /><path d="M360 40 V 400" />
      </g>
      {/* blocks */}
      <g fill="#e9e2cb">
        <rect x="140" y="75" width="50" height="40" /><rect x="300" y="75" width="50" height="40" />
        <rect x="140" y="195" width="50" height="40" /><rect x="300" y="195" width="50" height="40" />
      </g>
      {/* center pin (Banyan) */}
      <g transform="translate(280 220)">
        <circle r="26" fill="#a68150" opacity="0.2" />
        <circle r="10" fill="#a68150" />
        <text y="-34" textAnchor="middle" fontFamily="serif" fontSize="20" fill="#2e3a26">Banyan</text>
      </g>
      {/* POI pins */}
      {pins.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`} style={{ transition: 'opacity .3s' }} opacity={active === i ? 1 : 0.45}>
          <circle r={active === i ? 12 : 7} fill={active === i ? '#3e562e' : '#60735c'} style={{ transition: 'all .3s' }} />
          <text y="4" textAnchor="middle" fontSize="9" fill="#fdfbef" fontWeight="600">{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

export default function Around() {
  const [active, setActive] = useState(0);
  const item = around[active];

  return (
    <section id="around" className="relative z-[1] bg-cream-dark px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[110rem]">
        <SplitHeading as="h2" className="heading-1 mb-14 uppercase text-pine-green" type="words">
          What&apos;s around
        </SplitHeading>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Map */}
          <Reveal className="overflow-hidden border border-pine-green/10">
            <div className="aspect-[4/3] w-full lg:sticky lg:top-24">
              <MapSVG active={active} />
            </div>
          </Reveal>

          {/* List */}
          <div className="flex flex-col">
            {around.map((p, i) => (
              <div
                key={p.name}
                className="group border-b border-pine-green/15 py-4"
                onMouseEnter={() => setActive(i)}
              >
                <button
                  onClick={() => setActive(i)}
                  className="flex w-full items-baseline justify-between gap-4 text-left"
                >
                  <span className={`heading-3 transition-colors duration-300 ${active === i ? 'italic text-golden' : 'text-pine-green'}`}>
                    {p.name}
                  </span>
                  <span className="menu-type flex shrink-0 gap-4 uppercase text-sage">
                    <span>{p.walk} walk</span>
                    <span className="text-golden">{p.drive} drive</span>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500"
                  style={{ gridTemplateRows: active === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                      <img src={asset(p.image)} alt={p.name} className="h-32 w-full object-cover sm:w-44" />
                      <p className="paragraph text-sm leading-relaxed text-sage">{p.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
