import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Serif, Press_Start_2P, VT323 } from "next/font/google";
import "@/app/globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { HomePageQueryProviders } from "./(homepage)/_provider/query-provider";
import { TRPCReactProvider } from "./(homepage)/_trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeClientProvider } from "./theme-client-provider";

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
const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});
const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
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
              className={`${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable} ${pressStart2P.variable} ${vt323.variable} antialiased  overflow-hidden no-scrollbar h-screen`}
            >
              <ThemeClientProvider>
                {children}
                <Toaster />
              </ThemeClientProvider>
            </body>
          </html>
        </SessionProvider>
      </TRPCReactProvider>
    </HomePageQueryProviders>
  );
}
