import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <main className="px-20">
          <Outlet />
        </main>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
