import * as types from './actionTypes';

// 初始化应用
export function fetchAuth(auth_url){
  return dispatch => {
    // dispatch(requestAuth()) // 这里可以暂时不改变任何 ui
    return fetch(auth_url, {
                  method: "POST",
                  credentials: 'include'
                }).then(response => response.json())
                  .then(json => dispatch(receiveAuth(json))) // 成功或失败都有返回
  }
}

export function receiveAuth(json){
  if(json.auth){
    return {
      type: types.USER_LOGINED,
      auth: true,
      user_name: json.login,
      avatar_url: json.avatar_url
    }
  } else {
    return {
      type: types.USER_UNLOGINED,
      auth: false,
      login_url: json.login_url
    }
  }
}

export function jumpToAuthPage(){
  return {
    type: types.JUMP_TO_AUTH_PAGE
  }
}
