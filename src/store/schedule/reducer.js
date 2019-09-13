import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    scheduleArray: undefined,
    points: undefined
});

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.SCHEDULE_FETCHED:
            return state.merge({
                scheduleArray: action.scheduleArray
            });
        case types.SCHEDULE_GET:
            return state.merge({
                scheduleObject: action.scheduleObject
            });
        case types.SCHEDULE_POST:
            return state.merge({
                scheduleSaveResult: action.scheduleSaveResult
            });
        case types.SCHEDULE_DELETE:
            return state.merge({
                scheduleDeleteResult: action.scheduleDeleteResult
            });
        case types.SCHEDULE_CLEAN:
            return state.merge({
                scheduleArray: undefined,
                scheduleSaveResult: undefined,
                scheduleObject: undefined,
            });
        default:
            return state;
    }
}

export function getScheduleArray(state) {
    const scheduleArray = state.schedule.scheduleArray;
    return scheduleArray;
}

export function getScheduleSaveResult(state) {
    const getScheduleSaveResult = state.schedule.scheduleSaveResult;
    return getScheduleSaveResult;
}

export function getScheduleDeleteResult(state) {
    const getScheduleDeleteResult = state.schedule.scheduleDeleteResult;
    return getScheduleDeleteResult;
}
export function getScheduleObject(state) {
    const getScheduleObject = state.schedule.scheduleObject;
    return getScheduleObject;
}