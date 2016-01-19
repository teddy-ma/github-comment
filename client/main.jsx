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
  handleFocus: function(){
    $(document).trigger("github:auth:check");
  },
  render: function() {
    return (
      <div className={style.github_comment_form_wrapper}>
        <Avatar name={this.props.name} avatar={this.props.avatar} />
        {
          this.props.detect_login ?
          <div>
            <input className={style.detect_lgoin_input} onFocus={this.handleFocus} />
          </div>
          :
          <Form auth={this.props.auth} login_url={this.props.login_url}/>
        }

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
      $(document).trigger("github:comment:create");
    }).fail(function(xhr) {
       alert('评论失败');
    });
  },
  handleChange: function(e){
    this.setState({body: e.target.value});
  },
  handleLogin: function(){
    $(document).trigger("github:auth:detect");
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
            <a className={style.github_login_button} target="_blank" onClick={this.handleLogin} href={this.props.login_url}>Login via GitHub</a>
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

// 评论列表组件
var List = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_items_wrapper}>
        {
          this.props.comments.map(function(item){
            return <Comment key={item.id} content={item.body} avatar={item.user.avatar_url} name={item.user.login}/>
          })
        }
      </div>
    );
  }
});

// 评论列表加载动画
var Loading = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_items_wrapper}>
        <img src={this.props.img} />
      </div>
    );
  }
});


var App = React.createClass({
  // 创始状态：加载中，评论是空, 是否登录未知
  getInitialState: function() {
    return {
      loading: true, comments: [], detect_login: true,
      auth: false, avatar: default_avatar_url
    }
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
    }).done(function(data) {
      if (this.isMounted()) {
        this.setState({
          name: data.user_name, avatar: data.avatar_url,
          auth: data.auth , login_url: data.login_url,
          detect_login: false
        });
      }
    }.bind(this)).fail(function(xhr) {
       alert('用户验证失败！');
    });
    $(document).on("github:comment:create", this.after_create_comment);
    $(document).on("github:auth:detect", this.detect_login);
    $(document).on("github:auth:check", this.check_login);
  },
  detect_login: function(){
    if (this.isMounted()) {
      this.setState({
        detect_login: true
      });
    }
  },
  check_login: function(){
    $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      xhrFields: {
        withCredentials: true
      },
      url: auth_url,
    }).done(function(data) {
      if (this.isMounted()) {
        this.setState({
          name: data.user_name, avatar: data.avatar_url,
          auth: data.auth , login_url: data.login_url,
          detect_login: false
        });
      }
    }.bind(this))
  },
  after_create_comment: function(){
    alert('receive');
    this.setState({
      loading: true
    });
  },
  render: function() {
    return (
      <div>
        <FormBox name={this.state.name} avatar={this.state.avatar}
          auth={this.state.auth} login_url={this.state.login_url}
          detect_login={this.state.detect_login}
        />
        {
          this.state.loading ? <Loading img={loading_img} /> : <List comments={this.state.comments} />
        }
      </div>
    )
  }
});

ReactDOM.render(
  <App />, document.getElementById("github-comments")
);
