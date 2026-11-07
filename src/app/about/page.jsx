import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import Button from '@/components/Button';
import { asset } from '@/lib/utils';
import { aboutProjects, brand } from '@/lib/data';

export const metadata = { title: 'About the Developer | Banyan Residences' };

export default function AboutPage() {
  return (
    <div className="bg-vanilla pt-28 md:pt-36">
      <div className="mx-auto max-w-[110rem] px-5 md:px-10">
        <p className="kicker mb-4 uppercase text-golden">About the developer</p>
        <SplitHeading as="h1" className="hero-type uppercase text-pine-green" type="chars" stagger={0.03}>
          {brand.developer}
        </SplitHeading>
        <Reveal className="paragraph mt-8 max-w-3xl text-lg leading-relaxed text-sage" delay={0.1}>
          {brand.developer} is a development company specialising in the creation, investment and management of residential and
          commercial real estate. Our portfolio spans flagship mixed-use communities and boutique residential quarters.
        </Reveal>
        <Reveal delay={0.15} className="mt-8">
          <Button href="/contact" className="border-pine-green text-pine-green hover:bg-pine-green hover:text-cream">Contact us</Button>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal className="paragraph text-lg leading-relaxed text-sage">
            Each of our projects is defined by contemporary architecture, high construction standards and carefully selected
            locations that provide long-term value for both owners and occupants.
          </Reveal>
          <Reveal className="paragraph text-lg leading-relaxed text-sage" delay={0.1}>
            Our mission is to create lasting value through innovative and sustainable developments that enhance urban environments
            and improve quality of life.
          </Reveal>
        </div>
      </div>

      <div className="mt-20 flex flex-col gap-24 px-5 pb-24 md:px-10">
        {aboutProjects.map((p, i) => (
          <div key={p.name} className={`mx-auto grid w-full max-w-[110rem] items-center gap-10 md:grid-cols-2 ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
            <Reveal className="img-zoom overflow-hidden [direction:ltr]">
              <img src={asset(p.image)} alt={p.name} className="aspect-[4/3] w-full object-cover" />
            </Reveal>
            <div className="[direction:ltr]">
              <p className="menu-type uppercase text-golden">{p.city}</p>
              <SplitHeading as="h2" className="heading-1 mt-2 uppercase text-pine-green" type="words">{p.name}</SplitHeading>
              <Reveal className="paragraph mt-5 leading-relaxed text-sage" delay={0.1}>{p.description}</Reveal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
