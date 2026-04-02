"use client";

import Link from "next/link";
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
import Image from "next/image";
import { highlightLandingKeywords } from "@/utils/highlightLandingKeywords";

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
        {step.image ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] sm:h-20 sm:w-20">
            <Image
              src={step.image}
              alt={step.imageAlt || step.title}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.04]"
              sizes="80px"
            />
          </div>
        ) : null}

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
    <section className="z-[501] mx-auto w-[90vw] pt-8 pb-10 lg:pt-12 lg:pb-16">
      <div className="rounded-[28px] border border-yellow-300/40 bg-slate-900/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm lg:p-8">
        <p className="text-xs font-dosis uppercase tracking-[0.22em] text-yellow-200/90">
          {content.eyebrow}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-sans text-3xl font-extrabold text-white lg:text-4xl">
              {highlightLandingKeywords(content.heading, pageContent)}
            </h2>
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white/80 lg:text-lg"
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
              <Image src={option.image!} alt={option.imageAlt!} width={200} height={200} className=" rounded-xl w-full h-auto" />
              <p className="text-lg font-semibold text-white mt-4">{option.name} ~ od {option.price} zł</p>
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

      <div className="mt-8">
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white">{content.whyTitle}</h3>
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
        </section>

        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm sm:p-6 lg:p-7">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              {content.processTitle}
            </h3>
            <p className="mt-3 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
              Każdy etap ma jasno określony cel: od ustalenia kierunku, przez
              strukturę i wdrożenie, aż po rozwój po publikacji.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-5">
            {content.processSteps.map((step, index) => (
              <ProcessStepCard key={step.title} step={step} index={index} />
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
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
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
      </section>


      <div className="bg-slate-800/50 backdrop-blur-sm mt-6 rounded-[28px] border border-yellow-300/35 bg-gradient-to-r from-yellow-300/15 to-transparent p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          
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
