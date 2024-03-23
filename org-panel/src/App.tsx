import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import SideBar from "./components/SideBar";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <main className="flex w-full">
          <SideBar/>
          <Outlet />
          
        </main>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
