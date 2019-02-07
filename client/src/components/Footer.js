import React, { Component } from 'react';
import Form from './Form.js';
import LeftFooter from '../styles/LeftFooter.js';

class Footer extends Component {
  render() {
     if (this.props.login.auth) {
       return (
        <LeftFooter>
          <Form create_comment_url={this.props.url.create_comment_url} config={this.props.config} append_comment={this.props.append_comment} />
        </LeftFooter>
       );
     } else {
       return (
        <LeftFooter>
           <a href={this.props.login.login_url}>login via GitHub</a>
        </LeftFooter>
       );
     }
  }
}

export default Footer;
