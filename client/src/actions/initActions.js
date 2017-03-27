import * as types from './actionTypes';

// 初始化应用
export function initApp(user_name, repo, page_id, server_url, ssl, theme, login_status, comments_url, auth_url, create_comment_url){
  return {
    type: types.INIT_APP,
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

export function initAppFail(){
  return {
    type: types.INIT_APP_FAIL
  }
}
