// 封装底层的 action 数据结构
// 对外提供一致的行为方法，类似于 CQRS 中的 command
// 整个系统能发生的行为（能接受的命令）都在这里被定义（不限于用户发起的）
// 异步 action 目前也放在这里，应该有更好的方案 TODO

// 创建评论
export function createComment(text) {
  return {
    type: 'CREATE_COMMENT',
    text
  }
}

// 初始化应用
export function initApp(user_name, repo, page_id, server_url, ssl, theme, login_status, comments_url, auth_url){
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
    auth_url
  }
}

// 发起对评论列表的请求（可能成功也可能失败）
// fetch 分为 request -> (success or failed)
export function fetchComments(comments_url) {
  return dispatch => {
    dispatch(requestComments())
    return fetch(comments_url)
      .then(response => response.json())
      .then(json => dispatch(receiveComments(json)))
      .catch(function(error) {
        dispatch(failToReceiveComments())
      });
  }
}

// 发起用户是否已经登陆的请求 (boolean)
export function fetch_auth(auth_url) {
  return dispatch => {
    dispatch(requestAuth())
    return fetch(auth_url, {
                  method: "POST",
                  credentials: 'include'
                }).then(response => response.json())
                  .then(json => dispatch(receiveAuth(json)))
  }
}

// 跳转到授权页面
export function jumpToAuthPage(){
  return {
    type: "JUMP_TO_AUTH_PAGE"
  }
}

// private

function requestComments(){
  return {
    type: "LOAD_COMMENTS_REQUEST"
  }
}

function receiveComments(json){
  return {
    type:  "LOAD_COMMENTS_SUCCESS",
    comments: json
  }
}

function failToReceiveComments(){
  return {
    type:  "LOAD_COMMENTS_FAILED"
  }
}

function requestAuth(){
  return {
    type: "USER_AUTH_REQUEST"
  }
}

function receiveAuth(json){
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
