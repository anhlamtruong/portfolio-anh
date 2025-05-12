import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased  overflow-hidden no-scrollbar h-screen`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
