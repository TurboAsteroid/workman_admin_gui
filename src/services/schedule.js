import config from '../config';

class scheduleService {
    async getScheduleArray(moduleId) {
        const url = `${config.api}admin/schedule/list/${moduleId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить список элементоврасписания ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    async deleteSchedule(scheduleId) {
        if (!scheduleId) {
            return undefined;
        }
        const url = `${config.api}admin/schedule/delete`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({scheduleId: scheduleId})
        });
        if (!response.ok) {
            throw new Error(`Не удаётся удалить расписание ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    async saveSchedule(schedule) {
        if (schedule.scheduleId === undefined) schedule.scheduleId = 0;

        const url = `${config.api}admin/schedule/save`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        });
        if (!response.ok) {
            throw new Error(`Не удаётся сохранить расписание ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    async getSchedule(scheduleId) {
        const url = `${config.api}admin/schedule/details/${scheduleId || ''}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить данные расписания ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
}

export default new scheduleService();
