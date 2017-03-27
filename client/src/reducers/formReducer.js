import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function formReducer(state=initialState.get('form'), action) {
  switch(action.type) {
    case types.FETCH_AUTH:
      return state;
    case types.JUMP_TO_AUTH_PAGE:
      return state;
    case types.USER_LOGINED:
      return userLogined(state, action.user_name, action.avatar_url);
    case types.USER_UNLOGINED:
      return userUnLogined(state, action.login_url);
    default:
      return state;
  }
}

// 登陆状态改变
function userLogined(state, user_name, avatar_url) {
  const ret = state.mergeDeep(
                {
                  login: {auth: true},
                  user: {name: user_name, avatar:avatar_url},
                  login_status: 'logined'
                }
              );
  return ret;
}

function userUnLogined(state, login_url){
  const ret = state.mergeDeep(
                {
                  login: {auth: false, url: login_url},
                  login_status: 'unlogined'
                }
              );
  return ret;
}
