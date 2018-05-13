import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import commentReducer from './reducers/comment';
import messageReducer from './reducers/messages';
import app from './reducers/app';

const reducers = combineReducers({
  meta: app,
  comment: commentReducer,
  message: messageReducer
})

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
