import React, { Component } from 'react';
import Avatar from './Avatar.js';
import Content from './Content.js';
import InlineItem from '../styles/InlineItem.js';

class Item extends Component {
  render() {
    return (
      <InlineItem>
        <Avatar user={this.props.user} />
        <Content content={this.props.content} />
      </InlineItem>
    );
  }
}

export default Item;
