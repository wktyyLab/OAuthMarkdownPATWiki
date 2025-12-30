import React from 'react';

export function DashboardItem({ children, title }: { children: React.ReactElement; title: string }) {
  return (
    <section className='w-full overflow-hidden rounded-lg border border-blue-400 dark:bg-white sm:w-96'>
      <div className='bg-blue-400 px-4 py-1 font-bold text-white'>
        <h2 className='text-lg font-bold'>{title}</h2>
      </div>
      <div className='flex justify-center px-4 py-2'>{children}</div>
    </section>
  );
}
