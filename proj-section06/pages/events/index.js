import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage({events}) {
  const router = useRouter();
  // const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>Filter events</title>
        <meta
          name='description'
          content='filter events within your area!'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,  
    },
    revalidate: 60,
  }  
}
