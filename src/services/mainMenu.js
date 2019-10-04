import config from '../config';
import helper from '../helper';

class MainMenuService {
    async getMainMenuArray() {
        const response = await helper.ajax(`${config.api}admin/mainMenu`);
        return response;
    }
}

export default new MainMenuService();
