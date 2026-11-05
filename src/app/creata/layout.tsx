import { ReactNode } from "react";
import { CreataQueryProviders } from "./_provider/query-provider";
import { TRPCReactProvider } from "./_trpc/client";

// Creata reads the session and URL params per request; keep it dynamic as it
// was when the root layout called auth().
export const dynamic = "force-dynamic";

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
