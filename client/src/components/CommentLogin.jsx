import React from 'react';
import LoginButton from '../styles/LoginButton';

export default class CommentLogin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LoginButton href={this.props.url} target="_blank">login with GitHub</LoginButton>
    )
  }
};
