import React from 'react'

const FeedbackSSR = ({ feedbacks }) => {
  return (
    <>
      <h1>List of Feedbacks</h1>
      {feedbacks.map((feedback) => {
        return (
          <div key={feedback.id}>
            <h2>
              {feedback.id} {feedback.title} | {feedback.category}
            </h2>
            <p>{feedback.description}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default FeedbackSSR;

export async function getServerSideProps() {
  console.log("Pre-rendering FeedbackList");
  const response = await fetch("http://localhost:4000/feedbacks");
  const data = await response.json();

  return {
    props: {
      feedbacks: data,
    },
  };
}