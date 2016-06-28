import React from 'react';
import CommentItem from './CommentItem';
import styles from '../css/Main.css';

export default class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  getItems() {
    return this.props.comments;
  }
  render() {
    return (
      <section className="main">
        <ul className={ styles.github_comment_list }>
          {this.getItems().map(item =>
            <CommentItem key={item.get('id')}
                      text={item.get('body')}
                      id={item.get('id')}
                      avatar={item.get('user').get('avatar_url')}
                      name={item.get('user').get('login')} />
          )}
        </ul>
      </section>
    )
  }
};
