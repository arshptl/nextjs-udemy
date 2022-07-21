import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import { getAllEvents } from '../helpers/api-utils';
import Head from 'next/head';

function HomePage({ eventData }) {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>Next Event</title>
        <meta
          name='description'
          content='Find the latest events within your area!'
        />
      </Head>
      <EventList items={eventData} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const eventData = await getAllEvents();

  return {
    props: {
      eventData: eventData,
    },
    revalidate: 1800,
  }

}