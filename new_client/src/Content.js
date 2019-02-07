import React, { Component } from 'react';

class Content extends Component {
  render() {
    return (
      <p>
        {this.props.content}
      </p>
    );
  }
}

export default Content;
