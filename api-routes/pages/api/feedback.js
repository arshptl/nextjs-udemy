import fs from 'fs';
import path from 'path';
import process from 'process';

function handler(req, res) {
    // Todo get the email and feedback
    // text and store it into a database

    // TODO: Create buildFeedbackPath to get the file location/path
    const buildFeedbackPath = (apiName) => {
        const pathh = path.join(process.cwd(), 'data', `${apiName}`);
        return pathh;
        }

    // TODO: Create a func which returns feedback data
    const feedbackData = (path) => {
        const file = fs.readFileSync(path);
        const data = JSON.parse(file);
        return data;
    }

    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedbackObj = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        }

        // TODO: store this feedback into a database 
        const filePath = buildFeedbackPath('feedback.json');
        const data = feedbackData(filePath);
        data.push(newFeedbackObj);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: 'Success!', feedback: newFeedbackObj })
    } else {
        const filePath = buildFeedbackPath('feedback.json');
        const data = feedbackData(filePath);

        res.status(200).json({
            feedback: data
        });
    }
}

export default handler