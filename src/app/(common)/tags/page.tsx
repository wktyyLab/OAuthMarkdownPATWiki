import { Metadata } from 'next';
import TipsCard from '@/components/TipsCard';
import { Main, Section, Side, Title } from '@/components/layout/PageLayout';
import FavoriteTags from '@/components/tag/FavoriteTags';
import TagBanner from '@/components/tag/TagBanner';
import { generateMetadataTemplate } from '@/lib/SEO';
import { getPostsProps } from '@/lib/getPosts';
import { getTags } from '@/lib/postSorter';
import { siteName } from '@/static/constant';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `タグ一覧`,
    description: `「${siteName}」内で投稿されている記事のタグをリストアップしています`,
    url: `/tags`,
  });
}

export default async function TagList() {
  const posts = await getPostsProps();
  const tags = getTags(posts);

  return (
    <Main>
      <Side>
        <TipsCard>アイコンを押すとお気に入りの登録・解除が可能です。</TipsCard>
      </Side>
      <Section>
        <Title>タグ一覧</Title>
        <h2>「お気に入り」のタグ一覧</h2>
        <FavoriteTags />
        <h2>タグ一覧</h2>
        <div className='my-3 flex flex-wrap gap-3'>
          {tags.map((tag, i) => (
            <TagBanner tag={tag} key={i} />
          ))}
        </div>
      </Section>
    </Main>
  );
}
