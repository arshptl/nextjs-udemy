import React from 'react'
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../data/dummy-data';
import EventSearch from '../components/events/events-search';
import { useRouter } from 'next/router';

const HomeScreen = () => {

    const router = useRouter();
    const events = getFeaturedEvents();
    console.log(getFeaturedEvents());

    function findEventHandler(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath);
    }
    return (
        <React.Fragment>
            <EventSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </React.Fragment>
    )
}

export default HomeScreen