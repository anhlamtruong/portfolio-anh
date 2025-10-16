import { Reenie_Beanie } from "next/font/google";
import { cn } from "@/lib/utils";

const reenie_beanie = Reenie_Beanie({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});
interface FooterProps {
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Footer = ({ label }: FooterProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-start justify-center h-full">
      <h1 className={(cn(" text-6xl font-semibold"), reenie_beanie.className)}>
        {label}
      </h1>
    </div>
  );
};
