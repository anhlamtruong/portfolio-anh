"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useStyles } from "@/services/authenticate-service/hooks/use_styles";
import { UserButton } from "@/services/authenticate-service/components/user_button";
//
const NavBar = () => {
  const styles = useStyles();
  const pathname = usePathname();
  return (
    <nav
      style={styles.card}
      className=" flex justify-between items-center p-4 rounded-xl w-3/4 shadow-sm"
    >
      <div className="flex gap-x-2">
        <Button
          variant={pathname === "/sassy_authy/server" ? "default" : "outline"}
        >
          {" "}
          <Link href={"/sassy_authy/server"}>Server</Link>
        </Button>
        <Button
          variant={pathname === "/sassy_authy/client" ? "default" : "outline"}
        >
          {" "}
          <Link href={"/sassy_authy/client"}>Client</Link>
        </Button>
        <Button
          variant={pathname === "/sassy_authy/admin" ? "default" : "outline"}
        >
          {" "}
          <Link href={"/sassy_authy/admin"}>Admin</Link>
        </Button>
        <Button
          variant={pathname === "/sassy_authy/settings" ? "default" : "outline"}
        >
          {" "}
          <Link href={"/sassy_authy/settings"}>Settings</Link>
        </Button>

        {/* <ThemeSwitcher></ThemeSwitcher> */}
      </div>
      <UserButton />
    </nav>
  );
};

export default NavBar;
