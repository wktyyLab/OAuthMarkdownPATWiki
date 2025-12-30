import { MetadataRoute } from 'next';
import { getPostsProps } from '@/lib/getPosts';
import { lastModified } from '@/static/constant';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const staticPaths = ['/post', '/profile', '/series', '/tags'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostsProps();

  const baseURL = process.env.NEXT_PUBLIC_URL!;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseURL,
      priority: 1.0,
    },
  ];

  staticPaths.forEach((page) => {
    staticPages.push({
      url: baseURL + page,
      priority: 0.9,
    });
  });

  const dynamicPages: MetadataRoute.Sitemap = [];

  posts.forEach((post) => {
    dynamicPages.push({
      url: baseURL + '/post/' + post.slug,
      lastModified: post.data.date ? new Date(post.data.date) : lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    });
  });

  return [...staticPages, ...dynamicPages];
}
