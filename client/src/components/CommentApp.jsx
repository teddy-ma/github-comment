import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import CommentList from './CommentList';
import CommentAlert from './CommentAlert';
import CommentForm from './CommentForm';
import { ThemeProvider } from 'styled-components';
import {blue, green} from '../styles/theme';

// 应用容器
export class CommentApp extends React.Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <div>
          <main className="github-comment-app">
            <CommentAlert message={this.props.message}/>
            {
              this.props.is_loading ?
              <p>loading ...</p>
              :
              <CommentList {...this.props}/>
            }
            <CommentForm {...this.props}/>
          </main>
        </div>
      </ThemeProvider>
    )
  }
};

function mapStateToProps(state) {
  const theme = state.get('meta').get('theme') == "green" ? green : blue;
  return {
    comments: state.get('comments'),
    login: state.get('login'),
    message: state.get('message'),
    is_loading: state.get('is_loading'),
    login_status: state.get('login_status'),
    current_user: state.get('current_user'),
    theme: theme,
    auth_url: state.get('meta').get('auth_url')
  };
}

export const CommentAppContainer = connect(mapStateToProps, actionCreators)(CommentApp);
