import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
   it('handles INIT_APP_FAIL', () => {
       const initialState = Map();
       const action = {
           type: 'INIT_APP_FAIL'
       };

       const nextState = reducer(initialState, action);

       expect(nextState).to.equal(fromJS({
           message: '额，应用初始化失败~'
       }));
   });

   it('handles INIT_APP', () => {
       const initialState = Map();
       const action = {
           type: 'INIT_APP',
           user_name: 'teddy-ma',
           repo: 'dummy-repo',
           page_id: 123,
           server_url: 'github-comment.herokuapp.com',
           ssl: false
       };

       const nextState = reducer(initialState, action);

       expect(nextState).to.equal(
           fromJS({meta: {user_name: 'teddy-ma', repo: 'dummy-repo', page_id: 123, server_url: 'github-comment.herokuapp.com', ssl: false}})
       );
   });
});
