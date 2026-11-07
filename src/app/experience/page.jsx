'use client';

import { useRef, useState } from 'react';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { asset } from '@/lib/utils';

const views = [
  { label: 'Exterior', image: '/images/building-day.webp' },
  { label: 'Aerial', image: '/images/building-aerial.webp' },
  { label: 'Residence', image: '/images/interior-living.webp' },
  { label: 'Rooftop', image: '/images/amenity-rooftop.webp' },
];

export default function ExperiencePage() {
  const [view, setView] = useState(0);
  const [pan, setPan] = useState(50);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const onDown = (e) => { dragging.current = true; lastX.current = e.clientX ?? e.touches?.[0]?.clientX; };
  const onMove = (e) => {
    if (!dragging.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    const dx = x - lastX.current;
    lastX.current = x;
    setPan((p) => Math.max(0, Math.min(100, p - dx * 0.15)));
  };
  const onUp = () => { dragging.current = false; };

  return (
    <div className="min-h-screen bg-navy pt-28 text-cream md:pt-36">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <p className="kicker mb-3 uppercase text-sand">3D Experience</p>
        <SplitHeading as="h1" className="hero-type uppercase text-cream" type="chars" stagger={0.03}>
          Explore Banyan
        </SplitHeading>
        <Reveal className="paragraph mt-5 max-w-xl text-cream/70" delay={0.1}>
          Drag to look around. Switch between viewpoints to experience the facade, the rooftops and the interiors.
        </Reveal>

        {/* Viewer */}
        <div
          className="relative mt-10 h-[55vh] cursor-grab overflow-hidden border border-cream/15 active:cursor-grabbing md:h-[65vh]"
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
          data-cursor
        >
          <img
            src={asset(views[view].image)}
            alt={views[view].label}
            className="h-full w-full object-cover transition-transform duration-100"
            style={{ transform: `scale(1.4) translateX(${(50 - pan) * 0.6}%)` }}
            draggable={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
            <span className="menu-type uppercase tracking-widest text-cream/80">← Drag to explore →</span>
          </div>
          {/* Hotspot */}
          <div className="absolute left-[30%] top-[40%] h-5 w-5 animate-pulse rounded-full bg-golden" title="Green terrace" />
        </div>

        {/* View switcher */}
        <div className="mt-6 flex flex-wrap gap-3">
          {views.map((v, i) => (
            <button key={v.label} onClick={() => { setView(i); setPan(50); }}
              className={`menu-type border px-5 py-2.5 uppercase transition-colors ${view === i ? 'border-cream bg-cream text-navy' : 'border-cream/30 text-cream hover:border-cream'}`}>
              {v.label}
            </button>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-start gap-6 border-t border-cream/15 pt-10 md:flex-row md:items-center md:justify-between" delay={0.1}>
          <p className="heading-3 max-w-md text-cream/85">Want a private walkthrough? Our sales team will guide you through every residence.</p>
          <Button href="/contact" invert>Book a viewing</Button>
        </Reveal>
      </div>
      <div className="h-24" />
    </div>
  );
}
