import type { Metadata } from "next"
import localFont from "next/font/local"
import "@/app/globals.css"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import { HomePageQueryProviders } from "./(homepage)/_provider/query-provider"
import { TRPCReactProvider } from "./(homepage)/_trpc/client"
import { Toaster } from "@/components/ui/sonner"

const geistSans = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Anh Portfolio",
  description: "Anh Portfolio is where you find him",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  return (
    <HomePageQueryProviders>
      <TRPCReactProvider>
        <SessionProvider session={session}>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased  overflow-hidden no-scrollbar h-screen`}
            >
              {children}
              <Toaster />
            </body>
          </html>
        </SessionProvider>
      </TRPCReactProvider>
    </HomePageQueryProviders>
  )
}
