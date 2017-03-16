// 用户交互输入框的容器
// 其中的内容根据 state 的值变化
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../../styles/Footer';
import CommentFormDetect from './CommentFormDetect';
import CommentFormUnLogined from './CommentFormUnLogined';
import CommentFormLogined from './CommentFormLogined';


export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);
  }
  // three status, detect logined unlogined
  render() {
    const login_status = this.props.form.get('login_status');
    let component = null;
    if (login_status == "detect") {
      component = <CommentFormDetect auth_url={this.props.auth_url} click_function={this.props.fetch_auth} />;
    } else if(login_status == "logined") {
      component = <CommentFormLogined submit_function={this.props.createComment} create_comment_url={this.props.create_comment_url} />;
    } else {
      component = <CommentFormUnLogined login_url={this.props.form.get('login_url')} click_function={this.props.jumpToAuthPage} />;
    }
    //TODO 分离 action 为三个部分
    return (
      <Footer>
        {component}
      </Footer>
    )
  }
};
