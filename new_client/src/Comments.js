import React, { Component } from 'react';
import logo from './logo.svg';
import Item from './Item.js';

class Comments extends Component {
  
  render() {
    return (
      <ul>
        {this.props.comments.map(function(c, idx){
          return <Item user={c.user} content={c.content} />;
        })}  
      </ul>
    );
  };
}

export default Comments;
