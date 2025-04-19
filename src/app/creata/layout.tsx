import type { ReactNode } from "react";
import { CreataQueryProviders } from "./_provider/query-provider";

export default function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CreataQueryProviders>
      <main>{children}</main>;
    </CreataQueryProviders>
  );
}
