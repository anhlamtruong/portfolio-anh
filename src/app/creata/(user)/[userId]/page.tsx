import { UserButton } from "@/services/authenticate-service/components/user_button"
import NavigationBar from "../../_component/navigation-bar"
import UserProfileComponent from "./_component/user-profile-component"
import { HydrateClient, prefetch, trpc } from "../../_trpc/server"
import { CreataQueryProviders } from "../../_provider/query-provider"
import { TRPCReactProvider } from "../../_trpc/client"
export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  prefetch(trpc.private_creata.getUserById.queryOptions({ id: userId }))
  prefetch(trpc.private_creata.getCurrentUser.queryOptions())

  /**
   * TRPC server app usage
   */
  // const queryClient = getQueryClient();
  // const user = await queryClient.fetchQuery(
  //   trpc.private_creata.getUserById.queryOptions({ id: userId })
  // );
  return (
    <CreataQueryProviders>
      <TRPCReactProvider>
        <HydrateClient>
          <div className="relative group h-screen px-8 py-24 overflow-auto">
            <NavigationBar />
            <UserButton></UserButton>

            <UserProfileComponent id={userId} />
          </div>
        </HydrateClient>
      </TRPCReactProvider>
    </CreataQueryProviders>
  )
}
