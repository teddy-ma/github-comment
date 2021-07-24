import { comments, auth } from './data';

export type CommentType = {
  id: number;
  user_name: string;
  avatar_url: string;
  body: string;
};

export type AuthType = {
  auth: boolean;
  user_name: string;
  avatar_url: string;
  login_url: string;
}

export const fetchComments = () => {
  return Promise.resolve(comments).then((comments) => comments);
};

export const fetchAuth = () => {
  return Promise.resolve(auth).then((auth) => auth);
};


