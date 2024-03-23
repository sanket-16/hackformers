
import Announcement from "@/components/Announcement";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const BookingDetails = () => {
  return <>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div>
          <Carousel className="w-full max-w-lg">
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
        <div className="space-y-4">
          <h1 className="text-xl font-bold">Event Title</h1>
          <div className="flex gap-4 py-6 flex-col">
            <span> Location : Mumbai </span>
            <span>Event Date : 10-20-2024</span>
          </div>
          <Announcement/>

        </div>
      </div>
    
  </>;
};

export default BookingDetails;
