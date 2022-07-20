import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getEventById, getFeaturedEvents } from '../../helpers/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage({ event }) {
  const router = useRouter();

  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticProps(context) {

  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return {notFound: true}
  }

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  }

}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}