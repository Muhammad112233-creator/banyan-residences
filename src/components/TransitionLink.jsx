'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePageTransition } from './PageTransition';

export default function TransitionLink({ href, children, onClick, ...props }) {
  const ctx = usePageTransition();
  const pathname = usePathname();

  const handle = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (!href) return;

    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if ((path || '/') === pathname) {
        e.preventDefault();
        const el = document.getElementById(hash);
        if (el) window.__lenis?.scrollTo(el, { offset: -40 });
        return;
      }
    }

    e.preventDefault();
    ctx?.navigate?.(href);
  };

  return (
    <Link href={href} onClick={handle} {...props}>
      {children}
    </Link>
  );
}
