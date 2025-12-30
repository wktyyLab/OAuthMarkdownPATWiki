'use client';
import { useCallback, useEffect, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Comment } from '@/static/issueType';
import LoadingCircle from '../LoadingCircle';
import { ExplainingBanner } from '../UserBanner';
import PostingForm from './CommentPostingBox';
import DateCard from './DateCard';
import { CommentMarkdown } from './MarkdownElements';

function CommentsView({ comments }: { comments: Comment[] }) {
  return (
    <div className='mt-5 flex flex-col gap-4'>
      {comments.length > 0 ? (
        comments.map((comment, i) => (
          <div key={i} className='block items-start border-b pb-4 lg:flex'>
            <DateCard date={comment.date} />
            <div className='mt-5 min-w-0 flex-grow lg:mt-0'>
              <CommentMarkdown content={comment.content} />
            </div>
          </div>
        ))
      ) : (
        <ExplainingBanner>コメントはまだありません</ExplainingBanner>
      )}
    </div>
  );
}

export function CommentForm({ initialComments, slug }: { initialComments: Comment[]; slug: string }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/${slug}`);
      if (res.ok) {
        const issue = await res.json();
        if (issue && issue.comments) {
          setComments(issue.comments);
        }
      } else {
        console.error(`Failed to fetch comments: ${res.status}`);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(fetchComments, 20000);
    return () => clearInterval(interval);
  }, [fetchComments]);

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} language='ja'>
      <section className='mt-10 border-t pt-5'>
        <h2
          id='user-comments'
          className='scroll-mt-16 text-[1.5rem] text-blue-900 transition-colors dark:text-blue-500'
        >
          <b>コメント</b>
        </h2>
        <div className='flex items-center justify-end'>
          <div className='flex select-none items-center gap-2'>
            <div className='flex items-center'>
              <span title='20秒毎' className='text-sm text-gray-700 dark:text-slate-400'>
                自動更新
              </span>
              <div className='scale-50 opacity-25'>
                <LoadingCircle />
              </div>
            </div>
            <button
              onClick={fetchComments}
              className={`px-3 py-1 transition-colors ${loading ? 'bg-gray-400 text-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500'} rounded-md`}
              disabled={loading}
            >
              更新
            </button>
          </div>
        </div>
        <CommentsView comments={comments} />
        <PostingForm slug={slug} />
      </section>
    </GoogleReCaptchaProvider>
  );
}

export function CommentFormNoPosting({ comments }: { comments: Comment[] }) {
  return (
    <section className='mt-10 border-t pt-5'>
      <h2 id='user-comments' className='scroll-mt-16 text-[1.5rem] text-blue-900 transition-colors dark:text-blue-500'>
        <b>コメント</b>
      </h2>
      <CommentsView comments={comments} />
      <ExplainingBanner>コメントできません</ExplainingBanner>
    </section>
  );
}
