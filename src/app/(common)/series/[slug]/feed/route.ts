import { NextRequest } from 'next/server';
import Rss from 'rss';
import { getSeries } from '@/lib/getPosts';
import { siteName } from '@/static/constant';
import { lastModified } from '@/static/constant';

export const dynamic = 'force-dynamic';
export const revalidate = 1200;

const baseURL = process.env.NEXT_PUBLIC_URL!;

export async function GET(req: NextRequest, context: { params: { slug: string } }) {
  const slug = decodeURIComponent(context.params.slug);
  const seriesPosts = await getSeries(slug);

  const feed = new Rss({
    title: `${siteName}のシリーズ「${seriesPosts.meta.name}」の新着投稿`,
    description: `「${siteName}」のシリーズ${seriesPosts.meta.description ? ': ' + seriesPosts.meta.description : ''}`,
    feed_url: `${baseURL}/series/${context.params.slug}/feed`,
    site_url: baseURL,
    language: 'ja',
  });

  seriesPosts.posts.forEach((post) =>
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
