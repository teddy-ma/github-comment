import React from 'react';
import Avatar from '../styles/Avatar';
import Item from '../styles/Item';
import Paragraph from '../styles/Paragraph';

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Item>
        <div>
           <Avatar title={this.props.name} src={this.props.avatar}>
           </Avatar>

            <Paragraph>{this.props.text}</Paragraph>

        </div>
      </Item>
    )
  }
};
