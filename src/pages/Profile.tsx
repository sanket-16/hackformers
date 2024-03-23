import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div>
      <div>
      <Sheet>
      <SheetTrigger asChild>
        <Button >Chnage Password</Button>
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
      </div>
      <h1 className="text-center text-4xl">Hello Sanket Patil</h1>

      <h1 className="text-2xl">Events You Booked</h1>
      <div className="flex overflow-x-scroll space-x-3 overflow-y-none ">
        {Array.from({ length: 20 }).map((_, index) => (
          <Card key={index} className="w-[350px]">
            <div className="flex justify-center items-center pt-5">
              <img
                className="rounded-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eqbqRA6CWjo8C25j0GBcph8X5MslX2vKOh2BHPmzgkXtzgCN0AvPf58s42__xZlmnvk&usqp=CAU"
                alt="hii"
              />
            </div>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Incidunt maiores perspiciatis, praesentium possimus ad expedita,
                nemo libero ea repellat vero dolores voluptas.
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Link to="/profile/booking">
              <Button>View Event</Button>
              </Link>
              <h3 className="flex items-center">
                <MapPin size={20} /> Mumbai
              </h3>
            </CardFooter>
          </Card>
        ))}
      </div>
   

      <h1 className="text-2xl mt-10">Event You Created</h1>
      <div className="flex overflow-x-scroll space-x-3 overflow-y-none ">
        {Array.from({ length: 20 }).map((_, index) => (
          <Card key={index} className="w-[350px]">
            <div className="flex justify-center items-center pt-5">
              <img
                className="rounded-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eqbqRA6CWjo8C25j0GBcph8X5MslX2vKOh2BHPmzgkXtzgCN0AvPf58s42__xZlmnvk&usqp=CAU"
                alt="hii"
              />
            </div>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Incidunt maiores perspiciatis, praesentium possimus ad expedita,
                nemo libero ea repellat vero dolores voluptas.
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Link to="/profile/event-id">
              <Button>View Details</Button>
              </Link>
              <h3 className="flex items-center">
                <MapPin size={20} /> Mumbai
              </h3>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
