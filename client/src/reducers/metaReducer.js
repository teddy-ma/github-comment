// 如果说 action_creators, 那么 reducer 就是是 event
// 用于对已经发生的 command 采取对应的响应（更改 state 的状态，ui 渲染是 React 自动处理的）

import {List, Map, fromJS} from 'immutable';
import {blue, green} from '../styles/theme';
import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function metaReducer(state=initialState.get('meta'), action) {
  console.log(initialState);
  switch (action.type) {
    case types.INIT_APP_FAIL:
      return state.set('message', "额，应用初始化失败~");

    case types.INIT_APP:
      return initApp(state, action.user_name, action.repo, action.page_id, action.server_url, action.ssl, action.theme, action.comments_url, action.auth_url, action.create_comment_url);

  }
  return state;
}

function initApp(state, user_name, repo, page_id, server_url, ssl, theme, comments_url, auth_url, create_comment_url) {
  const theme_obj = (theme == "green" ? green : blue);
  const init_state = state.mergeDeep(
    fromJS(
            {
              user_name: user_name,
              repo: repo,
              page_id: page_id,
              server_url: server_url,
              ssl: ssl,
              theme: theme_obj,
              auth_url: auth_url,
              create_comment_url: create_comment_url
            }
          )
  );
  return init_state;
}

// 初始化应用数据
// 按照模块将数据进行划分
// function initApp(state, user_name, repo, page_id, server_url, ssl, theme, comments_url, auth_url, create_comment_url) {
//   const theme_obj = (theme == "green" ? green : blue);
//   const init_state = state.mergeDeep(
//     fromJS(
//       {
//         meta: {
//           user_name: user_name,
//           repo: repo,
//           page_id: page_id,
//           server_url: server_url,
//           ssl: ssl,
//           theme: theme_obj
//         },
//         message: {
//           content: ''
//         },
//         comment: {
//           create_params: {
//             repo: repo,
//             page_id: page_id,
//             user_name: user_name
//           },
//           create_comment_url: create_comment_url,
//           fetch_comments_url: comments_url,
//           comments: [],
//           is_loading: false
//         },
//         form: {
//           login_status: 'detect',
//           auth_url: auth_url,
//           login_url: ''
//         }
//       }
//     )
//   );
//   return init_state;
// }
