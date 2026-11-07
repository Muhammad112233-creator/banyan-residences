'use client';

import { cn } from '@/lib/utils';
import TransitionLink from './TransitionLink';

export default function Button({ children, className, href, onClick, type = 'button', invert = false }) {
  const cls = cn(
    'btn-swap menu-type uppercase items-center justify-center gap-2 border px-6 py-3.5 min-w-[12rem] transition-colors duration-500',
    invert
      ? 'border-cream text-cream hover:bg-cream hover:text-pine-green'
      : 'border-current text-current',
    className
  );
  const inner = (
    <>
      <span className="btn-label btn-label--main">{children}</span>
      <span className="btn-label btn-label--clone" aria-hidden="true">{children}</span>
    </>
  );
  if (href) {
    return (
      <TransitionLink href={href} className={cls} onClick={onClick}>
        {inner}
      </TransitionLink>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
