import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    mainMenuArray: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.MAINMENU_FETCHED:
            return state.merge({
                mainMenuArray: action.mainMenuArray
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

export function getMainMenu(state) {
    const mainMenuArray = state.mainMenu.mainMenuArray;
    return [mainMenuArray];
}