'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const TransitionContext = createContext(null);
export const usePageTransition = () => useContext(TransitionContext);

export function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlay = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      gsap.set(overlay.current, { yPercent: 100 });
      return;
    }
    window.__lenis?.stop();
    gsap.set(overlay.current, { yPercent: 0 });
    gsap.to(overlay.current, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
      delay: 0.05,
      onComplete: () => {
        gsap.set(overlay.current, { yPercent: 100 });
        window.__lenis?.start();
        window.__lenis?.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      },
    });
  }, [pathname]);

  const navigate = (href) => {
    if (href === pathname) return;
    window.__lenis?.stop();
    gsap.to(overlay.current, {
      yPercent: 0,
      duration: 0.6,
      ease: 'power4.inOut',
      onComplete: () => router.push(href),
    });
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlay}
        className="pointer-events-none fixed inset-0 z-[900] bg-pine-green"
        style={{ transform: 'translateY(100%)' }}
        aria-hidden
      />
    </TransitionContext.Provider>
  );
}
