import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import CommentList from './CommentList';
import CommentAlert from './CommentAlert';
import CommentInput from './CommentInput';

// 应用容器
export class CommentApp extends React.Component {
  render() {
    return (
      <div>
        <main className="github-comment-app">
          <CommentAlert message={this.props.message}/>
          <CommentList {...this.props}/>
          <CommentInput {...this.props}/>
        </main>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    comments: state.get('comments'),
    login: state.get('login'),
    message: state.get('message'),
    current_user: state.get('current_user')
  };
}

export const CommentAppContainer = connect(mapStateToProps, actionCreators)(CommentApp);
