import * as React from 'react';

export default function TipsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-5 transition-colors dark:text-black'>
      <div className='overflow-hidden rounded-lg bg-amber-200 pb-4 transition-colors dark:bg-blue-300'>
        <div className='mb-2 flex items-center justify-center gap-1 bg-amber-300 px-1.5 py-0.5 transition-colors dark:bg-blue-400'>
          <span className='i-tabler-help-square-rounded-filled size-6 bg-gray-800' />
          Tips
        </div>
        <div className='px-5'>{children}</div>
      </div>
    </div>
  );
}
