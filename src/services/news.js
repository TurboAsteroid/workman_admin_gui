import config from '../config';
import helper from '../helper';


class newsService {
    async getNewsArray(moduleId) {
        const response = await helper.ajax(`${config.api}admin/news/list/${moduleId}`);

        return response;
    }
    async getNews(newsId) {
        if (!newsId) {
            return undefined;
        }
        const response = await helper.ajax(`${config.api}admin/news/details/${newsId}`);
        return response;
    }
    async deleteNews(newsId) {
        if (!newsId) {
            return undefined;
        }
        const response = await helper.ajax(`${config.api}admin/news/delete`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newsId: newsId})
        });
        return response;
    }
    async saveNews(news, filesList) {
        if (news.newsId === undefined) news.newsId = 0;
        const formData = new FormData();
        let oldFiles = [];
        for(let i in filesList) {
            if (!isNaN(filesList[i].uid)) oldFiles.push(filesList[i].uid);
            else formData.append(filesList[i].uid, filesList[i]);
        }
        formData.append('oldFiles', JSON.stringify(oldFiles));
        for(let field in news) {
            if (field === 'desc') {
                formData.append(field, JSON.stringify(news[field]));
            } else {
                formData.append(field, news[field]);
            }
        }
        const response = await helper.ajax(`${config.api}admin/news/save/${news.newsId || 0}`, {
            method: 'POST',
            processData: false,
            body: formData
        });
        return response;
    }
    // async saveNews(news, filesList, filesList2) {
    //     if (news.newsId === undefined) news.newsId = 0;
    //
    //     const formData = new FormData();
    //     filesList.forEach((file) => {
    //         formData.append('newsImage', file);
    //     });
    //     for(let field in news) {
    //         formData.append(field, news[field]);
    //     }
    //     if (filesList[0] && filesList[0].uid === -1) {
    //         formData.append('previousImage', true);
    //     }
    //
    //     const response = await helper.ajax(`${config.api}admin/news/save/${news.newsId || 0}`, {
    //         method: 'POST',
    //         processData: false,
    //         headers: {
    //             // 'Accept': 'application/json',
    //             // 'Content-Type': 'application/json'
    //             // 'Content-type': 'application/x-www-form-urlencoded'
    //             // 'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary"'
    //         },
    //         body: formData
    //     });
    //     return response;
    // }
}

export default new newsService();
