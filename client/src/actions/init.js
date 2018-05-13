import {INIT_APP_FAIL, INIT_APP, MESSAGE_SHOW} from './reducers/actionTypes';

export function initHasErrored(bool) {
    return {
        type: 'INIT_HAS_ERRORED',
        hasErrored: bool
    };
}