import {INIT_APP_FAIL, AUTH_SET, MESSAGE_SHOW} from './actionTypes';

export const showMessage = (msg) => ({type: MESSAGE_SHOW, payload: msg})

export default function(state='', action) {
  switch(action.type) {
    case MESSAGE_SHOW:
      return action.payload
    case INIT_APP_FAIL:
      return 'init app failed, pls check your config'
    case AUTH_SET:
      return ''
    default:
      return state
  }
}
