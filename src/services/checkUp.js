import config from '../config';
import helper from '../helper';

class checkUpService {
    async getCheckUpArray(moduleId) {
        const response = await helper.ajax(`${config.api}admin/checkup/${moduleId}`);
        return response.data;
    }
    async saveCheckUp(checkUp) {
        if (checkUp.moduleId === undefined) return {};
        const response = await helper.ajax(`${config.api}admin/checkup/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkUp)
        });
        return response;
    }
}

export default new checkUpService();
