import { NextRequest } from 'next/server';
import Rss from 'rss';
import { getPostsProps } from '@/lib/getPosts';
import { siteName } from '@/static/constant';
import { lastModified } from '@/static/constant';

export const dynamic = 'force-dynamic';
export const revalidate = 1200;

const baseURL = process.env.NEXT_PUBLIC_URL!;

export async function GET(req: NextRequest, context: { params: { slug: string } }) {
  const slug = decodeURIComponent(context.params.slug);
  const feed = new Rss({
    title: `${siteName}のタグ「#${slug}」の新着投稿`,
    description: `「${siteName}」のタグ「#${slug}」の投稿フィード`,
    feed_url: `${baseURL}/tags/${context.params.slug}/feed`,
    site_url: baseURL,
    language: 'ja',
  });

  const posts = await getPostsProps();
  const filteredPosts = posts.filter((post) => (post.data.tags ? post.data.tags.some((tag) => tag === slug) : false));

  filteredPosts.forEach((post) =>
    feed.item({
      title: post.data.title,
      description: post.excerpt,
      url: `${baseURL}/post/${encodeURIComponent(post.slug)}`,
      date: post.data.date ? new Date(post.data.date).toISOString() : new Date(lastModified).toISOString(),
    }),
  );

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate`,
    },
  });
}
