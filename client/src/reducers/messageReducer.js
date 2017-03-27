// 如果说 action_creators, 那么 reducer 就是是 event
// 用于对已经发生的 command 采取对应的响应（更改 state 的状态，ui 渲染是 React 自动处理的）

import {List, Map, fromJS} from 'immutable';
import {blue, green} from '../styles/theme';
import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function messageReducer(state=initialState.get('message'), action) {
  switch (action.type) {
    case types.INIT_APP_FAIL:
      return state.set('content', "额，应用初始化失败~");
  }
  return state;
}
