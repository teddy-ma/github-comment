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
      loading: true,
      init: {
        valid: true,
        error_message: ''
      },
      url: {
        comments_url: this.props.config.comments_url,
        auth_url: this.props.config.auth_url,
        create_comment_url: this.props.config.create_comment_url
      },
      login: {
        auth: false,
        login_url: ""
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
    // this.combine_config();
    // this.load_comments();
  }

  combine_config() {
  }

  load_comments() {
    // this.props.config.comments_url,
  }

  componentDidMount() {
    fetch(this.props.config.comments_url, {
      credentials: 'include'
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            comments: result,
            loading: false
          });
        },
        (error) => {
          console.log('error loading comments');
        }
      );

    fetch( this.props.config.auth_url, {
      method: 'POST',
      credentials: 'include'
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            login: result
          });
        },
        (error) => {
          console.log('error loading auth');
        }
      );
  }

  render() {
    return (
      <div>
        <Header init={this.state.init} />
        <Comments comments={this.state.comments} loading={this.state.loading} />
        <Footer login={this.state.login} url={this.state.url} config={this.props.config} />
      </div>
    );
  }
}

export default App;
