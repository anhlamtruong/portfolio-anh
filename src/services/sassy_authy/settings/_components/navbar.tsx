"use client";

import { useStyles } from "@/hooks/authenticate/use_styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/ui/theme_switcher";
import { UserButton } from "@/components/auth/user_button";
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
        <Button variant={pathname === "/store_admin" ? "default" : "outline"}>
          {" "}
          <Link href={"/store_admin"}>Cookit_Admin</Link>
        </Button>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
      <UserButton />
    </nav>
  );
};

export default NavBar;
