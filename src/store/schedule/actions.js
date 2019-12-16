import * as types from './actionTypes';
import scheduleService from '../../services/schedule';


export function fetchScheduleItems(moduleId) {
    return async(dispatch, getState) => {
        try {
            const scheduleArray = await scheduleService.getScheduleArray(moduleId);
            dispatch({ type: types.SCHEDULE_FETCHED, scheduleArray });
        } catch (error) {
            console.error("fetchPollsItems", error);
        }
    };
}
export function saveSchedule(schedule, filesList) {
    return async(dispatch, getState) => {
        try {
            const scheduleSaveResult = await scheduleService.saveSchedule(schedule, filesList);
            dispatch({ type: types.SCHEDULE_POST, scheduleSaveResult });
        } catch (error) {
            console.error("saveSchedule", error);
        }
    };
}
export function deleteSchedule(scheduleId) {
    if (!scheduleId) {
        return undefined;
    }
    return async(dispatch, getState) => {
        try {
            const scheduleDeleteResult = await scheduleService.deleteSchedule(scheduleId);
            dispatch({ type: types.SCHEDULE_DELETE, scheduleDeleteResult });
        } catch (error) {
            console.error("deleteSchedule", error);
        }
    };
}
export function getSchedule(scheduleId) {
    return async(dispatch, getState) => {
        try {
            const scheduleObject = await scheduleService.getSchedule(scheduleId);
            dispatch({ type: types.SCHEDULE_GET, scheduleObject });
        } catch (error) {
            console.error("scheduleObject", error);
        }
    };
}
export function cleanSaveState() {
    return async(dispatch, getState) => {
        try {
            dispatch({ type: types.SCHEDULE_CLEAN });
        } catch (error) {
            console.error("cleanSaveStatusSchedule", error);
        }
    };
}