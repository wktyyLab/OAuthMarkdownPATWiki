import { Metadata } from 'next';
import TipsCard from '@/components/TipsCard';
import { ExplainingBanner } from '@/components/UserBanner';
import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import FeedButton from '@/components/post/FeedButton';
import PostPaging from '@/components/post/PostPaging';
import { generateMetadataTemplate } from '@/lib/SEO';
import { getPostsProps } from '@/lib/getPosts';
import { siteName } from '@/static/constant';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `投稿一覧`,
    description: `「${siteName}」内で投稿されている記事のタグをリストアップしています`,
    url: `/post`,
  });
}

export default async function PostList() {
  const posts = await getPostsProps();

  return (
    <Main>
      <Side>
        <TipsCard>タグをクリックすると「タグ検索」が可能です。</TipsCard>
      </Side>
      <Section>
        <Title>
          投稿一覧
          <FeedButton url='/feed' />
        </Title>
        {posts.length > 0 ? (
          <PostPaging posts={posts} useRouting />
        ) : (
          <ExplainingBanner>
            投稿が見つかりませんでした。
            <br />
            管理者より投稿されると次第に反映されます。
          </ExplainingBanner>
        )}
      </Section>
    </Main>
  );
}
