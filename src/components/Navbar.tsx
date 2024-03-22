import { ModeToggle } from "@/components/mode-toggle";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-10">
      <h1>EventMgmt</h1>
      <ul className="flex items-center gap-4">
        <li>1</li>
        <Link to="/profile"><CircleUserRound /></Link>
        <li></li>
        <ModeToggle />

      </ul>
    </nav>
  );
};

export default Navbar;
