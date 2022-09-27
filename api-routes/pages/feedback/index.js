import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { buildPath, dataFromPath } from "../../utils/fileReadWrite";

const Feedback = ({ feedbackItems }) => {
  const [feedbackData, setFeedback] = useState();
  const [feedbacks, setNewFeedback] = useState(feedbackItems);

  // fetches the details of feedback from given id from api routes
  const feedbackHandler = async (id) => {
    const data = await (await fetch(`/api/feedback/${id}`)).json();
    setFeedback(data.feedback);
  };

  // function to delete the feedback
  const handleDeleteFeedback = async (id) => {
    const apiReq = await fetch(`/api/feedback/${id}`, {
      method: "DELETE",
    });

    const responseback = await apiReq.json();
    console.log(responseback);

    const newesetFeedback = await (await fetch(`/api/feedback`)).json();
    console.log("newFeedback", newesetFeedback.feedback);
    setNewFeedback(newesetFeedback.feedback);
  };

  useEffect(() => {
    console.log(feedbacks);
  }, [feedbacks]);

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}

      <ul>
        {feedbacks.map((item) => (
          <li key={item.id}>
            <Link href={`/feedback/${item.id}`}>{item.text}</Link>
            <br />
            <div>
              <button onClick={() => feedbackHandler(item.id)}>
                show details
              </button>
              -- 
              <button onClick={() => handleDeleteFeedback(item.id)}>
                Delete Feedback
              </button>
            </div>
            <br/>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Feedback;

export async function getStaticProps() {
  const filePath = buildPath("feedback.json");
  const data = dataFromPath(filePath);
  console.log(data);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

// const Feedback = ({ feedbackData }) => {
//   const [singleFeedback, setSingleFeedback] = useState();
//   const feedbackHandler = async (id) => {
//     const data = await (await fetch(`/api/feedback/${id}`)).json();
//     setSingleFeedback(data.feedback);
//   };

//     const handleDeleteFeedback = async (id) => {
//       const apiReq = await fetch(`/api/feedback/${id}`, {
//         method: "DELETE",
//       });

//       const responseback = await apiReq.json();
//       console.log(responseback);
//     };

//   return (
//     <Fragment>
//       {singleFeedback && <p>{singleFeedback.email}</p>}

//       <ul>
//         {feedbackData?.map((item) => (
//           <li key={item.id}>
//             <Link href={`/feedback/${item.id}`}>{item.text}</Link>
//             <button onClick={() => feedbackHandler(item.id)}>
//               Show details
//             </button>
//             <button onClick={() => handleDeleteFeedback(item.id)}>Delete Feedback</button>
//           </li>
//         ))}
//       </ul>
//     </Fragment>
//   );
// };

// export default Feedback;

// export async function getStaticProps() {
//   const feedbackData = await (
//     await fetch(`http://localhost:3000/api/feedback`)
//   ).json();
//   return {
//     props: {
//       feedbackData: feedbackData.feedback,
//     },
//   };
// }

// Two ways to ------- get -------- data
// 1. Get it locally from the file system (PRE RENDER)
// 2. Get it from Api
//    a. written in root/pages/api folder (OWN API / THRID PARTY, WRITTEN IN OUT API HANDLER) (PRE RENDER/CLIENT SIDE)
//    b. Fetch data from the thrid party api providers (PRE RENDER/CLIENT SIDE)

// Can be -------- render --------- by three ways
// 1. Pre rendering(better for seo)
//    a. Static site generation (getStaticProps) at the build time
//    b. Server site generation (gerServerSideprops) at the server side
// 2. Client side fetching
//    a. Just put the apis into the useEffect