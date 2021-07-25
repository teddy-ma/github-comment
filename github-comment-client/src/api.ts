import { comments, auth } from './data';

export type CommentType = {
  id: number;
  user_name: string;
  body: string;
  user: {
    avatar_url: string;
  }
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

export const fetchAuth = ():Promise<AuthType> => {
  // return Promise.resolve(auth).then((auth) => auth);
  // const server_url =  script_tag.dataset.serverUrl || 'github-comment.herokuapp.com';
  return fetch("http://localhost:5000/users/auth", {
    method: 'POST',
    credentials: 'include'
  }).then(res => res.json())
};


