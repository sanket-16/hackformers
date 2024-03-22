import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-10">
      <h1>EventMgmt</h1>
      <ul className="flex items-center gap-4">
        <li>1</li>
        <li>2</li>
        <ModeToggle />

      </ul>
    </nav>
  );
};

export default Navbar;
