var React = require('react');
var ReactDOM = require('react-dom');

var style = require('./app.scss');
var $ = require('jquery');

// 评论表单容器组件
var FormBox = React.createClass({
  getInitialState: function() {
    return ({login: "no"});
  },
  render: function() {
    return (
      <div className={style.github_comment_form_wrapper}>
        <Avatar title={this.props.name} src={this.props.avatar} />
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
  handleClick: function(){
    $.post("http://localhost:5000/fake/comments", function(data) {
      console.log(data);
    });
  },
  handleFocus: function(){
    $.post("http://localhost:5000/fake/auth", function(data){
      if(data.auth){
        this.setState({
          name: data.login,
          avatar: data.avatar_url
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div className={style.github_comment_input} id="status_default">
        <input onFocus={this.handleFocus} className={style.input} type="text" name="body" id="github-comment-default-input" placeholder="TODO: "/>
        <button onClick={this.handleClick} type="button">提交</button>
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
    return (
      {loaded: false},
      {comments: []}
    );
  },
  componentDidMount: function() {
    $.get("http://localhost:5000/fake/comments", function(result) {
      if (this.isMounted()) {
        this.setState({
          loaded: true,
          comments: result
        });
      }
    }.bind(this));
  },
  render: function() {
    return (
      <div className={style.github_comment_items_wrapper}>
        {
          this.state.comments.map(function(item){
            return <Comment key={item.id} content={item.body} />
          })
        }
      </div>
    );
  }
});

ReactDOM.render(
  <FormBox name="zhangsan" avatar="http://github-comment.herokuapp.com/images/boohee.png" />,
    document.getElementById('github-comment-form'));
ReactDOM.render(
  <List />, document.getElementById('github-comments-container'));
