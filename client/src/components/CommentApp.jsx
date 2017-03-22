import React from 'react';
import {connect} from 'react-redux';
// import * as actionCreators from '../action_creators';
import CommentList from './main/CommentList';
import CommentAlert from './header/CommentAlert';
import CommentForm from './footer/CommentForm';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';

// 应用容器
class CommentApp extends React.Component {
  render() {
    const theme = this.props.theme;
    return (
      <ThemeProvider theme={theme}>
        <div>
          <main className="github-comment-app">
            <CommentAlert />
            <CommentList />
            <CommentForm />
          </main>
        </div>
      </ThemeProvider>
    )
  }
};

function mapStateToProps(state) {
  // console.log('ddddd');
  return {
    theme: state.meta.get('theme').toJS()
  }
};

export default connect(mapStateToProps)(CommentApp);
