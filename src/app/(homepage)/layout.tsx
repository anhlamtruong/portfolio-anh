import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { QueryProviders } from "@/services/image-loader.ts/provider/image-query-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProviders>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased  overflow-hidden no-scrollbar h-screen`}
        >
          {children}
          <Toaster />
        </body>
      </QueryProviders>
    </html>
  );
}
