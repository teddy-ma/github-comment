// 评论系统顶部的用于显示消息的组件
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as initActions from '../../actions/initActions';

class CommentAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <p>{this.props.message}</p>
      </header>
    )
  }
};

function mapStateToProps(state) {
  return {
    message: state.message.get('content')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(initActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAlert);
