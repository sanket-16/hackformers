import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Page3 = () => {
  return (
    <div className="flex  md:flex-row flex-col-reverse  h-screen w-full items-center">
      <div className="w-1/2  space-y-4 ">
        <h1 className="font-bold text-3xl">
          Discover Exciting Events Near You
        </h1>
        <h2 className="text-xl pb-3">
          Explore a world of possibilities with EventEase's event discovery
          features. Tailored to your interests, our recommendation system
          suggests local events that match your preferences. Browse user
          reviews, get insider tips, and discover hidden gems in your community.
          From concerts to workshops, find your next adventure with EventEase.
        </h2>
        <Link to="/explore">
          <Button>Explore Events</Button>
        </Link>
      </div>
      <div className="w-1/2">
        <img className="rounded-md" src="/Page3.jpg" alt="hhhh" />
      </div>
    </div>
  );
};

export default Page3;
