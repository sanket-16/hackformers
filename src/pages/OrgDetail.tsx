import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
const OrgDetail = () => {
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
        <h1 className="text-5xl">Title</h1>
        <h2 className="flex text-2xl items-center">
          Loaction -{" "}
          <span>
            <MapPin size={25} />
          </span>
          Mumbai{" "}
        </h2>

        <h3 className="text-2xl">Event Date - 10-20-2020</h3>

        <Button> Book Event</Button>

      </div>
    
    </div>
      <div>
      <h3 className=" text-4xl pt-5">Description :</h3>
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

export default OrgDetail;
