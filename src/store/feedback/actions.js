import * as types from './actionTypes';
import feedbackService from '../../services/feedback';

export function fetchFeedbackItems(moduleId) {
    return async(dispatch, getState) => {
        try {
            const fedbackArray = await feedbackService.getFeedbackArray(moduleId);
            dispatch({ type: types.FEEDBACK_FETCHED, fedbackArray });
        } catch (error) {
            console.error("fetchFeedbackItems", error);
        }
    };
}
export function getFeedback(feedbackId) {
    return async(dispatch, getState) => {
        try {
            const feedbackObject = await feedbackService.getFeedback(feedbackId);
            dispatch({ type: types.FEEDBACK_GET, feedbackObject });
        } catch (error) {
            console.error("feedbackObject", error);
        }
    };
}
export function saveFeedback(feedback, filesList) {
    return async(dispatch, getState) => {
        try {
            const feedbackSaveResult = await feedbackService.saveFeedback(feedback, filesList);
            dispatch({ type: types.FEEDBACK_POST, feedbackSaveResult });
        } catch (error) {
            console.error("saveFeedback", error);
        }
    };
}
export function cleanSaveState() {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: types.FEEDBACK_CLEAN });
        } catch (error) {
            console.error("saveFeedback", error);
        }
    };
}