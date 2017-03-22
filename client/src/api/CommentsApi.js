// 负责调用 github comment 的服务端 API
import fetch from 'isomorphic-fetch';

class CommentsApi {
  static getComments(comments_url) {
    return fetch(comments_url).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static createComment(create_comments_url, text, user_name, repo, page_id) {
    const data = JSON.stringify({ body: text, page_id: page_id, repo: repo, user_name: user_name });
    const request = new Request(create_comments_url, {
      method: "POST",
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: data
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error; //TODO dispatch
    });
  }

}

export default CommentsApi;
