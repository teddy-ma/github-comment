import {getComments, createComment} from '../lib/commentServices';
import {showMessage} from './messages';
import {COMMENT_ADD, COMMENTS_LOAD, CURRENT_INPUT} from './actionTypes';


const initState = {
  comments: [],
  is_loading: true,
  currentComment: ''
}

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
export const saveComment = (text) => {
  return (dispatch, getState) => {
    dispatch(showMessage('Saving Comment'))
    const meta = getState().meta
    const create_comments_url = `${meta.ssl ? "https" : "http"}://${meta.server_url}/comments`
    const fetch_comments_url  = `${meta.ssl ? "https" : "http"}://${meta.server_url}/comments?page_id=${meta.page_id}&user_name=${meta.user_name}&repo=${meta.repo}`;

    createComment(create_comments_url, text, meta.user_name, meta.repo, meta.page_id)
      .then(comment_res => dispatch(addComment(comment_res.body)))
  }
}

export default (state = initState, action) => {
  switch (action.type) {
    case COMMENT_ADD:
      return {...state, currentComment: '', comments: state.comments.concat(action.payload)}
    case COMMENTS_LOAD:
      return {...state, comments: action.payload}
    case CURRENT_INPUT:
      return {...state, currentComment: action.payload}
    default:
      return state
  }
}
