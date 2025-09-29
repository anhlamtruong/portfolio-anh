import { ReactNode } from "react";
import { CreataQueryProviders } from "./_provider/query-provider";
import { TRPCReactProvider } from "./_trpc/client";
/**
 * CreataDashboardLayout component.
 * This layout wraps the children components with necessary providers and suspense fallback.
 */
export default async function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CreataQueryProviders>
      <TRPCReactProvider>
        <main>{children}</main>
      </TRPCReactProvider>
    </CreataQueryProviders>
  );
}
