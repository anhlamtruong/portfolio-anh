"use client";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "../hooks/use_current_user";
import LogoutButton from "./logout_button";

import { MESSAGES } from "../config/message";
import { UserSettingsForm } from "./setting_form";
// import { RouterComboBox } from "./router_combo_box";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Avatar className=" hover:opacity-60">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>
            <FaUser></FaUser>
          </AvatarFallback>
        </Avatar>
      </DrawerTrigger>

      <DrawerContent>
        <div className=" items-start justify-center flex flex-col mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{MESSAGES.ui.user_settings_title}</DrawerTitle>
            <DrawerDescription>
              {MESSAGES.ui.user_settings_description}
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 flex flex-col w-full gap-2">
            <UserSettingsForm></UserSettingsForm>
            <LogoutButton>
              <div className="flex items-center ">
                <ExitIcon className=" h-4 w-4 mr-2"></ExitIcon>{" "}
                <span>Logout</span>
              </div>
            </LogoutButton>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">{MESSAGES.ui.close_button}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
