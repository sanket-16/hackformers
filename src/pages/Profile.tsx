import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Shell } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserBookedEvents, getUserCreatedEvents } from "@/api/event";
import { getUser } from "@/lib/auth";

const ProfilePage = () => {
  const { data, status } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
  });
  const { data: userCreatedEvents, status: userCreatedEventsStatus } = useQuery(
    {
      queryKey: ["getUserCreatedEvents"],
      queryFn: () => getUserCreatedEvents(),
    }
  );
  const { data: participatedEvents, status: participatedEventsStatus } =
    useQuery({
      queryKey: ["getUserBookedEvents"],
      queryFn: () => getUserBookedEvents(),
    });
  console.log(participatedEvents);

  if (
    status === "pending" ||
    userCreatedEventsStatus === "pending" ||
    participatedEventsStatus === "pending"
  )
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <Shell className="animate-spin" />
      </div>
    );

  return (
    <div>
      {/* <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>Change Password</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div> */}
      <h1 className="font-bold text-xl">Hello {data?.user.name},</h1>

      <h1 className="font-bold pt-10 pb-4">Events You Booked</h1>
      <div className="flex overflow-x-scroll space-x-3 overflow-y-none ">
        {participatedEvents?.events.map((event, index) => (
          <Card key={index} className="max-w-[350px] p-4">
            <div className="flex justify-center items-center min-h-56">
              <img className="rounded-md" src={event.images[0]} alt="hii" />
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Link to="/profile/booking">
                <Button>View Event</Button>
              </Link>
              <h3 className="flex items-center">
                <MapPin size={20} /> {event.location}
              </h3>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h1 className="font-bold pt-10 pb-4">Event You Created</h1>
      <div className="flex overflow-x-scroll space-x-3 overflow-y-none ">
        {userCreatedEvents?.events.map((event, index) => (
          <Card key={index} className="max-w-[350px] p-4">
            <div className="flex justify-center items-center min-h-56">
              <img className="rounded-md" src={event.images[0]} alt="hii" />
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Link to="/profile/event-id">
                <Button>View Details</Button>
              </Link>
              <h3 className="flex items-center">
                <MapPin size={20} /> {event.location}
              </h3>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
