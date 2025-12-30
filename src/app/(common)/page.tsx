import { Metadata } from 'next';
import Link from 'next/link';
import { WebSite, WithContext } from 'schema-dts';
import InlineVideo from '@/components/InlineVideo';
import { InnerLinkBlueButton } from '@/components/InnerLinkButton';
import JsonLd from '@/components/JsonLd';
import SearchBoxWrapper from '@/components/SearchBoxWrapper';
import TipsCard from '@/components/TipsCard';
import { Main, SectionNoP, Side, Title } from '@/components/layout/PageLayout';
import FavoritePosts from '@/components/post/FavoritePosts';
import { PostLargeCard } from '@/components/post/PostCard';
import PostPaging from '@/components/post/PostPaging';
import FavoriteTags from '@/components/tag/FavoriteTags';
import { generateMetadataTemplate } from '@/lib/SEO';
import { getPostsProps } from '@/lib/getPosts';
import { headerMovName, siteName } from '@/static/constant';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    url: `/`,
  });
}

export default async function Blogs() {
  const posts = await getPostsProps();

  const jsonLd: WithContext<WebSite> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: process.env.NEXT_PUBLIC_URL!,
  };

  return (
    <Main>
      <JsonLd jsonLd={jsonLd} />
      <Side>
        <TipsCard>
          ブログへようこそ！
          <br />
          <Link target='_blank' rel='noopener noreferrer' href='https://github.com/isirmt/NextjsBlogWithGitPAT/issues'>
            <u>バグ・問題等の報告はこちらへ</u>
          </Link>
        </TipsCard>
      </Side>
      <SectionNoP>
        <div className='pointer-events-none m-0 aspect-[10_/_3] w-full overflow-hidden bg-[#0e4589] p-0'>
          <InlineVideo fileName={headerMovName} />
        </div>
        <div className='px-8 pb-8 pt-3'>
          <Title>{siteName}</Title>
          <div className='my-3 md:hidden'>
            <SearchBoxWrapper />
          </div>
          {posts.length > 0 ? (
            <div className='my-3'>
              <h2>最新の記事</h2>
              <div className='mt-3'>
                <PostLargeCard post={posts[0]} />
              </div>
            </div>
          ) : (
            <></>
          )}
          <h2>「お気に入り」のタグ一覧</h2>
          <FavoriteTags />
          <h2>「お気に入り」登録タグの投稿一覧</h2>
          <FavoritePosts posts={posts} />
          <h2>新着記事一覧</h2>
          <div className='my-3 flex flex-col gap-y-3'>
            <PostPaging posts={posts.slice(0, 5)} postsPerPage={5} hideOnePagingButton />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <InnerLinkBlueButton path='/post' text='投稿一覧へ' />
          </div>
        </div>
      </SectionNoP>
    </Main>
  );
}
