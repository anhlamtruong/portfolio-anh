import type { ReactNode } from "react";
import { QueryProviders } from "./_services/logo-loader/provider/image-query-provider";
import { Toaster } from "@/components/ui/sonner";

export default function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryProviders>
      <main>{children}</main>;
      <Toaster />
    </QueryProviders>
  );
}
