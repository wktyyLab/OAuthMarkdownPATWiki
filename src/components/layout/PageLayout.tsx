import * as React from 'react';

export function Main({ children }: { children?: React.ReactNode }) {
  return <main className={`flex-grow flex-row-reverse md:flex md:flex-grow-0`}>{children}</main>;
}

export function Side({ children }: { children?: React.ReactNode }) {
  return (
    <div className='hidden w-44 bg-gray-100 transition-colors dark:bg-slate-900 md:block lg:min-w-64'>
      <div className='sticky top-14 w-full'>{children}</div>
    </div>
  );
}

export function SideMDShown({ children }: { children?: React.ReactNode }) {
  return (
    <div className='sticky top-0 z-50 bg-gray-100 transition-colors dark:bg-slate-900 md:relative md:z-auto md:w-44 lg:min-w-64'>
      <div className='sticky top-14 flex w-full flex-row-reverse md:block'>{children}</div>
    </div>
  );
}

export function Section({ children }: { children?: React.ReactNode }) {
  return (
    <section className='mx-auto w-full rounded-3xl bg-white p-8 transition-colors dark:bg-slate-800 md:w-[34rem] lg:w-[44rem] xl:m-0'>
      {children}
    </section>
  );
}

export function SectionNoP({ children }: { children?: React.ReactNode }) {
  return (
    <section className='mx-auto w-full overflow-clip rounded-3xl bg-white p-0 transition-colors dark:bg-slate-800 md:w-[34rem] lg:w-[44rem] xl:m-0'>
      {children}
    </section>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return <h1 className='my-4 text-3xl transition-colors dark:text-white'>{children}</h1>;
}
