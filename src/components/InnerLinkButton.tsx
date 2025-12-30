import Link from 'next/link';

export function InnerLinkBlueButton({ path, text }: { path: string; text: string }) {
  return (
    <div>
      <Link href={path}>
        <div className='rounded-3xl border-2 border-blue-600 bg-blue-500 px-4 py-2 text-lg text-white drop-shadow-xl transition-colors hover:bg-blue-600'>
          {text}
        </div>
      </Link>
    </div>
  );
}
