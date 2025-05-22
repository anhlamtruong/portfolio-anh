import type { ReactNode } from "react";

export default function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="relative group">{children};</div>;
}
