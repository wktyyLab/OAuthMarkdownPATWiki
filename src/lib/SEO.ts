import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';
import { author, siteDescription, siteName } from '@/static/constant';
import type { Metadata } from 'next';

interface Props {
  title?: string;
  description?: string;
  url: string;
  imageURL?: string;
  keywords?: string[];
  type?: OpenGraphType;
}

export function generateMetadataTemplate(props: Props): Metadata {
  const { title, description, url, imageURL, keywords, type } = props;
  const outputTitle = title ? `${title} - ${siteName}` : siteName;
  const outputDescription = description ? description : siteDescription;
  const outputType: OpenGraphType = type ? type : 'website';

  let metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    authors: { name: author.name, url: author.url },
    title: outputTitle,
    description: outputDescription,
    keywords,
    openGraph: {
      title: title ? title : siteName,
      description: outputDescription,
      url: url,
      siteName,
      images: imageURL
        ? {
            url: imageURL,
            width: 1200,
            height: 630,
          }
        : {
            url: `${process.env.NEXT_PUBLIC_URL!}/ogp.png`,
            width: 455,
            height: 455,
          },
      type: outputType,
    },
  };

  if (imageURL)
    metadata = {
      ...metadata,
      twitter: {
        card: 'summary_large_image',
        images: imageURL,
        title: outputTitle,
        description: outputDescription,
      },
    };
  else
    metadata = {
      ...metadata,
      twitter: {
        card: 'summary',
        images: `${process.env.NEXT_PUBLIC_URL!}/ogp.png`,
        title: outputTitle,
        description: outputDescription,
      },
    };
  return metadata;
}
