export type Comment = {
  date: string;
  content: string;
};

export type Issue = {
  comments: Comment[];
  locked: boolean;
  state: 'open' | 'closed';
};
