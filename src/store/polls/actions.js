import * as types from './actionTypes';
import pollsService from '../../services/polls';

export function fetchQuestionsItems(pollId) {
    return async(dispatch, getState) => {
        try {
            const questionsArray = await pollsService.getQuestionsArray(pollId);
            dispatch({ type: types.QUESTIONS_FETCHED, questionsArray });
        } catch (error) {
            console.error("fetchPollsItems", error);
        }
    };
}
export function fetchPollsItems(moduleId) {
    return async(dispatch, getState) => {
        try {
            const pollsArray = await pollsService.getPollsArray(moduleId);
            dispatch({ type: types.POLLS_FETCHED, pollsArray });
        } catch (error) {
            console.error("fetchPollsItems", error);
        }
    };
}
export function getPoll(pollId) {
    return async(dispatch, getState) => {
        try {
            const pollObject = await pollsService.getPoll( pollId);
            dispatch({ type: types.POLL_GET, pollObject });
        } catch (error) {
            console.error("pollObject", error);
        }
    };
}
export function getQuestion(questionId) {
    return async(dispatch, getState) => {
        try {
            const questionObject = await pollsService.getQuestion(questionId);
            dispatch({ type: types.QUESTION_GET, questionObject });
        } catch (error) {
            console.error("questionObject", error);
        }
    };
}
export function saveQuestion(question) {
    return async(dispatch, getState) => {
        try {
            const questionSaveResult = await pollsService.saveQuestion(question);
            dispatch({ type: types.QUESTION_POST, questionSaveResult });
        } catch (error) {
            console.error("saveQuestion", error);
        }
    };
}
export function savePoll(poll) {
    return async(dispatch, getState) => {
        try {
            const pollSaveResult = await pollsService.savePoll(poll);
            dispatch({ type: types.POLL_POST, pollSaveResult });
        } catch (error) {
            console.error("savePoll", error);
        }
    };
}
export function deletePoll(pollId) {
    return async(dispatch, getState) => {
        try {
            const pollDeleteResult = await pollsService.deletePoll(pollId);
            dispatch({ type: types.POLL_DELETE, pollDeleteResult  });
        } catch (error) {
            console.error("deletePoll", error);
        }
    };
}
export function deleteQuestion(pollId) {
    return async(dispatch, getState) => {
        try {
            const questionDeleteResult = await pollsService.deleteQuestion(pollId);
            dispatch({ type: types.QUESTION_DELETE, questionDeleteResult  });
        } catch (error) {
            console.error("deleteQuestion", error);
        }
    };
}
export function cleanSaveState() {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: types.POLL_CLEAN });
        } catch (error) {
            console.error("cleanSaveStatusPoll", error);
        }
    };
}