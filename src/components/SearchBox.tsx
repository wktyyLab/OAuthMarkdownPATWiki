'use client';
import { useState } from 'react';
import * as React from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [searchWord, setSearchWord] = useState<string>('');
  const router = useRouter();

  const triggerSearch = () => {
    if (searchWord.trim() !== '') {
      router.push(`/search?q=${encodeURIComponent(searchWord)}`);
    } else return;
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchWord.trim() === '') return;
      triggerSearch();
    }
  };

  return (
    <div className='flex justify-center'>
      <input
        placeholder='検索...'
        value={searchWord}
        onKeyDown={handleEnterKeyPress}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchWord(e.target.value)}
        className='h-8 w-48 rounded-e-none rounded-s-3xl border-y border-l border-gray-700 px-3 transition-colors dark:bg-slate-800'
      />
      <button
        onClick={triggerSearch}
        title='検索する [Enter]'
        className='flex h-8 w-10 items-center justify-center rounded-e-3xl border-y border-r border-gray-700 bg-gray-700 px-2 transition-colors hover:border-gray-800 hover:bg-gray-800'
      >
        <span className='i-tabler-zoom size-4 bg-white transition-colors dark:bg-slate-200' />
      </button>
    </div>
  );
}
