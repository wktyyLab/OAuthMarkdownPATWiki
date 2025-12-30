import type { Post } from '@/static/postType';

const numberPattern = /^(.*\/)(\d+)$/;

export type TagWithLatestDate = {
  tag: string;
  latestDate: string | null;
};

export function compareSeriesPosts(a: Post, b: Post): number {
  const matchA = a.slug.match(numberPattern);
  const matchB = b.slug.match(numberPattern);

  if (matchA && matchB) {
    const numA = parseInt(matchA[2], 10);
    const numB = parseInt(matchB[2], 10);
    return numA - numB;
  } else if (matchA) {
    return -1;
  } else if (matchB) {
    return 1;
  } else {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : Infinity;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : Infinity;
    return dateA - dateB;
  }
}

export function comparePosts(a: Post, b: Post): number {
  const matchA = a.slug.match(numberPattern);
  const matchB = b.slug.match(numberPattern);

  const dateA = a.data.date ? new Date(a.data.date).getTime() : -Infinity;
  const dateB = b.data.date ? new Date(b.data.date).getTime() : -Infinity;

  if (dateB - dateA != 0) return dateB - dateA;
  else if (matchA && matchB) {
    const numA = parseInt(matchA[2], 10);
    const numB = parseInt(matchB[2], 10);
    return numB - numA;
  } else return 0;
}

export function getTagsWithLatestDate(posts: Post[]): TagWithLatestDate[] {
  const tagMap: Record<string, string | null> = {};

  posts.forEach((post) => {
    const { tags, date } = post.data;
    if (tags) {
      tags.forEach((tag) => {
        if (!tagMap[tag]) {
          tagMap[tag] = date || null;
        } else if (date && new Date(date) > new Date(tagMap[tag]!)) {
          tagMap[tag] = date;
        }
      });
    }
  });

  return Object.keys(tagMap).map((tag) => ({
    tag,
    latestDate: tagMap[tag],
  }));
}

export function getTags(posts: Post[]) {
  return Array.from(new Set(posts.filter((post) => post.data.tags).flatMap((post) => post.data.tags as string[])));
}
