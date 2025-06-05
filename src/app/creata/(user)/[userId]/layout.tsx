import type { ReactNode } from "react"

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return <main>{children}</main>
}
