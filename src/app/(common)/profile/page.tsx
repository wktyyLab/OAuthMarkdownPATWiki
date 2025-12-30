import React, { cache } from 'react';
import '@/styles/post/style.css';
import { Metadata } from 'next';
import Article from '@/components/layout/ArticlePage';
import { Main, SideMDShown } from '@/components/layout/PageLayout';
import PostIndex from '@/components/post/PostIndex';
import { generateMetadataTemplate } from '@/lib/SEO';
import { getPost } from '@/lib/getPosts';
import { author, siteName } from '@/static/constant';

const getFileContent = cache(async () => {
  const postPath = `${process.env.GIT_PROFILE_PATH!}`;
  return await getPost(postPath);
});

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getFileContent();

  return generateMetadataTemplate({
    title: `${data.title}`,
    description: `「${siteName}」の投稿者(${author.name})について`,
    url: `/profile`,
    type: 'article',
  });
}

export default async function Profile() {
  const { data, content } = await getFileContent();

  return (
    <Main>
      <SideMDShown>
        <PostIndex content={content} title={data.title as string} />
      </SideMDShown>
      <Article data={data} content={content} />
    </Main>
  );
}
