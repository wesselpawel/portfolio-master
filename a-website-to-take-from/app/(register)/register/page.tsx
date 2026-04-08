import Register from "./Register";
import type { Metadata } from "next";
export default function Page() {
  return <Register />;
}

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
  keywords: [],
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  title: "Zaproszenie do serwisu Quixy.pl",
  description:
    "Logowanie w serwisie Quixy.pl - posiadasz zaproszenie? Zaloguj się i zacznij korzystać z naszych usług!",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Zaproszenie do serwisu Quixy.pl",
    description:
      "Logowanie w serwisie Quixy.pl - posiadasz zaproszenie? Zaloguj się i zacznij korzystać z naszych usług!",
    siteName: "Quixy",
  },
};
