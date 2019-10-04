import config from '../config';
import helper from '../helper';

class pollsService {
    async getQuestionsArray(pollId) {
        const response = await helper.ajax(`${config.api}admin/polls/questions/list/${pollId}`);
        return response;
    }
    async getPollsArray(moduleId) {
        const response = await helper.ajax(`${config.api}admin/polls/list/${moduleId}`);
        return response;
    }
    async getQuestion(questionId) {
        if (!questionId) {
            return undefined;
        }
        const response = await helper.ajax(`${config.api}admin/polls/question/${questionId}`);
        return response;
    }
    async getPoll(pollId) {
        if (!pollId) {
            return undefined;
        }
        const response = await helper.ajax(`${config.api}admin/polls/details/${pollId}`);
        return response;
    }
    async savePoll(poll) {
        if (poll.pollId === undefined) poll.pollId = 0;

        const response = await helper.ajax(`${config.api}admin/polls/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poll)
        });
        return response;
    }
    async saveQuestion(question) {
        if (question.id === undefined) question.id = 0;
        const response = await helper.ajax(`${config.api}admin/polls/question/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });
        return response;
    }
}

export default new pollsService();
