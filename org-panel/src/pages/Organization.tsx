import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Organization = () => {
  return (
    <>
      <div className="flex w-full flex-col p-8">
        <h1 className="font-bold ">Organization</h1>
        <div className="py-10">
          <h3 className="font-bold">Public Page of Organization</h3>
          <div className="p-2 px-10">
            <div className="w-full flex items-center justify-center">
              {" "}
              <Carousel className="w-full max-w-md">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-semibold">
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
        <div className="py-10">
          <h3 className="font-bold">Manage Organizers</h3>
          <div className="flex">
            <div className=" overflow-hidden overflow-y-scroll h-96 mt-3 w-1/2 space-y-2 p-4">
              {Array(29)
                .fill("")
                .map((_, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-muted/50 rounded-md hover:cursor-pointer"
                  >
                    <p className="font-bold">Sanket Patil</p>
                    <span className="text-sm">san162002@gmail.com</span>
                  </div>
                ))}
            </div>
            <div className="px-4 space-y-6 w-full py-6">
              <Label>Add Organizers</Label>
              <Input className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organization;
