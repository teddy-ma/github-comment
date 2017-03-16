import * as types from './actionTypes';
import commentsApi from '../api/CommentsApi';

export function loadComments(comments_url) {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return commentsApi.getComments(comments_url).then(comments => {
      dispatch(loadCommentsSuccess(comments));
    }).catch(error => {
      throw(error);
    });
  };
}


export function createCat(cat) {
  return function (dispatch) {
    return catApi.createCat(cat).then(responseCat => {
      dispatch(createCatSuccess(responseCat));
      return responseCat;
    }).catch(error => {
      throw(error);
    });
  };
}

export function loadCommentsSuccess(cats) {
  return {type: types.FETCH_COMMENTS_SUCCESS, cats};
}

export function createCatSuccess(cat) {
  return {type: types.CREATE_COMMENTS_SUCCESS, cat}
}
