import classes from './newsletter-registration.module.css';
import { useRef } from 'react';

function NewsletterRegistration() {
  const inputref = useRef();

  async function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const emailInput = { email: inputref.current.value, name: 'testing' }
    console.log(emailInput);
    const apiReq = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(emailInput),
      headers: {
        'Content-type': 'application/json',
      }
    })
    //   .then((response) => response.json())
    // .then((data) => console.log(data));

    const responseback = await apiReq.json();
    console.log(responseback);
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={inputref}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
