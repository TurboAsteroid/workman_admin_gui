import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    authResult: {}
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.AUTH_POST:
            return state.merge({
                authResult: action.authResult
            });
        default:
            return state;
    }
}

export function getAuthObject(state) {
    console.log(state);
    const getAuthResult = state.auth.authResult;
    return getAuthResult;
}