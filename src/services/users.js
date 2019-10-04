import config from '../config';
import helper from '../helper';

class usersService {
    async postUserData(values) {
        const response = await helper.ajax(`${config.api}admin/users/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        return response;
    }
}
export default new usersService();