'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function Reveal({ children, className, delay = 0, y = 48, as: Tag = 'div', start = 'top 88%' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: 'power3.out',
          delay,
          scrollTrigger: { trigger: el, start },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, start]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
