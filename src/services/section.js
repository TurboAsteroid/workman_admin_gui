import config from '../config';

class SectionService {
    async postSectionData(data) {
        const url = `${config.api}admin/section`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Не удаётся сохранить данные раздела ${response.status}`);
        }


        const result = await response.json();
// console.log(result);
        return result;
    }
}

export default new SectionService();
