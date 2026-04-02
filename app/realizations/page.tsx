import type { Metadata } from "next";
import Link from "next/link";
import ProjectShowcase from "@/components/ProjectShowcase";
import { HOME_LANDING_PAGE } from "@/data/landingPages";

export const metadata: Metadata = {
  title: "Realizacje stron internetowych | Paweł Wessel",
  description:
    "Zobacz realizacje stron internetowych, landing page, sklepów internetowych i projektów wdrożonych przez Pawła Wessela.",
  alternates: {
    canonical: "https://wesselpawel.com/realizations",
  },
};

export default function RealizationsPage() {
  return (
    <div className="bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.16),transparent_22%),linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.9))] pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto w-[90vw] max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/85">
            Realizacje
          </p>
          <h1 className="mt-4 font-cocosharp text-4xl font-bold leading-tight text-yellow-300 sm:text-5xl">
            Zobacz moje wdrożenia stron internetowych
          </h1>
          <p className="mt-5 max-w-3xl font-dosis text-base leading-relaxed text-white/75 sm:text-lg">
            Tu pokazuję projekty, które projektowałem i wdrażałem dla firm,
            marek oraz produktów cyfrowych. Znajdziesz tu strony usługowe,
            landing page, sklepy internetowe i bardziej rozbudowane platformy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(253,224,71,0.25)] transition hover:brightness-105"
            >
              Zobacz projekty
            </Link>
            <Link
              href="/#darmowa-wycena"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Zapytaj o wycenę
            </Link>
          </div>
        </div>
      </section>

      <ProjectShowcase pageContent={HOME_LANDING_PAGE} standalone />
    </div>
  );
}
