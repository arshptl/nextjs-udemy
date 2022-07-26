import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const inputref = useRef();
  const NotificationCtx = useContext(NotificationContext);


  async function registrationHandler(event) {
    event.preventDefault();

    NotificationCtx.showNotification({
      title: 'Signing up....',
      message: 'Registering for newsletter',
      status: 'pending',
    });


    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const emailInput = { email: inputref.current.value, name: 'testing' }
    console.log(emailInput);
    try {
      const apiReq = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(emailInput),
        headers: {
          'Content-type': 'application/json',
        }
      })
      //   .then((response) => response.json())
      // .then((data) => console.log(data));
      if (apiReq.ok) {
        const responseback = await apiReq.json();
        console.log(responseback);

        NotificationCtx.showNotification({
          title: 'Success!',
          message: 'Successfully registered for newsletter!',
          status: 'success',
        });
        return responseback;
      }
    }
    catch (e) {
      NotificationCtx.showNotification({
        title: 'Error!!',
        message: e.message || 'Something went wrong :(',
        status: 'error',
      });
    }
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
