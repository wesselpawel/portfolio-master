import type { ReactNode } from "react";
import type { LandingPageContent } from "@/data/landingPages";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getUniquePhrases(phrases: string[]): string[] {
  return Array.from(
    new Set(phrases.map((phrase) => phrase.trim()).filter(Boolean)),
  ).sort((a, b) => b.length - a.length);
}

function getLandingPageKeywordPhrases(page: LandingPageContent): string[] {
  const cityName = page.cityName ?? "Grudziądz";

  if (page.targetLabel) {
    return getUniquePhrases([
      `strona internetowa dla ${page.targetLabel} ${cityName}`,
      `strona dla ${page.targetLabel} ${cityName}`,
      `strona internetowa dla ${page.targetLabel}`,
    ]);
  }

  switch (page.serviceKey) {
    case "landing":
      return getUniquePhrases([
        `landing page ${cityName}`,
        `tworzenie landing page ${cityName}`,
      ]);
    case "store":
      return getUniquePhrases([
        `sklepy internetowe ${cityName}`,
        `tworzenie sklepów internetowych ${cityName}`,
      ]);
    case "seo":
      return getUniquePhrases([
        `SEO ${cityName}`,
        `pozycjonowanie stron internetowych ${cityName}`,
      ]);
    case "website":
      return getUniquePhrases([
        `tworzenie stron WWW ${cityName}`,
        `strony WWW ${cityName}`,
        `strony internetowe ${cityName}`,
      ]);
    default:
      return getUniquePhrases([
        `${page.hero.headingHighlight} ${cityName}`,
        page.hero.headingHighlight,
      ]);
  }
}

export function highlightLandingKeywords(
  text: string,
  page: LandingPageContent,
): ReactNode {
  const phrases = getLandingPageKeywordPhrases(page);

  if (!phrases.length) {
    return text;
  }

  const regex = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "gi");
  const parts = text.split(regex);

  if (parts.length === 1) {
    return text;
  }

  return parts.map((part, index) => {
    const isKeyword = phrases.some(
      (phrase) => phrase.toLowerCase() === part.toLowerCase(),
    );

    if (!isKeyword) {
      return part;
    }

    return (
      <strong key={`${part}-${index}`} className="font-semibold text-white">
        {part}
      </strong>
    );
  });
}
