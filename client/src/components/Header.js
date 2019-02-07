import React, { Component } from 'react';
import TopNotification from '../styles/TopNotification.js'

class Header extends Component {
  render() {
    const valid = this.props.init.valid;
    const error_message = this.props.init.error_message;
    if (valid){
      return (
        <TopNotification>leave your comment here</TopNotification>
      );
    }else {
      return (
        <TopNotification>error: {error_message}</TopNotification>
      );
    }
  };
}

export default Header;
