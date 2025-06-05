import { ReactNode, Suspense } from "react"
import { CreataQueryProviders } from "../../_provider/query-provider"
import { TRPCReactProvider } from "../../_trpc/client"
import { HydrateClient, prefetch, trpc } from "../../_trpc/server"
import { PageContentLoading } from "@/components/ui/loading"
import NavigationBar from "../../_component/navigation-bar"

/**
 * CreataAccountLayout component.
 * This layout wraps the children components with necessary providers and suspense fallback.
 */
export default async function CreataAccountLayout({
  children,
}: {
  children: ReactNode
}) {
  prefetch(trpc.private_creata.getCurrentUser.queryOptions())
  prefetch(trpc.private_creata.getCurrentUserAccount.queryOptions())
  return (
    <>
      <CreataQueryProviders>
        <TRPCReactProvider>
          <HydrateClient>
            <Suspense fallback={<PageContentLoading />}>
              <div className="relative h-screen group px-8 py-24 overflow-auto ">
                <NavigationBar />
                {children}
              </div>
            </Suspense>
          </HydrateClient>
        </TRPCReactProvider>
      </CreataQueryProviders>
    </>
  )
}
