// 用户交互输入框的容器
// 其中的内容根据 state 的值变化
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Footer from '../../styles/Footer';
import CommentFormDetect from './CommentFormDetect';
import CommentFormUnLogined from './CommentFormUnLogined';
import CommentFormLogined from './CommentFormLogined';
import * as commentActions from '../../actions/commentActions';
import * as authActions from '../../actions/authActions';



class CommentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const login_status = this.props.form.get('login_status');
    let component = null;
    if (login_status == "detect") {
      component = <CommentFormDetect auth_url={this.props.auth_url} click_function={this.props.authAction.fetch_auth} />;
    } else if(login_status == "logined") {
      component = <CommentFormLogined
                    submit_function={this.props.commentAction.createComment}
                    create_comment_url={this.props.meta.get('create_comment_url')}
                    user_name={this.props.meta.get('user_name')}
                    repo={this.props.meta.get('repo')}
                    page_id={this.props.meta.get('page_id')}
                  />;
    } else if(login_status == "unlogined"){
      component = <CommentFormUnLogined login_url={this.props.form.get('login').get('url')} click_function={this.props.authAction.jumpToAuthPage} />;
    } else {
      <p>...</p>
    }

    return (
      <Footer>
        {component}
      </Footer>
    )
  }
};

function mapStateToProps(state) {
  return {
    form: state.form,
    meta: state.meta
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentAction: bindActionCreators(commentActions, dispatch),
    authAction: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
