var React = require('react');
var ReactDOM = require('react-dom');

var style = require('./app.scss');

// 评论表单组件
var Form = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_form_wrapper}>
        <div className={style.github_comment_avatar}>
          <img className={style.avatar} title={this.props.name} src="http://github-comment.herokuapp.com/images/boohee.png"/>
        </div>
        <div className={style.github_comment_input} id="status_default">
          <input className={style.input} type="text" name="body" id="github-comment-default-input" placeholder="TODO: "/>
          <button type="button">提交</button>
        </div>
      </div>
    );
  }
});

// 评论内容组件
var Comment = React.createClass({
  render: function() {
    return (
      <div className={style.github_comment_items_wrapper}>
        <div className={style.github_comment_avatar}>
          <img src="https://avatars.githubusercontent.com/u/788486?v=3" className={style.avatar}/>
        </div>
        <div className={style.github_comment_content}>
          <p>{this.props.content}</p>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Form name="World"/>, document.getElementById('github-comment-form'));
ReactDOM.render(
  <Comment content="awesome!!!!"/>, document.getElementById('github-comments-container'));
