import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getUser } from "@/lib/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Shell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ImageUpload";
import { OutputFileEntry } from "@uploadcare/blocks";
import { useState } from "react";
import { addOrganizerToOrg, createOrg, getOrg } from "@/api/organization";
import { toast } from "sonner";

const Organization = () => {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<OutputFileEntry<"success">[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const { data, status } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
  });
  const { data: orgData, status: orgStatus } = useQuery({
    queryKey: ["getOrganization"],
    queryFn: () => getOrg({ id: String(data?.user.organizationId) }),
    enabled: data?.user.organizationId !== null && status === "success",
  });
  console.log(orgData);
  const createOrganizationMutation = useMutation({
    mutationKey: ["createOrganization"],
    mutationFn: () =>
      createOrg({
        name,
        description,
        images: files.map((file) => file.fileInfo.cdnUrl) as string[],
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getOrganization"] });
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast.dismiss("loading");
      toast.success("Organization successfully created.");
      console.log(data);
    },
    onError: (error) => {
      toast.dismiss("loading");
      toast.error("Organization creation failed. Please try again!");
      console.log(error);
    },
  });
  const addOrganizerToOrganization = useMutation({
    mutationKey: ["addOrganizerToOrganization"],
    mutationFn: () =>
      addOrganizerToOrg({ email, id: String(orgData?.organization.id) }),
    onSuccess: (data) => {
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["getOrganization"] });
      toast.dismiss("loading");
      toast.success("Organizer successfully added to organization.");
      console.log(data);
    },
    onError: (error) => {
      toast.dismiss("loading");
      toast.error(
        "Organizer failed to add to the organization. Please try again!"
      );
      console.log(error);
    },
  });
  console.log(data);
  if (status === "pending" || orgStatus === "pending")
    return (
      <div className="h-[90vh] w-full flex items-center justify-center">
        <Shell className="animate-spin" />
      </div>
    );
  if (data?.user.organizationId === null)
    return (
      <div className="flex w-full items-center justify-center flex-col p-8 gap-4">
        <h3 className="text-2xl">Don't have a organization?</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
              <DialogDescription>
                Create your own organization to receive requests from clients.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="organizationName" className="text-right">
                  Organization Name
                </Label>
                <Input
                  id="organizationName"
                  className="col-span-3"
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                />
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
                disabled={createOrganizationMutation.status === "pending"}
                type="submit"
                onClick={() => {
                  toast.loading("Creating your organization...", {
                    id: "loading",
                  });
                  createOrganizationMutation.mutateAsync();
                }}
              >
                Create Organization
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  return (
    <>
      <div className="flex w-full flex-col p-8">
        Organization
        <div className="py-10">
          <h3 className="font-bold">Public Page of Organization</h3>
          <div className="p-2 px-10">
            <div className="w-full flex items-center justify-center">
              <Carousel className="w-full max-w-md">
                <CarouselContent>
                  {orgData?.organization.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <img src={image} alt="image" className="rounded-md" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="py-4 flex flex-col gap-6">
              <div>
                <p className="font-bold">Organization Name:</p>
                <span>{orgData?.organization.name}</span>
              </div>
              <div>
                <p className="font-bold">Description:</p>
                <span>{orgData?.organization.description}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <h3 className="font-bold">Manage Organizers</h3>
          <div className="flex">
            <div className=" overflow-hidden overflow-y-scroll h-96 mt-3 w-1/2 space-y-2 p-4">
              {orgData?.organization.organizers.map((organizer, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-muted/50 rounded-md hover:cursor-pointer"
                >
                  <p className="font-bold">{organizer.name}</p>
                  <span className="text-sm">{organizer.email}</span>
                </div>
              ))}
            </div>
            <div className="px-4 space-y-6 w-full py-6">
              <Label>Add Organizers</Label>
              <Input
                className="w-full"
                value={email}
                type="email"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <Button
                onClick={() => {
                  toast.loading("Adding organizer to organization", {
                    id: "loading",
                  });
                  addOrganizerToOrganization.mutateAsync();
                }}
              >
                Add Organizer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organization;
