'use client';

import SmoothScroll from './SmoothScroll';
import Cursor from './Cursor';
import Preloader from './Preloader';
import Header from './Header';
import Footer from './Footer';
import { TransitionProvider } from './PageTransition';

export default function AppShell({ children }) {
  return (
    <TransitionProvider>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </TransitionProvider>
  );
}
