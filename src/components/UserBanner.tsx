import * as React from 'react';

export const GenerateNotificationBanner = (text: string, success: boolean) => {
  return (
    <div
      className={`${success ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700 dark:bg-red-300'} my-3 w-full rounded-lg p-3 transition-colors`}
    >
      {text}
    </div>
  );
};

export function ExplainingBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className='my-3 flex w-full items-center justify-center bg-gray-100 py-10 text-center text-gray-600 transition-colors dark:bg-slate-700 dark:text-slate-500'>
      {children}
    </div>
  );
}
