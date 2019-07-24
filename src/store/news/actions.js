import * as types from './actionTypes';
import newsService from '../../services/news';

export function fetchNewsItems(moduleId) {
    return async(dispatch, getState) => {
        try {
            const newsArray = await newsService.getNewsArray(moduleId);
            dispatch({ type: types.NEWS_FETCHED, newsArray });
        } catch (error) {
            console.error("fetchNewsItems", error);
        }
    };
}
export function getNews(newsId) {
    return async(dispatch, getState) => {
        try {
            const newsObject = await newsService.getNews(newsId);
            dispatch({ type: types.NEWS_GET, newsObject });
        } catch (error) {
            console.error("newsObject", error);
        }
    };
}
export function saveNews(news, filesList) {
    return async(dispatch, getState) => {
        try {
            const newsSaveResult = await newsService.saveNews(news, filesList);
            dispatch({ type: types.NEWS_POST, newsSaveResult });
        } catch (error) {
            console.error("saveNews", error);
        }
    };
}
export function cleanSaveState() {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: types.NEWS_CLEAN });
        } catch (error) {
            console.error("saveNews", error);
        }
    };
}