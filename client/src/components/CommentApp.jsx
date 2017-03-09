import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import CommentList from './CommentList';
import CommentAlert from './CommentAlert';
import CommentForm from './CommentForm';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

// 应用容器
export class CommentApp extends React.Component {
  render() {
    const abc = "abc"
    return (
      <ThemeProvider theme={this.props.get('meta').get('theme')}>
        <div>
          <main className="github-comment-app">
            <CommentAlert message={this.props.message.get('content')}/>
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
  return {
    meta: state.get('meta'),
    message: state.get('message'),
    comment: state.get('comment'), //.toJS()
    form: state.get('form')
  }
};


export const CommentAppContainer = connect(mapStateToProps, actionCreators)(CommentApp);
