import {combineReducers} from 'redux';
import comment from './commentReducer';
import meta from './metaReducer';
import message from './messageReducer';
import form from './formReducer';


const rootReducer = combineReducers({
  // short hand property names
  meta,
  message,
  comment,
  form
})

export default rootReducer;
