"use client";

import { useTRPC } from "@/app/creata/_trpc/client";
import { Button } from "@/components/ui/button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { UserRoundCog } from "lucide-react";
import { notFound, useRouter } from "next/navigation";

const UserProfileComponent = ({ id }: { id: string }) => {
  const trpc = useTRPC();
  const { data: user } = useSuspenseQuery(
    trpc.private_creata.getUserById.queryOptions({ id: id })
  );

  const { data: currentUser } = useSuspenseQuery(
    trpc.private_creata.getCurrentUser.queryOptions()
  );
  const router = useRouter();
  if (!user) return notFound();
  return (
    <>
      {" "}
      {JSON.stringify(user)}
      {currentUser.id === user.id && (
        <Button variant={"link"} onClick={() => router.push(`account/edit`)}>
          <UserRoundCog className="" />
        </Button>
      )}
    </>
  );
};

export default UserProfileComponent;
