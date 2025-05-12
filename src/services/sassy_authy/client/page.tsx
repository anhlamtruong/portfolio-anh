"use client";

import UserInfo from "@/components/auth/user_info";
import { useCurrentUser } from "@/hooks/authenticate/use_current_user";

const ClientPage = () => {
  const user = useCurrentUser();
  return <UserInfo label="📱 Client component" user={user} />;
};

export default ClientPage;
