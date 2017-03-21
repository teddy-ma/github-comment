import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function formReducer(state=initialState.get('form'), action) {
  // state variable here reps just an array of courses
  switch(action.type) {
    case types.FETCH_AUTH:
      console.log("fetch auth");
      return state;
    case types.JUMP_TO_AUTH_PAGE:
      console.log('JUMP_TO_AUTH_PAGE')
      return state;
    case types.USER_LOGINED:
      console.log('user lgoined');
      return userLogined(state, action.user_name, action.avatar_url);
      // return state;
    case types.USER_UNLOGINED:
      console.log('user unlogined');
      return userUnLogined(state, action.login_url);
      // return state;
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
