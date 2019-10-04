import * as types from './actionTypes';
import authService from '../../services/auth';

export function authorization(authParam) {
    return async(dispatch, getState) => {
        try {
            const authResult = await authService.sendAuth(authParam);
            dispatch({ type: types.AUTH_POST, authResult });
        } catch (error) {
            console.error("auth", error);
        }
    };
}