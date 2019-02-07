import React, { Component } from 'react';

import Item from './Item.js';

class Comments extends Component {

  render() {
    if (this.props.loading) {
      return (
        <p>loading ....</p>
      );
    } else {
      return (
        <ul>
          {this.props.comments.map(function(c, idx){
            return <Item key={c.id} user={c.user} content={c.body} />;
          })}
        </ul>
      );
    };
  };
};

export default Comments;
