"use client";

import UserInfo from "@/services/authenticate-service/components/user_info";
import { useCurrentUser } from "@/services/authenticate-service/hooks/use_current_user";

const ClientPage = () => {
  const user = useCurrentUser();
  return <UserInfo label="📱 Client component" user={user} />;
};

export default ClientPage;
