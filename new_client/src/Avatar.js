import React, { Component } from 'react';

class Avatar extends Component {
  render() {
    return (
        <img src={this.props.user.avatar_url} />
    );
  }
}

export default Avatar;
