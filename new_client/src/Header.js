import React, { Component } from 'react';


class Header extends Component {
  render() {
    const valid = this.props.init.valid;
    const error_message = this.props.init.error_message;
    if (valid){
       return (
           <p>leave you comment here</p>
       );
    }else {
      return (
          <p>error: {error_message}</p>
      );
    }
  };
}

export default Header;
