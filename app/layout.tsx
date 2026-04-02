import "@/styles/globals.css";
import localFont from "next/font/local";
import { Lato } from "next/font/google";
import { Metadata, Viewport } from "next";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavRight } from "@/components/Navigation";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "WWW Expert - Strony internetowe | SEO | Strony firmowe",
  description:
    "Tworzę strony internetowe dla firm, landing page, sklepy i rozwiązania pod SEO lokalne w Grudziądzu.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    url: "https://wesselpawel.com/",
    title: "WWW Expert - Strony internetowe | SEO | Strony firmowe",
    description:
      "Tworzę strony internetowe dla firm, landing page, sklepy i rozwiązania pod SEO lokalne w Grudziądzu.",
    siteName: "WWW Expert",
    images: [
      {
        url: "https://wesselpawel.com/assets/pinkdonut.png",
        type: "image/png",
      },
    ],
  },
  twitter: {
    site: "@wesiudev",
    title: "WWW Expert - Strony internetowe | SEO | Strony firmowe",
    description:
      "Tworzę strony internetowe, landing page, sklepy i rozwiązania pod SEO lokalne dla firm.",
    images: [
      {
        url: "https://wesselpawel.com/assets/pinkdonut.png",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0c0c0c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scrollbarBlack" lang="pl">
      <body
        className={`${cocosharp.variable} ${lato.variable} ${anta.variable} ${dosis.variable} font-sans scrollbarBlack overflow-x-hidden`}
      >
        <NavRight />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

const lato = Lato({
  weight: "400",
  variable: "--font-lato",
  subsets: ["latin"],
});
const anta = localFont({
  src: [
    {
      path: "../fonts/Anta.ttf",
      weight: "400",
    },
  ],
  variable: "--font-anta",
});
const dosis = localFont({
  src: [
    {
      path: "../fonts/Dosis.ttf",
      weight: "400",
    },
  ],
  variable: "--font-dosis",
});
const cocosharp = localFont({
  src: [
    {
      path: "../fonts/Bold.ttf",
      weight: "700",
    },

    {
      path: "../fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
