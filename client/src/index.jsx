import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';
import {compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import {CommentAppContainer} from './components/CommentApp';

// 创建 store
const store = createStore(reducer);

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

    // 初始化基础信息
    store.dispatch({ type: 'INIT_APP', user_name, repo, page_id, server_url, ssl, theme });
    // 初始化评论列表
    store.dispatch({ type: 'LOAD_COMMENTS', user_name, repo, page_id });
    // 初始化登录状态
    store.dispatch({ type: 'AUTH_REQUEST' });
}else{
    store.dispatch( {type: 'INIT_APP_FAIL'});
}


// 渲染 UI
ReactDOM.render(
  <Provider store={store}>
    <CommentAppContainer/>
  </Provider>,
  document.getElementById('github-comments')
);
