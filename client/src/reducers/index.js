import {combineReducers} from 'redux';
import comment from './commentReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  // short hand property names
  comment,
  auth
})

export default rootReducer;
