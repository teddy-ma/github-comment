import React, { Component } from 'react';
import CircleImage from '../styles/CircleImage';

class Avatar extends Component {
  render() {
    return (
        <CircleImage src={this.props.user.avatar_url} />
    );
  }
}

export default Avatar;
