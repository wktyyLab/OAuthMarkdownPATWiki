'use client';

import { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { getFavList, saveFavList } from '@/lib/favTagsManager';
import SortableTag from './SortableMenuTag';

export default function Menu() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const setList = () => {
    setFavorites(getFavList());
  };

  useEffect(() => {
    setList();
    const interval = setInterval(setList, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFavorites((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const updatedFavorites = arrayMove(items, oldIndex, newIndex);

        saveFavList(updatedFavorites);
        return updatedFavorites;
      });
    }
  };

  return (
    <div
      className='relative hidden min-w-72 flex-grow-0 bg-gray-100 px-4 transition-colors dark:bg-slate-900 xl:block'
      onMouseEnter={setList}
      onTouchStart={setList}
    >
      <div className='sticky top-14 w-full'>
        <div className='p-3'>
          お気に入りのタグ
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={favorites} strategy={verticalListSortingStrategy}>
              <div className='mt-2 flex flex-col gap-y-2'>
                {favorites.map((tag) => (
                  <SortableTag tag={tag} key={tag} id={tag} /> // idとしてtagを使用
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
