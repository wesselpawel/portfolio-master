"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { getCityHubBackground } from "@/firebase";

type CityHubHeroShellProps = {
  citySlug: string;
  children: ReactNode;
};

export default function CityHubHeroShell({
  citySlug,
  children,
}: CityHubHeroShellProps) {
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getCityHubBackground(citySlug)
      .then((data) => {
        if (
          cancelled ||
          !data ||
          typeof data.backgroundImageUrl !== "string" ||
          !data.backgroundImageUrl.trim()
        ) {
          return;
        }
        setBackgroundUrl(data.backgroundImageUrl.trim());
      })
      .catch(() => {
        /* brak uprawnień / offline — zostaje domyślne tło */
      });
    return () => {
      cancelled = true;
    };
  }, [citySlug]);

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        {backgroundUrl ? (
          <>
            <Image
              src={backgroundUrl}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/82 to-slate-950/90"
              aria-hidden
            />
          </>
        ) : (
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.16),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.9))]"
            aria-hidden
          />
        )}
      </div>

      <div className="relative z-10 mx-auto grid w-[90vw] max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {children}
      </div>
    </section>
  );
}
