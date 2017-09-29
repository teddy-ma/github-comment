import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateCurrentInput, saveComment} from '../reducers/comment';
import Input from '../styles/Input';


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
    const {currentComment} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <Input type="text" value={this.props.currentComment} onChange={this.handleInputChange} />
        <input type="submit" value="comment" />
      </form>
    )
  }
}

export default connect(
  (state) => ({currentComment: state.comment.currentComment}),
  {updateCurrentInput, saveComment}
)(CommentForm)
