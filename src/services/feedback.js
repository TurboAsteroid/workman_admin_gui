import config from '../config';
import helper from '../helper';

class feedbackService {
    async getFeedbackArray(moduleId) {
        const response = await helper.ajax(`${config.api}admin/feedback/list/${moduleId}`);
        return response;
    }
    async getFeedback(feedbackId) {
        if (!feedbackId) {
            return undefined;
        }
        const response = await helper.ajax(`${config.api}admin/feedback/details/${feedbackId}`);
        return response;
    }
    async saveFeedback(feedback) {
        if (feedback.feedbackId === undefined) feedback.feedbackId = 0;
        const response = await helper.ajax(`${config.api}admin/feedback/save`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        });
        return response;
    }
}

export default new feedbackService();
