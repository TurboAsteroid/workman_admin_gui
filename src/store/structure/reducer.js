import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    structureObject: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.STRUCTURE_FETCHED:
            return state.merge({
                structureObject: action.structureObject
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

export function getStructure(state) {
    const structureObject = state.structure.structureObject;
    return [structureObject];
}