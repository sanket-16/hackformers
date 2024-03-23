import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <section className="w-full pt-12 md:pt-36 lg:pt-48 md:px-10 px-4 ">
      <div className="flex items-start md:justify-between md:flex-row flex-col">
        <div>
          <Link to="/" className="font-bold text-2xl">
            EventMGMT
          </Link>
        </div>
        <div className="px-10 flex gap-10">
          <ul>
            <li>Home</li>
            <li>Browse Events</li>
            <li>Create Event</li>
          </ul>
          <ul>
            <li>Home</li>
            <li>Browse Events</li>
            <li>Create Event</li>
          </ul>
        </div>
      </div>
      <p className="text-center py-10">©️EventMGMT - 2024</p>
    </section>
  );
}
