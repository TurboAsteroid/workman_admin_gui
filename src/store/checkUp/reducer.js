import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    checkUpArray: undefined,
    gallerySaveResult: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.CHECKUP_GET:
            return state.merge({
                checkUpArray: action.checkUpArray
            });
        case types.CHECKUP_POST:
            return state.merge({
                checkUpSaveResult: action.checkUpSaveResult
            });
        case types.CHECKUP_CLEAN:
            return state.merge({
                checkUpArray: undefined,
                gallerySaveResult: undefined
            });
        default:
            return state;
    }
}

// selectors

export function getCheckUpArray(state) {
    const checkUpArray = state.checkUp.checkUpArray;
    return checkUpArray;
}
export function getGallerySaveResult(state) {
    const checkUpSaveResult = state.gallery.checkUpSaveResult;
    return checkUpSaveResult;
}