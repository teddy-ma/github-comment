import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const config = load_config();

ReactDOM.render(<App config={config} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

function load_config(){  
  // 根据引用的参数, 初始化配置
  var script_tag = document.getElementById("github-comment"); // 用于引用的 js script tag
  const user_name = script_tag.dataset.username;
  const repo =  script_tag.dataset.repo;
  const page_id =  script_tag.dataset.pageId;
  const server_url =  script_tag.dataset.serverUrl || 'github-comment.herokuapp.com';
  const ssl =  script_tag.dataset.ssl || false;
        
  return {
    wrapper_id: 'github-comments',    
    comments_url: `${ssl ? "https" : "http"}://${server_url}/comments?page_id=${page_id}&user_name=${user_name}&repo=${repo}`,
    auth_url: `${ssl ? "https" : "http"}://${server_url}/users/auth`,
    create_comment_url: `${ssl ? "https" : "http"}://${server_url}/comments`,
    login_status: "detect"
  };
}
