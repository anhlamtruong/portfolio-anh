import { ReactNode } from "react";
import NavigationBar from "../../_component/navigation-bar";

/**
 * CreataAccountLayout component.
 * This layout wraps the children components with necessary providers and suspense fallback.
 */
export default async function CreataAccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="relative h-screen group px-8 py-24 overflow-auto ">
        <NavigationBar />
        {children}
      </div>
    </>
  );
}
