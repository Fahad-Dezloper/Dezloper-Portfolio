import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "./components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  weight: ["100", "200", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-next-interr",
});

const intertight = Inter_Tight({
  weight: ["100", "200", "300", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-next-intert",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Fahad Khan — Design Engineer",
    template: "%s | Fahad Khan",
  },
  description:
    "I consider myself a builder at heart and enjoy crafting products & interfaces that feel great to use.",
  keywords: [
    "Fahad Khan",
    "Design Engineer",
    "Frontend Developer",
    "Web3",
    "Solana",
    "Portfolio",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Fahad Khan" }],
  creator: "Fahad Khan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Fahad Khan — Design Engineer",
    description:
      "I consider myself a builder at heart and enjoy crafting products & interfaces that feel great to use.",
    siteName: "Fahad Khan",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Fahad Khan - Design Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahad Khan — Design Engineer",
    description:
      "I consider myself a builder at heart and enjoy crafting products & interfaces that feel great to use.",
    images: ["/opengraph-image.png"],
    creator: "@dezloperr",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body
          className={`${intertight.variable} ${inter.variable} flex min-h-dvh w-full flex-col items-center px-4 py-6 sm:px-6`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex w-full items-center flex-col">
              <Navbar />
              <TooltipProvider>{children}</TooltipProvider>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
