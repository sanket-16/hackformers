import { getOrg } from "@/api/organization";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
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
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ImageUpload";
import { OutputFileEntry } from "@uploadcare/blocks";
import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";

const OrgDetail = () => {
  const [files, setFiles] = useState<OutputFileEntry<"success">[]>([]);
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ["getOrganization"],
    queryFn: () => getOrg({ id: String(id) }),
    enabled: id !== undefined || id !== null,
  });
  console.log(data);
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
                    // value={name}
                    // onChange={(event) => setName(event.currentTarget.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    className="col-span-3"
                    // value={name}
                    // onChange={(event) => setName(event.currentTarget.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <DatePicker />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    className="col-span-3"
                    // value={description}
                    // onChange={(event) =>
                    //   setDescription(event.currentTarget.value)
                    // }
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
                  // onClick={() => {
                  //   toast.loading("Creating your organization...", {
                  //     id: "loading",
                  //   });
                  //   createOrganizationMutation.mutateAsync();
                  // }}
                >
                  Create Organization
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
