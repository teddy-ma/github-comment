import {getComments, createComment} from '../lib/commentServices';
import {showMessage} from './messages';

const initState = {
  comments: [],
  is_loading: true
}

export const COMMENT_ADD = 'COMMENT_ADD'
export const COMMENTS_LOAD = 'COMMENTS_LOAD'
export const CURRENT_INPUT = 'COMMENTS_INPUT'

// sync
export const updateCurrentInput = (val) => ({type: CURRENT_INPUT, payload: val})
export const loadComments = (comments) => ({type: COMMENTS_LOAD, payload: comments})
export const addComment = (comment) => ({type: COMMENT_ADD, payload: comment})

// async
export const fetchComments = (url) => {
  return (dispatch) => {
    dispatch(showMessage('Loading Comments'))
    getComments(url).then(comments => dispatch(loadComments(comments)))
  }
}
export const saveComment = (name) => {
  return (dispatch) => {
    dispatch(showMessage('Saving Comment'))
    createComment(name).then(res => dispatch(addComment(res)))
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case COMMENT_ADD:
      return {...state, currentComment: '', comments: state.comments.concat(action.payload)}
    case COMMENTS_LOAD:
      return {...state, comments: action.payload}
    default:
      return state
  }
}
