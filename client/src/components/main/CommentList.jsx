import React from 'react';
import CommentItem from './CommentItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../../actions/commentActions';


class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  getItems() {
    return this.props.comments;
  }
  isLoading() {
    return this.props.is_loading;
  }
  render() {
    return (
      <section className="main">
          {
            this.isLoading() ? <p> loading ... </p> : <p></p>
          }
          {
              this.getItems().size === 0 ?
                  <p>no comments at all</p>
              :
                  <ul>
                    {this.getItems().map(item =>
                        <CommentItem key={item.get('id')}
                                     text={item.get('body')}
                                     id={item.get('id')}
                                     avatar={item.get('user').get('avatar_url')}
                                     name={item.get('user').get('login')}/>
                    )}
                  </ul>
          }

      </section>
    )
  }
};

function mapStateToProps(state) {
  return {
    comments: state.comment.get('comments') || [],
    is_loading: state.comment.get('is_loading')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
