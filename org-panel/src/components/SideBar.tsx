import { getUser } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Mail, PieChart, SquareKanban, User } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const SideBar = () => {
  const { data, status } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getUser(),
  });
  console.log(data);
  if (status === "error" || status === "pending") return null;

  return (
    <div>
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden "
      >
        <span className="sr-only">Open sidebar</span>
      </button>

      <aside
        id="separator-sidebar"
        className="sticky top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li className="font-bold text-2xl p-4">
              <Link to="/dashboard">EventMGMT</Link>
            </li>
            <li>
              <Button
                asChild
                className="w-full flex items-center justify-start"
                variant="ghost"
              >
                <Link
                  to="/dashboard"
                  className="flex items-center p-2 rounded-lg  group"
                >
                  <PieChart />
                  <span className="ms-3">Dashboard</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                className="w-full flex items-center justify-start"
                variant="ghost"
              >
                <Link
                  to="/event"
                  className="flex items-center p-2  rounded-lg  group"
                >
                  <SquareKanban />
                  <span className="flex-1 ms-3 whitespace-nowrap">Event</span>
                </Link>
              </Button>
            </li>
            <li>
              <Button
                asChild
                className="w-full flex items-center justify-start"
                variant="ghost"
              >
                <Link
                  to="/organization"
                  className="flex items-center p-2 rounded-lg  group"
                >
                  <Mail />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Organization
                  </span>
                </Link>
              </Button>
            </li>
          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium border-t">
            <li>
              <Button asChild variant="outline" className="w-full">
                <Link
                  to="/profile"
                  className="flex items-center p-2 rounded-lg  group"
                >
                  <User />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {data.user.name}
                  </span>
                </Link>
              </Button>
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
