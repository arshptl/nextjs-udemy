import { buildFeedbackPath, feedbackData } from './index';

function handler(req, res) {

    if (req.method === 'DELETE') {
        // execute the delete code here
    }
    else {
        const feedbackId = req.query.feedbackId;
        const path = buildFeedbackPath('feedback.json');
        const data = feedbackData(path);
        const singleFeedback = data.find(feedback => feedback.id === feedbackId);
        res.status(200).json({ feedback: singleFeedback });
    }
}

export default handler