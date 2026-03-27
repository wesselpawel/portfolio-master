"use client";

import Link from "next/link";
import Script from "next/script";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaCookieBite } from "react-icons/fa";

type ConsentStatus = "undecided" | "accepted" | "necessary";

const STORAGE_KEY = "wp-cookie-consent";
const OPEN_EVENT = "hello-cookie-popup:open";
const GA_MEASUREMENT_ID = "G-ZHR2XRP7YX";

function readStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") {
    return "undecided";
  }

  const value = window.localStorage.getItem(STORAGE_KEY);

  if (value === "accepted" || value === "necessary") {
    return value;
  }

  return "undecided";
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>("undecided");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();
    setConsent(storedConsent);
    setIsPopupOpen(storedConsent === "undecided");
    setIsMounted(true);

    function handleOpenPopup() {
      setIsPopupOpen(true);
    }

    window.addEventListener(OPEN_EVENT, handleOpenPopup);

    return () => {
      window.removeEventListener(OPEN_EVENT, handleOpenPopup);
    };
  }, []);

  const analyticsEnabled = useMemo(
    () => isMounted && consent === "accepted",
    [consent, isMounted],
  );

  function saveConsent(nextConsent: Exclude<ConsentStatus, "undecided">) {
    window.localStorage.setItem(STORAGE_KEY, nextConsent);
    setConsent(nextConsent);
    setIsPopupOpen(false);
  }

  return (
    <>
      {analyticsEnabled ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script strategy="afterInteractive" id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}

      <AnimatePresence>
        {isMounted && isPopupOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-4 z-[1200] mx-auto w-[94vw] max-w-[460px]"
          >
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.18),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(30,41,59,0.96))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:p-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-yellow-300/30 bg-yellow-300/10 text-yellow-200 shadow-[0_10px_30px_rgba(253,224,71,0.16)]">
                  <FaCookieBite className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/80">
                    Hello popup
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-white">
                    Ciasteczka, ale po ludzku
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    Używam niezbędnych cookies do działania strony oraz opcjonalnych
                    statystyk, żeby wiedzieć, które podstrony odwiedzają użytkownicy.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    Możesz zaakceptować analitykę albo zostać tylko przy niezbędnych
                    plikach cookies.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-relaxed text-white/70">
                Więcej informacji znajdziesz na stronach
                {" "}
                <Link
                  href="/polityka-prywatnosci"
                  className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
                >
                  Polityka prywatności
                </Link>
                {" "}
                oraz
                {" "}
                <Link
                  href="/polityka-cookies"
                  className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
                >
                  Polityka cookies
                </Link>
                .
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => saveConsent("accepted")}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-yellow-300/40 bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(253,224,71,0.22)] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Akceptuję wszystko
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent("necessary")}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  Tylko niezbędne
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function openCookiePopup() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}
