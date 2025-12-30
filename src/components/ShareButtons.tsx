'use client';
import { useCallback } from 'react';
import Link from 'next/link';

function replaceToFullWidth(str: string) {
  return str.replace(/[#$]/g, (match) => {
    switch (match) {
      case '#':
        return '＃ ';
      case '$':
        return '＄ ';
      default:
        return match;
    }
  });
}

function SNSButton({
  url,
  hoverColor,
  icon,
  title,
}: {
  url: string;
  hoverColor: string;
  icon: string;
  title?: string;
}) {
  return (
    <div>
      <Link target='_blank' rel='noopener noreferrer' title={title ?? 'シェア'} href={url}>
        <div
          className={`${icon} size-8 bg-gray-500 transition-colors hover:bg-[${hoverColor!}] dark:hover:bg-slate-50`}
        />
      </Link>
    </div>
  );
}

export default function ShareButtons({ path, title }: { path: string; title: string }) {
  const sharingURL = `${process.env.NEXT_PUBLIC_URL!}${path}`;
  const sharingTitle = replaceToFullWidth(title);

  const handleWebShareClick = useCallback(() => {
    void (async () => {
      if (navigator.share) {
        await navigator.share({
          title: sharingTitle,
          url: sharingURL,
        });
      } else {
        await navigator.clipboard.writeText(sharingURL);
        alert('URLをコピーしました！');
      }
    })();
  }, [sharingTitle, sharingURL]);

  return (
    <div className='flex flex-row justify-center gap-1.5'>
      <SNSButton
        url={`http://twitter.com/intent/tweet?url=${sharingURL}&text=${encodeURIComponent(sharingTitle)}`}
        hoverColor='#000'
        icon='i-tabler-brand-x'
        title='Xへシェアする'
      />
      <SNSButton
        url={`https://www.facebook.com/sharer.php?u=${sharingURL}`}
        hoverColor='#1877f2'
        icon='i-tabler-brand-facebook'
        title='Facebookへシェアする'
      />
      <button title='共有する' onClick={handleWebShareClick}>
        <div
          className={`i-tabler-external-link size-8 bg-gray-500 transition-colors hover:bg-amber-500 dark:hover:bg-slate-50`}
        />
      </button>
    </div>
  );
}
