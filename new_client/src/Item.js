import React, { Component } from 'react';
import logo from './logo.svg';
import Avatar from './Avatar';
import Content from './Content';

class Item extends Component {
  render() {
    return (
      <li>
        <Avatar user={this.props.user} />
        <Content content={this.props.content} />
      </li>
    );
  }
}

export default Item;
