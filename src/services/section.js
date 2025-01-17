import config from '../config';
import helper from '../helper';

class SectionService {
    async postSectionData(data) {
        const response = await helper.ajax(`${config.api}admin/section`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response;
    }
}

export default new SectionService();
