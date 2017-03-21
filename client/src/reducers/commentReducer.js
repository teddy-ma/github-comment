import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function commentReducer(state=initialState.get('comment'), action) {
  // state variable here reps just an array of courses
  switch(action.type) {
    case types.FETCH_COMMENTS:
      console.log('FETCH_COMMENTS');
      return state;
    case types.FETCH_COMMENTS_FAILURE:
      console.log('FETCH_COMMENTS_FAILURE');
      return state;
    case types.FETCH_COMMENTS_SUCCESS:
      console.log('FETCH_COMMENTS_SUCCESS');
      return state;
    default:
      return state;
  }
}

// 加载评论列表
function renderComments(state = Map(), data) {
  console.log('render comments:' + data);
  const comments = fromJS(data);
  return state.set('comments', comments).set('is_loading', false);
}

// 创建评论
function appendComment(state, data) {
  const newComment = fromJS(data.body);
  return state.update('comments', (comments) => comments.push(newComment));
}
