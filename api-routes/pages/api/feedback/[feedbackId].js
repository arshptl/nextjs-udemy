import {
  buildPath,
  dataFromPath,
  writeFile,
} from "../../../utils/fileReadWrite";

function handler(req, res) {
  if (req.method === "DELETE") {
    // query to get the id of the feedback
    const feedbackToDelete = req.query;

    // getting the feedbacks from the file(database)
    const feedbackPath = buildPath("feedback.json");
    const data = dataFromPath(feedbackPath);

    // filtering the feedbacks to get the feedback to be deleted, and it's index
    const deletedFeedback = data.find(
      (feedback) => feedback.id === feedbackToDelete.feedbackId
    );

    const index = data.findIndex(
      (feedback) => feedback.id === feedbackToDelete.feedbackId
    );

    // deleting the feedback from the array, and overriding the file
    data.splice(index, 1);
    writeFile(JSON.stringify(data), "feedback.json");
    res.status(200).json(deletedFeedback);
  } else if (req.method === "GET") {
    // Get api to get the feedback for perticular id
    const feedbackId = req.query.feedbackId;

    const path = buildPath("feedback.json");
    const data = dataFromPath(path);

    const singleFeedback = data.find((feedback) => feedback.id === feedbackId);
    res.status(200).json({ feedback: singleFeedback });
  }
}

export default handler;
