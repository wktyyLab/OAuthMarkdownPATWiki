import LoadingCircle from '@/components/LoadingCircle';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Menu from '@/components/layout/Menu';
import { Main, Section, Side } from '@/components/layout/PageLayout';

export default function Loading() {
  return (
    <>
      <Header />
      <div className='justify-center bg-gray-100 transition-colors dark:bg-slate-900 md:flex'>
        <Menu />
        <Main>
          <Side />
          <Section>
            <LoadingCircle />
          </Section>
        </Main>
      </div>
      <Footer />
    </>
  );
}
