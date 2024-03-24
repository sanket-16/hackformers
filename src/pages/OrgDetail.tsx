import * as React from "react";
import { getOrg } from "@/api/organization";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Shell } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ImageUpload";
import { OutputFileEntry } from "@uploadcare/blocks";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createEvent } from "@/api/event";
import { toast } from "sonner";

const OrgDetail = () => {
  const [date, setDate] = React.useState<Date>();
  const [files, setFiles] = useState<OutputFileEntry<"success">[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ["getOrganization"],
    queryFn: () => getOrg({ id: String(id) }),
    enabled: id !== undefined || id !== null,
  });
  console.log(data);
  const createEventMutation = useMutation({
    mutationKey: ["createOrganization"],
    mutationFn: () =>
      createEvent({
        title,
        description,
        date: date as Date,
        images: files.map((file) => file.fileInfo.cdnUrl) as string[],
        organizationId: String(data?.organization.id),
        location,
      }),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["getOrganization"] });
      // queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast.dismiss("loading");
      toast.success("Event successfully created.");
      console.log(data);
    },
    onError: (error) => {
      toast.dismiss("loading");
      toast.error("Event creation failed. Please try again!");
      console.log(error);
    },
  });
  if (status === "pending")
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Shell className="animate-spin" />
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
          <Carousel className="w-full max-w-lg">
            <CarouselContent>
              {data?.organization.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img className="rounded-md" src={image} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold">{data?.organization.name}</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button> Book Event Organizer</Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Create Event</DialogTitle>
                <DialogDescription>
                  Create your own event and get information about budget and
                  misc from the event organizer of your choice.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    className="col-span-3"
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    className="col-span-3"
                    value={location}
                    onChange={(event) => setLocation(event.currentTarget.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal w-full col-span-3",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3"
                    value={description}
                    onChange={(event) =>
                      setDescription(event.currentTarget.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="images" className="text-right">
                    Images
                  </Label>
                  <div className="col-span-3">
                    <ImageUpload files={files} setFiles={setFiles} />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  // disabled={createOrganizationMutation.status === "pending"}
                  type="submit"
                  onClick={() => {
                    toast.loading("Creating your organization...", {
                      id: "loading",
                    });
                    createEventMutation.mutateAsync();
                  }}
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="  pt-5 font-bold">Description :</h3>
        {data?.organization.description}
      </div>
    </>
  );
};

export default OrgDetail;
