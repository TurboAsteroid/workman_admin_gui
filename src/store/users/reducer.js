import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    userAddResult: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.USER_ADD:
            return state.merge({
                userAddResult: action.userAddResult
            });
        // case types.FILTER_CHANGED:
        //     return state.merge({
        //         currentFilter: action.filter
        //     });
        // case types.POST_SELECTED:
        //     return state.merge({
        //         currentPostId: action.postId
        //     });
        default:
            return state;
    }
}

// selectors

export function getUserAddResult(state) {
    const userAddResult = state.users.userAddResult;
    return userAddResult;
}