import { Suspense, type ReactNode } from "react";
import { PageContentLoading } from "@/components/ui/loading";
import { HydrateClient } from "../../(homepage)/_trpc/server";

export default function LinksLayout({ children }: { children: ReactNode }) {
  return (
    <HydrateClient>
      <Suspense fallback={<PageContentLoading />}>{children}</Suspense>
    </HydrateClient>
  );
}
