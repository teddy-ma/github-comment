import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments} from '../reducers/comment';

const CommentItem = ({comment}) => (
  <li>
    <div className="user_avator">
      <img src={comment.user.avatar_url} />
    </div>
    <p className="comment_content">
      {comment.body}
    </p>
  </li>
)

class CommentList extends Component {
  componentDidMount(){
    const meta = this.props.meta
    const fetch_comments_url = `${meta.ssl ? "https" : "http"}://${meta.server_url}/comments?page_id=${meta.page_id}&user_name=${meta.user_name}&repo=${meta.repo}`;
    this.props.fetchComments(fetch_comments_url)
  }
  render() {
    return (
      <div className="Comment-List">
        <ul>
          {this.props.comments.map(comment => (
            <CommentItem key={comment.id}
              comment={comment}  />
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
