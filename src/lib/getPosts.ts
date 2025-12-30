import { cache } from 'react';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { fetchAllData, getHeaders, getNext } from './fetchingFunc';
import { MarkdownToPlainText } from './markdownConverter';
import { comparePosts, compareSeriesPosts } from './postSorter';
import { makeExcerpt } from './textFormatter';
import type { Post, PostData, SeriesData } from '@/static/postType';

const gitContentPath = `https://api.github.com/repos/${process.env.GIT_USERNAME!}/${process.env.GIT_REPO!}/contents`;

const getPostContent = cache(async (path: string): Promise<{ data: PostData; content: string; excerpt: string }> => {
  const fileJson = await fetch(`${gitContentPath}/${path}`, {
    ...getHeaders(),
    ...getNext(1200),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  if (fileJson?.message === 'Not Found' || fileJson?.status === 404) {
    notFound();
  }

  const buf = Buffer.from(fileJson.content, 'base64');
  const fileContent = buf.toString('utf-8');
  const { data, content } = matter(fileContent);

  const pathParts = path.split('/');
  const outputData = pathParts.length > 2 ? { ...data, series: pathParts[1] } : data;

  const plainText = await MarkdownToPlainText(content);
  const excerpt = makeExcerpt(plainText, 200);

  return {
    data: outputData as PostData,
    content,
    excerpt,
  };
});

export const getSeriesProps = cache(async () => {
  const targetDir = process.env.GIT_POSTS_DIR!;
  const data = await fetchAllData(`${gitContentPath}/${targetDir}`, 1200);
  const seriesArray = data.filter((item) => item.type === 'dir').map((item) => item.name as string);

  return seriesArray;
});

async function createPostFromFile(item: any, dir: string): Promise<Post | null> {
  const { data, excerpt, content } = await getPostContent(`${dir}/${item.name}`);
  if (data.title) {
    return {
      slug: item.path.replace(`${process.env.GIT_POSTS_DIR}/`, '').replace('.md', ''),
      data,
      excerpt,
      content,
    };
  }
  return null;
}

async function createPostsFromDirectory(item: any): Promise<Post[]> {
  const dirPath = `${process.env.GIT_POSTS_DIR}/${item.name}`;
  const dirContent = await fetchAllData(`${gitContentPath}/${dirPath}`, 1200);

  const markdownFiles = dirContent.filter((subItem) => subItem.type === 'file' && subItem.name.endsWith('.md'));
  const dirFiles = await Promise.all(markdownFiles.map((subItem) => createPostFromFile(subItem, dirPath)));

  return dirFiles.filter((post): post is Post => post !== null);
}

export const getPostsProps = cache(async (dir?: string): Promise<Post[]> => {
  const targetDir = dir ? `${process.env.GIT_POSTS_DIR}/${dir}` : process.env.GIT_POSTS_DIR!;
  const data = await fetchAllData(`${gitContentPath}/${targetDir}`, 300);

  const postsPromises = data.map(async (item) => {
    if (item.type === 'file' && item.name.endsWith('.md')) {
      return createPostFromFile(item, targetDir);
    } else if (!dir && item.type === 'dir') {
      return createPostsFromDirectory(item);
    }
    return null;
  });

  const postsResults = await Promise.all(postsPromises);

  const posts = postsResults.filter((post): post is Post | Post[] => post !== null).flat();

  return posts.sort(comparePosts);
});

export const getSeries = cache(async (dir: string) => {
  const postsProps = await getPostsProps(dir);
  const targetDir = `${process.env.GIT_POSTS_DIR}/${dir}`;
  const fileJson = await fetch(`${gitContentPath}/${targetDir}/meta.json`, {
    ...getHeaders(),
    ...getNext(1200),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  let seriesJson: SeriesData;

  if (fileJson?.message === 'Not Found' || fileJson?.status === 404) {
    seriesJson = {
      name: dir,
    };
  } else {
    const buf = Buffer.from(fileJson.content, 'base64');
    const fileContent = buf.toString('utf-8');
    seriesJson = JSON.parse(fileContent);
  }

  return {
    posts: postsProps.sort(compareSeriesPosts),
    meta: seriesJson,
  };
});

export const getPost = cache(async (path: string) => {
  return await getPostContent(path);
});

export const getImage = cache(async (path: string) => {
  const fileJson = await fetch(`${gitContentPath}${path}`, {
    ...getHeaders(),
    ...getNext(3600 * 24 * 30),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  if (!fileJson.git_url) return '';

  const imageJson = await fetch(fileJson.git_url, {
    ...getHeaders(),
    ...getNext(3600 * 24),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return imageJson.content as string;
});
