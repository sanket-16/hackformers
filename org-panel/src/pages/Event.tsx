import {
  addAnnouncement,
  getEventsByOrg,
  updateEventStatus,
} from "@/api/event";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Shell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Event = () => {
  const [announcement, setAnnouncement] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const { data, status } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
  });
  const { data: eventData, status: eventStatus } = useQuery({
    queryKey: ["getEventsByOrganization"],
    queryFn: () => getEventsByOrg({ id: String(data?.user.organizationId) }),
    enabled: data?.user.organizationId !== null && status === "success",
  });
  console.log(eventData, eventStatus);

  const updateEventStatusMutation = useMutation({
    mutationKey: ["updateEventStatus"],
    mutationFn: updateEventStatus,
    onSuccess: (data) => {
      toast.dismiss("loading");
      toast.success("Successfully updated status");
      queryClient.invalidateQueries({ queryKey: ["getEventsByOrganization"] });
      console.log(data);
    },
    onError: (error) => {
      toast.dismiss("loading");
      toast.error("Failed to updat status.Please try again!");
      queryClient.invalidateQueries({ queryKey: ["getEventsByOrganization"] });
      console.log(error);
    },
  });
  const addAnnouncementMutation = useMutation({
    mutationKey: ["addAnnouncement"],
    mutationFn: addAnnouncement,
    onSuccess: (data) => {
      toast.dismiss("loading");
      toast.success("Successfully added announcement.");
      // queryClient.invalidateQueries({ queryKey: ["getEventsByOrganization"] });
      console.log(data);
    },
    onError: (error) => {
      toast.dismiss("loading");
      toast.error("Failed to update announcement.Please try again!");
      // queryClient.invalidateQueries({ queryKey: ["getEventsByOrganization"] });
      console.log(error);
    },
  });

  if (status === "pending" || eventStatus === "pending")
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <Shell className="animate-spin" />
      </div>
    );
  return (
    <div className="flex w-full flex-col  p-8 ">
      <h1 className="font-bold">Events</h1>
      <div className="pt-10">
        <h3 className="font-bold">Upcoming Events</h3>
        <div className="flex space-x-5 overflow-hidden overflow-x-scroll	 mt-3">
          {eventData?.events
            .filter((event) => event.status === "PENDING")
            .map((event, index) => (
              <Card key={index} className="w-[350px]">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-foreground/50 py-4 font-medium text-sm">
                    <span className="flex items-center">
                      <span> Location : {event.location}</span>
                    </span>
                    <span>
                      Event Date : {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View More Details</Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader>
                        <DialogTitle>{event.title}</DialogTitle>
                      </DialogHeader>
                      <div className="text-foreground/50 py-4 font-medium text-sm">
                        <span className="flex items-center">
                          <span> Location : {event.location}</span>
                        </span>
                        <span>Event Date : 23/03/2024</span>
                        <p className="flex flex-col py-4">
                          Description:
                          <span>{event.description}</span>
                        </p>
                      </div>
                      <DialogFooter>
                        <Button
                          type="submit"
                          onClick={() => {
                            toast.loading("Updating status of the event.", {
                              id: "loading",
                            });
                            updateEventStatusMutation.mutateAsync({
                              id: event.id,
                              status: "ACCEPT",
                            });
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          type="submit"
                          onClick={() => {
                            toast.loading("Updating status of the event.", {
                              id: "loading",
                            });
                            updateEventStatusMutation.mutateAsync({
                              id: event.id,
                              status: "REJECT",
                            });
                          }}
                        >
                          Reject
                        </Button>
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
          {eventData?.events
            .filter((event) => event.status === "ACCEPT")
            .map((event, index) => (
              <Card key={index} className="w-[350px]">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-foreground/50 py-4 font-medium text-sm">
                    <span className="flex items-center">
                      <span> Location : {event.location}</span>
                    </span>
                    <span>
                      Event Date : {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View More Details</Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader>
                        <DialogTitle>{event.title}</DialogTitle>
                      </DialogHeader>
                      <div className="text-foreground/50 py-4 font-medium text-sm">
                        <span className="flex items-center">
                          <span> Location : {event.location}</span>
                        </span>
                        <span className="flex items-center">
                          <span>
                            Number of participants so far :{" "}
                            {event?.participantsIds.length}
                          </span>
                        </span>
                        <span className="flex items-center">
                          <span>
                            Number of users that have access so far :{" "}
                            {event?.userIds.length}
                          </span>
                        </span>
                        <span>
                          Event Date :{" "}
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <p className="flex flex-col py-4">
                          Description:
                          <span>{event.description}</span>
                        </p>
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="announcement" className="font-bold">
                          Add Announcement
                        </Label>
                        <div className="flex gap-6 items-center">
                          <Input
                            value={announcement}
                            onChange={(event) =>
                              setAnnouncement(event.currentTarget.value)
                            }
                          />
                          <Input
                            value={description}
                            onChange={(event) =>
                              setDescription(event.currentTarget.value)
                            }
                          />
                          <Button
                            onClick={() => {
                              toast.loading("Creating announcement...", {
                                id: "loading",
                              });
                              addAnnouncementMutation.mutateAsync({
                                description,
                                title: announcement,
                                eventId: event.id,
                                time: new Date(),
                              });
                            }}
                          >
                            Add
                          </Button>
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
