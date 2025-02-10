import type { ReactNode } from "react";

export default function CreataDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main>{children}</main>;
}
