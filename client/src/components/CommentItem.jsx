import React from 'react';
import Avatar from './CommentAvatar';

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li>
        <div>
          <div>
           <Avatar>
             <img title={this.props.name} src={this.props.avatar} width="100%" />
           </Avatar>
          </div>
          <div>
            <p>{this.props.text}</p>
          </div>
        </div>
      </li>
    )
  }
};
