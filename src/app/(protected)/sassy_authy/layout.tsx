"use client";

import { useStyles } from "@/services/authenticate-service/hooks/use_styles";
import Navbar from "./settings/_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactElement;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const styles = useStyles();
  return (
    <div
      style={styles.container}
      className=" fixed transition-all h-full w-full flex flex-col gap-y-10 items-center  justify-center"
    >
      <Navbar></Navbar>
      {children}
    </div>
  );
};

export default ProtectedLayout;
