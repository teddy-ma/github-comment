import React, { Component } from 'react';
import LeftParagraph from '../styles/LeftParagraph.js'

class Content extends Component {
  render() {
    return (
      <LeftParagraph>
        {this.props.content}
      </LeftParagraph>
    );
  }
}

export default Content;
