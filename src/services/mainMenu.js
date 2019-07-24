import config from '../config';

class MainMenuService {
    async getMainMenuArray() {
        const url = `${config.api}admin/mainMenu`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить главное меню админки ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
}

export default new MainMenuService();
