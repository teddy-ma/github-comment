import * as types from '../actions/actionTypes';
import {List, Map, fromJS} from 'immutable';
import initialState from './initialState';

export default function commentReducer(state=initialState.get('comment'), action) {
  switch(action.type) {
    case types.FETCH_COMMENTS:
      // TODO show loading icon
      return state;
    case types.FETCH_COMMENTS_FAILURE:
      // TODO show fetch failed message
      return state;
    case types.FETCH_COMMENTS_SUCCESS:
      return renderComments(state, action.comments);
    case types.CREATE_COMMENTS_SUCCESS:
      return appendComment(state, action.comment);
    default:
      return state;
  }
}

// 加载评论列表
function renderComments(state, data) {
  const comments = fromJS(data);
  const ret = state.set('comments', comments).set('is_loading', false);
  return ret;
}

// 创建评论
function appendComment(state, data) {
  const newComment = fromJS(data.body);
  return state.update('comments', (comments) => comments.push(newComment));
}
