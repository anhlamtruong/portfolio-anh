import { Suspense, type ReactNode } from "react";
import { HydrateClient, prefetch, trpc } from "../_trpc/server";
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
  prefetch(trpc.creata.getComponentsMetaData.queryOptions()); // Prefetch the components metadata

  return (
    <HydrateClient>
      {/* Suspense fallback for loading state */}
      <Suspense fallback={<PageContentLoading />}>
        {/* Main content */}
        <main>{children}</main>;
      </Suspense>
    </HydrateClient>
  );
}
