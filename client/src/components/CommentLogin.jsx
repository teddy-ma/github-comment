import React from 'react';

export default class CommentLogin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href={this.props.url} target="_blank">login with GitHub</a>
      </div>
    )
  }
};
