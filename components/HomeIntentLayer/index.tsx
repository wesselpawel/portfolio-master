"use client";

import Link from "next/link";
import {
  getContextualLandingPageLinks,
  getHomepageSectionLinks,
  getSiblingCityLinks,
  type LandingPageLink,
  type LandingPageIntentContent,
} from "@/data/landingPages";

type HomeIntentLayerProps = {
  content: LandingPageIntentContent;
  currentSlug?: string;
};

export default function HomeIntentLayer({
  content,
  currentSlug,
}: HomeIntentLayerProps) {
  const sectionLinks = getHomepageSectionLinks(!currentSlug);
  const contextualLandingLinks = getContextualLandingPageLinks(currentSlug);
  const siblingCityLinks = getSiblingCityLinks(currentSlug, 6);

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

  return (
    <section className="z-[501] mx-auto w-[90vw]  pt-8 pb-10 lg:pt-12 lg:pb-16">
      <div className="rounded-[28px] border border-yellow-300/40 bg-slate-900/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm lg:p-8">
        <p className="text-xs font-dosis uppercase tracking-[0.22em] text-yellow-200/90">
          {content.eyebrow}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-sans text-3xl font-extrabold text-white lg:text-4xl">
              {content.heading}
            </h2>
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white/80 lg:text-lg"
              >
                {paragraph}
              </p>
            ))}
            {contextualLandingLinks.length ? (
              <p className="mt-4 max-w-3xl font-dosis text-base leading-relaxed text-white/75 lg:text-lg">
                Jeśli chcesz porównać inne warianty dla tego samego miasta, zobacz
                {" "}
                {renderInlineLinks(contextualLandingLinks)}.
              </p>
            ) : null}
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
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-300 px-4 py-3 text-sm font-bold text-black transition hover:brightness-105"
              >
                {content.primaryCtaLabel}
              </Link>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="tel:+48721417154"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Zadzwoń
                </Link>
                <Link
                  href="mailto:hello@wesselpawel.com"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Napisz maila
                </Link>
              </div>
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
              <p className="text-lg font-semibold text-white">{option.name}</p>
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

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
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

        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white">
            {content.processTitle}
          </h3>
          <div className="mt-4 space-y-3">
            {content.processSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl bg-black/20 px-4 py-4"
              >
                <p className="text-sm font-semibold text-yellow-200 sm:text-base">
                  {step.title}
                </p>
                <p className="mt-2 font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
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
            href="#contact"
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

      <section className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">{content.faqTitle}</h3>
            <p className="mt-2 font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
              {content.faqIntro}
            </p>
            {contextualLandingLinks.length ? (
              <p className="mt-3 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
                W obrębie tego samego miasta możesz też sprawdzić
                {" "}
                {renderInlineLinks(contextualLandingLinks)}.
              </p>
            ) : null}
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {content.faqCtaLabel}
          </Link>
        </div>

        <div className="mt-5 space-y-3">
          {content.faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-white sm:text-base">
                {item.question}
              </summary>
              <p className="mt-3 whitespace-pre-line font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
                {item.answer}
              </p>
              {item.relatedLinks?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.relatedLinks.map((link) => (
                    <Link
                      key={`${item.question}-${link.href}`}
                      href={link.href}
                      className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </details>
          ))}
        </div>
        {siblingCityLinks.length ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">
              Te same usługi w innych miastach
            </p>
            <p className="mt-2 font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
              Jeśli rozwijasz widoczność szerzej niż jedno miasto, sprawdź też:
              {" "}
              {renderInlineLinks(siblingCityLinks)}.
            </p>
          </div>
        ) : null}
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
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-yellow-300 px-5 py-3 text-sm font-bold text-black transition hover:brightness-105"
            >
              {content.nextStepPrimaryCtaLabel}
            </Link>
            <Link
              href="#contact"
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
