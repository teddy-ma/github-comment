import { data } from './data';

export type CommentType = {
  id: number;
  user_name: string;
  avatar_url: string;
  body: string;
};

export const fetchComments = (n: number) => {
  return Promise.resolve(data).then((comments) => comments.slice(0, n));
};

