import React, { Component } from 'react';
import logo from './logo.svg';
import Item from './Item.js';

class Comments extends Component {

  render() {
    return (
      <ul>
        {this.props.comments.map(function(c, idx){
          return <Item key={c.id} user={c.user} content={c.body} />;
        })}
      </ul>
    );
  };
}

export default Comments;
