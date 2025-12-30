import Link from 'next/link';
import { getHeaders, getNext } from '@/lib/fetchingFunc';
import { siteName } from '@/static/constant';
import SessionButton from '../SessionButton';

export default async function Footer() {
  const ownerRepoUser = process.env.VERCEL_GIT_REPO_OWNER;
  const ownerRepoName = process.env.VERCEL_GIT_REPO_SLUG;
  const ownerRepoMainSha =
    ownerRepoUser && ownerRepoName
      ? (
          await fetch(`https://api.github.com/repos/${ownerRepoUser}/${ownerRepoName}/commits?per_page=1`, {
            ...getHeaders(),
            ...getNext(600),
          }).then((res) => (res.ok ? res.json() : undefined))
        )?.[0]?.sha
      : undefined;
  const baseRepoCommitLink = `https://api.github.com/repos/isirmt/NextjsBlogWithGitPAT/commits/${ownerRepoMainSha}`;
  const baseRepoCommitIsPresenting = await fetch(baseRepoCommitLink, {
    ...getHeaders(),
    ...getNext(600),
  }).then((res) => res.status === 200);

  return (
    <footer>
      <div className='mx-auto flex w-full flex-col items-center justify-center p-5'>
        <Link href='/dashboard' className='underline'>
          ダッシュボード
        </Link>
        <SessionButton />
        <small>&copy; {siteName}</small>
        <small>
          Build with&nbsp;
          <Link
            className='underline'
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/isirmt/NextjsBlogWithGitPAT'
          >
            NextjsBlogWithGitPAT
          </Link>
          &nbsp; (
          {baseRepoCommitIsPresenting ? (
            <Link
              className='underline'
              target='_blank'
              rel='noopener noreferrer'
              href={`https://github.com/isirmt/NextjsBlogWithGitPAT/tree/${ownerRepoMainSha}`}
            >
              {String(ownerRepoMainSha).slice(0, 7)}
            </Link>
          ) : (
            <>Unknown</>
          )}
          )
        </small>
      </div>
    </footer>
  );
}
