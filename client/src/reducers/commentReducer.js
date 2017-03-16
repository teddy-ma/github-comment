import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default function catReducer(state = initialState.cats, action) {
  // state variable here reps just an array of courses
  switch(action.type) {
    case types.LOAD_CATS_SUCCESS:
      // return action.cats;
     // return action.cats.map(cat => Object.assign({}, cat, Object.assign([], cat.hobby_ids)))
     return Object.assign([], state, action.cats)
    case types.CREATE_CAT_SUCCESS:
      browserHistory.push(`/cats/${action.cat.id}`)
      return [
        ...state.filter(cat => cat.id !== action.cat.id),
        Object.assign({}, action.cat)
      ]
    case types.UPDATE_CAT_SUCCESS:
      return [
        ...state.filter(cat => cat.id !== action.cat.id),
        Object.assign({}, action.cat)
      ]
    case types.DELETE_CAT_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfCatToDelete = state.findIndex(cat => {return cat.id == action.cat.id})
      newState.splice(indexOfCatToDelete, 1);
      browserHistory.push('/cats');
      return newState;
    }
    default:
      return state;
  }
}