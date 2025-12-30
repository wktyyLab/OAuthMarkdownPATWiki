import { Metadata } from 'next';
import InlineVideo from '@/components/InlineVideo';
import { InnerLinkBlueButton } from '@/components/InnerLinkButton';
import TipsCard from '@/components/TipsCard';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Menu from '@/components/layout/Menu';
import { Main, SectionNoP, Side, Title } from '@/components/layout/PageLayout';
import { generateMetadataTemplate } from '@/lib/SEO';
import { headerMovName } from '@/static/constant';
import '@/styles/globals.css';

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataTemplate({
    title: `404 Not Found`,
    url: `/`,
  });
}

export default async function NotFound() {
  return (
    <>
      <Header />
      <div className='justify-center bg-gray-100 transition-colors dark:bg-slate-900 md:flex'>
        <Menu />
        <Main>
          <Side>
            <TipsCard>ヘッダーより他のページへジャンプ可能です。</TipsCard>
          </Side>
          <SectionNoP>
            <div className='pointer-events-none m-0 aspect-[10_/_3] w-full overflow-hidden bg-[#0e4589] p-0'>
              <InlineVideo fileName={headerMovName} />
            </div>
            <div className='px-8 pb-8 pt-3'>
              <Title>404 Not Found</Title>
              <TipsCard>お探しのページは名前が変更されたか、移動・削除された可能性があります。</TipsCard>
              <div className='flex flex-col items-center justify-center'>
                <InnerLinkBlueButton path='/post' text='投稿一覧へ' />
              </div>
            </div>
          </SectionNoP>
        </Main>
      </div>
      <Footer />
    </>
  );
}
