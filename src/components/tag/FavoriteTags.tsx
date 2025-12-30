'use client';
import { useEffect, useState } from 'react';
import { getFavList } from '@/lib/favTagsManager';
import { ExplainingBanner } from '../UserBanner';
import TagBanner from './TagBanner';

export default function FavoriteTags() {
  const [favoriteTags, setFavoriteTags] = useState<string[]>([]);

  useEffect(() => {
    setFavoriteTags(getFavList());
  }, []);

  return (
    <div title={`${favoriteTags.length} 件のお気に入り`} className='my-3 flex flex-wrap gap-3'>
      {favoriteTags.length > 0 ? (
        favoriteTags.map((tag, i) => <TagBanner tag={tag} key={i} />)
      ) : (
        <ExplainingBanner>「お気に入り」のタグはありません</ExplainingBanner>
      )}
    </div>
  );
}
