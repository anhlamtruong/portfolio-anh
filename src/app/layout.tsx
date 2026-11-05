import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Roboto_Serif, Press_Start_2P, VT323 } from "next/font/google";
import "@/app/globals.css";
import { AppSessionProvider } from "./session-provider";
import { HomePageQueryProviders } from "./(homepage)/_provider/query-provider";
import { TRPCReactProvider } from "./(homepage)/_trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeClientProvider } from "./theme-client-provider";
import { BuildFlagScript } from "@/components/swarm/build-flag-script";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});
// Used by Creata and the theme editor only, so they are not preloaded on
// every page.
const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto-serif",
  preload: false,
});
const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
  preload: false,
});
const vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-vt323",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lamanhtruong.com"),
  title: {
    default: "Alan (Lam Anh) Truong — AI Software Engineer",
    template: "%s · Alan Truong",
  },
  description:
    "AI Software Engineer at Fidorn Technologies and founder of Chuchube. I build multi-agent systems, LLM routing and AWS data platforms.",
  openGraph: {
    title: "Alan (Lam Anh) Truong — AI Software Engineer",
    description:
      "Multi-agent orchestration, LLM routing and AWS serverless platforms.",
    url: "https://www.lamanhtruong.com",
    siteName: "Alan Truong",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090d",
};

// No auth() here: reading the session makes every route dynamic. The session
// provider fetches the session on the client for pages that need it.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <BuildFlagScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoSerif.variable} ${pressStart2P.variable} ${vt323.variable} antialiased overflow-hidden no-scrollbar h-screen`}
      >
        <HomePageQueryProviders>
          <TRPCReactProvider>
            <AppSessionProvider>
              <ThemeClientProvider>
                {children}
                <Toaster />
              </ThemeClientProvider>
            </AppSessionProvider>
          </TRPCReactProvider>
        </HomePageQueryProviders>
      </body>
    </html>
  );
}
