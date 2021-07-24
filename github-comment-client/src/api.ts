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

export const fetchComments = (): Promise<CommentType[]> =>{
  // return Promise.resolve(comments).then((comments) => comments);
  return fetch("http://localhost:5000/comments?user_name=teddy-ma&repo=github-comment&page_id=v3", {
    credentials: 'include'
  }).then(res => res.json())
};

export const fetchAuth = () => {
  return Promise.resolve(auth).then((auth) => auth);
};


