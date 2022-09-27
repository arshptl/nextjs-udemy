import Link from "next/link";
import { useRef, useState } from "react";

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };
    console.log(reqBody);

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        emailInputRef.current.value = "";
        feedbackInputRef.current.value = "";
        console.log(data);
      });
  }

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
          <hr />
          <Link href="/feedbackCS">Fetch feedback at Client side</Link>
          <br/>
          <Link href="/feedback">SSG feedback(Build time)</Link>
          <br />
          <Link href="/feedbackSSR">SSR feedback(On the server)</Link>
    </div>
  );
}

export default HomePage;
