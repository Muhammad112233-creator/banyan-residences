import SplitHeading from '@/components/SplitHeading';
import Reveal from '@/components/Reveal';
import { brand } from '@/lib/data';

export const metadata = { title: 'Privacy Policy | Banyan Residences' };

const sections = [
  {
    h: 'Privacy policy and notice on the processing of personal data',
    p: 'Your privacy and the security of your data are important to us. This policy explains what personal data we collect, why we collect it, and how it is protected when you interact with our website, sales team or marketing activities.',
  },
  {
    h: 'Information we collect',
    p: 'We may collect your name, email address, phone number and any details you choose to share when you submit an inquiry, subscribe to updates, request a callback or arrange a viewing. We only collect the data needed to respond to your request.',
  },
  {
    h: 'How we use your data',
    p: 'Your data is used to respond to inquiries, provide information about available properties, arrange viewings and, where you have consented, send you updates about the project. We do not sell your personal data to third parties.',
  },
  {
    h: 'Data retention and security',
    p: 'We retain personal data only for as long as necessary for the purposes described above and apply appropriate technical and organisational measures to protect it against unauthorised access, loss or alteration.',
  },
  {
    h: 'Your rights',
    p: 'You may request access to, correction of, or deletion of your personal data, and you may withdraw consent at any time. To exercise these rights, contact us using the details below.',
  },
  {
    h: 'Contact',
    p: `For any questions about this policy or your personal data, contact us at ${brand.email} or ${brand.phone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-vanilla px-5 pt-32 pb-24 md:px-10 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <SplitHeading as="h1" className="heading-1 uppercase text-pine-green" type="words">Privacy policy</SplitHeading>
        <div className="mt-12 flex flex-col gap-10">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.03}>
              <h2 className="heading-3 text-golden">{s.h}</h2>
              <p className="paragraph mt-3 leading-relaxed text-sage">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
