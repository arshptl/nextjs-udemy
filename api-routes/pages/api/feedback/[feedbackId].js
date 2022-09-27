import {
  buildPath,
  dataFromPath,
  writeFile,
} from "../../../utils/fileReadWrite";

function handler(req, res) {
  if (req.method === "DELETE") {
    // execute the delete code here
    const feedbackToDelete = req.query;
    console.log(feedbackToDelete.feedbackId);
    const feedbackPath = buildPath("feedback.json");
    const data = dataFromPath(feedbackPath);
    console.log(data);

    const deletedFeedback = data.find(
      (feedback) => feedback.id === feedbackToDelete.feedbackId
    );

    const index = data.findIndex(
      (feedback) => feedback.id === feedbackToDelete.feedbackId
    );

    // console.log(index);
    data.splice(index, 1);

    // console.log("deletedFeedback", deletedFeedback);
    // const afterDeleteFeedbackData = data.splice(
    //   (feedback) => feedback.id == parseInt(feedbackToDelete.feedbackId)
    // );


    writeFile(
      JSON.stringify(data),
      "feedback.json"
    );
    res.status(200).json(data);
    // === true
    //   ? res.status(200).json({ message: "successfully deleted the feedback" })
    //   : res
    //       .status(200)
    //       .json({ error: "error occurred during deleteing the feedback" });

    // if (afterDeleteFeedbackData.length === data.length) {
    //   res
    //     .status(200)
    //     .json({ error: "Couldn't delete the feedback, please try again!" });
    // } else {
    //   writeFile(afterDeleteFeedbackData, "feedback.json") === true
    //     ? res.status(200).json({ message: "successfully deleted the feedback" })
    //     : res
    //         .status(200)
    //         .json({ error: "error occurred during deleteing the feedback" });
    // }
  } else {
    const feedbackId = req.query.feedbackId;
    const path = buildPath("feedback.json");
    const data = dataFromPath(path);
    const singleFeedback = data.find((feedback) => feedback.id === feedbackId);
    res.status(200).json({ feedback: singleFeedback });
  }
}

export default handler;
