import {showMessage} from './messages';
import {getLoginStatus} from '../lib/commentServices';
import {INIT_APP, AUTH_SET} from './actionTypes';

export const setAuthState = (res) => ({type: AUTH_SET, payload: res})

export default (state = {}, action) => {
  switch (action.type) {
    case INIT_APP:
      return {...state,
        user_name:         action.payload.user_name,
        repo:              action.payload.repo,
        page_id:           action.payload.page_id,
        server_url:        action.payload.server_url,
        ssl:               action.payload.ssl,
        theme:             action.payload.theme,
        comments_url:      action.payload.comments_url,
        auth_url:          action.payload.auth_url,
        create_comment_ur: action.payload.create_comment_url
      }
    case AUTH_SET:
      return {...state,
        is_login: action.payload.auth,
        login_url: action.payload.login_url
      }
    default:
      return state
  }
}

export const fetchAuth = (url) => {
  return (dispatch) => {
    dispatch(showMessage('Loading Login Status'))
    getLoginStatus(url).then(res => dispatch(setAuthState(res)))
  }
}
