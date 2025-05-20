"use client";

import { useCurrentRole } from "../hooks/use_current_role";
import { FormError } from "./ui/form_error";
import { UserRole } from "../generated/authenticate/@prisma-authenticate";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { MESSAGES } from "../config/message";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole[];
}

export const RoleGate = ({
  children,
  allowedRole = [UserRole.USER],
}: RoleGateProps) => {
  const role = useCurrentRole();
  const router = useRouter();

  if (!allowedRole.includes(role)) {
    return (
      <>
        <FormError message={MESSAGES.ui.no_permission} />
        <Button onClick={() => router.back()}>{MESSAGES.ui.go_back}</Button>
      </>
    );
  }

  return <>{children}</>;
};
