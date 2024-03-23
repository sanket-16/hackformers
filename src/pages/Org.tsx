import { getAllOrg } from "@/api/organization";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Shell } from "lucide-react";
import { Link } from "react-router-dom";

const Org = () => {
  const { data, status } = useQuery({
    queryKey: ["getAllOrganizations"],
    queryFn: () => getAllOrg(),
  });
  console.log(data);
  if (status === "pending")
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <Shell className="animate-spin" />
      </div>
    );
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {data?.map((org) => (
            <Link to={`/org/${org.id}`}>
              <Card key={org.id} className="w-[350px]">
                <div className="flex justify-center items-center pt-5">
                  <img className="rounded-md" src={org.images[0]} alt="hii" />
                </div>
                <CardHeader>
                  <CardTitle>{org.name}</CardTitle>
                  <CardDescription>{org.description}</CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-between">
                  <Button>View Event</Button>
                  <h3 className="flex items-center">
                    <MapPin size={20} /> Mumbai
                  </h3>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Org;
