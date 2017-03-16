// 封装底层的 action 数据结构
// 对外提供一致的行为方法，类似于 CQRS 中的 command
// 整个系统能发生的行为（能接受的命令）都在这里被定义（不限于用户发起的）
// 除了最简单的把 方法 ＋ 参数 => action 以外，异步的调用逻辑也放在这里
import axios from 'axios';

// 初始化应用
export function initApp(user_name, repo, page_id, server_url, ssl, theme, login_status, comments_url, auth_url, create_comment_url){
  return {
    type: 'INIT_APP',
    user_name,
    repo,
    page_id,
    server_url,
    ssl,
    theme,
    login_status,
    comments_url,
    auth_url,
    create_comment_url
  }
}

// 发起对评论列表的请求（可能成功也可能失败）
// fetch 分为 request -> (success or failed)
export function fetchComments(comments_url) {
  return dispatch => {
    dispatch(requestComments()) // ui 显示菊花
    return fetch(comments_url)
      .then(response => response.json())
      .then(json => dispatch(fetchCommentsSuccess(json))) // 获取数据成功， ui 展示
      .catch(function(error) {
        dispatch(fetchCommentsFailure()) // 获取数据失败， ui 显示失败信息
      });
  }
}

// 发起用户是否已经登陆的请求 (boolean)
export function fetchAuth(auth_url) {
  return dispatch => {
    dispatch(requestAuth()) // 这里可以暂时不改变任何 ui
    return fetch(auth_url, {
                  method: "POST",
                  credentials: 'include'
                }).then(response => response.json())
                  .then(json => dispatch(receiveAuth(json))) // 成功或失败都有返回
  }
}

// 发起创建评论的请求
export function createComment(create_comment_url, text) {
  const data = JSON.stringify({ body: text, page_id: 1, repo: 'how-to-learn-emacs-chinese-edition', user_name: 'teddy-ma' });

  return dispatch => {
    dispatch(requestCreateComment()) // 发起创建评论的请求，暂时 ui 可以没变化
    return fetch(create_comment_url, {
                  method: "POST",
                  credentials: 'include',
                  body: data
                }).then(response => response.json())
                  .then(json => dispatch(receiveAuth(json))) // 创建成功后
  }
}

function createCommentSuccess(){

}

function createCommentFailure(){

}


// 跳转到授权页面
export function jumpToAuthPage(){
  return {
    type: "JUMP_TO_AUTH_PAGE"
  }
}


export function requestComments(){
  return {
    type: "LOAD_COMMENTS_REQUEST"
  }
}

export function requestCreateComment(){
  return {
    type: "REQUEST_CREATE_COMMENT"
  }
}

export function fetchCommentsSuccess(json){
  return {
    type:  "FETCH_COMMENTS_SUCCESS",
    comments: json
  }
}

export function fetchCommentsFailure(){
  return {
    type:  "FETCH_COMMENTS_FAILURE"
  }
}

export function requestAuth(){
  return {
    type: "USER_AUTH_REQUEST"
  }
}

export function receiveAuth(json){
  if(json.auth){
    return {
      type:  "USER_LOGINED",
      auth: true,
      user_name: json.login,
      avatar_url: json.avatar_url
    }
  } else {
    return {
      type:  "USER_UNLOGINED",
      auth: false,
      login_url: json.login_url
    }
  }
}
