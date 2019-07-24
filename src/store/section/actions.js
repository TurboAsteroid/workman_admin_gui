import * as types from './actionTypes';
import SectionService from '../../services/section';

export function postSectionData(data) {
    return async(dispatch, getState) => {
        try {
            const sectionData = await SectionService.postSectionData(data);
            dispatch({ type: types.SECTION_POST, sectionData });
        } catch (error) {
            console.error("postSectionData", error);
        }
    };
}