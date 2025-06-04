import { ReactNode, Suspense } from "react";
import { CreataQueryProviders } from "../../_provider/query-provider";
import { TRPCReactProvider } from "../../_trpc/client";
import { HydrateClient } from "../../_trpc/server";
import { PageContentLoading } from "@/components/ui/loading";

/**
 * CreataAccountLayout component.
 * This layout wraps the children components with necessary providers and suspense fallback.
 */
export default async function CreataAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <CreataQueryProviders>
        <TRPCReactProvider>
          <HydrateClient>
            <Suspense fallback={<PageContentLoading />}>{children};</Suspense>
          </HydrateClient>
        </TRPCReactProvider>
      </CreataQueryProviders>
    </>
  );
}
