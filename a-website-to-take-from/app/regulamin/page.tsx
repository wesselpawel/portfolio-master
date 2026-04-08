import Hero from "@/components/hero/Hero";
import { Metadata } from "next";
export default function Page() {
  return (
    <div className="relative w-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-green-500 via-zinc-600 to-black z-10">
        <Hero />
      </div>

      <main className="relative z-10 min-h-screen w-full px-4">
        <section className="w-full max-w-4xl mx-auto py-28">
          <article className="prose prose-invert prose-headings:text-white prose-p:text-gray-200 prose-li:text-gray-200 prose-strong:text-white max-w-none">
            <h1>Regulamin i informacje o danych</h1>
            <ol className="list-decimal pl-6">
              <li>
                <strong>Postanowienia ogólne</strong>
                <ol className="list-decimal pl-6 mt-2">
                  <li>
                    Niniejszy regulamin określa zasady przetwarzania i ochrony
                    danych osobowych w związku z realizacją usług przez Quixy
                    Studio.
                  </li>
                </ol>
              </li>
              <li className="mt-4">
                <strong>Zakres przetwarzanych danych</strong>
                <ol className="list-decimal pl-6 mt-2">
                  <li>
                    W ramach realizacji usług przetwarzane są wyłącznie
                    następujące dane osobowe:
                    <ul className="list-disc pl-6 mt-2">
                      <li>Numer telefonu</li>
                      <li>Imię i nazwisko</li>
                    </ul>
                  </li>
                </ol>
              </li>
              <li className="mt-4">
                <strong>Cel i podstawa przetwarzania danych</strong>
                <ol className="list-decimal pl-6 mt-2">
                  <li>
                    Dane osobowe przetwarzane są wyłącznie w celu wykonania prac
                    związanych z przygotowaniem i realizacją stron internetowych
                    oraz materiałów.
                  </li>
                  <li>
                    Dane nie są udostępniane podmiotom trzecim, za wyjątkiem
                    przypadków przewidzianych przepisami prawa.
                  </li>
                </ol>
              </li>
              <li className="mt-4">
                <strong>Okres przechowywania danych</strong>
                <ol className="list-decimal pl-6 mt-2">
                  <li>
                    Dane osobowe przechowywane są przez czas trwania współpracy
                    oraz tak długo, jak wymagają tego obowiązujące przepisy
                    prawa lub uzasadniony interes (np. rozliczenia).
                  </li>
                </ol>
              </li>
              <li className="mt-4">
                <strong>Prawa osoby, której dane dotyczą</strong>
                <ol className="list-decimal pl-6 mt-2">
                  <li>
                    Osobie, której dane dotyczą, przysługuje prawo dostępu do
                    danych, ich sprostowania, ograniczenia przetwarzania lub
                    usunięcia.
                  </li>
                  <li>
                    W celu realizacji powyższych praw należy skontaktować się z
                    Quixy Studio.
                  </li>
                </ol>
              </li>
              <li className="mt-4">
                <strong>Kontakt</strong>
                <ol className="list-decimal pl-6 mt-2">
                  <li>
                    Wszelkie pytania dotyczące przetwarzania danych osobowych
                    należy kierować na adres e-mail:{" "}
                    <a href="mailto:wesiudev@gmail.com">kontakt@quixy.pl</a>.
                  </li>
                </ol>
              </li>
            </ol>
          </article>
        </section>
      </main>
    </div>
  );
}

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  title: "Regulamin i informacje o danych | Quixy Studio",
  description: "Regulamin i informacje o danych | Quixy Studio",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Regulamin i informacje o danych | Quixy Studio",
    description: "Regulamin i informacje o danych | Quixy Studio",
    siteName: "Quixy Studio",
    images: [
      {
        url: "/assets/quixy-logo.png",
        width: 1200,
        height: 630,
        alt: "Quixy Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulamin i informacje o danych | Quixy Studio",
    description: "Regulamin i informacje o danych | Quixy Studio",
    images: ["/assets/quixy-logo.png"],
  },
  authors: [{ name: "Quixy Studio", url: "https://quixy.pl" }],
  publisher: "Quixy Studio",
  keywords:
    "strony internetowe, strony www, sklepy internetowe, landing page, web developer, projektowanie stron, social media, marketing, Google Ads, kampanie reklamowe, SEO, Core Web Vitals",
  icons: [
    {
      url: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicons/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
  ],
};
