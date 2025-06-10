import AccountEditSetting from "./_component/account-edit-setting";
import { Suspense } from "react";
import { HydrateClient, prefetch, trpc } from "../../../_trpc/server";
import { PageContentLoading } from "@/components/ui/loading";
export default async function EditPage() {
  prefetch(trpc.private_creata.getCurrentUser.queryOptions());
  prefetch(trpc.private_creata.getCurrentUserAccount.queryOptions());
  return (
    <HydrateClient>
      <Suspense fallback={<PageContentLoading />}>
        <AccountEditSetting />
      </Suspense>
    </HydrateClient>
  );
}
