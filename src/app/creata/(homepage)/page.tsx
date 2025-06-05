import { Suspense } from "react"

import HomePageComponent from "../_component/home-page"
import { HydrateClient, prefetch, trpc } from "../_trpc/server"
import { PageContentLoading } from "@/components/ui/loading"
import { CreataQueryProviders } from "../_provider/query-provider"
import { TRPCReactProvider } from "../_trpc/client"

export default async function CreataDashboardPage() {
  prefetch(trpc.creata.getComponentsMetaData.queryOptions()) // Prefetch the components metadata
  return (
    <CreataQueryProviders>
      <TRPCReactProvider>
        <HydrateClient>
          {/* Suspense fallback for loading state */}
          <Suspense fallback={<PageContentLoading />}>
            <HomePageComponent></HomePageComponent>;
          </Suspense>
        </HydrateClient>
      </TRPCReactProvider>
    </CreataQueryProviders>
  )
}
