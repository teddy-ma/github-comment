import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './Header.js';
import Comments from './Comments.js';
import Footer from './Footer.js';

class App extends Component {  

  constructor(props) {
    super(props);
    
    this.state = {
      init: {
        valid: true,
        error_message: '',
        loading: true,
      },
      url: {
        comments_url: this.props.config.comments_url,
        create_comment_url: this.props.config.create_comment_url,
        auth_url: this.props.config.auth_url
      },
      auth: {
        login: false,
        login_url: "http://www.baidu.com"
      },
      comments: [
        // {
        //   user: {avatar_url: "https://via.placeholder.com/150"},
        //   content: "hello world"
        // },
        // {
        //   user: {avatar_url: "https://via.placeholder.com/150"},
        //   content: "foo bar"
        // }
      ]
    };
    this.combine_config();
    this.load_comments();
  }

  combine_config() {
    
  }

  load_comments() {
    this.props.config.comments_url,
  }
  
  render() {
    return (
      <div>
        <h1>{this.props.config.foo}</h1>
        <Header init={this.state.init} />
        <Comments comments={this.state.comments} />
        <Footer auth={this.state.auth} url={this.state.url}/>
      </div>      
    );
  }
}

export default App;
