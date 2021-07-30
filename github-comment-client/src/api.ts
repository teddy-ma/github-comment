import { comments, auth } from './data';

export type CommentType = {
  id: number;
  user_name: string;
  body: string;
  user: {
    avatar_url: string;
  }
};

export type CreateCommentType = {

}

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

export const createComment = (data: CreateCommentType):Promise<Response> => {
  console.log("---------------------------")
  console.log(data);
  console.log("---------------------------")
  const request_body = JSON.stringify(data);
  console.log(request_body);
  console.log("---------------------------")
  return fetch('http://localhost:5000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: request_body,
    credentials: 'include'
  }).then(res => res.json())

  // .then(res => res.json())
  //   .then(
  //     (result) => {

  //     },
  //     (error) => {
  //       console.log('create comment error');
  //     }
  //   );
}


export const fetchAuth = ():Promise<AuthType> => {
  // return Promise.resolve(auth).then((auth) => auth);
  // const server_url =  script_tag.dataset.serverUrl || 'github-comment.herokuapp.com';
  return fetch("http://localhost:5000/users/auth", {
    method: 'POST',
    credentials: 'include'
  }).then(res => res.json())
};


