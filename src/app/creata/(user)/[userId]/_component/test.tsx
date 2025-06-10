"use client";

import { useTRPC } from "@/app/creata/_trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

const Test = () => {
  const trpc = useTRPC();
  const { data: user } = useSuspenseQuery(
    trpc.private_creata.getCurrentUser.queryOptions()
  );
  return <> {JSON.stringify(user)}</>;
};

export default Test;
