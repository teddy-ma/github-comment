SERVER_URL = "github-comment.songofcode.com"; // 服务端的域名
CONTAINER_DIV = "github-comments-container";
FORM_DIV = "github-comment-form";

// 加载客户端的 github 的 username 和 repo 的配置
function load_github_comment_config(){
  // 用于引用的 js script tag
  var script_tag = document.getElementById("github-comment");
  // 读取 scrpit tag 中设定的 data 属性
  user_name = script_tag.dataset.username;
  repo = script_tag.dataset.repo;
  page_id = script_tag.dataset.pageId;
  // wrapper_id = script_tag.dataset.wrapperId || 'github-comments';
  server_url = script_tag.dataset.serverUrl || 'github-comment.herokuapp.com';
  wrapper_id = 'github-comments';
}

// 加载已有的评论框
function load_comments(){
  var xhr = new XMLHttpRequest();
  var url = "http://" + server_url + "/comments?page_id=" + page_id + "&user_name=" + user_name + "&repo=" + repo;
  xhr.open('GET', encodeURI(url));
  xhr.onload = function() {
    if (xhr.status === 200) {
      comments = JSON.parse(xhr.responseText);
      render_comments(comments);
    } else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

// 创建用于评论的评论框( iframe 内)
function create_comment_form(){
  render_default_form();
}

function create_comment(content){
  var params = "body="+content+"&page_id="+page_id+"&repo="+repo+"&user_name="+user_name;
  var xhr = new XMLHttpRequest();
  var url = "http://" + server_url + "/comments";
  xhr.withCredentials = true;
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log(xhr.responseText);
      load_comments();
      document.getElementById('github-comment-body').value = '';
    }
    else {
      console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send(params);
}

function load_css_and_basic_html(){
  var link = document.createElement( "link" );
  link.href = "http://" + server_url + "/stylesheets/style.css";
  link.type = "text/css";link.rel = "stylesheet";link.media = "screen,print";
  document.getElementsByTagName( "head" )[0].appendChild( link );

  var wrapper = document.getElementById(wrapper_id);
  var container = document.createElement('div');
  container.setAttribute('id', CONTAINER_DIV);
  var form = document.createElement('div');
  form.setAttribute('id', FORM_DIV);
  wrapper.appendChild(container);
  wrapper.appendChild(form);
}

// 入口
(function(){
  load_github_comment_config();
  load_css_and_basic_html();
  load_comments();
  create_comment_form();
})();


// template render

// 默认的表单样式, 还不确定是否有用户会话
function render_default_form(){
  if(document.getElementById('status_default')){ return; }
  var html = '<div class="row"><div class="one column">'+
               '<img title="" class="avatar" src="http://'+server_url+'/images/boohee.png">'+
             '</div>';
  html += '<div class="eleven columns status_div" id="status_default">'+
            '<input type="text" name="body" class="u-full-width" id="github-comment-default-input" placeholder="TODO: " />'+
          '</div></div>';
  wrapper_div = document.getElementById(FORM_DIV);
  wrapper_div.innerHTML = html;
  document.getElementById('github-comment-default-input').onfocus = function(){
    var xhr = new XMLHttpRequest();
    var url = "http://" + server_url + "/users/auth";
    xhr.withCredentials = true;
    xhr.open('POST', encodeURI(url));
    xhr.onload = function() {
      if (xhr.status === 200) {
        auth_info = JSON.parse(xhr.responseText);
        if(auth_info.auth){
          var user_name = auth_info.user_name;
          var avatar_url = auth_info.avatar_url;
          render_logined_form(avatar_url, user_name);
        }else{
          render_to_login_form(auth_info.login_url);
        }
      } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
  };
}

function render_logined_form(avatar_url, user_name){
  if(document.getElementById('status_logined')){ return; }
  var html = '<div class="row"><div class="one column">'+
               '<img title="'+user_name+'" class="avatar" src="'+avatar_url+'">'+
             '</div>';
  html += '<div class="eleven columns status_div" id="status_logined">';
  html += '<input type="text" id="github-comment-body" class="u-full-width" style="width: 65%; display: inline-block; float: left;" placeholder="TODO: " />'+
          '<button type="button" id="github-comment-submit" class="button-primary" style="display: inline-block; float: left;">提交</button>';
  html += '</div></div>';
  wrapper_div = document.getElementById(FORM_DIV);
  wrapper_div.innerHTML = html;
  document.getElementById('github-comment-submit').addEventListener('click', function() {
    var content = document.getElementById('github-comment-body').value;
    console.log(content);
    create_comment(content);
  }, false);
}

function render_to_login_form(login_url){
  if(document.getElementById('status_login')){ return; }
  var html = '<div class="row"><div class="one column">'+
               '<img title="" class="avatar" src="http://'+server_url+'/images/boohee.png">'+
             '</div>';
  html += '<div class="eleven columns status_div" id="status_login">'+
    '<button id="github-comment-login" type="button" class="u-full-width button-primary">github 登录</button>'+
    '</div></div>';
  wrapper_div = document.getElementById(FORM_DIV);
  wrapper_div.innerHTML = html;
  document.getElementById('github-comment-login').addEventListener('click', function() {
    window.open(login_url);
    render_default_form();
  }, false);
}

// 渲染出已有的评论
function render_comments(comments){
  var html = '';
  for(var o in comments){
    comment_obj = comments[o];
    html += '<div class="row"><div class="one column"><image class="avatar" src="'+comment_obj.user.avatar_url+'"/></div>';
    html += '<div class="eleven columns"><p class="comment-text">'+comment_obj.body+'</p><div class="bottom-comment"><div class="comment-date"></div>';
    html += '</div></div></div>';
  }
  document.getElementById(CONTAINER_DIV).innerHTML = html;
}
