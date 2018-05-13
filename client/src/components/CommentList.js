import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchComments} from '../reducers/comments';
import Avatar from '../styles/Avatar';
import Item from '../styles/Item';
import Paragraph from '../styles/Paragraph';


const CommentItem = ({comment}) => (
  <Item>
    <Avatar src={comment.user.avatar_url} />
    <Paragraph>
      {comment.body}
    </Paragraph>
  </Item>
)

class CommentList extends Component {
  componentDidMount(){ // after mount, invoke fetch comments request
    const meta = this.props.meta
    const fetch_comments_url = `${meta.ssl ? "https" : "http"}://${meta.server_url}/comments?page_id=${meta.page_id}&user_name=${meta.user_name}&repo=${meta.repo}`;
    // fetch comments list
    this.props.fetchComments(fetch_comments_url)
  }
  render() {
    return (
      <div className="Comment-List">
        <ul>
          {this.props.comments.map(comment => (
            <CommentItem key={comment.id}
              comment={comment} />
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
