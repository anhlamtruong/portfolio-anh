"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function CLILogin() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "http://localhost:51337";
  const onClick = (provider: "google" | "github") => {
    signIn(provider).then(async () => {
      const res = await fetch("/api/user/token");
      const { token } = await res.json();
      if (token) {
        window.location.href = `${redirectUrl}?token=${encodeURIComponent(token)}`;
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <p className="text-lg font-medium">Log in to continue from CLI</p>
      <div className="flex gap-4">
        <Button
          size="lg"
          className="w-40"
          variant="outline"
          onClick={() => onClick("google")}
        >
          <FcGoogle className="h-5 w-5 mr-2" /> Google
        </Button>
        <Button
          size="lg"
          className="w-40"
          variant="outline"
          onClick={() => onClick("github")}
        >
          <FaGithub className="h-5 w-5 mr-2" /> GitHub
        </Button>
      </div>
    </div>
  );
}
