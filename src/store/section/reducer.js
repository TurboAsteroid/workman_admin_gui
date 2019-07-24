import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    sectionData: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.SECTION_POST:
            return state.merge({
                sectionData: action.sectionData
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

export function getSectonData(state) {
    const sectionData = state.section.sectionData;
    return sectionData;
}