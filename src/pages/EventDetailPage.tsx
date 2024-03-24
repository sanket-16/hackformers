import { addParticipantsToEvent, getEvent } from "@/api/event";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { getUser } from "@/lib/auth";

const EventDetailPage = () => {
  const { id } = useParams();
  const { data: userData, status: userStatus } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
  });
  const { data, status } = useQuery({
    queryKey: ["getEventDetails"],
    queryFn: () => getEvent({ id: String(id) }),
    enabled: id !== undefined || id !== null,
  });
  const bookEventMutation = useMutation({
    mutationKey: ["bookEvent"],
    mutationFn: () =>
      addParticipantsToEvent({
        eventId: String(data?.event.id),
        userId: String(userData?.user.id),
      }),
    onSuccess: (data) => {
      toast.dismiss("loading");
      toast.success("Successfully booked event.");
      console.log(data);
    },
    onError: (error) => {
      toast.dismiss("loading");
      toast.error("Failed to book event, Please try again!");
      console.log(error);
    },
  });
  console.log(data);
  if (status === "pending")
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <Shell className="animate-spin" />
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
          <Carousel className="w-full max-w-lg">
            <CarouselContent>
              {data?.event.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img src={image} alt="alt text" className="rounded-md" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold">{data?.event.title}</h1>
          <div className="flex gap-4 py-6 flex-col">
            <span> Location : {data?.event.location} </span>
            <span>
              Event Date :{" "}
              {new Date(String(data?.event.date)).toLocaleDateString()}
            </span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Book Event</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to book for this particular event?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    toast.loading("Booking a seat for you in the event...", {
                      id: "loading",
                    });
                    bookEventMutation.mutateAsync();
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="pt-5 font-bold">Description :</h3>
        {data?.event.description}
      </div>
    </>
  );
};

export default EventDetailPage;
