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
    async saveSchedule(schedule, filesList) {
        if (schedule.scheduleId === undefined) schedule.scheduleId = 0;
        const formData = new FormData()
        for(let field in schedule) {
            if (field === 'avatar') formData.append(field, schedule[field] ? schedule[field].file : undefined)
            else formData.append(field, schedule[field])
        }

        const response = await helper.ajax(`${config.api}admin/schedule/save`, {
            method: 'POST',
            processData: false,
            body: formData
        });
        return response;
    }
    async getSchedule(scheduleId) {
        const response = await helper.ajax(`${config.api}admin/schedule/details/${scheduleId || ''}`);
        return response;
    }
}

export default new scheduleService();
