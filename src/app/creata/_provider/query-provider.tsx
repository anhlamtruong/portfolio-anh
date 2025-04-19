"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Create the QueryClient outside the component to persist across renders
const queryClientCreata = new QueryClient();

export function CreataQueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClientCreata}>
      {children}
    </QueryClientProvider>
  );
}
