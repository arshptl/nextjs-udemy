import React, { Fragment, useState } from "react";
import Link from "next/link";
import { buildPath, dataFromPath } from "../../utils/fileReadWrite";

// const Feedback = ({ feedbackItems }) => {
//   const [feedbackData, setFeedback] = useState();

//   const feedbackHandler = async (id) => {
//     const data = await (await fetch(`/api/feedback/${id}`)).json();
//     setFeedback(data.feedback);
//   };
//   return (
//     <Fragment>
//       {feedbackData && <p>{feedbackData.email}</p>}

//       <ul>
//         {feedbackItems.map((item) => (
//           <li key={item.id}>
//             <Link href={`/feedback/${item.id}`}>{item.text}</Link>
//             <button onClick={() => feedbackHandler(item.id)}>
//               show details
//             </button>
//           </li>
//         ))}
//       </ul>
//     </Fragment>
//   );
// };

// export default Feedback;

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

// export async function getStaticProps() {
//   const filePath = buildPath("feedback.json");
//   const data = dataFromPath(filePath);
//   console.log(data);
//   return {
//     props: {
//       feedbackItems: data,
//     },
//   };
// }

const Feedback = ({ feedbackData }) => {
  const [singleFeedback, setSingleFeedback] = useState();
  const feedbackHandler = async (id) => {
    const data = await (await fetch(`/api/feedback/${id}`)).json();
    setSingleFeedback(data.feedback);
  };
  return (
    <Fragment>
      {singleFeedback && <p>{singleFeedback.email}</p>}

      <ul>
        {feedbackData?.map((item) => (
          <li key={item.id}>
            <Link href={`/feedback/${item.id}`}>{item.text}</Link>
            <button onClick={() => feedbackHandler(item.id)}>
              show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Feedback;

export async function getStaticProps() {
  const feedbackData = await (
    await fetch(`http://localhost:3000/api/feedback`)
  ).json();
  return {
    props: {
      feedbackData: feedbackData.feedback,
    },
  };
}
