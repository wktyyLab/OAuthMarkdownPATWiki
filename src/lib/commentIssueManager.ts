import { cache } from 'react';
import { Comment, Issue } from '@/static/issueType';
import { fetchAllData, getHeaders, getNext } from './fetchingFunc';

const issueCreationMap: Record<string, Promise<void> | undefined> = {};
const gitIssuePath = `https://api.github.com/repos/${process.env.GIT_USERNAME!}/${process.env.GIT_REPO!}/issues`;

const getFilteredIssuePath = (slug: string) => `${gitIssuePath}?q=${encodeURIComponent(slug)}+in:title&state=all`;

async function getIssue(slug: string, revalidate: number = 120) {
  const data = await fetchAllData(getFilteredIssuePath(slug), revalidate);

  if (data && data.length > 0) {
    const issue = data.find((item: any) => item.title === slug);
    if (issue) {
      return {
        slug: issue.title as string,
        commentsURL: issue.comments_url as string,
        locked: issue.locked as boolean,
        state: issue.state as 'open' | 'closed',
      };
    }
  }
  return null;
}

const createIssue = cache(async (slug: string) => {
  if (!issueCreationMap[slug]) {
    issueCreationMap[slug] = (async () => {
      const targetIssue = await getIssue(slug, 0);
      if (targetIssue) return;
      const data = {
        title: slug,
        body: `${process.env.NEXT_PUBLIC_URL!}/post/${slug}`,
        labels: ['user-comment'],
      };

      await fetch(gitIssuePath, {
        method: 'POST',
        body: JSON.stringify(data),
        ...getHeaders(),
      })
        .then((res) => {
          if (res.status !== 201) {
            console.error(`Error creating issue: ${res.status} - ${res.statusText}`);
          } else {
            console.log(`Issue created successfully for slug: ${slug}`);
          }
        })
        .catch((e) => console.error(e));
    })();

    issueCreationMap[slug].finally(() => {
      delete issueCreationMap[slug];
    });

    return issueCreationMap[slug];
  } else {
    return issueCreationMap[slug];
  }
});

export const getCommentList = cache(async (slug: string): Promise<Issue> => {
  const targetIssue = await getIssue(slug);

  if (targetIssue) {
    const data = await fetch(targetIssue.commentsURL, {
      ...getHeaders(),
      ...getNext(20),
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));

    const comments: Comment[] = [];
    for (const item of data) {
      const date = new Date(item.created_at as string);
      comments.push({
        date: date.toLocaleString('ja-JP'),
        content: item.body as string,
      });
    }
    return {
      comments,
      locked: targetIssue.locked,
      state: targetIssue.state,
    };
  } else {
    createIssue(slug);
    return {
      comments: [],
      locked: false,
      state: 'open',
    };
  }
});
