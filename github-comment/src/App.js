import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import Message from './components/Message';
import CommentList from './components/CommentList';
import CommentFooter from './components/CommentFooter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Message />
        <CommentList />
        <CommentFooter />
      </div>
    );
  }
}

export default App;
