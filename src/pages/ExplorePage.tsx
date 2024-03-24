import { getValidEvents } from "@/api/event";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Shell } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExplorePage() {
  const { data, status } = useQuery({
    queryKey: ["getValidEvents"],
    queryFn: () => getValidEvents(),
  });
  if (status === "pending")
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <Shell className="animate-spin" />
      </div>
    );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {data?.events
        .filter((event) => event.status === "ACCEPT")
        .map((event, index) => (
          <Link key={index} to={`/explore/${event.id}`}>
            <Card className="max-w-[350px] p-4">
              <div className="flex justify-center items-center min-h-56">
                <img className="rounded-md" src={event.images[0]} alt="hii" />
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>

              <CardFooter className="flex justify-between">
                <Button>View Event</Button>
                <h3 className="flex items-center">
                  <MapPin size={20} /> {event.location}
                </h3>
              </CardFooter>
            </Card>
          </Link>
        ))}
    </div>
  );
}
