import config from '../config';

class StructureService {

    async getStructureArray() {
        const url = `${config.api}admin/structure`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить структуру сайта ${response.status}`);
        }


        const [childTree, resultById] = await response.json();

        return [childTree, resultById];
    }
}

export default new StructureService();
