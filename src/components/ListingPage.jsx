'use client';

import { useMemo, useState } from 'react';
import { asset } from '@/lib/utils';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';

function FloorPlan({ rooms = 2 }) {
  return (
    <svg viewBox="0 0 300 220" className="h-full w-full" role="img" aria-label="Floor plan">
      <rect x="10" y="10" width="280" height="200" fill="#f4f0db" stroke="#2e3a26" strokeWidth="3" />
      <g stroke="#2e3a26" strokeWidth="2" fill="none">
        <line x1="150" y1="10" x2="150" y2="120" />
        <line x1="10" y1="120" x2="290" y2="120" />
        {rooms > 1 && <line x1="150" y1="120" x2="150" y2="210" />}
        {rooms > 2 && <line x1="220" y1="120" x2="220" y2="210" />}
      </g>
      <g fill="#60735c" fontFamily="sans-serif" fontSize="11">
        <text x="60" y="70">Living</text>
        <text x="200" y="70">Kitchen</text>
        <text x="60" y="170">Bedroom</text>
        {rooms > 1 && <text x="175" y="170">Bath</text>}
        {rooms > 2 && <text x="240" y="170">Bed 2</text>}
      </g>
      <rect x="120" y="207" width="40" height="6" fill="#a68150" />
    </svg>
  );
}

export default function ListingPage({ title, description, units, kind = 'residence', image }) {
  const isResidence = kind === 'residence';
  const roomOptions = isResidence ? ['All', '1', '1.5', '2', '2.5', '3', '4'] : ['All', 'Offices', 'Retail'];
  const wingOptions = isResidence ? ['A', 'B'] : ['A', 'B', 'V'];

  const [typeFilter, setTypeFilter] = useState('All');
  const [wing, setWing] = useState(null);
  const [maxFloor, setMaxFloor] = useState(7);
  const [minArea, setMinArea] = useState(0);
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return units.filter((u) => {
      if (typeFilter !== 'All') {
        if (isResidence && String(u.rooms) !== typeFilter) return false;
        if (!isResidence && u.type !== typeFilter) return false;
      }
      if (wing && u.wing !== wing) return false;
      if (u.floor > maxFloor) return false;
      if (u.area < minArea) return false;
      return true;
    });
  }, [units, typeFilter, wing, maxFloor, minArea, isResidence]);

  const reset = () => { setTypeFilter('All'); setWing(null); setMaxFloor(7); setMinArea(0); setVisible(12); };
  const totalArea = Math.round(units.reduce((s, u) => s + u.area, 0));

  return (
    <div className="bg-vanilla pt-28 md:pt-36">
      {/* Hero */}
      <div className="relative h-[45vh] overflow-hidden md:h-[55vh]">
        <img src={asset(image)} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-green/75 to-pine-green/10" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10">
          <SplitHeading as="h1" className="hero-type uppercase text-cream" type="chars" stagger={0.04}>
            {title}
          </SplitHeading>
        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-5 py-14 md:px-10">
        <Reveal className="paragraph max-w-2xl text-lg leading-relaxed text-sage">{description}</Reveal>

        {/* Filters */}
        <div className="mt-12 border-y border-pine-green/15 py-8">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            <div>
              <p className="menu-type mb-3 uppercase text-grey">{isResidence ? 'Rooms' : 'Type'}</p>
              <div className="flex flex-wrap gap-2">
                {roomOptions.map((r) => (
                  <button
                    key={r}
                    onClick={() => { setTypeFilter(r); setVisible(12); }}
                    className={`menu-type border px-4 py-2 uppercase transition-colors ${typeFilter === r ? 'border-pine-green bg-pine-green text-cream' : 'border-pine-green/30 text-pine-green hover:border-pine-green'}`}
                  >
                    {r}{isResidence && r !== 'All' ? ' BR' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="menu-type mb-3 uppercase text-grey">Wing</p>
              <div className="flex gap-2">
                {wingOptions.map((w) => (
                  <button
                    key={w}
                    onClick={() => { setWing(wing === w ? null : w); setVisible(12); }}
                    className={`menu-type border px-4 py-2 uppercase transition-colors ${wing === w ? 'border-pine-green bg-pine-green text-cream' : 'border-pine-green/30 text-pine-green hover:border-pine-green'}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="menu-type mb-3 uppercase text-grey">Max floor: {maxFloor}</p>
              <input type="range" min="1" max="7" value={maxFloor} onChange={(e) => setMaxFloor(+e.target.value)} className="w-40 accent-[#a68150]" />
            </div>
            <div>
              <p className="menu-type mb-3 uppercase text-grey">Min area: {minArea} m²</p>
              <input type="range" min="0" max="400" step="10" value={minArea} onChange={(e) => setMinArea(+e.target.value)} className="w-40 accent-[#a68150]" />
            </div>
            <button onClick={reset} className="menu-type link-reveal self-end uppercase text-golden">Reset filters</button>
          </div>
          <div className="mt-6 flex gap-10">
            <p className="heading-3 text-pine-green">{totalArea.toLocaleString()} <span className="font-sans text-sm text-sage">m² total</span></p>
            <p className="heading-3 text-golden">{filtered.length} <span className="font-sans text-sm text-sage">results</span></p>
          </div>
        </div>

        {/* Results */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.slice(0, visible).map((u, i) => (
            <Reveal key={u.id} delay={(i % 4) * 0.05} className="group border border-pine-green/15 bg-cream-dark/40 p-6 transition-colors hover:border-golden">
              <div className="flex items-baseline justify-between">
                <span className="heading-3 text-pine-green">{u.id}</span>
                <span className="menu-type uppercase text-sage">Wing {u.wing}</span>
              </div>
              <p className="heading-2 mt-4 text-golden">{u.area} <span className="font-sans text-base text-sage">m²</span></p>
              <p className="paragraph mt-2 text-sage">
                {isResidence ? `${u.rooms} rooms · ` : `${u.type} · `}{u.floor}{u.floor === 1 ? 'st' : u.floor === 2 ? 'nd' : u.floor === 3 ? 'rd' : 'th'} floor
              </p>
              <button onClick={() => setSelected(u)} className="menu-type link-reveal mt-5 uppercase text-pine-green">See more</button>
            </Reveal>
          ))}
        </div>

        {visible < filtered.length && (
          <div className="mt-12 flex justify-center">
            <Button onClick={() => setVisible((v) => v + 12)} className="border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">
              See more
            </Button>
          </div>
        )}
        {filtered.length === 0 && (
          <p className="paragraph mt-12 text-center text-sage">No units match your filters. Try resetting them.</p>
        )}
      </div>

      {/* Unit modal */}
      {selected && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-pine-green/70 p-5" onClick={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto bg-vanilla p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <p className="menu-type uppercase text-sage">Wing {selected.wing}</p>
                <h3 className="heading-2 text-pine-green">{selected.id}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="menu-type uppercase text-golden">Close ✕</button>
            </div>
            <div className="mt-6 aspect-[3/2] w-full border border-pine-green/15">
              <FloorPlan rooms={isResidence ? Math.round(selected.rooms) : 2} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div><p className="heading-3 text-golden">{selected.area}</p><p className="menu-type uppercase text-sage">m²</p></div>
              <div><p className="heading-3 text-golden">{isResidence ? selected.rooms : selected.type}</p><p className="menu-type uppercase text-sage">{isResidence ? 'rooms' : 'type'}</p></div>
              <div><p className="heading-3 text-golden">{selected.floor}</p><p className="menu-type uppercase text-sage">floor</p></div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" className="border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">Inquire about this unit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
