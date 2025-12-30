/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { getHeaders, getNext } from '@/lib/fetchingFunc';
import { author, enableShowGitHubProfile, enableShowXProfile } from '@/static/constant';

export default async function Footer() {
  const githubProfile = await fetch(`https://api.github.com/user`, {
    ...getHeaders(),
    ...getNext(3600 * 24),
  }).then((res) => {
    if (res.ok) return res.json();
    else
      return {
        private_content: true,
      };
  });

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
        <div className='w-full p-3 sm:w-auto'>
          <p>ブログを書いている人</p>
          <div className='mt-2 w-full gap-5 rounded-lg bg-gray-200 px-3 py-2 transition-colors dark:bg-slate-800 lg:flex lg:w-auto lg:items-center'>
            <div className='flex w-full justify-center gap-5 sm:w-auto sm:min-w-48 sm:max-w-64'>
              <div>
                <p className='ml-2 break-all'>{author.name}</p>
                <p className='ml-2 select-none whitespace-nowrap'>
                  <Link
                    className='underline transition-colors hover:no-underline'
                    target='_blank'
                    rel='noopener noreferrer'
                    href={author.url}
                  >
                    ホームページ
                    <span className='i-tabler-link' />
                  </Link>
                </p>
              </div>
              <div>
                <Link href='/profile' title='プロフィールを表示'>
                  <div className='group flex size-12 items-center justify-center rounded-lg border border-blue-400 bg-blue-100 transition-colors hover:bg-blue-200 dark:border-violet-400 dark:bg-violet-700 dark:hover:bg-violet-600'>
                    <span className='i-tabler-user-circle size-7 bg-blue-400 transition-colors dark:bg-violet-400' />
                  </div>
                </Link>
              </div>
            </div>
            {enableShowGitHubProfile && !githubProfile.private_content ? (
              <div className='mt-3 flex w-full select-none flex-col items-center border-t border-gray-300 pt-3 dark:border-slate-600 sm:min-w-36 sm:max-w-64 lg:mt-0 lg:items-start lg:border-none lg:pt-0'>
                <div className='mb-2'>
                  <span className='i-tabler-brand-github mr-1 size-5 translate-y-1' />
                  <span>GitHub</span>
                </div>
                <div className='flex items-center justify-start gap-2'>
                  <img
                    alt='github_user_icon'
                    className='pointer-events-none size-10 overflow-hidden rounded-full'
                    src={githubProfile.avatar_url}
                  />
                  <div className='flex items-center break-all'>
                    <Link
                      target='_blank'
                      className='underline transition-colors hover:no-underline'
                      rel='noopener noreferrer'
                      href={githubProfile.html_url}
                    >
                      {githubProfile.login}
                    </Link>
                  </div>
                </div>
                {githubProfile.bio ? <div className='mt-2 break-all text-sm'>{githubProfile.bio}</div> : <></>}
              </div>
            ) : (
              <></>
            )}
            {enableShowXProfile && !githubProfile.private_content && githubProfile.twitter_username ? (
              <div className='mt-3 flex w-full select-none flex-col items-center border-t border-gray-300 pt-3 dark:border-slate-600 sm:min-w-36 sm:max-w-64 lg:mt-0 lg:items-start lg:border-none lg:pt-0'>
                <div className='flex items-center justify-start gap-2'>
                  <div className='i-tabler-brand-x size-8 bg-gray-700 transition-colors dark:bg-slate-400' />
                  <div className='flex items-center break-all'>
                    <Link
                      target='_blank'
                      className='underline transition-colors hover:no-underline'
                      rel='noopener noreferrer'
                      href={`https://x.com/${githubProfile.twitter_username}`}
                    >
                      @{githubProfile.twitter_username}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <p className='mb-4'>
          <small className='mr-2'>(管理者用)</small>
          <Link href='/dashboard' className='underline'>
            ダッシュボード
          </Link>
        </p>
        <small>&copy; {author.name}</small>
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
