import {List, Map, fromJS} from 'immutable';
import $ from 'jquery';
import {loadComments, authRequest, createComment} from './api'

// 初始化应用元数据
function initApp(state, user_name, repo, page_id, server_url, ssl, theme) {
  const init_state = state.mergeDeep(
    fromJS(
      {
        meta: {
          user_name: user_name,
          repo: repo,
          page_id: page_id,
          server_url: server_url,
          ssl: ssl,
          theme: theme
        }
      }
    )
  );
  return init_state;
}

// 加载评论列表
function renderComments(state = Map(), data) {
  const comments = fromJS(data);
  const ret = state.set('comments', comments);
  return ret;
}

// 创建评论
function appendComment(state, data) {
  const newComment = fromJS(data.body);
  return state.update('comments', (comments) => comments.push(newComment));
}

// TODO 修改会话状态
function freshAuth(state, data) {
  var ret = {};
  if(data.auth){ // 已登录
    ret = state.mergeDeep(
            {
              login: {auth: data.auth},
              user: {name: data.user_name, avatar: data.avatar_url}
            }
          );
  }else{ // 未登录
    ret = state.mergeDeep({login: {auth: data.auth, url: data.login_url}});
  }
  return ret;
}

// actions
// 加载评论, 创建评论, 用户鉴权
export default function(state, action) {
  if (typeof state == "undefined") {
    state = fromJS(
      {
        meta: {
          user_name: '',
          repo: '',
          page_id: '',
          server_url: '',
          ssl: false
        },
        comments: [],
        message: '留下你的评论吧。。。',
        login: {
          auth: false,
          url: ''
        },
        user: {
          name: '游客',
          avatar: ''
        },
        display: {
          login_url: false,
          submit_comment: false,
          input_control: false
        }
      }
    );
  } // init data
  switch (action.type) {
    case 'INIT_APP_FAIL':
      return state.set('message', "额，应用初始化失败~");
    case 'INIT_APP':
      return initApp(state, action.user_name, action.repo, action.page_id, action.server_url, action.ssl, action.theme);
    case 'LOAD_COMMENTS':
      var url = `${state.get('meta').get('ssl') ? "https" : "http"}://${state.get('meta').get('server_url')}/comments?page_id=${action.page_id}&user_name=${action.user_name}&repo=${action.repo}`;
      var ret = loadComments(url);
      if (ret[0]){
        return renderComments(state, ret[1])
      }else{
        return state.set('message', "糟糕，评论加载失败了~");
      }
    case 'AUTH_REQUEST':
      var url = `${state.get('meta').get('ssl') ? "https" : "http"}://${state.get('meta').get('server_url')}/users/auth`;
      var ret = authRequest(url);
      if (ret[0]){
        return freshAuth(state, ret[1]);
      }else{
        return state
      }
    case 'CREATE_COMMENT':
      var url = `${state.get('meta').get('ssl') ? "https" : "http"}://${state.get('meta').get('server_url')}/comments`;
      var data = JSON.stringify({ body: action.text, page_id: state.get('meta').get('page_id'), repo: state.get('meta').get('repo'), user_name: state.get('meta').get('user_name') });
      var ret = createComment(url, data);
      if (ret[0]){
       return appendComment(state, ret[1])
      }else {
         return state
      }
  }
  return state;
}
