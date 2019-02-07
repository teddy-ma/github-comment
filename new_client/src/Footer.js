import React, { Component } from 'react';


class Footer extends Component {
  render() {
     if (this.props.login.auth) {
       return (
        <p>you are authed</p>
       );
     } else {
      return (
        <p>you need login {this.props.login.login_url}</p>
      );
     }
  }
}

export default Footer;
