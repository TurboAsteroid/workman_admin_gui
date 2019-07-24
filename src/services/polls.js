import config from '../config';
import { browserHistory } from 'react-router'

class pollsService {
    async getQuestionsArray(pollId) {
        const url = `${config.api}admin/polls/questions/list/${pollId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить список опросов ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    async getPollsArray(moduleId) {
        const url = `${config.api}admin/polls/list/${moduleId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить список опросов ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    async getQuestion(questionId) {
        if (!questionId) {
            return undefined;
        }
        const url = `${config.api}admin/polls/question/${questionId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить данные вопроса ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    async getPoll(pollId) {
        if (!pollId) {
            return undefined;
        }
        const url = `${config.api}admin/polls/details/${pollId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Не удаётся получить данные опроса ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    async savePoll(poll) {
        if (poll.pollId === undefined) poll.pollId = 0;

        const url = `${config.api}admin/polls/save`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poll)
        });
        if (!response.ok) {
            throw new Error(`Не удаётся сохранить опрос ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
    async saveQuestion(question) {
        if (question.id === undefined) question.id = 0;

        const url = `${config.api}admin/polls/question/save`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });
        if (!response.ok) {
            throw new Error(`Не удаётся сохранить опрос ${response.status}`);
        }

        const data = await response.json();

        return data;
    }
}

export default new pollsService();
