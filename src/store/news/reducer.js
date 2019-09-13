import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    newsArray: undefined,
    newsObject: undefined,
    newsSaveResult: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.NEWS_FETCHED:
            return state.merge({
                newsArray: action.newsArray
            });
        case types.NEWS_GET:
            return state.merge({
                newsObject: action.newsObject
            });
        case types.NEWS_POST:
            return state.merge({
                newsSaveResult: action.newsSaveResult
            });
        case types.NEWS_DELETE:
            return state.merge({
                newsDeleteResult: action.newsDeleteResult
            });
        case types.NEWS_CLEAN:
            return state.merge({
                newsObject: undefined,
                newsArray: undefined,
                newsSaveResult: undefined
            });
        default:
            return state;
    }
}

// selectors

export function getNewsArray(state) {
    const newsArray = state.news.newsArray;
    return newsArray;
}
export function getNewsObject(state) {
    const newsObject = state.news.newsObject;

    return newsObject;
}
export function getNewsSaveResult(state) {
    const getNewsSaveResult = state.news.newsSaveResult;
    return getNewsSaveResult;
}
export function getNewsDeleteResult(state) {
    const getNewsDeleteResult = state.news.newsDeleteResult;
    return getNewsDeleteResult;
}