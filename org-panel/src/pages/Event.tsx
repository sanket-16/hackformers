import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
const Event = () => {
  return (
    <div className="flex w-full flex-col  px-10 ">
      <h1 className="text-4xl font-bold text-center ">Events</h1>
      <div>
        <h1 className="text-3xl ">Upcomming Events</h1>
        <div className="flex space-x-5 overflow-hidden overflow-x-scroll	 mt-3">
          {Array(29)
            .fill("")
            .map((_, index) => (
              <Card key={index} className="w-[350px]">
                <CardHeader>
                  <CardTitle>Event Name</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Qui architecto pariatur, incidunt iure et voluptatibus in.
                    Nam, ullam inventore? Et, consectetur?
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View More Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Event Name</DialogTitle>
                        <DialogDescription>Description</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-col-1  items-center gap-4">
                          <h1 className="text-5xl">Title</h1>
                          <h2 className="flex text-2xl items-center">
                            Loaction -{" "}
                            <span>
                              <MapPin size={25} />
                            </span>
                            Mumbai{" "}
                          </h2>

                          <h3 className="text-2xl">Event Date - 10-20-2020</h3>

                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Accept</Button>
                        <Button type="submit">Reject</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
        </div>
        <div></div>
      </div>
      <div>
        <h1 className="text-3xl ">Events Ended</h1>
        <div className="flex space-x-5 overflow-hidden overflow-x-scroll	 mt-3">
          {Array(29)
            .fill("")
            .map((_, index) => (
              <Card key={index} className="w-[350px]">
                <CardHeader>
                  <CardTitle>Event Name</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Qui architecto pariatur, incidunt iure et voluptatibus in.
                    Nam, ullam inventore? Et, consectetur?
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View More Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Event Name</DialogTitle>
                        <DialogDescription>Description</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-col-1  items-center gap-4">
                          <h1 className="text-5xl">Title</h1>
                          <h2 className="flex text-2xl items-center">
                            Loaction -{" "}
                            <span>
                              <MapPin size={25} />
                            </span>
                            Mumbai{" "}
                          </h2>

                          <h3 className="text-2xl">Event Date - 10-20-2020</h3>

                        </div>
                      </div>
                     
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Event;
