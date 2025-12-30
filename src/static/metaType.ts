export type HeadMeta = {
  url: string;
  description?: string;
  'og:title'?: string;
  'og:description'?: string;
  'og:url'?: string;
  'og:site_name'?: string;
  'og:image'?: string;
  'og:image:width'?: string;
  'og:image:height'?: string;
  'og:type'?: string;
  title?: string;
  [key: string]: any;
};
