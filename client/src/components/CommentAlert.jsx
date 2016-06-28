// 评论系统顶部的用于显示消息的组件
import React from 'react';
import styles from '../css/Main.css';

export default class CommentAlert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <p>{this.props.message}</p>
      </header>
    )
  }
};
