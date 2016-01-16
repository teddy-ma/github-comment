var React = require('react');
var ReactDOM = require('react-dom');

var style = require('./app.scss');
var $ = require('jquery');

var auth_url = "http://localhost:5000/fake/auth";
var comment_url = "http://localhost:5000/fake/comments";
var comments_url = "http://localhost:5000/fake/comments";
var loading_img = "http://localhost:5000/images/boohee.gif";

// 用于引用的 js script tag
var script_tag = document.getElementById("github-comment");
// 读取 scrpit tag 中设定的 data 属性
var user_name = script_tag.dataset.username;
var repo = script_tag.dataset.repo;
var page_id = script_tag.dataset.pageId;
var wrapper_id = script_tag.dataset.wrapperId || 'github-comments';
var server_url = script_tag.dataset.serverUrl || "github-comment.herokuapp.com"; // 服务端的域名

var default_avatar_url = "http://github-comment.herokuapp.com/images/boohee.png";

comments_url = `http://${server_url}/comments?page_id=${page_id}&user_name=${user_name}&repo=${repo}`;
auth_url = "http://"+server_url+"/users/auth";
comment_url = "http://"+server_url+"/comments";
loading_img = "http://"+server_url+"/images/boohee.gif";

// 评论表单容器组件
var FormBox = React.createClass({
  getInitialState: function() {
    var ret = null;
    // 初始化登录状态
    $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      xhrFields: {
        withCredentials: true
      },
      url: auth_url,
      async: false
    }).done(function(data) {
      if(data.auth){
        ret = {name: data.user_name, avatar: data.avatar_url, auth: true};
      }else{
        ret = {name: "请登录", avatar: default_avatar_url, auth: false, login_url: data.login_url};
      }
    }).fail(function(xhr)  {
       ret = {name: "请登录", avatar: default_avatar_url, auth: false};
    });
    return ret;
  },
  render: function() {
    return (
      <div className={style.github_comment_form_wrapper}>
        <Avatar name={this.state.name} avatar={this.state.avatar} />
        <Form auth={this.state.auth} login_url={this.state.login_url}/>
      </div>
    );
  }
});

// 头像组件
var Avatar = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_avatar}>
        <img className={style.avatar} title={this.props.name} src={this.props.avatar} />
      </div>
    );
  }
});

// 表单组件
var Form = React.createClass({
  getInitialState: function() {
    return(
      {
        submited: false,
        body: ''
      }
    );
  },
  handleSubmit: function(e){
    var body = this.state.body;
    // 发起创建评论的请求
    $.ajax({
      type: "POST",
      contentType: 'application/x-www-form-urlencoded',
      xhrFields: {
        withCredentials: true
      },
      data: { body: body, page_id: page_id, repo: repo, user_name: user_name },
      url: comment_url
    }).done(function(data) {
      alert("re render comments list");
    }).fail(function(xhr) {
       alert('评论失败');
    });
  },
  handleChange: function(e){
    this.setState({body: e.target.value});
  },
  render: function() {
    return (
      <div className={style.github_comment_input} id="status_default">
        {
          this.props.auth ?
            <div>
              <input onChange={this.handleChange} className={style.input} type="text" name="body" id="github-comment-default-input" placeholder="TODO: "/>
              <button disabled={this.state.submited} onClick={this.handleSubmit} type="button">提交</button>
            </div>
            :
            <a className="button" target="_blank" href={this.props.login_url}>Login via GitHub</a>
        }
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_item}>
        <div className={style.github_comment_avatar}>
          <img src={this.props.avatar} title={this.props.name} className={style.avatar}/>
        </div>
        <div className={style.github_comment_content}>
          <p>{this.props.content}</p>
        </div>
      </div>
    )
  }
});

// 评论内容组件
var List = React.createClass({
  getInitialState: function() {
    return { loading: true, comments: [] }
  },
  componentDidMount: function() {
    $.get(comments_url, function(result) {
      if (this.isMounted()) {
        this.setState({
          loading: false,
          comments: result
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div className={style.github_comment_items_wrapper}>
        {
          this.state.loading ? <img src={loading_img} /> : this.state.comments.map(function(item){
            return <Comment key={item.id} content={item.body} avatar={item.user.avatar_url} name={item.user.login}/>
          })
        }
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div>
        <FormBox />
        <List />
      </div>
    )
  }
});

ReactDOM.render(
  <App />, document.getElementById("github-comments")
);
