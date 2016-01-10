var React = require('react');
var ReactDOM = require('react-dom');

var style = require('./app.scss');
var $ = require('jquery');

// 评论表单容器组件
var FormBox = React.createClass({
  getInitialState: function() {
    var ret = null;
    // 初始化登录状态
    $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:5000/fake/auth",
      async: false
    }).done(function(data) {
      if(data.auth){
        ret = {name: data.user_name, avatar: data.avatar_url};
      }else{
        ret = {name: "请登录", avatar: "http://github-comment.herokuapp.com/images/boohee.png"};
      }
    }).fail(function(xhr)  {
       ret = {name: "请登录", avatar: "http://github-comment.herokuapp.com/images/boohee.png"};
    });
    return ret;
  },
  render: function() {
    return (
      <div className={style.github_comment_form_wrapper}>
        <Avatar name={this.state.name} avatar={this.state.avatar} />
        <Form />
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
    return({submited: false});
  },
  handleClick: function(){
    $.post("http://localhost:5000/fake/comments", function(data){
      this.setState({
        submited: true
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div className={style.github_comment_input} id="status_default">
        <input className={style.input} type="text" name="body" id="github-comment-default-input" placeholder="TODO: "/>
        <button disabled={this.state.submited} onClick={this.handleClick} type="button">提交</button>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_item}>
        <div className={style.github_comment_avatar}>
          <img src="https://avatars.githubusercontent.com/u/788486?v=3" className={style.avatar}/>
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
    $.get("http://localhost:5000/fake/comments", function(result) {
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
          this.state.loading ? <img src="http://localhost:5000/images/boohee.gif" /> : this.state.comments.map(function(item){
            return <Comment key={item.id} content={item.body} />
          })
        }
      </div>
    );
  }
});

ReactDOM.render(
  <FormBox />,
    document.getElementById('github-comment-form'));
ReactDOM.render(
  <List />, document.getElementById('github-comments-container'));
