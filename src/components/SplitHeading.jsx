'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { splitText } from '@/lib/split';

export default function SplitHeading({
  children,
  className,
  as: Tag = 'h2',
  type = 'words',
  stagger = 0.045,
  start = 'top 85%',
  delay = 0,
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const split = splitText(el, { type });
    const targets = type === 'chars' ? split.chars : split.words;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: 'power4.out',
          stagger,
          delay,
          scrollTrigger: { trigger: el, start },
        }
      );
    }, el);
    return () => {
      ctx.revert();
      split.revert();
    };
  }, [type, stagger, start, delay]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
