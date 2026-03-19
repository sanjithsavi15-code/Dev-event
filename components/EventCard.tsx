import Image from "next/image";
import Link from "next/link";

interface Props {
    title: string;
    image: string;
    slug: string;
    date: string;
    location: string;
    time: string;
}

const EventCard = ({ title, image, slug, location, time, date }: Props) => {
    return (
        <Link href={`/events/${slug}`} className="flex flex-col group">

            <Image
                src={image}
                alt={title}
                width={400}
                height={300}
                className="w-full h-[250px] object-cover rounded-xl"
            />

            <div className="flex flex-col gap-2 mt-3">

                <div className="flex flex-row gap-1.5 items-center text-sm text-gray-300">
                    <Image src="/icons/pin.svg" alt="location" height={14} width={14} />
                    <p>{location}</p>
                </div>

                <p className="text-lg font-bold text-white">{title}</p>

                <div className="flex flex-row gap-4 text-sm text-gray-300">
                    <div className="flex flex-row gap-1.5 items-center">
                        <Image src="/icons/calendar.svg" alt="date" height={14} width={14} />
                        <p>{date}</p>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center">
                        <Image src="/icons/clock.svg" alt="time" height={14} width={14} />
                        <p>{time}</p>
                    </div>
                </div>

            </div>
        </Link>
    );
};

export default EventCard;