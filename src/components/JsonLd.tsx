export default function JsonLd({ jsonLd }: { jsonLd: { '@context': 'https://schema.org' } & { [key: string]: any } }) {
  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
