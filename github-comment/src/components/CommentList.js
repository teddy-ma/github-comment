import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments, toggleComment, deleteComment} from '../reducers/todo';

const CommentItem = ({id, name, isComplete, toggleComment, deleteComment}) => (
  <li>
    <span className="delete-item">
      <button onClick={() => deleteComment(id)}>X</button>
    </span>
    <input type="checkbox"
      checked={isComplete}
      onChange={() => toggleComment(id)} />
    {name}
  </li>
)



class CommentList extends Component {
  componentDidMount(){
    const fetch_comments_url = this.props.meta.server_url
    this.props.fetchComments(fetch_comments_url)
  }
  render() {
    return (
      <div className="Comment-List">
        <ul>
          {this.props.comments.map(comment => (
            <CommentItem key={comment.id}
              {...comment}  />
          ))}
        </ul>
      </div>
    )
  }
}

export default connect(
  (state) => ({comments: state.comment.comments, meta: state.meta}),
  {fetchComments}
)(CommentList)
