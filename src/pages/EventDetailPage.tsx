import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const EventDetailPage = () => {
  return (
    <>
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

          <Button> Book Event</Button>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="  pt-5 font-bold">Description :</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        adipisci illo explicabo inventore, officia cupiditate est porro beatae
        sint voluptatum dolor aut repellat voluptatem sit quae error commodi.
        Dolores deleniti, animi ipsa ducimus temporibus ea aliquid alias fuga
        saepe laborum excepturi incidunt praesentium earum possimus officia
        accusamus odit in corrupti sint. Totam numquam iste accusantium tenetur
        perferendis vero quam saepe voluptatum! Iusto recusandae saepe
        voluptates quasi deserunt cupiditate obcaecati mollitia possimus fugiat
        doloremque dolorum perferendis unde rem, sed at eum placeat repudiandae
        debitis, labore quae, aspernatur deleniti quibusdam iure! Odit voluptas
        accusantium explicabo quisquam aperiam sit praesentium accusamus dolore
        eius quia enim iusto tenetur hic ex dolor esse consequuntur
        necessitatibus fugit, perferendis et voluptates a dicta dignissimos.
        Dolores recusandae impedit aliquam fuga quam?
      </div>
    </>
  );
};

export default EventDetailPage;
