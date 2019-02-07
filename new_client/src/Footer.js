import React, { Component } from 'react';
import Form from './Form.js';

class Footer extends Component {
  render() {
     if (this.props.login.auth) {
       return (
           <Form create_comment_url={this.props.url.create_comment_url} config={this.props.config}/>
       );
     } else {
       return (
           <a href={this.props.login.login_url}>login via GitHub</a>
       );
     }
  }
}

export default Footer;
