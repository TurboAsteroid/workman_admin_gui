import * as types from './actionTypes';
import mainMenuService from '../../services/mainMenu';

export function fetchMenuItems() {
    return async(dispatch, getState) => {
        try {
            const mainMenuArray = await mainMenuService.getMainMenuArray();
            dispatch({ type: types.MAINMENU_FETCHED, mainMenuArray });
        } catch (error) {
            console.error("fetchMenuItems", error);
        }
    };
}