'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { nav, brand } from '@/lib/data';
import TransitionLink from './TransitionLink';
import Button from './Button';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('ENG');
  const overlay = useRef(null);
  const linksWrap = useRef(null);
  const mounted = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      gsap.set(overlay.current, { yPercent: -100, display: 'none' });
      return;
    }
    if (open) {
      window.__lenis?.stop();
      gsap.set(overlay.current, { display: 'flex' });
      gsap.fromTo(overlay.current, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: 'power4.inOut' });
      gsap.fromTo(
        linksWrap.current.querySelectorAll('.menu-link-inner'),
        { yPercent: 120 },
        { yPercent: 0, duration: 0.8, stagger: 0.05, delay: 0.35, ease: 'power4.out' }
      );
    } else {
      gsap.to(overlay.current, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(overlay.current, { display: 'none' });
          window.__lenis?.start();
        },
      });
    }
  }, [open]);

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 z-[120] flex w-full items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <div className="menu-type flex items-center gap-2 text-cream mix-blend-difference">
          {['ENG', 'اردو'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`uppercase transition-opacity ${lang === l ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="menu-type group flex items-center gap-3 uppercase text-cream mix-blend-difference"
          aria-label="Toggle menu"
        >
          <span className="relative flex h-4 w-7 flex-col justify-between">
            <span className={`h-px w-full bg-current transition-transform duration-500 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-px w-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-px w-full bg-current transition-transform duration-500 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
          {open ? 'Close' : 'Menu'}
        </button>

        <div className="hidden md:block">
          <Button href="/contact" invert className="min-w-0 border-cream px-5 py-2.5 text-cream mix-blend-difference">
            Inquire
          </Button>
        </div>
      </div>

      {/* Full-screen menu */}
      <div
        ref={overlay}
        className="fixed inset-0 z-[110] hidden flex-col justify-between bg-pine-green px-5 pt-28 pb-10 text-cream md:px-10"
      >
        <nav ref={linksWrap} className="flex flex-col gap-1 md:gap-2">
          {nav.map((item, i) => (
            <div key={item.label} className="overflow-hidden">
              <div className="menu-link-inner">
                <TransitionLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="heading-2 link-reveal inline-block text-cream transition-colors hover:text-sand"
                >
                  <span className="mr-4 align-super font-sans text-xs text-golden">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </TransitionLink>
              </div>
            </div>
          ))}
        </nav>
        <div className="flex flex-col gap-4 border-t border-cream/20 pt-6 md:flex-row md:items-end md:justify-between">
          <div className="paragraph text-cream/70">
            <p>{brand.address}</p>
            <p className="mt-1">{brand.phone}</p>
          </div>
          <div className="flex gap-6 menu-type uppercase">
            <a href="#" className="link-reveal">Instagram</a>
            <a href="#" className="link-reveal">LinkedIn</a>
            <a href="#" className="link-reveal">Facebook</a>
          </div>
        </div>
      </div>
    </>
  );
}
