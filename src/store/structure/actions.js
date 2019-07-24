import * as types from './actionTypes';
import structureService from '../../services/structure';

export function fetchStructureItems() {
    return async(dispatch, getState) => {
        try {
            const structureObject = await structureService.getStructureArray();
            dispatch({ type: types.STRUCTURE_FETCHED, structureObject });
        } catch (error) {
            console.error("fetchMenuItems", error);
        }
    };
}