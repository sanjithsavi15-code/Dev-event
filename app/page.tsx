import React from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";

const Home = () => {
    return (
        <section>
            <h1 className="text-center">The Hub For Dev <br/>Events You Can't Miss </h1>
            <p className="text-center mt-05">Hackathons, Meetups, Conferences, All In One Place</p>
            <ExploreBtn />
            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                {/* Removed 'event' from the className below */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <li key={event.slug}>
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    )
}

export default Home