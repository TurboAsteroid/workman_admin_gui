import config from '../config';
import helper from '../helper';

class scheduleService {
    async getScheduleArray(moduleId) {
        const response = await helper.ajax(`${config.api}admin/schedule/list/${moduleId}`);
        return response;
    }
    async deleteSchedule(scheduleId) {
        if (!scheduleId) {
            return undefined;
        }
        const response = await helper.ajax(`${config.api}admin/schedule/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({scheduleId: scheduleId})
        });
        return response;
    }
    async saveSchedule(schedule) {
        if (schedule.scheduleId === undefined) schedule.scheduleId = 0;

        const response = await helper.ajax(`${config.api}admin/schedule/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        });
        return response;
    }
    async getSchedule(scheduleId) {
        const response = await helper.ajax(`${config.api}admin/schedule/details/${scheduleId || ''}`);
        return response;
    }
}

export default new scheduleService();
