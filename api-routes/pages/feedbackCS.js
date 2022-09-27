import React,{useState} from "react";

const FeedbackCS = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);

  async function loadFeedbackHandler() {
    //-----------------fetching data from the api(pages/api)-----------------
    //---------.then() method----------------
    // fetch('/api/feedback')
    //     .then((response) => {
    //         response.json()
    //         console.log(response);
    //     })
    //     .then((data) => {
    //         console.log(data);
    //         setFeedbackItems(data.feedback);
    //     });

    // --------async/await method----------------
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedbackItems(data.feedback);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <h1>Feedback With Client Side Fetching</h1>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
};

export default FeedbackCS;
