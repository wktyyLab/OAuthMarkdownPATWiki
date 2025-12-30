import Link from 'next/link';
import { getSeries } from '@/lib/getPosts';
import { ExplainingBanner } from '../UserBanner';
import { PostCard } from './PostCard';

export default async function SeriesCard({ slug, index }: { slug: string; index?: number }) {
  const { meta, posts } = await getSeries(slug);

  return (
    <section className='rounded-lg'>
      <Link href={`/series/${slug}`}>
        <div className='rounded-t-lg border border-gray-200 bg-gray-200 px-4 py-2 text-lg transition-colors hover:border-gray-300 hover:bg-gray-300 dark:border-slate-700 dark:bg-slate-700 dark:text-white dark:hover:border-slate-600 dark:hover:bg-slate-600'>
          {meta.name} ({posts.length}件)
        </div>
      </Link>
      <div className='rounded-b-lg border border-gray-200 p-2 transition-colors dark:border-slate-700'>
        {posts.length > 0 ? (
          typeof index !== 'undefined' ? (
            <div className='flex flex-col gap-3'>
              <div>
                <p className='mb-2 pl-2 text-left'>前の投稿</p>
                {index - 1 >= 0 ? (
                  <PostCard post={posts[index - 1]} />
                ) : (
                  <ExplainingBanner>最初の投稿です</ExplainingBanner>
                )}
              </div>
              <div>
                <p className='mb-2 pr-2 text-right'>次の投稿</p>
                {index + 1 < posts.length ? (
                  <PostCard post={posts[index + 1]} />
                ) : (
                  <ExplainingBanner>最新の投稿です</ExplainingBanner>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p className='mb-2 pl-2'>最初の記事</p>
              <PostCard post={posts[0]} />
            </div>
          )
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
