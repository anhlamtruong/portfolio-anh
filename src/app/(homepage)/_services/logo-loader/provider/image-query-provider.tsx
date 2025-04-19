"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Create the QueryClient outside the component to persist across renders
const queryClient = new QueryClient();

export function QueryProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
