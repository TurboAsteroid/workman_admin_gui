import * as types from './actionTypes';
import checkUpService from '../../services/checkUp';

export function getCheckUpArray(moduleId) {
    return async(dispatch, getState) => {
        try {
            const checkUpArray = await checkUpService.getCheckUpArray(moduleId);
            dispatch({ type: types.CHECKUP_GET, checkUpArray });
        } catch (error) {
            console.error("checkUpArray", error);
        }
    };
}
export function saveCheckUp(gallery, filesList) {
    return async(dispatch, getState) => {
        try {
            const checkUpSaveResult = await checkUpService.saveCheckUp(gallery, filesList);
            dispatch({ type: types.CHECKUP_POST, checkUpSaveResult });
        } catch (error) {
            console.error("checkUpSaveResult", error);
        }
    };
}
export function cleanSaveState() {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: types.CHECKUP_CLEAN });
        } catch (error) {
            console.error("saveGallery", error);
        }
    };
}