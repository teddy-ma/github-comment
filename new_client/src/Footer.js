import React, { Component } from 'react';


class Footer extends Component {
  render() {
     if (this.props.login.auth) {
       return (
           <p>you are authed</p>
       );
     } else {
       return (
           <a href={this.props.login.login_url}>login via GitHub</a>
       );
     }
  }
}

export default Footer;
