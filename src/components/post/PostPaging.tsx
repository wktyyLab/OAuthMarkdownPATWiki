'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { A11y } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Post } from '@/static/postType';
import { PostCard, PostLargeCard } from './PostCard';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface ShowingOptionState {
  isLarge: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsLarge: (flag: boolean) => void;
}

// ローカルストレージと連携
const useShowingOptionStore = create<ShowingOptionState>()(
  persist(
    (set) => ({
      isLarge: false,
      setIsLarge: (flag: boolean) => set(() => ({ isLarge: flag })),
    }),
    {
      name: 'showing_option',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const MorePageSign = () => <div className='pointer-events-none block size-4 rounded-full bg-blue-200'></div>;

const PagingButton = ({ icon, title, func }: { icon: string; title?: string; func: () => void }) => (
  <button
    title={title}
    className='group flex size-10 flex-col items-center justify-center rounded-full border border-blue-500 transition-colors hover:bg-blue-500 sm:size-12'
    onClick={func}
  >
    <span className={`${icon} size-8 bg-blue-500 transition-colors group-hover:bg-slate-50`} />
  </button>
);

export default function PostPaging({
  posts,
  useIndex,
  useRouting,
  hideOnePagingButton,
  customParam = 'p',
  postsPerPage = 10,
  linkingWidth = 2,
}: {
  posts: Post[];
  useIndex?: boolean;
  useRouting?: boolean;
  hideOnePagingButton?: boolean;
  customParam?: string;
  postsPerPage?: number;
  linkingWidth?: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [page, setPage] = useState<number>(() => {
    const p = useRouting ? searchParams.get(customParam) : null;
    return useRouting ? (p ? Number(p) : 1) : 1;
  });
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const isLargePostCard = useShowingOptionStore((state) => state.isLarge);
  const setIsLargePostCard = useShowingOptionStore((state) => state.setIsLarge);

  const maxPage = Math.max(Math.ceil(posts.length / postsPerPage), 1);

  const linkingStartPage = Math.max(page - linkingWidth, 1);
  const linkingEndPage = Math.min(page + linkingWidth, maxPage);
  const linkingPages: number[] = [];
  for (let i = linkingStartPage; i <= linkingEndPage; i++) {
    linkingPages.push(i);
  }

  const updatePage = useCallback(
    (nextPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set(customParam, String(nextPage));

      router.push(`${pathname}?${params.toString()}`);
    },
    [customParam, pathname, router, searchParams],
  );

  useEffect(() => {
    if (page <= 0 || page > maxPage) {
      if (useRouting) updatePage(1);
      setPage(1);
    }
  }, [maxPage, page, useRouting, updatePage]);

  return (
    <div className='block'>
      <div className='mb-2 flex items-center justify-between'>
        {/* ナビゲーション */}
        <div className='break-all'>{posts.length}&nbsp;件</div>
        {maxPage != 1 ? (
          <div className='flex select-none items-center'>
            <span className='i-tabler-hand-move mr-0.5 size-4 bg-gray-700 transition-colors dark:bg-slate-400' />
            <span className='break-all text-xs text-gray-700 transition-colors dark:text-slate-400'>
              スワイプ可
              <span />
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className='flex flex-shrink-0 items-center gap-2'>
          <span className='select-none text-sm'>レイアウト</span>
          <div className='relative overflow-hidden rounded-md border border-slate-200 transition-colors dark:border-slate-600'>
            <button
              title='サムネイル表示'
              className={`group inline-flex h-8 w-10 items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-slate-700`}
              onClick={() => setIsLargePostCard(true)}
            >
              <span
                className={`i-tabler-photo relative z-20 size-5 ${isLargePostCard ? 'bg-white' : 'bg-gray-700 dark:bg-slate-400'} transition-colors`}
              ></span>
            </button>
            <button
              title='リスト表示'
              className={`group inline-flex h-8 w-10 items-center justify-center transition-colors hover:bg-gray-200 dark:hover:bg-slate-700`}
              onClick={() => setIsLargePostCard(false)}
            >
              <span
                className={`i-tabler-list relative z-20 size-5 ${!isLargePostCard ? 'bg-white' : 'bg-gray-700 dark:bg-slate-400'} transition-colors`}
              />
            </button>
            <div
              className={`pointer-events-none absolute ${isLargePostCard ? 'left-0' : 'left-10'} top-0 z-10 h-8 w-10 bg-blue-500 transition-all`}
            />
          </div>
        </div>
      </div>
      <Swiper
        autoHeight
        modules={[A11y]}
        spaceBetween={50}
        slidesPerView={1}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => {
          const newPage = swiper.activeIndex + 1;
          setPage(newPage);
          if (useRouting) updatePage(newPage);
        }}
        initialSlide={page - 1}
      >
        {Array.from({ length: maxPage }, (_, i) => {
          const startIndex = i * postsPerPage;
          const displayingPosts = posts.slice(startIndex, startIndex + postsPerPage);
          return (
            <SwiperSlide key={i}>
              <div className='mb-2 flex flex-col gap-y-3'>
                {displayingPosts.map((post, id) => (
                  <div key={id} className={useIndex ? 'flex items-stretch gap-1' : ''}>
                    {useIndex && (
                      <div className='hidden w-10 shrink-0 select-none items-center justify-center overflow-hidden break-all rounded-sm bg-gray-100 px-0.5 text-center text-lg font-bold text-gray-700 dark:bg-slate-700 dark:text-slate-400 lg:flex'>
                        {startIndex + id + 1}
                      </div>
                    )}
                    <div className={useIndex ? 'flex flex-grow' : ''}>
                      {isLargePostCard ? <PostLargeCard post={post} /> : <PostCard post={post} />}
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        className={`${maxPage === 1 && hideOnePagingButton ? 'hidden' : 'block'} sticky bottom-0 z-30 border-t bg-white pb-2.5 pt-1.5 dark:border-slate-600 dark:bg-slate-800`}
      >
        <div
          className={`${maxPage === 1 ? 'pointer-events-none opacity-50' : ''} mt-0.5 flex items-center justify-center gap-2 sm:mt-3`}
        >
          <PagingButton
            title='前のページ'
            icon='i-tabler-arrow-badge-left-filled'
            func={() => {
              const nextPage = page - 1 <= 0 ? maxPage : page - 1;
              if (useRouting) updatePage(nextPage);
              setPage(nextPage);
              swiperInstance?.slideTo(nextPage - 1);
            }}
          />
          <div className='flex gap-1'>
            {linkingStartPage !== 1 ? <MorePageSign /> : <></>}
            {linkingPages.map((item, i) => (
              <button
                key={i}
                title={`${item}ページ目へ`}
                className={`block size-4 rounded-full border border-blue-500 ${page === item ? 'pointer-events-none bg-blue-500' : 'bg-transparent'} transition-colors hover:bg-blue-500`}
                onClick={() => {
                  const nextPage = item;
                  if (useRouting) updatePage(nextPage);
                  setPage(nextPage);
                  swiperInstance?.slideTo(nextPage - 1);
                }}
              ></button>
            ))}
            {linkingEndPage !== maxPage ? <MorePageSign /> : <></>}
          </div>
          <PagingButton
            title='次のページ'
            icon='i-tabler-arrow-badge-right-filled'
            func={() => {
              const nextPage = page + 1 > maxPage ? 1 : page + 1;
              if (useRouting) updatePage(nextPage);
              setPage(nextPage);
              swiperInstance?.slideTo(nextPage - 1);
            }}
          />
        </div>
        <div className='mt-0.5 select-none text-center text-gray-700 dark:text-slate-500 sm:mt-2'>
          {page}ページ目 <span className='text-sm'>(最大&nbsp;{maxPage}ページ)</span>
        </div>
      </div>
    </div>
  );
}
