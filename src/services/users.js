import config from '../config';

class usersService {
    async postUserData(values) {
        const url = `${config.api}admin/users/add`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (!response.ok) {
            throw new Error(`Не удаётся добавить пользователя ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
}

export default new usersService();
