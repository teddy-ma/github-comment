import React, { Component } from 'react';


class Footer extends Component {
  render() {
    return (
        <p>this is footer, you are login??  {this.props.auth.login_url}</p>
    );
  }
}

export default Footer;
