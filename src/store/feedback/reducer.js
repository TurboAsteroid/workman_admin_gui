import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    feedbackArray: undefined,
    feedbackObject: undefined,
    feedbackSaveResult: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.FEEDBACK_FETCHED:
            return state.merge({
                feedbackArray: action.feedbackArray
            });
        case types.FEEDBACK_GET:
            return state.merge({
                feedbackObject: action.feedbackObject
            });
        case types.FEEDBACK_POST:
            return state.merge({
                feedbackSaveResult: action.feedbackSaveResult
            });
        case types.FEEDBACK_CLEAN:
            return state.merge({
                feedbackObject: undefined,
                feedbackArray: undefined,
                feedbackSaveResult: undefined
            });
        default:
            return state;
    }
}

// selectors

export function getFeedbackArray(state) {
    const feedbackArray = state.feedback.feedbackArray;
    return feedbackArray;
}
export function getFeedbackObject(state) {
    const feedbackObject = state.feedback.feedbackObject;
    return feedbackObject;
}
export function getFeedbackSaveResult(state) {
    const getfeedbackSaveResult = state.feedback.feedbackSaveResult;
    return getfeedbackSaveResult;
}
