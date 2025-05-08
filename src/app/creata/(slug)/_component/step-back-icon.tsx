"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const StepBackIconComponent = () => {
  const router = useRouter();
  return (
    <ArrowLeft
      onClick={() => router.back()}
      className="hover:scale-110 transition-all focus:scale-95"
    />
  );
};

export default StepBackIconComponent;
