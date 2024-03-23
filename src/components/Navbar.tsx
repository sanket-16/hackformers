import { ModeToggle } from "@/components/mode-toggle";
import { getUser } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Navbar = () => {
  const { data, status } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
  });
  console.log(data);
  return (
    <nav className="flex justify-between py-10">
      <h1 className="font-bold text-lg">
        <Link to={"/explore"}>EventMGMT</Link>
      </h1>
      <ul className="flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link to="/explore">Explore Events</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/org">Create Event</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/org">Become a organizer</Link>
        </Button>
        {status === "success" && (
          <Button asChild variant="outline">
            <Link to="/profile">{data?.user.email}</Link>
          </Button>
        )}
        {status === "error" && (
          <Button asChild variant="outline">
            <Link to="/auth">Login</Link>
          </Button>
        )}
        {status === "pending" && <Skeleton className="w-24 h-12 rounded-md" />}
        <li></li>
        <ModeToggle />
      </ul>
    </nav>
  );
};

export default Navbar;
