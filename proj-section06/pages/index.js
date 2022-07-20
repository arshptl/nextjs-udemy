import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import { getAllEvents } from '../helpers/api-utils';

function HomePage({eventData}) {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
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