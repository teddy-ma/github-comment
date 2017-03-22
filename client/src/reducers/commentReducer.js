import * as types from '../actions/actionTypes';
import {List, Map, fromJS} from 'immutable';
import initialState from './initialState';

export default function commentReducer(state=initialState.get('comment'), action) {
  switch(action.type) {
    case types.FETCH_COMMENTS:
      console.log('FETCH_COMMENTS');
      return state;
    case types.FETCH_COMMENTS_FAILURE:
      console.log('FETCH_COMMENTS_FAILURE');
      return state;
    case types.FETCH_COMMENTS_SUCCESS:
      console.log('FETCH_COMMENTS_SUCCESS');
      return renderComments(state, action.comments);
      // return state;
    default:
      return state;
  }
}

// 加载评论列表
function renderComments(state, data) {
  console.log('render comments:' + data);
  const comments = fromJS(data);
  const ret = state.set('comments', comments).set('is_loading', false);
  return ret;
}

// 创建评论
function appendComment(state, data) {
  const newComment = fromJS(data.body);
  return state.update('comments', (comments) => comments.push(newComment));
}
