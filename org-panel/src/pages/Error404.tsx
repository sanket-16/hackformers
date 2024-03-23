import { Link, useRouteError } from "react-router-dom";

const Error404 = () => {
  const err = useRouteError();
  // console.log(err);

  return (
    <div className="  flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-7xl ">OOPS!!!</h1>
        <h2 className="text-5xl mt-5">Something went Wrong</h2>
        <h2 className="text-5xl mt-5 ">
          {err?.statusText} {err?.status}
        </h2>
        <h2 className="text-5xl">{err?.data}</h2>
        <Link to="/">
          {" "}
          <h3 className="text-3xl underline">Back To Home Page</h3>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
