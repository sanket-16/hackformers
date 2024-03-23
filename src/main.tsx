import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/Profile";
import AuthPage from "./pages/Auth";
import ExplorePage from "./pages/ExplorePage.tsx"
import LandingPage from "./pages/LandingPage.tsx";
import EventDetailPage from "./pages/EventDetailPage.tsx";
import Org from "./pages/Org.tsx";
import OrgDetail from "./pages/OrgDetail.tsx";
import Error404 from "./pages/Error404.tsx";
import BookingDetails from "./pages/BookingDetails.tsx";
import CreatedEventDetail from "./pages/CreatedEventDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement :<Error404/>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "explore",
        element: <ExplorePage/>,

      },
      {
        path:"explore/:id",
        element:<EventDetailPage/>
      },
      {
        path: "org",
        element: <Org/>,

      },
      {
        path:"org/:id",
        element:<OrgDetail/>
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/profile/booking",
        element: <BookingDetails />,
      },
      {
        path: "profile/event-id",
        element: <CreatedEventDetail />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
