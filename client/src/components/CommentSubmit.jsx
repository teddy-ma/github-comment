import React from 'react';

export default class CommentSubmit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button onClick={ this.props.click_function }>comment</button>
      </div>
    )
  }
};
