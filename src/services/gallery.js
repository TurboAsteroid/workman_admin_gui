import config from '../config';
import helper from '../helper';


class galleryService {
    async getGallery(moduleId) {
        if (!moduleId) {
            return undefined;
        }
        const response = await helper.ajax(`${config.api}admin/gallery/details/${moduleId}`);
        return response;
    }
    async saveGallery(gallery, filesList) {
        const formData = new FormData();
        let oldFiles = [];
        for(let i in filesList) {
            if (!isNaN(filesList[i].uid)) oldFiles.push(filesList[i].uid);
            else formData.append(filesList[i].uid, filesList[i]);
        }
        formData.append('oldFiles', JSON.stringify(oldFiles));
        for(let field in gallery) {
            if (field === 'desc') {
                formData.append(field, JSON.stringify(gallery[field]));
            } else {
                formData.append(field, gallery[field]);
            }
        }
        const response = await helper.ajax(`${config.api}admin/gallery/save/${gallery.moduleId}`, {
            method: 'POST',
            processData: false,
            body: formData
        });
        return response;
    }
}

export default new galleryService();
