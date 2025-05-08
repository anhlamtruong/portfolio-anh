"use client";

import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const HomeIconComponent = () => {
  const router = useRouter();
  return (
    <HomeIcon
      onClick={() => {
        const baseUrl = window.location.origin;

        router.push(`${baseUrl}/creata`);
      }}
      className="hover:scale-110 transition-all focus:scale-95"
    />
  );
};

export default HomeIconComponent;
