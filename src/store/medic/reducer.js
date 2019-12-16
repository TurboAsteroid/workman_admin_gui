import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    medicArray: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.MEDIC_SUBMENU:
            return state.merge({
                medicArray: action.medicArray
            });
        default:
            return state;
    }
}

export function getMedicSubMenu(state) {
    const medicArray = state.medic.medicArray;
    return medicArray ;
}