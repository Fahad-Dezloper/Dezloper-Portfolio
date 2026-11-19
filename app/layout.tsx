import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Inter } from "next/font/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import Navbar from "./components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import SilkScroll from "./components/SilkScroll";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

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

/**
 * The origin every absolute metadata URL is built from, the share card's
 * among them.
 *
 * VERCEL_URL is deliberately not used in production. It is the
 * deployment-specific hostname (dezloper-portfolio-<hash>.vercel.app), which
 * changes on every deploy and sits behind Vercel's deployment protection, so
 * an og:image pointing at it serves crawlers an HTML login page rather than
 * the PNG, and no preview image shows anywhere the link is posted. The
 * canonical domain is stable and public, so production always uses it.
 *
 * Previews keep the deployment hostname, which is what you want when checking
 * a branch before it ships.
 */
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://www.faahhad.com");

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Fahad Khan · Design Engineer",
    template: "%s | Fahad Khan",
  },
  description:
    "I consider myself a builder at heart and enjoy crafting products & interfaces that feel great to use.",
  keywords: [
    "Fahad Khan",
    "dezloper",
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
    title: "Fahad Khan · Design Engineer",
    description:
      "I consider myself a builder at heart and enjoy crafting products & interfaces that feel great to use.",
    siteName: "Fahad Khan",
    // No images here on purpose. app/opengraph-image.tsx generates the card,
    // and file-based metadata overrides this object, so listing a URL as well
    // would leave a second source that silently never wins.
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahad Khan · Design Engineer",
    description:
      "I consider myself a builder at heart and enjoy crafting products & interfaces that feel great to use.",
    creator: "@dezloperr",
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
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="dd06aa90-d4d3-407e-a703-ca7bce3ceec6"
        />
        <body className={`${intertight.variable} ${inter.variable}`}>
          {/* The intro cascade runs on every load for now. To play it only on
              the first view of a tab session, put this back: it marks later
              views with .home-visited before anything paints, which is what
              globals.css and ToastStack both check.

              <script
                dangerouslySetInnerHTML={{
                  __html:
                    "try{if(sessionStorage.getItem('visited'))document.documentElement.classList.add('home-visited');else sessionStorage.setItem('visited','1')}catch(e){}",
                }}
              /> */}
          <SilkScroll>
            {/* w-screen (a definite viewport width) is required here: Silk places
                Scroll.Content in a max-content grid column, so w-full would blow
                out to the widest child (the horizontal carousels). Pinning to
                100vw makes those carousels scroll internally again. */}
            <div className="flex min-h-dvh w-screen max-w-[100vw] flex-col items-center overflow-x-clip ">
              <div className="flex w-full items-center flex-col">
                {/* <Navbar /> */}
                <TooltipProvider>{children}</TooltipProvider>
              </div>
            </div>
            <Analytics />
          </SilkScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
