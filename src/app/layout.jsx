import localFont from 'next/font/local';
import './globals.css';
import AppShell from '@/components/AppShell';

const workSans = localFont({
  src: '../fonts/worksans-regular.woff2',
  variable: '--font-workSans',
  weight: '100 900',
  display: 'swap',
});

const cormorant = localFont({
  src: [
    { path: '../fonts/cormorant-regular.woff2', weight: '300 700', style: 'normal' },
    { path: '../fonts/cormorant-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata = {
  title: 'Banyan Residences | Luxury Living & Business Quarter',
  description:
    'Discover Banyan Residences — premium apartments and business spaces wrapped in a canopy-inspired facade. Explore residences, amenities, location and availability.',
  keywords: ['luxury residences', 'apartments', 'business spaces', 'Banyan Residences', 'real estate template'],
  openGraph: {
    title: 'Banyan Residences | Luxury Living & Business Quarter',
    description: 'Premium apartments and business spaces wrapped in a canopy-inspired facade.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${workSans.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
