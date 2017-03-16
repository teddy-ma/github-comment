import React from 'react';
import {connect} from 'react-redux';
// import * as actionCreators from '../action_creators';
import CommentList from './main/CommentList';
import CommentAlert from './header/CommentAlert';
import CommentForm from './footer/CommentForm';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

// 应用容器
export default class CommentApp extends React.Component {
  render() {
    // const theme = this.props.meta.get('theme').toJS();
    return (
      // <ThemeProvider theme={theme}>
        <div>
          <main className="github-comment-app">
            <CommentAlert />
            // <CommentList />
            // <CommentForm />
          </main>
        </div>
      // </ThemeProvider>
    )
  }
};
//
// function mapStateToProps(state) {
//   return {
//     meta: state.get('meta'),
//     message: state.get('message'),
//     comment: state.get('comment'), //.toJS()
//     form: state.get('form')
//   }
// };
//
// export const CommentAppContainer = connect(mapStateToProps, actionCreators)(CommentApp);
