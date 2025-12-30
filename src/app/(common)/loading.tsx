import LoadingCircle from '@/components/LoadingCircle';
import { Main, Section, Side } from '@/components/layout/PageLayout';

export default function Loading() {
  return (
    <Main>
      <Side />
      <Section>
        <LoadingCircle />
      </Section>
    </Main>
  );
}
