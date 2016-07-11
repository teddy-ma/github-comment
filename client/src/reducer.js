import {List, Map, fromJS} from 'immutable';
import $ from 'jquery';

// 初始化应用元数据
function initApp(state, user_name, repo, page_id, server_url, ssl) {
  return state.mergeDeep(
    fromJS({meta: {user_name: user_name, repo: repo, page_id: page_id, server_url: server_url, ssl: ssl}})
  );
}

// 加载评论列表
function loadComments(state = Map(), data) {
  const comments = fromJS({"comments": data});
  const z = state.set('comments', comments.get('comments'));
  return z;
}

// 创建评论
function createComment(state, data) {
  const newComment = fromJS(data.body);
  const z = state.update('comments', (comments) => comments.push(newComment));
  return z;
}

// TODO 修改会话状态
function authRequest(state, data) {
  var ret = {};
  if(data.auth){ // 已登录
    ret = state.mergeDeep({login: {auth: data.auth},
            user: {name: data.user_name, avatar: data.avatar_url}});
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
  }
  switch (action.type) {
    case 'INIT_APP':
      return initApp(state, action.user_name, action.repo, action.page_id, action.server_url, action.ssl);
    case 'LOAD_COMMENTS':
      var ret = {};
      $.ajax({
         type: "GET",
         dataType: "json",
         async: false,
         contentType: "application/json; charset=utf-8",
         xhrFields: {
           withCredentials: true
         },
         url: `${state.get('meta').get('ssl') ? "https" : "http"}://${state.get('meta').get('server_url')}/comments?page_id=${action.page_id}&user_name=${action.user_name}&repo=${action.repo}`,
       }).done(function(data) {
         ret = loadComments(state, data);
       }.bind(this)).fail(function(xhr) {
         ret = state.set('message', "糟糕，评论加载失败了~");
       });
       return ret;
    case 'AUTH_REQUEST':
      var ret = {};
      $.ajax({
        type: "POST",
        async: false,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        xhrFields: {
          withCredentials: true
        },
        url: `${state.get('meta').get('ssl') ? "https" : "http"}://${state.get('meta').get('server_url')}/users/auth`,
      }).done(function(data) {
        ret = authRequest(state, data);
      }.bind(this)).fail(function(xhr) {
        ret = state;
      });
      return ret;
    case 'CREATE_COMMENT':
      var ret = {}
      $.ajax({
         type: "POST",
         async: false,
         dataType: "json",
         processData: false,
         contentType: "application/json; charset=utf-8",
         xhrFields: {
           withCredentials: true
         },
         data: JSON.stringify({ body: action.text, page_id: state.get('meta').get('page_id'), repo: state.get('meta').get('repo'), user_name: state.get('meta').get('user_name') }),
         url: `${state.get('meta').get('ssl') ? "https" : "http"}://${state.get('meta').get('server_url')}/comments`,
      }).done(function(data) {
        ret = createComment(state, data);
      }.bind(this)).fail(function(xhr) {
        ret = state;
      });
      return ret;
  }
  return state;
}
