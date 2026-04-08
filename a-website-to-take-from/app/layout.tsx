import "@/styles/globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import { PhoneModalProvider } from "@/common/context/PhoneModalContext";
import { ThemeProvider } from "@/common/context/ThemeContext";
import { Providers } from "@/common/redux/Provider";
import PhoneModal from "@/components/PhoneModal";
import PromoPopup from "@/components/PromoPopup";
import Footer from "@/components/footer/Footer";
import Header from "@/components/quixyComponents/Header";

export default async function Root({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/apiQuixy/jobs`, {
    next: { revalidate: 60 },
  });
  const jobs = await jobsRes.json();
  return (
    <html lang="pl" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${cocosharp.variable} font-sans overflow-x-hidden ${gotham.variable}`}
      >
        <Providers>
          <ThemeProvider>
            <PhoneModalProvider>
              <Header jobsList={jobs} />
              {children}
              <Footer />
              <PhoneModal />
              <PromoPopup />
            </PhoneModalProvider>
          </ThemeProvider>
        </Providers>
        <Script id="linkedin-analytics">
          {`
          
_linkedin_partner_id = "8695857";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);

(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);

<noscript>
<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=8695857&fmt=gif" />
</noscript>
          `}
        </Script>
        <Script
          async
          id="google-analytics"
          src="https://www.googletagmanager.com/gtag/js?id=G-VH4MSJ1DFY"
        >
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VH4MSJ1DFY');
          `}
        </Script>
      </body>
    </html>
  );
}

//font
const gotham = localFont({
  src: [
    {
      path: "../public/fonts/Gotham.ttf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../public/fonts/Gotham-Light.ttf",
      weight: "300",
      style: "light",
    },
    {
      path: "../public/fonts/GothamBold.ttf",
      weight: "500",
      style: "bold",
    },
  ],
  variable: "--font-gotham",
});
const cocosharp = localFont({
  src: [
    {
      path: "../public/fonts/Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/Bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../public/fonts/Light.ttf",
      weight: "300",
    },
    {
      path: "../public/fonts/LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Regular.ttf",
      weight: "500",
    },
  ],
  variable: "--font-cocosharp",
});
