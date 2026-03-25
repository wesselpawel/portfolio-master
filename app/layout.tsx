import "@/styles/globals.css";
import localFont from "next/font/local";
import { Lato } from "next/font/google";
import { Metadata } from "next";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavRight } from "@/components/Navigation";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Strony internetowe Grudziądz - Paweł Wessel - Programista",
  description:
    "Tworzę strony internetowe dla firm i osób prywatnych. Zajmuję się projektowaniem graficznym i designem. Programuję w Next.js, Tailwind CSS, TypeScript. Tworzę strony internetowe w Grudziądzu.",
  icons: [
    {
      url: "/favicon.ico",
      sizes: "32x32",
      type: "image/x-icon",
    },
  ],
  openGraph: {
    type: "website",
    url: "https://wesselpawel.com/",
    title: "Strony internetowe Grudziądz - Paweł Wessel - Programista",
    description:
      "Tworzę strony internetowe dla firm i osób prywatnych. Zajmuję się projektowaniem graficznym i designem. Programuję w Next.js, Tailwind CSS, TypeScript. Tworzę strony internetowe w Grudziądzu.",
    siteName: "wesselpawel.com",
    images: [
      {
        url: "https://wesselpawel.com/assets/donuts.png",
        type: "image/png",
      },
    ],
  },
  twitter: {
    site: "@wesiudev",
    title: "Strony internetowe Paweł Wessel - Front-end Developer",
    description:
      "Tworzę strony i aplikacje internetowe, sklepy internetowe, prowadzę marketing w Google Ads. Zajmuję się projektowaniem graficznym i designem.",
    images: [
      {
        url: "https://wesselpawel.com/assets/donuts.png",
      },
    ],
  },
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
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZHR2XRP7YX"
        />
        <Script strategy="afterInteractive" id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZHR2XRP7YX');
          `}
        </Script>
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
