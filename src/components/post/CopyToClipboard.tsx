'use client';
import { useState } from 'react';

export default function CopyToClipboard({ text }: { text: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } catch (error) {
        console.error('クリップボードへのコピーに失敗しました: ', error);
      }
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;

      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (error) {
        console.error('クリップボードへのコピーに失敗しました: ', error);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <button
      className='flex items-center justify-center rounded-md bg-gray-200 px-3 py-1 text-sm transition-colors hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600'
      onClick={copy}
    >
      <span className={`${copied ? 'i-tabler-clipboard-check' : 'i-tabler-clipboard'} mr-1`} /> コピー
      {copied ? '完了' : 'する'}
    </button>
  );
}
