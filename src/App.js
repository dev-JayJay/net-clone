import React from "react";
import { HomePage } from "./components/pages/homePage/homePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from '@tanstack/react-router';
import router from "./components/routes/router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <HomePage />
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
