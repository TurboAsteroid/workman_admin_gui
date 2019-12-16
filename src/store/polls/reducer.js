import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    pollsArray: undefined,
    pollObject: undefined,
    questionObject : undefined,
    // newsSaveResult: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.QUESTIONS_FETCHED:
            return state.merge({
                questionsArray: action.questionsArray
            });
        case types.QUESTION_GET:
            return state.merge({
                questionObject: action.questionObject
            });
        case types.POLLS_FETCHED:
            return state.merge({
                pollsArray: action.pollsArray
            });
        case types.POLL_GET:
            return state.merge({
                pollObject: action.pollObject
            });
        case types.POLL_POST:
            return state.merge({
                pollSaveResult: action.pollSaveResult
            });
        case types.POLL_DELETE:
            return state.merge({
                pollDeleteResult: action.pollDeleteResult
            });
        case types.QUESTION_DELETE:
            return state.merge({
                questionDeleteResult: action.questionDeleteResult
            });
        case types.POLL_CLEAN:
            return state.merge({
                pollObject: undefined,
                pollArray: undefined,
                questionsArray: undefined,
                pollSaveResult: undefined,
                pollDeleteResult: undefined,
                questionDeleteResult: undefined
            });
        default:
            return state;
    }
}

export function getQuestionsArray(state) {
    const questionsArray = state.polls.questionsArray;
    return questionsArray;
}
export function getPollsArray(state) {
    const pollsArray = state.polls.pollsArray;
    return pollsArray;
}
export function getPollObject(state) {
    const pollObject = state.polls.pollObject;
    return pollObject;
}
export function getQuestionObject(state) {
    const questionObject = state.polls.questionObject;
    return questionObject;
}
export function getPollSaveResult(state) {
    const getPollSaveResult = state.polls.pollSaveResult;
    return getPollSaveResult;
}
export function getPollDeleteResult(state) {
    const getPollDeleteResult = state.polls.pollDeleteResult;
    return getPollDeleteResult;
}
export function getQuestionDeleteResult(state) {
    const getQuestionDeleteResult = state.polls.questionDeleteResult;
    return getQuestionDeleteResult;
}