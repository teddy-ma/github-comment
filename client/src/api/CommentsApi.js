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

  static createComment(create_comments_url, text) {
    const request = new Request(create_comments_url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({text: text})
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default CommentsApi;
