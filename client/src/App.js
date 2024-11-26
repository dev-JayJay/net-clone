import React from "react";
import { HomePage } from "./components/pages/homePage/homePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from '@tanstack/react-router';
import router from "./components/routes/router";
import { KeycloakProvider } from "./keycloak";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <KeycloakProvider>
        <RouterProvider router={router}>
          <HomePage />
        </RouterProvider>
      </KeycloakProvider>
    </QueryClientProvider>
  );
}

export default App;
