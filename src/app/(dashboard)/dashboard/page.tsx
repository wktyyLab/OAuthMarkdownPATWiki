import { Metadata } from 'next';
import { Session } from 'next-auth';
import { DashboardItem } from '@/components/DashboardItem';
import ImagesBarChart from '@/components/chart/ImagesBarChart';
import PostsBarChart from '@/components/chart/PostsBarChart';
import TagPieChart from '@/components/chart/TagPieChart';
import { Title } from '@/components/layout/PageLayout';
import { generateMetadataTemplate } from '@/lib/SEO';
import { auth } from '@/lib/auth';
import { getHeaders, getNext } from '@/lib/fetchingFunc';
import { getPostsProps } from '@/lib/getPosts';
import { siteName } from '@/static/constant';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `ダッシュボード`,
    description: `「${siteName}」のダッシュボード`,
    url: `/dashboard`,
  });
}

export default async function Dashboard() {
  const session: Session | null = await auth();
  if (!session) {
    return (
      <main className='p-4'>
        <Title>ダッシュボード</Title>
        <div>認証情報を確認できませんでした。再度サインインしてください。</div>
      </main>
    );
  }

  const apiRateResponse = await fetch(`https://api.github.com/rate_limit`, {
    ...getHeaders(),
    ...getNext(5),
  }).then((res) => res.json());

  const posts = await getPostsProps();

  return (
    <main className='p-4'>
      <Title>ダッシュボード</Title>
      <div className='flex flex-wrap items-start justify-center gap-4 sm:p-2 md:justify-start'>
        <section className='w-full overflow-hidden rounded-lg border border-red-400 dark:bg-white sm:w-96'>
          <div className='px-4 py-2 text-gray-700'>
            <h2 className='text-lg font-bold'>APIレート制限</h2>
            {apiRateResponse.rate.remaining} / {apiRateResponse.rate.limit}
          </div>
          <div className='bg-red-400 px-4 py-1 font-bold text-white'>
            リセット予定時間：{new Date(apiRateResponse.rate.reset * 1000).toLocaleTimeString('ja-JP')}
          </div>
        </section>

        <DashboardItem title='投稿につけられたタグ数'>
          <TagPieChart posts={posts} />
        </DashboardItem>

        <DashboardItem title='画像数'>
          <ImagesBarChart posts={posts} />
        </DashboardItem>

        <DashboardItem title='投稿数'>
          <PostsBarChart posts={posts} />
        </DashboardItem>
      </div>
    </main>
  );
}
