import UserInfo from "@/services/authenticate-service/components/user_info";
import { currentUser } from "@/services/authenticate-service/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return <UserInfo user={user} label="Server component" />;
};

export default ServerPage;
