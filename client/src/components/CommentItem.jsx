import React from 'react';
import styles from '../css/Main.css';

export default class CommentItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className={ styles.github_comment_item }>
        <div>
          <div className={ styles.github_comment_item_avatar }>
           <img title={this.props.name} src={this.props.avatar} width="100%" />
          </div>
          <div className={ styles.github_comment_item_content}>
            <p>{this.props.text}</p>
          </div>
        </div>
      </li>
    )
  }
};
