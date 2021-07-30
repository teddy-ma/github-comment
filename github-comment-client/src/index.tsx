import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';



 // 根据引用的参数, 初始化配置
 const script_tag = document.getElementById("github-comment"); // 用于引用的 js script tag
 const user_name = script_tag?.dataset.username;
 const repo =  script_tag?.dataset.repo;
 const page_id =  script_tag?.dataset.pageId;
 const server_url =  script_tag?.dataset.serverUrl || 'github-comment.herokuapp.com';
 const ssl =  script_tag?.dataset.ssl || false;

const config = {
  user_name: user_name,
  repo: repo,
  page_id:  page_id,
  comments_url: `${ssl ? "https" : "http"}://${server_url}/comments?page_id=${page_id}&user_name=${user_name}&repo=${repo}`,
  auth_url: `${ssl ? "https" : "http"}://${server_url}/users/auth`,
  create_comment_url: `${ssl ? "https" : "http"}://${server_url}/comments`
}



ReactDOM.render(
  <React.StrictMode>
    <App config={config} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
