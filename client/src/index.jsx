import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/index';
import CommentApp from './components/CommentApp';

import {initApp, initAppFail} from './actions/initActions';
import {loadComments} from './actions/CommentActions';
import {fetchAuth} from './actions/authActions';
// import {fetchAuth} from './action_creators2';

const loggerMiddleware = createLogger()

// 创建 store
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  )
)

// 根据引用的参数, 初始化配置
var script_tag = document.getElementById("github-comment"); // 用于引用的 js script tag
if(script_tag) {
    // 读取 scrpit tag 中设定的 data 属性
    const user_name = script_tag.dataset.username;
    const repo = script_tag.dataset.repo;
    const page_id = script_tag.dataset.pageId;
    const server_url = script_tag.dataset.serverUrl || 'github-comment.herokuapp.com';
    const ssl = script_tag.dataset.ssl || false;
    const wrapper_id = 'github-comments';
    const theme = script_tag.dataset.theme;

    const comments_url = `${ssl ? "https" : "http"}://${server_url}/comments?page_id=${page_id}&user_name=${user_name}&repo=${repo}`;
    const auth_url = `${ssl ? "https" : "http"}://${server_url}/users/auth`;
    const create_comment_url = `${ssl ? "https" : "http"}://${server_url}/comments`;

    const login_status = "detect";

    // 初始化基础信息
    store.dispatch(initApp(user_name, repo, page_id, server_url, ssl, theme, login_status, comments_url, auth_url, create_comment_url));
    // 开始请求评论列表
    store.dispatch(loadComments(comments_url));
    // 开始请求登录状态结果
    store.dispatch(fetchAuth(auth_url));
}else{
    store.dispatch(initAppFail());
}

ReactDOM.render(
  <Provider store={store}>
    <CommentApp/>
  </Provider>,
  document.getElementById('github-comments')
);
