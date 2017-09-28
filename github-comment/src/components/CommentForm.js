import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCurrentInput, saveComment} from '../reducers/comment';


class CommentForm extends Component {
  handleInputChange = (evt) => {
    const val = evt.target.value
    this.props.updateCurrentInput(val)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.saveComment(this.props.currentComment)
  }

  render() {
    console.log('Rendering Comment Form')
    const {currentComment} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={currentComment} />
      </form>
    )
  }
}

export default connect(
  (state) => ({currentComment: state.comment.currentComment}),
  {updateCurrentInput, saveComment}
)(CommentForm)
