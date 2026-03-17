import React from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";

const event =[
    {image:'/images/event1.png', title:'Event 1', slug:'event-1', location:'location-1', date:'date-1', time:'time=1'},
    {image:'/images/event2.png', title:'Event 2'},
]

const home = () => {
    return (
        <section>
            <h1 className="text-center">The Hub For Dev <br/>Events You Can't Miss </h1>
            <p className="text-center mt-05">Hackathons, Meetups, Conferences, All In One Place</p>
            <ExploreBtn />
            <div className="mt-20 space-y-7">
                <h3>Featured Events</h3>
                <ul className="event">
                    {event.map((event) => (
                        <li key={event.slug}>
                            <EventCard {...event} />
                        </li>

                        ))}
                </ul>
            </div>
        </section>

    )
}

export default home