import config from '../config';
import helper from '../helper';

class StructureService {
    async getStructureArray() {
        const response = await helper.ajax(`${config.api}admin/structure`);
        const [childTree, resultById] = response;
        return [childTree, resultById];
    }
}

export default new StructureService();
