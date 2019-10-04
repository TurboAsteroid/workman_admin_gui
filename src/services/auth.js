import config from '../config';
import helper from '../helper';

class authService {
    async sendAuth(authParam) {
        const response = await helper.ajax(`${config.api}login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authParam)
        });

        return response;
    }
}

export default new authService();
