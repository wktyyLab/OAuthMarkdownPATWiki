'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex size-full items-center justify-center text-center'>
      <div className='text-lg'>エラーが発生しました</div>
      <div>もう一度お試しください</div>
      <button className='mt-2 rounded-sm bg-blue-500 px-3 py-1.5 font-bold text-white' onClick={() => reset()}>
        再試行
      </button>
    </div>
  );
}
