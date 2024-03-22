import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="px-20">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
