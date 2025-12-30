'use client';
import { useState } from 'react';
import type { ClassAttributes, HTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import type { ExtraProps } from 'react-markdown';

export default function PostIndex({ content, title }: { content: string; title: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const anchorLinkH2 = ({
    node,
    ...props
  }: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
    return (
      <li className='w-full list-none'>
        <a
          className='inline-block w-full rounded-md p-0.5 pl-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600 md:hover:bg-gray-200 dark:md:hover:bg-slate-800'
          onClick={() => setIsOpen(false)}
          href={'#' + node!.position?.start.line.toString()}
        >
          {props.children}
        </a>
      </li>
    );
  };

  const anchorLinkH3 = ({
    node,
    ...props
  }: ClassAttributes<HTMLHeadingElement> & HTMLAttributes<HTMLHeadingElement> & ExtraProps) => {
    return (
      <li className='w-full list-none'>
        <a
          className='inline-block w-full rounded-md p-0.5 pl-4 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600 md:hover:bg-gray-200 dark:md:hover:bg-slate-800'
          onClick={() => setIsOpen(false)}
          href={'#' + node!.position?.start.line.toString()}
        >
          {props.children}
        </a>
      </li>
    );
  };

  return (
    <div className='flex flex-col px-3 pb-3 pt-3 md:pt-6'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='rounded-md bg-slate-200 px-6 py-1 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 md:hover:bg-slate-200 dark:md:hover:bg-slate-700'
      >
        目次
      </button>
      <ol
        className={`${isOpen ? '' : 'hidden'} absolute right-0 top-16 max-h-[calc(100vh_-_14rem)] w-[80vw] overflow-y-auto rounded-md border border-slate-400 bg-slate-100 p-4 drop-shadow-xl transition-colors dark:bg-slate-700 md:relative md:top-0 md:block md:h-auto md:max-h-[calc(100vh_-_14rem)] md:w-full md:rounded-none md:border-none md:bg-gray-100 md:pl-2 md:pt-2 md:drop-shadow-none dark:md:bg-slate-900`}
      >
        <li className='w-full list-none'>
          <a
            className='inline-block w-full rounded-md p-0.5 transition-colors hover:bg-slate-200 dark:hover:bg-slate-600 md:hover:bg-gray-200 dark:md:hover:bg-slate-800'
            onClick={() => setIsOpen(false)}
            href={'#'}
          >
            {title}
          </a>
        </li>
        <ReactMarkdown
          allowedElements={['h2', 'h3']}
          components={{
            h2: anchorLinkH2,
            h3: anchorLinkH3,
          }}
          rehypePlugins={[rehypeSanitize]}
        >
          {content}
        </ReactMarkdown>
      </ol>
    </div>
  );
}
