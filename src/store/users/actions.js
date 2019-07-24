import * as types from './actionTypes';
import userService from '../../services/users';

export function postUserData(values) {
    return async(dispatch, getState) => {
        try {
            const userAddResult = await userService.postUserData(values);
            dispatch({ type: types.USER_ADD, userAddResult });
        } catch (error) {
            console.error("AddUserErr", error);
        }
    };
}