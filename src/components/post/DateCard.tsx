import { mplus2 } from '@/lib/font';

export default function DateCard({ date }: { date?: string }) {
  const formattedDate = date ? new Date(date.replace(/-/g, '/')) : undefined;

  return (
    <time className={mplus2.className} dateTime={formattedDate?.toISOString()}>
      <div title={formattedDate?.toISOString()} className='flex items-center'>
        <span className='ml-2 w-6 translate-y-4 -rotate-90 text-sm leading-4'>
          {formattedDate ? formattedDate.getFullYear() : ''}
        </span>
        <div className='mr-4 flex size-16 flex-col items-center justify-center rounded-xl bg-gray-100 transition-colors dark:bg-slate-700'>
          {formattedDate ? (
            <div className='text-center'>
              <div className='text-sm leading-4'>{formattedDate.getMonth() + 1}</div>
              <div className='text-2xl leading-6'>{formattedDate.getDate()}</div>
            </div>
          ) : (
            <span className='text-3xl'>🎉</span>
          )}
        </div>
      </div>
    </time>
  );
}
