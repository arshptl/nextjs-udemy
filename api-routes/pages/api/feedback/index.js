import fs from 'fs';
import { buildPath, dataFromPath } from "../../../utils/fileReadWrite";
function handler(req, res) {
    // Todo get the email and feedback
    // text and store it into a database

    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;

        const newFeedbackObj = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText
        }
        // TODO: store this feedback into a database 
        const filePath = buildPath("feedback.json");
        const data = dataFromPath(filePath);
        data.push(newFeedbackObj);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ message: 'Success!', feedback: newFeedbackObj })
    } else if (req.method === "GET") {
    
      // Get api to get all feedbacks
      const filePath = buildPath("feedback.json");
      const data = dataFromPath(filePath);

      res.status(200).json({
        feedback: data,
      });
    }
}

export default handler