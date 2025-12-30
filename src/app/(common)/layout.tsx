import '@/styles/globals.css';
import * as React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Menu from '@/components/layout/Menu';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NextTopLoader
        color='#3B82F6'
        template='<div style="height: .15rem;" class="bar" role="bar"><div class="peg"></div></div> 
                    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        shadow={false}
        showSpinner={false}
        zIndex={100}
      />
      <Header />
      <div className='justify-center bg-gray-100 transition-colors dark:bg-slate-900 md:flex'>
        <Menu />
        {children}
      </div>
      <Footer />
      <SpeedInsights />
      <Analytics />
    </>
  );
}
