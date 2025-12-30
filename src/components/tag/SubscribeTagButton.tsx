'use client';
import { useEffect, useState } from 'react';
import { addFavorite, hasFavorite, removeFavorite } from '@/lib/favTagsManager';

export default function SubscribeTagButton({ tag }: { tag: string }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavorite(hasFavorite(tag));
  }, [tag]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(tag);
    } else {
      addFavorite(tag);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`transition-all ${isFavorite ? 'bg-white text-blue-500 dark:bg-slate-800' : 'bg-blue-500 text-white'} my-1 rounded-3xl border border-blue-500 px-4 py-1.5 drop-shadow-md hover:drop-shadow-xl`}
    >
      {isFavorite ? '登録済み' : 'お気に入り登録'}
    </button>
  );
}
