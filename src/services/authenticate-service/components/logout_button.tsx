"use client";

import { logout } from "../actions/logout";
import { useTransition } from "react";
import { BeatLoader, ClockLoader } from "react-spinners";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();
  const onClick = () => {
    startTransition(async () => {
      try {
        await logout(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      variant={"destructive"}
      onClick={onClick}
      className=" items-center w-36 cursor-pointer"
    >
      {children}
      {isPending && <ClockLoader size={20} className="ml-2"></ClockLoader>}
    </Button>
  );
};

export default LogoutButton;
