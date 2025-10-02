import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Serif } from "next/font/google";
import "@/app/globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { HomePageQueryProviders } from "./(homepage)/_provider/query-provider";
import { TRPCReactProvider } from "./(homepage)/_trpc/client";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto-serif",
});

export const metadata: Metadata = {
  title: "Anh Portfolio",
  description: "Anh Portfolio is where you find him",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <HomePageQueryProviders>
      <TRPCReactProvider>
        <SessionProvider session={session}>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable} antialiased  overflow-hidden no-scrollbar h-screen`}
            >
              {children}
              <Toaster />
            </body>
          </html>
        </SessionProvider>
      </TRPCReactProvider>
    </HomePageQueryProviders>
  );
}
