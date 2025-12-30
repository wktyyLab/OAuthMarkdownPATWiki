import '@/styles/globals.css';
import * as React from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { notoSansJp } from '@/lib/font';
import { preloadTheme } from '@/lib/themeManager';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='ja' suppressHydrationWarning={true}>
      <head prefix='og: http://ogp.me/ns#'>
        <script dangerouslySetInnerHTML={{ __html: `(${preloadTheme.toString()})()` }} />
        <link rel='alternate' href='/feed' type='application/atom+xml' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
      </head>
      <body
        className={`transition-colors ${notoSansJp.className} min-h-vh bg-gray-100 dark:bg-slate-900 dark:text-slate-400`}
      >
        {children}
      </body>
      {process.env.GTM_ID ? <GoogleTagManager gtmId={process.env.GTM_ID} /> : <></>}
    </html>
  );
}
