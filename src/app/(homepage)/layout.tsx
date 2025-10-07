import { Suspense, type ReactNode } from "react";
import { HydrateClient, prefetch, trpc } from "./_trpc/server";
import { PageContentLoading } from "@/components/ui/loading";

export default function HomePageDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  prefetch(trpc.homepage.getLogos.queryOptions()); // Prefetch the components metadata
  prefetch(trpc.homepage.getPageView.queryOptions()); // Prefetch the components metadata
  return (
    <HydrateClient>
      <Suspense fallback={<PageContentLoading />}>{children}</Suspense>
    </HydrateClient>
  );
}
