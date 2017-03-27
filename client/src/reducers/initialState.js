import {List, Map, fromJS} from 'immutable';


export default fromJS(
  {
    meta:fromJS({
      theme: {}
    }),
    message: Map(),
    comment: fromJS({
      comments: [],
      is_loading: true
    }),
    form: fromJS({
      login: {
        auth: false
      }
    })
  }
)
