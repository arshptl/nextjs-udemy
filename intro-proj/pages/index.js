import React from 'react'
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../data/dummy-data';
const HomeScreen = () => {
    console.log(getFeaturedEvents());
    return (
        <div>
            <EventList items={getFeaturedEvents()} />
        </div>
    )
}

export default HomeScreen