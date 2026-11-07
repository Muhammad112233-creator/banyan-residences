'use client';

import { useState } from 'react';
import { nav, brand, footer } from '@/lib/data';
import TransitionLink from './TransitionLink';
import Button from './Button';
import Reveal from './Reveal';
import SplitHeading from './SplitHeading';

export default function Footer() {
  const [sent, setSent] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-vanilla px-5 pt-24 pb-8 md:px-10 md:pt-32">
      <div className="mx-auto max-w-[110rem]">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <SplitHeading as="h2" className="heading-1 uppercase text-pine-green" type="words">
              {footer.heading}
            </SplitHeading>
            <Reveal className="paragraph mt-5 max-w-md text-sage" delay={0.1}>
              {footer.sub}
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {sent ? (
              <div className="flex h-full flex-col justify-center gap-3 border border-pine-green/20 p-8">
                <p className="heading-3 text-golden">Thank you.</p>
                <p className="paragraph text-sage">You’re on the list. We’ll be in touch soon.</p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid grid-cols-2 gap-6">
                  <input required placeholder="First name*" className="paragraph border-0 border-b border-pine-green bg-transparent pb-3 text-pine-green placeholder:text-pine-green/60 focus:border-golden focus:outline-none" />
                  <input required placeholder="Last name*" className="paragraph border-0 border-b border-pine-green bg-transparent pb-3 text-pine-green placeholder:text-pine-green/60 focus:border-golden focus:outline-none" />
                </div>
                <input required type="email" placeholder="Email*" className="paragraph border-0 border-b border-pine-green bg-transparent pb-3 text-pine-green placeholder:text-pine-green/60 focus:border-golden focus:outline-none" />
                <label className="paragraph flex items-start gap-3 text-sage">
                  <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#a68150]" />
                  <span>
                    I consent to my information being collected in accordance with the Banyan{' '}
                    <TransitionLink href="/privacy" className="underline">privacy policy</TransitionLink>.
                  </span>
                </label>
                <Button type="submit" className="self-start border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">
                  Let&apos;s begin
                </Button>
              </form>
            )}
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 border-t border-pine-green/15 pt-10 md:grid-cols-[1fr_auto]">
          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3 md:flex md:flex-wrap md:gap-x-8">
            {nav.map((item) => (
              <TransitionLink key={item.label} href={item.href} className="menu-type link-reveal uppercase text-pine-green">
                {item.label}
              </TransitionLink>
            ))}
            <TransitionLink href="/privacy" className="menu-type link-reveal uppercase text-pine-green">Privacy policy</TransitionLink>
          </nav>
          <div className="flex gap-6 menu-type uppercase text-sage">
            <a href="#" className="link-reveal">Instagram</a>
            <a href="#" className="link-reveal">LinkedIn</a>
            <a href="#" className="link-reveal">Facebook</a>
          </div>
        </div>

        <p className="paragraph mt-10 max-w-3xl text-xs leading-relaxed text-grey">{footer.disclaimer}</p>

        <div className="mt-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="paragraph text-sage">
            For direct inquiries, our team is available at{' '}
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="link-reveal text-pine-green">{brand.phone}</a>
          </p>
          <p className="menu-type uppercase text-grey">© {year}. All Rights Reserved. {brand.full}</p>
        </div>
      </div>

      <div className="pointer-events-none mt-12 select-none overflow-hidden">
        <p className="huge whitespace-nowrap text-center uppercase leading-none text-sand/60" style={{ fontSize: 'clamp(5rem, 18vw, 18rem)' }}>
          {brand.name}
        </p>
      </div>
    </footer>
  );
}
