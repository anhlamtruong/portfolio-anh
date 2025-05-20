"use client";

import { useRouter, useSearchParams } from "next/navigation";
import NavigationBar from "../../_component/navigation-bar";
import CashPrize from "../../_repositories/counter/counter";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, FileJson2, FolderCode } from "lucide-react";
import Link from "next/link";

const ComponentCanva = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") as string | null;

  return (
    <>
      <NavigationBar />
      <ModeSelection
        initial_value={mode ?? ""}
        placeholder={
          <Link href={`?mode=metadata`} className="flex gap-2">
            <FileJson2 /> Metadata
          </Link>
        }
      />
      <div className="relative w-screen h-screen">
        <CashPrize></CashPrize>
      </div>
    </>
  );
};

const ModeSelection = ({
  initial_value,
  placeholder,
}: {
  initial_value: string;
  placeholder?: React.ReactNode;
}) => {
  const router = useRouter();
  return (
    <Select
      defaultValue={initial_value}
      onValueChange={(val) => {
        router.push(`?mode=${val}`);
      }}
    >
      <SelectTrigger className="w-36 absolute bottom-16 left-8 z-50">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="metadata">
          <div className="flex gap-2">
            <FileJson2 /> Metadata
          </div>
        </SelectItem>
        <SelectItem value="preview">
          <div className="flex gap-2">
            <Eye /> Preview
          </div>
        </SelectItem>
        <SelectItem value="code">
          <div className="flex gap-2">
            <FolderCode /> Code
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ComponentCanva;
