import * as types from './actionTypes';
import commentsApi from '../api/CommentsApi';

export function loadComments(comments_url) {
  return function(dispatch) {
    return commentsApi.getComments(comments_url).then(comments => {
      dispatch(loadCommentsSuccess(comments));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createComment(create_comment_url, text, user_name, repo, page_id) {
  return function (dispatch) {
    return commentsApi.createComment(create_comment_url, text, user_name, repo, page_id).then(responseComment => {
      dispatch(createCommentSuccess(responseComment));
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadCommentsSuccess(comments) {
  return {type: types.FETCH_COMMENTS_SUCCESS, comments};
}

export function createCommentSuccess(comment) {
  return {type: types.CREATE_COMMENTS_SUCCESS, comment}
}
