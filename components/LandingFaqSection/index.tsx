"use client";

import Link from "next/link";
import {
  getContextualLandingPageLinks,
  getSiblingCityLinks,
  type LandingPageContent,
  type LandingPageIntentContent,
  type LandingPageLink,
} from "@/data/landingPages";
import { highlightLandingKeywords } from "@/utils/highlightLandingKeywords";

type LandingFaqSectionProps = {
  pageContent: LandingPageContent;
  content: LandingPageIntentContent;
  currentSlug?: string;
};

export default function LandingFaqSection({
  pageContent,
  content,
  currentSlug,
}: LandingFaqSectionProps) {
  const contextualLandingLinks = getContextualLandingPageLinks(currentSlug);
  const siblingCityLinks = getSiblingCityLinks(currentSlug, 6);

  function renderInlineLinks(links: LandingPageLink[]) {
    return links.map((link, index) => {
      const isLast = index === links.length - 1;
      const isSecondToLast = index === links.length - 2;

      return (
        <span key={link.href}>
          <Link
            href={link.href}
            className="text-yellow-200 underline decoration-yellow-300/60 underline-offset-4 transition hover:text-yellow-100"
          >
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
        className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
      >
        {link.label}
      </Link>
    ));
  }

  return (
    <section className="mb-24 z-[502] mt-6 w-full max-w-[min(1100px,100%)] rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.08),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(15,23,42,0.84))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-6 lg:p-7 4xl:max-w-[min(1280px,100%)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/85">
            FAQ
          </p>
          <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            Często zadawane pytania
          </h3>
          <p className="mt-3 font-dosis text-sm leading-relaxed text-white/70 sm:text-base">
            {highlightLandingKeywords(content.faqIntro, pageContent)}
          </p>
          
        </div>

        
      </div>

      

      <div className="mt-6 space-y-3">
        {content.faqItems.map((item, index) => (
          <details
            key={item.question}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-white/15 hover:bg-white/[0.04] sm:px-5 sm:py-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-yellow-300/20 bg-yellow-300/10 text-xs font-semibold text-yellow-100">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-white sm:text-base">
                  {item.question}
                </span>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-yellow-200 transition duration-200 group-open:rotate-45 group-open:border-yellow-300/30 group-open:bg-yellow-300/10">
                +
              </span>
            </summary>
            <div className="mt-4 border-t border-white/15 pt-4">
              <p className="whitespace-pre-line font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
                {highlightLandingKeywords(item.answer, pageContent)}
              </p>
              {item.relatedLinks?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.relatedLinks.map((link) => (
                    <Link
                      key={`${item.question}-${link.href}`}
                      href={link.href}
                      className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </details>
        ))}
      </div>

      {siblingCityLinks.length ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-col gap-3">
            <div className="max-w-2xl">
            {contextualLandingLinks.length ? (
            <p className="font-dosis text-sm leading-relaxed text-white/60 sm:text-base">
              Powiązane usługi w tym mieście:{" "}
              {renderInlineLinks(contextualLandingLinks)}.
            </p>
          ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {renderLinkChips(siblingCityLinks, "sibling")}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
