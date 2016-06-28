var React = require('react');
var ReactDOM = require('react-dom');

var style = require('./app.scss');
var $ = require('jquery');

// 用于引用的 js script tag
var script_tag = document.getElementById("github-comment");
// 读取 scrpit tag 中设定的 data 属性
var user_name  = script_tag.dataset.username;
var repo       = script_tag.dataset.repo;
var page_id    = script_tag.dataset.pageId;
var wrapper_id = script_tag.dataset.wrapperId || 'github-comments';
var server_url = script_tag.dataset.serverUrl || "github-comment.songofcode.com"; // 服务端的域名

// TODO use cdn for img and js
var default_avatar_url = `https://${server_url}/images/boohee.png`;
var comments_url       = `https://${server_url}/comments?page_id=${page_id}&user_name=${user_name}&repo=${repo}`;
var auth_url           = `https://${server_url}/users/auth`;
var comment_url        = `https://${server_url}/comments`;
var loading_img        = `https://${server_url}/images/boohee.gif`;

// 评论表单容器组件
var FormBox = React.createClass({
  handleFocus: function(){
    $(document).trigger("github:auth:check");
  },
  render: function() {
    return (
      <div className={style.github_comment_form_wrapper}>
        {
          this.props.detect_login ?
          <div className={style.detect_input}>
            <img className={style.current_avatar} src="https://github-comment.songofcode.com/images/boohee.png" />
            <input type="text" className={style.detect_input_control} onFocus={this.handleFocus} />
          </div>
          :
          <Form auth={this.props.auth} avatar={this.props.avatar} login_url={this.props.login_url}/>
        }
      </div>
    );
  }
});

// 表单组件
var Form = React.createClass({
  getInitialState: function() {
    return({
      submited: false,
      body: ''
    });
  },
  handleSubmit: function(e){
    var body = this.state.body;
    this.setState({submited: true});
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
      <div className={style.github_comment_input}>
        {
          this.props.auth ?
            <div className={style.ready_input}>
              <img className={style.current_avatar} src={this.props.avatar} />
              <input onChange={this.handleChange} name="body" placeholder="TODO: " type="text" className={style.ready_input_control} />
              <button type="button" disabled={this.state.submited} onClick={this.handleSubmit} className={style.submit_comment}>Comment</button>
            </div>
            :
            <div className={style.login_input}>
              <a href={this.props.login_url} className={style.login_via_github} target="_blank" onClick={this.handleLogin} href={this.props.login_url}>Login via github</a>
            </div>
        }
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_item}>
        <div className={style.avatar}>
          <img className={style.comment_avatar} src={this.props.avatar} title={this.props.name} />
        </div>
        <div className={style.comment_content}>
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
      <div className={style.github_comment_items}>
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
      <div className={style.github_comment_loading}>
        <img className={style.github_comment_loading} src={this.props.img} />
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
    this.setState({
      loading: true
    });
    $.get(comments_url, function(result) {
      if (this.isMounted()) {
        this.setState({
          comments: result,
          loading: false
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <FormBox name={this.state.name} avatar={this.state.avatar}
          auth={this.state.auth} login_url={this.state.login_url}
          avatar={this.state.avatar} detect_login={this.state.detect_login} />
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
