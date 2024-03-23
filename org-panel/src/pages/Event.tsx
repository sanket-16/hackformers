import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Event = () => {
  return (
    <div className="flex w-full flex-col  p-8 ">
      <h1 className="font-bold">Events</h1>
      <div className="pt-10">
        <h3 className="font-bold">Upcoming Events</h3>
        <div className="flex space-x-5 overflow-hidden overflow-x-scroll	 mt-3">
          {Array(29)
            .fill("")
            .map((_, index) => (
              <Card key={index} className="w-[350px]">
                <CardHeader>
                  <CardTitle>Event Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-foreground/50 py-4 font-medium text-sm">
                    <span className="flex items-center">
                      <span> Location : Mumbai</span>
                    </span>
                    <span>Event Date : 23/03/2024</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View More Details</Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader>
                        <DialogTitle>Event Name</DialogTitle>
                      </DialogHeader>
                      <div className="text-foreground/50 py-4 font-medium text-sm">
                        <span className="flex items-center">
                          <span> Location : Mumbai</span>
                        </span>
                        <span>Event Date : 23/03/2024</span>
                        <p className="flex flex-col py-4">
                          Description:
                          <span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Qui architecto pariatur, incidunt iure et
                            voluptatibus in. Nam, ullam inventore? Et,
                            consectetur?
                          </span>
                        </p>
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
      <div className="pt-10">
        <h3 className="font-bold">Current Events</h3>
        <div className="flex space-x-5 overflow-hidden overflow-x-scroll	 mt-3">
          {Array(29)
            .fill("")
            .map((_, index) => (
              <Card key={index} className="w-[350px]">
                <CardHeader>
                  <CardTitle>Event Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-foreground/50 py-4 font-medium text-sm">
                    <span className="flex items-center">
                      <span> Location : Mumbai</span>
                    </span>
                    <span>Event Date : 23/03/2024</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View More Details</Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader>
                        <DialogTitle>Event Name</DialogTitle>
                      </DialogHeader>
                      <div className="text-foreground/50 py-4 font-medium text-sm">
                        <span className="flex items-center">
                          <span> Location : Mumbai</span>
                        </span>
                        <span>Event Date : 23/03/2024</span>
                        <p className="flex flex-col py-4">
                          Description:
                          <span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Qui architecto pariatur, incidunt iure et
                            voluptatibus in. Nam, ullam inventore? Et,
                            consectetur?
                          </span>
                        </p>
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
    </div>
  );
};

export default Event;
