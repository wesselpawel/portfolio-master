import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

const SITE_URL = "https://wesselpawel.com";

export const metadata: Metadata = {
  title: "Polityka cookies | wesselpawel.com",
  description:
    "Informacje o plikach cookies, zgodach i narzędziach analitycznych wykorzystywanych w serwisie wesselpawel.com.",
  alternates: {
    canonical: `${SITE_URL}/polityka-cookies`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/polityka-cookies`,
    title: "Polityka cookies | wesselpawel.com",
    description:
      "Informacje o plikach cookies, zgodach i narzędziach analitycznych wykorzystywanych w serwisie wesselpawel.com.",
    siteName: "Paweł Wessel - WWW Expert",
  },
  twitter: {
    title: "Polityka cookies | wesselpawel.com",
    description:
      "Informacje o plikach cookies, zgodach i narzędziach analitycznych wykorzystywanych w serwisie wesselpawel.com.",
  },
};

const sections = [
  {
    title: "Czym są pliki cookies",
    paragraphs: [
      "Pliki cookies to niewielkie informacje tekstowe zapisywane na urządzeniu użytkownika podczas korzystania ze strony internetowej.",
      "Mogą one służyć do prawidłowego działania serwisu, zapamiętania decyzji użytkownika oraz prowadzenia statystyk odwiedzin.",
    ],
  },
  {
    title: "Jakie cookies wykorzystuje serwis",
    paragraphs: [
      "Serwis wykorzystuje cookies niezbędne do prawidłowego działania podstawowych funkcji strony, w tym zapamiętania wyboru użytkownika dotyczącego zgody na cookies.",
      "Po wyrażeniu zgody mogą być również uruchamiane cookies analityczne związane z Google Analytics, które pomagają mierzyć ruch i skuteczność podstron.",
    ],
  },
  {
    title: "Cookies niezbędne i analityczne",
    paragraphs: [
      "Cookies niezbędne są wykorzystywane wyłącznie po to, aby serwis działał poprawnie i zapamiętywał ustawienia związane z prywatnością.",
      "Cookies analityczne są opcjonalne i uruchamiają się dopiero wtedy, gdy użytkownik wybierze akceptację analityki w popupie zgody.",
    ],
  },
  {
    title: "Jak zarządzać zgodą",
    paragraphs: [
      "Użytkownik może zaakceptować wszystkie cookies albo pozostać przy cookies niezbędnych. Wybór jest zapisywany lokalnie na urządzeniu użytkownika.",
      "Zgoda może zostać zmieniona ponownie z poziomu linku ustawień cookies dostępnego w stopce serwisu.",
    ],
  },
  {
    title: "Narzędzia zewnętrzne",
    paragraphs: [
      "Jeżeli użytkownik wyrazi zgodę na analitykę, serwis może korzystać z narzędzia Google Analytics w celu zbierania zbiorczych danych statystycznych o sposobie korzystania ze strony.",
      "Dane te nie są wykorzystywane do podejmowania zautomatyzowanych decyzji wobec użytkownika i mają charakter pomocniczy przy rozwijaniu serwisu.",
    ],
  },
  {
    title: "Jak usunąć cookies",
    paragraphs: [
      "Użytkownik może samodzielnie usunąć lub zablokować cookies z poziomu ustawień swojej przeglądarki internetowej. Ograniczenie cookies niezbędnych może jednak wpłynąć na poprawne działanie niektórych funkcji strony.",
      "Szczegółowe informacje o sposobie zarządzania cookies znajdują się w ustawieniach używanej przeglądarki internetowej.",
    ],
  },
] as const;

export default function CookiesPolicyPage() {
  return (
    <LegalPage
      eyebrow="Dokument prawny"
      title="Polityka cookies"
      intro="Tutaj opisuję, jakie pliki cookies mogą być używane w serwisie, do czego służą oraz w jaki sposób można zarządzać swoją zgodą."
      sections={sections.map((section) => ({
        title: section.title,
        paragraphs: [...section.paragraphs],
      }))}
    />
  );
}
