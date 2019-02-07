import React, { Component } from 'react';
import './App.css';

import Header   from './components/Header.js';
import Comments from './components/Comments.js';
import Footer   from './components/Footer.js';

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
      comments: []
    };

    this.append_comment = this.append_comment.bind(this)
  }

  fetch_auth = () => {
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

  fetch_comments = () => {
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
  }

  append_comment = (comment) => {
    this.setState({comments:[...this.state.comments, comment]});
  }

  componentDidMount() {
    this.fetch_comments();
    this.fetch_auth();
  }

  render() {
    return (
      <div>
        <Header init={this.state.init} />
        <Comments comments={this.state.comments} loading={this.state.loading} />
        <Footer login={this.state.login} url={this.state.url} config={this.props.config} append_comment={this.append_comment} />
      </div>
    );
  }
}

export default App;
