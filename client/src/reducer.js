// 如果说 action_creators, 那么 reducer 就是是 event
// 用于对已经发生的 command 采取对应的响应（更改 state 的状态，ui 渲染是 React 自动处理的）

import {List, Map, fromJS} from 'immutable';

// 初始化应用元数据
function initApp(state, user_name, repo, page_id, server_url, ssl, theme, comments_url, auth_url, create_comment_url) {
  const init_state = state.mergeDeep(
    fromJS(
      {
        meta: {
          user_name: user_name,
          repo: repo,
          page_id: page_id,
          server_url: server_url,
          ssl: ssl,
          theme: theme,
          comments_url: comments_url,
          auth_url: auth_url,
          create_comment_url: create_comment_url
        },
        is_loading: false,
        login_status: 'detect'
      }
    )
  );
  return init_state;
}

// 加载评论列表
function renderComments(state = Map(), data) {
  const comments = fromJS(data);
  return state.set('comments', comments).set('is_loading', false);
}

// 创建评论
function appendComment(state, data) {
  const newComment = fromJS(data.body);
  return state.update('comments', (comments) => comments.push(newComment));
}

// 登陆状态改变
function freshAuth(state, data) {
  var ret = {};
  if(data.auth){ // 已登录
    ret = state.mergeDeep(
            {
              login: {auth: data.auth},
              user: {name: data.user_name, avatar: data.avatar_url},
              login_status: 'logined'
            }
          );
  }else{ // 未登录
    ret = state.mergeDeep(
            {
              login: {auth: data.auth, url: data.login_url},
              login_status: 'unlogined'
            }
          );
  }
  return ret;
}

// 对 action 发起响应
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
        is_loading: false,
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
      return initApp(state, action.user_name, action.repo, action.page_id, action.server_url, action.ssl, action.theme, action.comments_url, action.auth_url, action.create_comment_url);

    case 'FETCH_COMMENTS':
      return state.set('is_loading', true);

    case 'FETCH_COMMENTS_SUCCESS':
      return renderComments(state, action.comments);

    case 'FETCH_COMMENTS_FAILURE':
      return state.set('message', "糟糕，评论加载失败了~");

    case 'USER_AUTH_REQUEST':
      return state.set('login_status', 'detect');

    case 'USER_LOGINED':
      return freshAuth(state, action);

    case 'USER_UNLOGINED':
      return freshAuth(state, action);

    case 'JUMP_TO_AUTH_PAGE':
      return state.set('login_status', 'detect');

    case 'CREATE_COMMENT_REQUEST':
      var data = JSON.stringify({ body: action.text, page_id: state.get('meta').get('page_id'), repo: state.get('meta').get('repo'), user_name: state.get('meta').get('user_name') });
      return state

    case 'CREATE_COMMENT_SUCCESS':
      return appendComment(state, action.comment)
  }
  return state;
}
