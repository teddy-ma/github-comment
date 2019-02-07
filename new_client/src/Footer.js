import React, { Component } from 'react';
import Form from './Form.js';

class Footer extends Component {
  render() {
     if (this.props.login.auth) {
       return (
           <Form />
       );
     } else {
       return (
           <a href={this.props.login.login_url}>login via GitHub</a>
       );
     }
  }
}

export default Footer;
