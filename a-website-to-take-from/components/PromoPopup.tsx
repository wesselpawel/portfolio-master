"use client";
import { useEffect, useState } from "react";
import GoogleAdsWizard from "@/components/GoogleAdsWizard";
import Image from "next/image";

const LOCAL_STORAGE_KEY = "promoPopupDismissed";

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openWizard, setOpenWizard] = useState(false);

  useEffect(() => {
    try {
      const dismissed =
        typeof window !== "undefined" &&
        window.localStorage.getItem(LOCAL_STORAGE_KEY);

      if (!dismissed) {
        // Show popup after 5 seconds
        const timer = setTimeout(() => {
          setIsVisible(true);
          // Start animation slightly after visibility
          setTimeout(() => setIsAnimating(true), 50);
        }, 5000);

        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback: show popup after 5 seconds even if localStorage fails
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setIsAnimating(true), 50);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, "true");
      }
    } catch {}

    // Animate out
    setIsAnimating(false);
    // Hide after animation completes
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* <div className="font-gotham fixed inset-x-0 bottom-4 z-[2000] flex justify-center px-4">
        <div className="w-full sm:w-auto max-w-[48rem]">
          <div
            className={`relative rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden transition-all duration-300 ease-out ${
              isAnimating
                ? "transform translate-y-0 opacity-100"
                : "transform translate-y-full opacity-0"
            }`}
          >
            <div className="absolute -inset-x-1 -top-1 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
            <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
              <div className="flex-1">
                <div className="w-full justify-between flex items-center gap-2 text-zinc-900 font-semibold text-base sm:text-lg">
                  <div className="font-bold text-zinc-800 drop-shadow-lg shadow-black text-2xl">
                    Twoja reklama
                  </div>
                  <Image
                    src="/google.webp"
                    alt="Google Ads"
                    width={100}
                    height={100}
                    className="inline-block"
                  />
                </div>
                <div className="mt-3 font-light text-zinc-600 text-sm sm:text-base">
                  Skonfiguruj skuteczną kampanię już teraz w 5 minut.
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setOpenWizard(true)}
                  className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base px-4 py-2 font-medium shadow-sm"
                >
                  Zaczynajmy!
                </button>
                <button
                  onClick={dismiss}
                  className="rounded-lg bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50 text-sm sm:text-base px-3 py-2"
                >
                  Nie teraz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* {openWizard && <GoogleAdsWizard onClose={() => setOpenWizard(false)} />} */}
    </>
  );
}
