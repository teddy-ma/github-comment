import React, { Component } from 'react';

import Item from './Item.js';
import ContentLoader from "react-content-loader";

class Comments extends Component {

  render() {
    if (this.props.loading) {
      return (
        <ContentLoader>
          <rect x="20" y="20" rx="5" ry="5" width="40" height="40" />
          <rect x="80" y="17" rx="4" ry="4" width="300" height="7" />
          <rect x="80" y="40" rx="3" ry="3" width="250" height="7" />
        </ContentLoader>
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
