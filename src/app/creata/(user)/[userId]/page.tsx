import { UserButton } from "@/services/authenticate-service/components/user_button";
import NavigationBar from "../../_component/navigation-bar";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <div className="relative group h-screen px-8 py-24 overflow-auto">
      <NavigationBar />
      <UserButton></UserButton>
      <div>{userId}</div>
    </div>
  );
}
