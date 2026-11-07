'use client';

import { useState } from 'react';
import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import TransitionLink from '@/components/TransitionLink';
import { brand } from '@/lib/data';

const tabs = ['Request', 'Callback', 'Business'];

export default function ContactPage() {
  const [tab, setTab] = useState('Request');
  const [sent, setSent] = useState(false);

  const field = 'paragraph w-full border-0 border-b border-pine-green bg-transparent pb-3 text-pine-green placeholder:text-pine-green/60 focus:border-golden focus:outline-none';

  return (
    <div className="min-h-screen bg-vanilla px-5 pt-32 pb-24 md:px-10 md:pt-40">
      <div className="mx-auto grid max-w-[110rem] gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SplitHeading as="h1" className="hero-type uppercase text-pine-green" type="chars" stagger={0.03}>
            Submit a request
          </SplitHeading>
          <Reveal className="paragraph mt-6 max-w-md text-lg leading-relaxed text-sage" delay={0.1}>
            For more information about available properties at Banyan, fill out the form and we will contact you shortly.
          </Reveal>
          <Reveal delay={0.2} className="mt-10 border-t border-pine-green/15 pt-6">
            <p className="paragraph text-sage">For direct inquiries, our team is available at</p>
            <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="heading-3 link-reveal mt-2 inline-block text-golden">{brand.phone}</a>
            <p className="paragraph mt-4 text-sage">{brand.email}</p>
            <p className="paragraph mt-1 text-sage">{brand.address}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {sent ? (
            <div className="flex h-full flex-col justify-center gap-4 border border-pine-green/20 p-10">
              <p className="heading-2 text-golden">Thank you.</p>
              <p className="paragraph text-sage">Your {tab.toLowerCase()} has been received. Our team will reach out within one business day.</p>
            </div>
          ) : (
            <form className="flex flex-col gap-7" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="flex gap-2 border-b border-pine-green/15 pb-5">
                {tabs.map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    className={`menu-type border px-5 py-2.5 uppercase transition-colors ${tab === t ? 'border-pine-green bg-pine-green text-cream' : 'border-pine-green/30 text-pine-green hover:border-pine-green'}`}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <input required placeholder="First name" className={field} />
                <input required placeholder="Last name" className={field} />
              </div>
              {tab === 'Business' && <input placeholder="Company name" className={field} />}
              <input required type="email" placeholder="Email" className={field} />
              <input placeholder="Phone" className={field} />
              {tab === 'Callback' && <input placeholder="Preferred call time" className={field} />}

              <label className="paragraph flex items-start gap-3 text-sage">
                <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#a68150]" />
                <span>I have read and understand the <TransitionLink href="/privacy" className="underline">privacy policy</TransitionLink>.</span>
              </label>
              <label className="paragraph flex items-start gap-3 text-sage">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#a68150]" />
                <span>I want to receive notifications via WhatsApp and email.</span>
              </label>

              <Button type="submit" className="self-start border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">
                {tab === 'Callback' ? 'Submit for a callback' : 'Submit a request'}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}
