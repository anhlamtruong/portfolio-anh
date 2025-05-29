"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/services/authenticate-service/hooks/use_current_user";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

interface UserAvatarProps {
  className?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ className, onClick }) => {
  const user = useCurrentUser();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/creata/${user?.id}`);
  };
  return (
    <Avatar
      onClick={onClick ?? handleClick}
      className={cn("hover:opacity-80", className)}
    >
      <AvatarImage src={user?.image || ""} />
      <AvatarFallback>
        <FaUser />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
