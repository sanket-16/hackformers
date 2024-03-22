import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExplorePage() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {Array(18)
        .fill("")
        .map((_, index) => (
          <Card
            onClick={() => navigate("/explore/:id")}
            key={index}
            className="w-[350px]"
          >
            <div className="flex justify-center items-center pt-5">
              <img
                className="rounded-md"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1eqbqRA6CWjo8C25j0GBcph8X5MslX2vKOh2BHPmzgkXtzgCN0AvPf58s42__xZlmnvk&usqp=CAU"
                alt="hii"
              />
            </div>
            <CardHeader>
              <CardTitle>Title</CardTitle>
              <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Incidunt maiores perspiciatis, praesentium possimus ad expedita,
                nemo libero ea repellat vero dolores voluptas.
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <Button>View Event</Button>
              <h3 className="flex items-center">
                <MapPin size={20} /> Mumbai
              </h3>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
