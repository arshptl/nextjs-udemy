import React from "react";
import { buildPath, dataFromPath } from "../../utils/fileReadWrite";

const FeedbackId = (props) => {
const {data} = props
  return (
    <div>
      <h1>
        {data.text} : {data.id}
      </h1>
      <p><b>Author's email: </b>{data.email}</p>
    </div>
  );
};

export default FeedbackId;

export async function getStaticProps(context) {
  const { params } = context;

  const feedbackId = params.feedbackId;

  const feedbackFilePath = buildPath("feedback.json");
  const dataForFeedback = dataFromPath(feedbackFilePath);

  const data = dataForFeedback.find((feedback) => feedback.id === feedbackId);
  console.log(data);
  return {
    props: {
      data: data,
    },
  };
}

export async function getStaticPaths() {
  const feedbackfilePath = buildPath("feedback.json");
  const data = dataFromPath(feedbackfilePath);
  console.log(data);
  const idsWithParams = data.map((feedback) => ({
    params: { feedbackId: feedback.id },
  }));
  console.log(idsWithParams);
  // const singleFeedback = data.find(feedback => feedback === params.)

  return {
    paths: idsWithParams,
    fallback: false,
  };
}
