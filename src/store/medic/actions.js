import * as types from './actionTypes';
import medicService from '../../services/medic';

export function getMedicSubMenu(moduleId) {
    return async(dispatch, getState) => {
        try {
            const medicArray = await medicService.getMedicSubMenu(moduleId);
            dispatch({ type: types.MEDIC_SUBMENU, medicArray  });
        } catch (error) {
            console.error("MEDIC_SUBMENU", error);
        }
    };
}
