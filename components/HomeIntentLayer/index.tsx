"use client";

import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { motion } from "framer-motion";
import {
  getCurrentCityTargetLinks,
  getContextualLandingPageLinks,
  getHomepageSectionLinks,
  type LandingPageContent,
  type LandingPageStep,
  type LandingPageLink,
  type LandingPageIntentContent,
} from "@/data/landingPages";
import step2 from "@/public/tworzenie-strony-internetowej/strona-internetowa-w-trakcie-tworzenia.png";
import step3 from "@/public/tworzenie-strony-internetowej/strona-internetowa-jest-prawie-gotowa.png";
import step1 from "@/public/tworzenie-strony-internetowej/poczatek-tworzenia-strony-internetowej.png";
import step4 from "@/public/tworzenie-strony-internetowej/twoja-strona-internetowa-została-stworzona.png";
import { highlightLandingKeywords } from "@/utils/highlightLandingKeywords";

/** Same motyw co hero — okrągłe miniatury zamiast zrzutów stron w kartach procesu. */
const PROCESS_STEP_DONUT_IMAGES: StaticImageData[] = [
  step1,
  step2,
  step3,
  step4,
];

const PROCESS_STEP_DONUT_ROTATES = [
  "-rotate-6",
  "rotate-3",
  "-rotate-3",
  "rotate-6",
] as const;

const DEFAULT_FOURTH_PROCESS_STEP: LandingPageStep = {
  title: "Dalszy rozwój i optymalizacja",
  description:
    "Po starcie ustalamy kolejne kroki: treści, widoczność i usprawnienia dopasowane do Twoich celów.",
};

function ensureFourProcessSteps(steps: LandingPageStep[]): LandingPageStep[] {
  if (steps.length >= 4) {
    return steps;
  }
  if (steps.length === 3) {
    return [...steps, DEFAULT_FOURTH_PROCESS_STEP];
  }
  return steps;
}

type HomeIntentLayerProps = {
  pageContent: LandingPageContent;
  content: LandingPageIntentContent;
  currentSlug?: string;
};

type ProcessStepCardProps = {
  step: LandingPageStep;
  index: number;
};

function ProcessStepCard({ step, index }: ProcessStepCardProps) {
  const donutSrc =
    PROCESS_STEP_DONUT_IMAGES[index % PROCESS_STEP_DONUT_IMAGES.length];
  const donutRotate =
    PROCESS_STEP_DONUT_ROTATES[index % PROCESS_STEP_DONUT_ROTATES.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition hover:border-white/20 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] sm:p-5"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent" />
      <div className="absolute right-3 top-2 hidden text-[4.5rem] font-extrabold leading-none text-white/[0.045] sm:block lg:text-[6rem]">
        {index + 1}
      </div>

      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-pink-100/90 to-amber-50/80 shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:h-20 sm:w-20 ${donutRotate} transition duration-300 group-hover:scale-[1.05]`}
          aria-hidden
        >
          <Image
            src={donutSrc}
            alt=""
            fill
            className="object-cover object-center scale-110"
            sizes="80px"
          />
        </div>

        <div className="min-w-0 flex-1 pr-0 sm:pr-16">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-yellow-300/25 bg-yellow-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-100 sm:text-xs">
              Krok {index + 1}
            </span>
          </div>
          <h4 className="mt-3 text-lg font-bold leading-tight text-yellow-100 sm:text-xl lg:text-2xl">
            {step.title}
          </h4>
          <p className="mt-3 max-w-[52ch] font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
            {step.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function HomeIntentLayer({
  pageContent,
  content,
  currentSlug,
}: HomeIntentLayerProps) {
  const processSteps = ensureFourProcessSteps(content.processSteps);
  const sectionLinks = getHomepageSectionLinks(!currentSlug);
  const contextualLandingLinks = getContextualLandingPageLinks(currentSlug);
  const currentCityTargetLinks = getCurrentCityTargetLinks(currentSlug, false);

  function renderInlineLinks(links: LandingPageLink[]) {
    return links.map((link, index) => {
      const isLast = index === links.length - 1;
      const isSecondToLast = index === links.length - 2;

      return (
        <span key={link.href}>
          <Link href={link.href} className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100">
            {link.label}
          </Link>
          {!isLast ? (isSecondToLast ? " oraz " : ", ") : null}
        </span>
      );
    });
  }

  function renderLinkChips(links: LandingPageLink[], keyPrefix: string) {
    return links.map((link) => (
      <Link
        key={`${keyPrefix}-${link.href}`}
        href={link.href}
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
      >
        {link.label}
      </Link>
    ));
  }

  return (
    <section className="z-[501] w-full">
      <div className="bg-slate-900/80 py-[var(--section-pad-y-sm)] lg:py-[var(--section-pad-y-lg)]">
        <div className="layout-container">
        <p className="text-xs font-dosis uppercase tracking-[0.22em] text-yellow-200/90">
          {content.eyebrow}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
          <div>
            <h2 className="text-fluid-section-title font-sans font-extrabold text-white">
              {highlightLandingKeywords(content.heading, pageContent)}
            </h2>
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white/80 lg:max-w-[62ch] lg:text-[clamp(1rem,0.95rem+0.25vw,1.25rem)]"
              >
                {highlightLandingKeywords(paragraph, pageContent)}
              </p>
            ))}
            
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
            <p className="text-sm font-semibold text-white">
              {content.ctaTitle}
            </p>
            <p className="mt-2 font-dosis text-sm leading-relaxed text-white/70">
              {content.ctaDescription}
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="#darmowa-wycena"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-black transition hover:brightness-105"
              >
                {content.primaryCtaLabel}
              </Link>
              
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
          {content.offerLabel}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {content.offerOptions.map((option) => (
            <div
              key={option.name}
              className={`rounded-2xl border p-5 ${
                option.highlighted
                  ? "border-yellow-300/60 bg-yellow-300/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {option.image ? (
                <Image
                  src={option.image}
                  alt={option.imageAlt ?? option.name}
                  width={400}
                  height={240}
                  className="h-auto w-full rounded-xl object-cover aspect-[5/3]"
                />
              ) : null}
              <p className="mt-4 text-lg font-semibold text-white">
                {option.name}
                {option.price != null ? (
                  <> ~ od {option.price} zł</>
                ) : (
                  <> — wycena po briefie</>
                )}
              </p>
              <p className="mt-2 font-dosis text-sm leading-relaxed text-white/75">
                {option.description}
              </p>
            </div>
          ))}
        </div>
        {content.offerSupportingLinks?.length ? (
          <p className="mt-5 max-w-4xl font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
            Jeśli porównujesz warianty, sprawdź też {renderInlineLinks(content.offerSupportingLinks)}.
          </p>
        ) : null}
        </div>
      </div>

      <div className="">
        <section className="bg-slate-800/50 backdrop-blur-sm py-[var(--section-pad-y-sm)] lg:py-[clamp(2.5rem,5vw,6rem)]">
          <div className="layout-container">
          <h3 className="text-xl font-bold text-white lg:text-[clamp(1.125rem,1rem+0.5vw,1.5rem)]">
            {content.whyTitle}
          </h3>
          <p className="mt-3 font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
            {content.whyIntro}
          </p>
          <ul className="mt-4 space-y-3 font-dosis text-sm leading-relaxed text-white/80 sm:text-base">
            {content.whyPoints.map((reason) => (
              <li key={reason} className="rounded-xl bg-black/20 px-4 py-3">
                {reason}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            {contextualLandingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
          </div>
        </section>

        <section className="overflow-hidden bg-slate-800/50 backdrop-blur-sm py-[var(--section-pad-y-sm)] lg:py-[clamp(2.5rem,5vw,6rem)]">
          <div className="layout-container">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-[clamp(1.35rem,1.1rem+0.9vw,2.25rem)]">
              {content.processTitle}
            </h3>
            <p className="mt-3 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              Każdy etap ma jasno określony cel: od ustalenia kierunku, przez
              strukturę i wdrożenie, aż po rozwój po publikacji.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
            {processSteps.map((step, index) => (
              <ProcessStepCard
                key={`${step.title}-${index}`}
                step={step}
                index={index}
              />
            ))}
          </div>

          {currentCityTargetLinks.length ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow-200/85">
                Powiązane podstrony targetowe
              </p>
              <p className="mt-2 max-w-3xl font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
                Jeśli porównujesz branże i typy klientów w tym mieście, sprawdź też{" "}
                {renderInlineLinks(currentCityTargetLinks)}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {renderLinkChips(currentCityTargetLinks, "process-target")}
              </div>
            </div>
          ) : null}
          </div>
        </section>
      </div>

      <section className="bg-slate-800/50 backdrop-blur-sm py-[var(--section-pad-y-sm)] lg:py-[var(--section-pad-y-lg)]">
        <div className="layout-container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h3 className="text-xl font-bold text-white">
              {content.includedTitle}
            </h3>
            {content.includedParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-3xl font-dosis text-sm leading-relaxed text-white/75 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-4 font-dosis text-sm font-semibold leading-relaxed text-white sm:text-base">
              {content.includedListLabel}
            </p>
          </div>

          <Link
            href="#darmowa-wycena"
            className="inline-flex items-center justify-center rounded-xl border border-yellow-300/60 bg-yellow-300/10 px-4 py-3 text-sm font-semibold text-yellow-100 transition hover:bg-yellow-300/20"
          >
            {content.includedCtaLabel}
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {content.includedItems.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 font-dosis text-sm leading-relaxed text-white/80 sm:text-base"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {sectionLinks.map((link) => (
            <Link
              key={`${link.href}-included`}
              href={link.href}
              className="inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          {contextualLandingLinks.map((link) => (
            <Link
              key={`${link.href}-included`}
              href={link.href}
              className="inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
        </div>
        </div>
      </section>


      <div className="mb-24 bg-slate-800/50 bg-gradient-to-r from-yellow-300/15 to-transparent py-[var(--section-pad-y-sm)] backdrop-blur-sm lg:py-[clamp(2rem,4vw,5rem)]">
        <div className="layout-container flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-yellow-200/90">
              {content.nextStepEyebrow}
            </p>
            <p className="mt-2 text-xl font-bold text-white">
              {content.nextStepTitle}
            </p>
            <p className="mt-2 max-w-2xl font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
              {content.nextStepDescription}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="#darmowa-wycena"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-black transition hover:brightness-105"
            >
              {content.nextStepPrimaryCtaLabel}
            </Link>
            <Link
              href="#darmowa-wycena"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {content.nextStepSecondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
