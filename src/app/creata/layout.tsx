import type { ReactNode } from "react";
import { CreataQueryProviders } from "./_provider/query-provider";
import { TRPCReactProvider } from "@/trpc/client";

export default function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CreataQueryProviders>
      <TRPCReactProvider>
        <main>{children}</main>;
      </TRPCReactProvider>
    </CreataQueryProviders>
  );
}
