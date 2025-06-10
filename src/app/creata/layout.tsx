import { ReactNode, Suspense } from "react";
import { HydrateClient, prefetch, trpc } from "./_trpc/server";
import { CreataQueryProviders } from "./_provider/query-provider";
import { TRPCReactProvider } from "./_trpc/client";
import { PageContentLoading } from "@/components/ui/loading";
/**
 * CreataDashboardLayout component.
 * This layout wraps the children components with necessary providers and suspense fallback.
 */
export default async function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CreataQueryProviders>
      <TRPCReactProvider>
        <main>{children}</main>
      </TRPCReactProvider>
    </CreataQueryProviders>
  );
}
