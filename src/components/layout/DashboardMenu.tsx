/* eslint-disable @next/next/no-img-element */
'use client';
import { MouseEventHandler, useEffect, useState } from 'react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

function HamburgerButton({ func, state }: { func: MouseEventHandler<HTMLButtonElement>; state: boolean }) {
  return (
    <div className={`fixed left-0 top-0 z-50 flex size-14 items-center justify-center transition-colors md:hidden`}>
      <button
        className='flex size-10 items-center justify-center rounded-full bg-slate-200 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700'
        onClick={func}
        aria-label='Toggle Menu'
      >
        <span className={`${state ? 'i-tabler-x' : 'i-tabler-menu-2'} size-6`} />
      </button>
    </div>
  );
}

export default function DashboardMenu() {
  const [session, setSession] = useState<Session | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchSession() {
      const res = await fetch('/api/auth/session');

      const sessionData = await res.json();
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!session) {
    return (
      <>
        <HamburgerButton state={isOpen} func={toggleMenu} />
        <aside
          className={`fixed left-0 top-0 h-full w-64 transform select-none border-r-2 border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40 transition-transform md:relative md:z-0 md:h-auto md:translate-x-0`}
        />
      </>
    );
  }

  return (
    <>
      <HamburgerButton state={isOpen} func={toggleMenu} />
      <aside
        className={`fixed left-0 top-0 h-full w-64 transform select-none border-r-2 border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40 transition-transform md:relative md:z-0 md:h-auto md:translate-x-0`}
      >
        <div className='sticky top-14 h-[calc(100svh_-_3.5rem)]'>
          <div className='p-4'>
            <p>リンク一覧</p>
            <ul className='my-2 flex flex-col gap-2'>
              <li>
                <Link href='/dashboard' onClick={() => setIsOpen(false)}>
                  <div className='rounded-sm bg-transparent px-2 py-1 text-lg transition-colors hover:bg-slate-200 dark:hover:bg-slate-700'>
                    <span className='i-tabler-home mr-1 translate-y-0.5' />
                    ホーム
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className='absolute bottom-0 flex w-full flex-col items-center bg-slate-100 dark:bg-slate-800'>
            <div className='flex w-full items-center gap-2 rounded-t-lg bg-slate-200 px-4 py-2 dark:bg-slate-700'>
              {session.user?.image ? (
                <img alt='user-icon' className='size-10 rounded-full' src={session.user?.image} />
              ) : (
                <></>
              )}
              <span>{session.user?.id}</span>
            </div>
            <button
              onClick={() => signOut()}
              className='my-5 rounded border border-red-400 bg-slate-50 px-5 py-2 font-bold text-red-400 transition-colors hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-slate-700'
            >
              サインアウト
            </button>
          </div>
        </div>
      </aside>

      {/* オーバーレイ */}
      {isOpen && <div className='fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden' onClick={toggleMenu}></div>}
    </>
  );
}
