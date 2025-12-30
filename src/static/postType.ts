export type PostData = {
  title: string;
  tags?: string[];
  date?: string;
  series?: string;
  thumbnail?: string;
  [key: string]: any;
};

export type Post = {
  slug: string;
  excerpt: string;
  data: PostData;
  content: string;
};

export type SeriesData = {
  name: string;
  description?: string;
  [key: string]: any;
};
