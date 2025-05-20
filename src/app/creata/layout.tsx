import { Suspense, type ReactNode } from "react";
import { HydrateClient, prefetch, trpc } from "./_trpc/server";
import { PageContentLoading } from "@/components/ui/loading";
import { CreataQueryProviders } from "./_provider/query-provider";
import { TRPCReactProvider } from "./_trpc/client";
/**
 * CreataDashboardLayout component.
 * This layout wraps the children components with necessary providers and suspense fallback.
 */
export default async function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  prefetch(trpc.creata.getComponentsMetaData.queryOptions()); // Prefetch the components metadata

  return (
    <CreataQueryProviders>
      <TRPCReactProvider>
        <HydrateClient>
          {/* Suspense fallback for loading state */}
          <Suspense fallback={<PageContentLoading />}>
            {/* Main content */}
            <main>{children}</main>;
          </Suspense>
        </HydrateClient>
      </TRPCReactProvider>
    </CreataQueryProviders>
  );
}
