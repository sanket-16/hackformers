import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Organization from "./pages/Organization.tsx";
import Event from "./pages/Event.tsx";
import Error404 from "./pages/Error404.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement :<Error404/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/organization",
        element: <Organization/>,
      },
      {
        path: "/event",
        element: <Event/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
