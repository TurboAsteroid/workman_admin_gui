import config from '../config';
import helper from '../helper';

class medicService {
    async getMedicSubMenu(moduleId) {
        const response = await helper.ajax(`${config.api}admin/medic/${moduleId}`);
        return response;
    }
}

export default new medicService();
