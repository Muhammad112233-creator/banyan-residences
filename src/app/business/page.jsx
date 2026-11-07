import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { asset } from '@/lib/utils';

export const metadata = { title: 'Business | Banyan Residences' };

const features = [
  {
    title: 'Exceptional connectivity across the city',
    body: 'The office spaces at Banyan are designed for companies seeking an exclusive location, functionality and long-term value. Steps from the central station, the business park and the Glasshouse Market, with immediate access to the airport, Banyan is the ideal choice for businesses that value both image and accessibility.',
    image: '/images/building-aerial.webp',
  },
  {
    title: 'Contemporary architecture & sophisticated interiors',
    body: 'With thoughtfully designed office spaces, an exceptional location and top-notch amenities within the complex, Banyan offers workspaces where productivity, professional image and the everyday work experience come together in a unique business ecosystem.',
    image: '/images/office-space.webp',
  },
  {
    title: 'A address that reflects your identity',
    body: 'Flexible layouts, natural light and a canopy-inspired facade make Banyan more than walls — it defines a company’s identity, culture and future. An environment that inspires teams, facilitates collaboration and supports growth.',
    image: '/images/apt-penthouse.webp',
  },
];

export default function BusinessPage() {
  return (
    <div className="bg-vanilla pt-28 md:pt-36">
      <div className="relative h-[55vh] overflow-hidden md:h-[65vh]">
        <img src={asset('/images/office-space.webp')} alt="Business spaces" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-green/80 to-pine-green/10" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10">
          <p className="kicker mb-3 uppercase text-sand">Business spaces</p>
          <SplitHeading as="h1" className="hero-type uppercase text-cream" type="chars" stagger={0.03}>
            Step into new successes
          </SplitHeading>
        </div>
      </div>

      <div className="mx-auto max-w-[110rem] px-5 py-16 md:px-10 md:py-24">
        <Reveal className="paragraph max-w-3xl text-lg leading-relaxed text-sage md:text-xl">
          In modern business, a workspace is more than just walls — it defines a company&apos;s identity, culture and future.
          We believe Banyan is the perfect answer to your business needs.
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <Button href="/retail" className="border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">Explore spaces</Button>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24">
          {features.map((f, i) => (
            <div key={f.title} className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
              <Reveal className="img-zoom overflow-hidden [direction:ltr]">
                <img src={asset(f.image)} alt={f.title} className="aspect-[4/3] w-full object-cover" />
              </Reveal>
              <div className="[direction:ltr]">
                <span className="menu-type uppercase text-golden">{String(i + 1).padStart(2, '0')}</span>
                <SplitHeading as="h2" className="heading-2 mt-3 text-pine-green" type="words">{f.title}</SplitHeading>
                <Reveal className="paragraph mt-5 leading-relaxed text-sage" delay={0.1}>{f.body}</Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
