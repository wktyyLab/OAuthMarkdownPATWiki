import { getTags } from '@/lib/postSorter';
import { Post } from '@/static/postType';
import PostPaging from './post/PostPaging';
import TagBanner from './tag/TagBanner';

export default function SearchResult({ posts, keywords }: { posts: Post[]; keywords: string[] }) {
  const tags = getTags(posts);

  const filteredPosts = posts.filter((post) =>
    keywords.every((keyword) => (post.data.title as string).toLocaleLowerCase().includes(keyword.toLocaleLowerCase())),
  );
  const filteredTags = tags.filter((tag) =>
    keywords.every((keyword) => tag.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())),
  );

  return (
    <section>
      <div>
        <h2>検索キーワード</h2>
        <div className='mt-2 flex flex-wrap gap-3'>
          {keywords.map((keyword, i) => (
            <span key={i} className='rounded-md bg-gray-100 px-2 py-0.5 transition-colors dark:bg-slate-700'>
              {keyword}
            </span>
          ))}
        </div>
      </div>
      <div className='mt-2'>
        <h2>タグ({filteredTags.length}件)</h2>
        <div className='mt-2 flex flex-wrap gap-3'>
          {filteredTags.map((tag, i) => (
            <TagBanner tag={tag} key={i} />
          ))}
        </div>
      </div>
      <div className='mt-2'>
        <h2>投稿({filteredPosts.length}件)</h2>
        <div className='mt-2'>
          <PostPaging posts={filteredPosts} postsPerPage={5} />
        </div>
      </div>
    </section>
  );
}
