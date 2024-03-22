import { ModeToggle } from "@/components/mode-toggle";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <ModeToggle />
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Link to={"/auth"}>Hi</Link>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default HomePage;
