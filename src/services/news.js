import config from '../config';
//import { browserHistory } from 'react-router'

class newsService {
    async getNewsArray(moduleId) {
        const url = `${config.api}admin/news/list/${moduleId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить список новостей ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    async getNews(newsId) {
        if (!newsId) {
            return undefined;
        }
        const url = `${config.api}admin/news/details/${newsId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить данные новости ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        return data;
    }
    async deleteNews(newsId) {
        if (!newsId) {
            return undefined;
        }
        const url = `${config.api}admin/news/delete`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({newsId: newsId})
        });
        if (!response.ok) {
            throw new Error(`Не удаётся удалить новость ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    async saveNews(news, filesList) {
        if (news.newsId === undefined) news.newsId = 0;

        const url = `${config.api}admin/news/save/${news.newsId || 0}`;

        const formData = new FormData();
        filesList.forEach((file) => {
            formData.append('newsImage', file);
        });
        for(let field in news) {
            formData.append(field, news[field]);
        }
        if (filesList[0] && filesList[0].uid === -1) {
            formData.append('previousImage', true);
        }
        const response = await fetch(url, {
            method: 'POST',
            processData: false,
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                // 'Content-type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'multipart/form-data; charset=utf-8; boundary="another cool boundary"'
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Не удаётся сохранить новость ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
}

export default new newsService();
