import React,{Fragment, useState} from 'react'
import { buildFeedbackPath, feedbackData } from '../api/feedback/index';

const Feedback = ({ feedbackItems }) => {

    const [feedbackData, setFeedback] = useState();

    const feedbackHandler = async(id) => {
        const data = await (await fetch(`/api/feedback/${id}`)).json();
        setFeedback(data.feedback);
    }
    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
        <ul>
            {feedbackItems.map((item) => (
                <li key={item.id}>{item.text}
                <button onClick={() => feedbackHandler(item.id)}>show details</button>
                </li>
            ))}
        </ul>
        </Fragment>
    )
}

export default Feedback

export async function getStaticProps() {
    const filePath = buildFeedbackPath('feedback.json');
    const data = feedbackData(filePath);
    console.log(data);
    return {
        props: {
            feedbackItems: data,
        }
    }
}