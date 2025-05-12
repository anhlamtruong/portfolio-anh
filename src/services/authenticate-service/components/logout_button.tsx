"use client";

import { logout } from "../actions/logout";
import { useTransition } from "react";
import { BeatLoader } from "react-spinners";
import { Button } from "./ui/button";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ children }) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      try {
        await logout();
      } catch (error) {
        console.log(error);
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
      {isPending && <BeatLoader></BeatLoader>}
    </Button>
  );
};

export default LogoutButton;
