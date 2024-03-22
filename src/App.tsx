import { ThemeProvider } from "./components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import AuthPage from "./pages/Auth";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/auth/login",
    element: <p>Login</p>,
  },
  {
    path: "/auth/signup",
    element: <p>Signup</p>,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="px-20">
        <Navbar />
        <RouterProvider router={router} />
      </main>
    </ThemeProvider>
  );
}

export default App;
