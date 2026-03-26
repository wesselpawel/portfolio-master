import type { Metadata } from "next";

export type LandingPageOffer = {
  name: string;
  description: string;
  highlighted?: boolean;
};

export type LandingPageStep = {
  title: string;
  description: string;
};

export type LandingPageFaqItem = {
  question: string;
  answer: string;
  relatedLinks?: readonly LandingPageLink[];
};

export type LandingPageLink = {
  href: string;
  label: string;
};

export type LandingPageHeroContent = {
  headingPrefix: string;
  headingHighlight: string;
  headingSuffix: string;
  description: string;
  floatingPromptPrimary: string;
  floatingPromptSecondary: string;
};

export type LandingPageFormContent = {
  title: string;
  subtitle: string;
  requirementsPlaceholder: string;
  sendLabel: string;
  successMessage: string;
};

export type LandingPageIntentContent = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  ctaTitle: string;
  ctaDescription: string;
  primaryCtaLabel: string;
  offerLabel: string;
  offerOptions: LandingPageOffer[];
  whyTitle: string;
  whyIntro: string;
  whyPoints: string[];
  processTitle: string;
  processSteps: LandingPageStep[];
  includedTitle: string;
  includedParagraphs: string[];
  includedListLabel: string;
  includedItems: string[];
  includedCtaLabel: string;
  faqTitle: string;
  faqIntro: string;
  faqItems: LandingPageFaqItem[];
  faqCtaLabel: string;
  nextStepEyebrow: string;
  nextStepTitle: string;
  nextStepDescription: string;
  nextStepPrimaryCtaLabel: string;
  nextStepSecondaryCtaLabel: string;
};

export type LandingPageContactContent = {
  title: string;
  subtitle: string;
  imageAlt: string;
};

export type LandingPageSeoContent = {
  title: string;
  description: string;
};

export type LandingPageContent = {
  key: string;
  slug?: string;
  seo: LandingPageSeoContent;
  hero: LandingPageHeroContent;
  form: LandingPageFormContent;
  intent: LandingPageIntentContent;
  portfolioHeading: string;
  contact: LandingPageContactContent;
};

const SITE_URL = "https://wesselpawel.com";

const DEFAULT_FORM_CONTENT: LandingPageFormContent = {
  title: "Formularz kontaktowy",
  subtitle: "Opisz krótko projekt i zostaw numer telefonu.",
  requirementsPlaceholder:
    "Opisz czego potrzebujesz, jaki jest cel strony i jaki termin Cię interesuje...",
  sendLabel: "Wyślij zapytanie",
  successMessage: "Dzięki! Twoje zapytanie zostało wysłane.",
};

const DEFAULT_CONTACT_CONTENT: LandingPageContactContent = {
  title: "Masz pomysł na stronę internetową?",
  subtitle: "Zamów darmową wycenę, wypełniając formularz poniżej",
  imageAlt: "Zamów stronę internetową",
};

function createMetadata(page: LandingPageContent): Metadata {
  const pathname = page.slug ? `/${page.slug}` : "/";
  const url = `${SITE_URL}${pathname}`;

  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: page.seo.title,
      description: page.seo.description,
      siteName: "wesselpawel.com",
      images: [
        {
          url: `${SITE_URL}/assets/donuts.png`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: page.seo.title,
      description: page.seo.description,
      images: [
        {
          url: `${SITE_URL}/assets/donuts.png`,
        },
      ],
    },
  };
}

type WebsitePageOptions = {
  key: string;
  slug?: string;
  seoTitle: string;
  seoDescription: string;
  heroHighlight: string;
  intentEyebrow: string;
};

function createWebsitePage({
  key,
  slug,
  seoTitle,
  seoDescription,
  heroHighlight,
  intentEyebrow,
}: WebsitePageOptions): LandingPageContent {
  return {
    key,
    slug,
    seo: {
      title: seoTitle,
      description: seoDescription,
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: heroHighlight,
      headingSuffix: " - ZWIĘKSZ SWOJĄ WIDOCZNOŚĆ W GOOGLE",
      description:
        "Pomagam lokalnym firmom budować strony internetowe, które lepiej prezentują ofertę, wspierają sprzedaż i prowadzą klienta prosto do kontaktu.",
      floatingPromptPrimary: "Masz pomysł na stronę internetową?",
      floatingPromptSecondary: "Porozmawiajmy o Twoim projekcie",
    },
    form: DEFAULT_FORM_CONTENT,
    intent: {
      eyebrow: intentEyebrow,
      heading: "Strony internetowe, które realnie zdobywają klientów",
      paragraphs: [
        "Tworzę strony internetowe dla firm z Grudziądza i okolic, które chcą szybciej domykać zapytania, lepiej prezentować ofertę i być widoczne w Google na lokalne frazy.",
        "Jeśli interesuje Cię tworzenie stron internetowych w Grudziądzu, zacznijmy od rozwiązania dopasowanego do Twojej firmy i budżetu.",
      ],
      ctaTitle: "Chcesz zamówić stronę?",
      ctaDescription:
        "Przejdź do formularza i opisz projekt. Zadzwoń lub napisz maila.",
      primaryCtaLabel: "Przejdź do formularza i opisz projekt",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Landing page",
          description:
            "Dla jednej usługi lub kampanii. Najszybszy sposób, żeby zacząć zbierać zapytania.",
        },
        {
          name: "Strona firmowa",
          description:
            "Najlepsza opcja dla lokalnych firm. Pozwala pokazać ofertę, proces i regularnie pozyskiwać klientów z Google.",
          highlighted: true,
        },
        {
          name: "Rozbudowany serwis",
          description:
            "Dla firm, które potrzebują większej liczby podstron, bloga, integracji lub chcą rozwijać stronę etapami.",
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Tworzę strony, które mają konkretny cel. Nie tylko dobrze wyglądają, ale przede wszystkim działają.",
      whyPoints: [
        "Projekt dopasowany do celu: telefon, formularz lub zapytanie ofertowe",
        "Układ i treści budowane pod decyzję zakupową",
        'Od początku uwzględnione local SEO (np. "strony internetowe Grudziądz")',
        "Bezpośredni kontakt ze specjalistą - od projektu po wdrożenie",
        "Dbałość o szybkość działania i jakość wykonania",
      ],
      processTitle: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Krótka rozmowa i wycena",
          description:
            "Ustalamy cel strony, zakres prac i najlepsze rozwiązanie dla Twojej firmy.",
        },
        {
          title: "2. Struktura i kierunek wizualny",
          description:
            "Przygotowuję układ sekcji, komunikację sprzedażową i koncepcję strony.",
        },
        {
          title: "3. Wdrożenie i poprawki",
          description:
            "Tworzę stronę, konfiguruję formularze i wprowadzam uzgodnione poprawki.",
        },
        {
          title: "4. Publikacja i wsparcie",
          description:
            "Strona jest gotowa do działania, a Ty wiesz, jak ją dalej rozwijać.",
        },
      ],
      includedTitle: "Co otrzymujesz w cenie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu - od prostego landing page po rozbudowany serwis.",
        "W każdym przypadku celem jest skuteczna strona internetowa dla firmy z Grudziądza, a nie tylko estetyczna wizytówka.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt dopasowany do marki, usługi i odbiorcy",
        "pełną responsywność (telefon, tablet, desktop)",
        "mocne CTA (formularz, telefon, e-mail)",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        'podstawy local SEO (np. "strona www dla firmy Grudziądz")',
        "konfigurację formularza kontaktowego",
        "przygotowanie strony do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują zamówić stronę internetową w Grudziądzu.",
      faqItems: [
        {
          question: "Ile kosztuje strona internetowa w Grudziądzu?",
          answer:
            "Cena zależy od zakresu: liczby sekcji, podstron, funkcji i ilości treści. Najczęściej najlepszym rozwiązaniem jest strona firmowa z ofertą, procesem, FAQ i wyraźnym kontaktem.",
          relatedLinks: [
            {
              href: "/strona-internetowa-dla-firmy-grudziadz",
              label: "Strona internetowa dla firmy",
            },
            {
              href: "/landing-page-grudziadz",
              label: "Landing page Grudziądz",
            },
            {
              href: "/sklepy-internetowe-grudziadz",
              label: "Sklepy internetowe Grudziądz",
            },
          ],
        },
        {
          question: "Jak długo trwa realizacja?",
          answer:
            "Proste projekty można zrealizować szybciej, a bardziej rozbudowane wdrażane są etapami. Dokładny termin ustalam po krótkiej rozmowie.",
        },
        {
          question: "Czy pomagasz z treściami?",
          answer:
            "Tak. Pomagam uporządkować ofertę, zaplanować strukturę i przygotować treści, które lepiej sprzedają.",
          relatedLinks: [
            {
              href: "/projektowanie-stron-www-grudziadz",
              label: "Projektowanie stron www",
            },
            {
              href: "/strona-internetowa-dla-firmy-grudziadz",
              label: "Strona dla firmy",
            },
          ],
        },
        {
          question: "Czy strona będzie przygotowana pod SEO lokalne?",
          answer:
            "Tak - jeśli działasz lokalnie, strona może wspierać frazy takie jak:\n\n- strony internetowe Grudziądz\n- tworzenie stron Grudziądz\n- strona www dla firmy Grudziądz",
          relatedLinks: [
            {
              href: "/pozycjonowanie-stron-internetowych-grudziadz",
              label: "Pozycjonowanie stron internetowych",
            },
            {
              href: "/projektowanie-stron-www-grudziadz",
              label: "Projektowanie stron www",
            },
          ],
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Masz firmę i chcesz zamówić stronę bez przeciągania procesu?",
      nextStepDescription:
        "Opisz krótko, czym się zajmujesz i czego potrzebujesz. Wrócę do Ciebie z konkretną propozycją i wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Moje realizacje stron internetowych",
    contact: DEFAULT_CONTACT_CONTENT,
  };
}

function createStorePage(): LandingPageContent {
  return {
    key: "sklepy-internetowe-grudziadz",
    slug: "sklepy-internetowe-grudziadz",
    seo: {
      title: "Sklepy internetowe Grudziądz - projekt i wdrożenie ecommerce",
      description:
        "Tworzę sklepy internetowe dla firm z Grudziądza. Projektuję sprzedaż online, wdrażam koszyk, płatności i układ nastawiony na konwersję.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "SKLEPY INTERNETOWE",
      headingSuffix: " - SPRZEDAWAJ WYGODNIEJ ONLINE",
      description:
        "Projektuję sklepy internetowe dla firm, które chcą sprzedawać online w uporządkowany, szybki i wygodny sposób.",
      floatingPromptPrimary: "Chcesz uruchomić sklep internetowy?",
      floatingPromptSecondary: "Porozmawiajmy o Twojej sprzedaży online",
    },
    form: {
      ...DEFAULT_FORM_CONTENT,
      requirementsPlaceholder:
        "Opisz asortyment, sposób sprzedaży, integracje i cele sklepu internetowego...",
    },
    intent: {
      eyebrow: "Sklepy internetowe Grudziądz",
      heading: "Sklepy internetowe, które pomagają sprzedawać",
      paragraphs: [
        "Tworzę sklepy internetowe dla firm z Grudziądza i okolic, które chcą zacząć sprzedawać online albo uporządkować obecny proces zakupowy.",
        "Jeśli interesuje Cię sklep internetowy dopasowany do Twojej oferty, zaplanujmy wdrożenie tak, aby był wygodny dla klientów i prosty w obsłudze po Twojej stronie.",
      ],
      ctaTitle: "Chcesz uruchomić sklep internetowy?",
      ctaDescription:
        "Przejdź do formularza i opisz asortyment, model sprzedaży i oczekiwane funkcje.",
      primaryCtaLabel: "Przejdź do formularza i opisz sklep",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Sklep start",
          description:
            "Dla mniejszej oferty i szybkiego wejścia w ecommerce. Najważniejsze funkcje gotowe do startu.",
        },
        {
          name: "Sklep firmowy",
          description:
            "Najlepsza opcja dla firm, które chcą połączyć sprzedaż online z czytelną prezentacją marki i oferty.",
          highlighted: true,
        },
        {
          name: "Rozbudowany ecommerce",
          description:
            "Dla firm, które potrzebują większej liczby kategorii, integracji, automatyzacji lub rozwoju etapami.",
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Sklep internetowy ma nie tylko wyglądać dobrze, ale przede wszystkim upraszczać zakup i zwiększać sprzedaż.",
      whyPoints: [
        "Układ sklepu projektowany pod konwersję i wygodę zakupów",
        "Jasna prezentacja oferty, kategorii i kart produktów",
        "Wsparcie przy wyborze funkcji, integracji i sposobu wdrożenia",
        "Dbałość o szybkość działania oraz doświadczenie na telefonie",
        "Bezpośredni kontakt od planu sklepu po publikację",
      ],
      processTitle: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Analiza sprzedaży i zakresu",
          description:
            "Ustalamy, co sprzedajesz, jak wygląda proces zamówienia i jakie funkcje są potrzebne na start.",
        },
        {
          title: "2. Struktura sklepu i makieta",
          description:
            "Planowanie kategorii, produktu, koszyka oraz sekcji, które mają wspierać decyzję zakupową.",
        },
        {
          title: "3. Wdrożenie i konfiguracja",
          description:
            "Tworzę sklep, konfiguruję formularze, podstawowe elementy sprzedaży i niezbędne poprawki.",
        },
        {
          title: "4. Publikacja i rozwój",
          description:
            "Po starcie sklep jest gotowy do działania, a Ty możesz rozwijać go etapami wraz ze wzrostem oferty.",
        },
      ],
      includedTitle: "Co otrzymujesz w cenie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu - od prostego sklepu startowego po bardziej rozbudowany ecommerce.",
        "Celem jest sklep internetowy, który porządkuje sprzedaż i ułatwia klientowi zakup.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt sklepu dopasowany do oferty i grupy docelowej",
        "pełną responsywność na telefon, tablet i desktop",
        "układ wspierający zakup oraz kontakt",
        "sekcje sprzedażowe, FAQ i argumenty zakupowe",
        "przygotowanie pod dalszy rozwój i kolejne etapy",
        "konfigurację formularza kontaktowego",
        "przygotowanie sklepu do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę sklepu",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują uruchomić sklep internetowy w Grudziądzu.",
      faqItems: [
        {
          question: "Ile kosztuje sklep internetowy?",
          answer:
            "Cena zależy od liczby produktów, widoków, integracji i poziomu rozbudowania. Zakres ustalam po krótkiej rozmowie o ofercie i modelu sprzedaży.",
        },
        {
          question: "Czy pomagasz zaplanować strukturę sklepu?",
          answer:
            "Tak. Pomagam uporządkować kategorie, strukturę sklepu, najważniejsze sekcje i ścieżkę zakupową.",
        },
        {
          question: "Czy sklep będzie działał dobrze na telefonie?",
          answer:
            "Tak. Każdy sklep projektuję z myślą o użytkownikach mobilnych, bo to oni często stanowią dużą część ruchu.",
        },
        {
          question: "Czy sklep można później rozwijać?",
          answer:
            "Tak. System jest przygotowany tak, aby można było etapami dodawać kolejne funkcje, sekcje i integracje.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz uruchomić sklep internetowy bez chaotycznego wdrożenia?",
      nextStepDescription:
        "Opisz, co sprzedajesz i czego potrzebujesz. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Wybrane realizacje i wdrożenia",
    contact: {
      title: "Chcesz uruchomić sklep internetowy?",
      subtitle: "Zamów wycenę, wypełniając formularz poniżej",
      imageAlt: "Zamów sklep internetowy",
    },
  };
}

function createSeoPage(): LandingPageContent {
  return {
    key: "pozycjonowanie-stron-internetowych-grudziadz",
    slug: "pozycjonowanie-stron-internetowych-grudziadz",
    seo: {
      title:
        "Pozycjonowanie stron internetowych Grudziądz - SEO lokalne dla firm",
      description:
        "Pomagam lokalnym firmom zwiększać widoczność w Google. Pozycjonowanie stron internetowych w Grudziądzu z naciskiem na lokalne frazy i zapytania od klientów.",
    },
    hero: {
      headingPrefix: "PROWADZĘ ",
      headingHighlight: "POZYCJONOWANIE STRON",
      headingSuffix: " - ZWIĘKSZ LOKALNĄ WIDOCZNOŚĆ W GOOGLE",
      description:
        "Pomagam firmom z Grudziądza poprawić widoczność w Google, uporządkować treści i lepiej odpowiadać na lokalne zapytania klientów.",
      floatingPromptPrimary: "Chcesz zwiększyć widoczność strony?",
      floatingPromptSecondary: "Porozmawiajmy o lokalnym SEO",
    },
    form: {
      ...DEFAULT_FORM_CONTENT,
      requirementsPlaceholder:
        "Opisz branżę, obecną stronę i cele pozycjonowania lokalnego...",
    },
    intent: {
      eyebrow: "Pozycjonowanie stron internetowych Grudziądz",
      heading: "SEO lokalne, które wspiera pozyskiwanie klientów",
      paragraphs: [
        "Pomagam firmom z Grudziądza i okolic zwiększać widoczność strony na lokalne frazy oraz lepiej odpowiadać na realne intencje użytkowników.",
        "Jeśli interesuje Cię pozycjonowanie strony internetowej w Grudziądzu, zacznijmy od analizy tego, co już masz i gdzie najszybciej można poprawić wyniki.",
      ],
      ctaTitle: "Chcesz zwiększyć widoczność strony?",
      ctaDescription:
        "Przejdź do formularza i opisz obecną stronę, branżę oraz cele SEO.",
      primaryCtaLabel: "Przejdź do formularza i opisz stronę",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Audyt SEO",
          description:
            "Dla firm, które chcą zrozumieć, co blokuje widoczność strony i od czego zacząć poprawę.",
        },
        {
          name: "SEO lokalne",
          description:
            "Najlepsza opcja dla firm, które działają lokalnie i chcą być częściej znajdowane przez klientów z Grudziądza.",
          highlighted: true,
        },
        {
          name: "Stałe rozwijanie treści",
          description:
            "Dla firm, które chcą etapowo rozbudowywać widoczność strony, sekcje ofertowe i long-tail.",
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "SEO lokalne nie polega tylko na dodaniu kilku słów kluczowych. Liczy się struktura, treść i intencja użytkownika.",
      whyPoints: [
        "Skupienie na frazach lokalnych i intencjach zakupowych",
        "Poprawa układu treści, nagłówków i sekcji wspierających SEO",
        "Połączenie działań contentowych z doświadczeniem użytkownika",
        "Jasne rekomendacje zamiast chaotycznych zmian bez planu",
        "Bezpośredni kontakt i konkretne priorytety wdrożeniowe",
      ],
      processTitle: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Analiza strony i fraz",
          description:
            "Sprawdzam obecną widoczność, strukturę treści i potencjał lokalnych zapytań.",
        },
        {
          title: "2. Plan zmian",
          description:
            "Układam priorytety: co poprawić najpierw w treści, strukturze i komunikacji sprzedażowej.",
        },
        {
          title: "3. Wdrożenie rekomendacji",
          description:
            "Wprowadzam lub rozpisuję zmiany, które wspierają widoczność i lepszą konwersję ruchu.",
        },
        {
          title: "4. Dalszy rozwój",
          description:
            "Ustalamy kolejne kroki, jeśli chcesz rozwijać stronę o nowe treści i lokalne landing pages.",
        },
      ],
      includedTitle: "Co otrzymujesz w cenie",
      includedParagraphs: [
        "Zakres dopasowuję do tego, czy potrzebujesz szybkiego audytu, lokalnego SEO czy dalszego rozwoju treści.",
        "Celem jest lepsza widoczność strony na frazy lokalne i większa liczba wartościowych zapytań.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "analizę obecnej strony i lokalnych fraz",
        "rekomendacje dotyczące struktury nagłówków i sekcji",
        "propozycje treści wspierających SEO lokalne",
        "wskazanie najważniejszych priorytetów wdrożeniowych",
        "lepsze dopasowanie strony do intencji użytkownika",
        "przygotowanie planu dalszego rozwoju",
      ],
      includedCtaLabel: "Chcę dostać wycenę SEO",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują pozycjonowanie strony internetowej w Grudziądzu.",
      faqItems: [
        {
          question: "Czy pozycjonowanie lokalne ma sens dla małej firmy?",
          answer:
            "Tak. Dla lokalnych usług i firm często to właśnie frazy lokalne dają najbardziej wartościowy ruch i realne zapytania od klientów.",
        },
        {
          question: "Od czego zaczyna się współpraca SEO?",
          answer:
            "Zaczynam od sprawdzenia strony, treści, struktury i potencjału fraz. Dzięki temu wiadomo, które działania mają największy sens na start.",
        },
        {
          question: "Czy trzeba przebudować całą stronę?",
          answer:
            "Nie zawsze. Czasem wystarczą poprawki treści i struktury, a czasem lepszym rozwiązaniem jest rozbudowa kilku kluczowych sekcji lub podstron.",
        },
        {
          question: "Czy można połączyć SEO z nową stroną?",
          answer:
            "Tak. To często najlepsze rozwiązanie, bo można od początku zaplanować stronę pod frazy lokalne, strukturę i konwersję.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz poprawić widoczność strony bez przypadkowych działań?",
      nextStepDescription:
        "Opisz swoją branżę, obecną stronę i cele. Wrócę z propozycją sensownego kierunku oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Wybrane realizacje i wdrożenia",
    contact: {
      title: "Chcesz poprawić widoczność swojej strony?",
      subtitle: "Opisz obecną stronę i cele, a przygotuję kierunek działań",
      imageAlt: "Zamów pozycjonowanie strony internetowej",
    },
  };
}

function createWebDesignPage(): LandingPageContent {
  return {
    key: "projektowanie-stron-www-grudziadz",
    slug: "projektowanie-stron-www-grudziadz",
    seo: {
      title:
        "Projektowanie stron www Grudziądz - nowoczesne strony dla firm",
      description:
        "Projektowanie stron www w Grudziądzu dla lokalnych firm. Tworzę nowoczesne, przemyślane strony internetowe, które dobrze prezentują ofertę i wspierają kontakt.",
    },
    hero: {
      headingPrefix: "PROJEKTUJĘ ",
      headingHighlight: "STRONY WWW",
      headingSuffix: " - NOWOCZEŚNIE, CZYTELNIE I SKUTECZNIE",
      description:
        "Projektuję strony www dla firm, które chcą wyglądać profesjonalnie, jasno komunikować ofertę i ułatwiać klientowi podjęcie decyzji.",
      floatingPromptPrimary: "Chcesz zaprojektować nową stronę www?",
      floatingPromptSecondary: "Porozmawiajmy o układzie i komunikacji strony",
    },
    form: {
      ...DEFAULT_FORM_CONTENT,
      requirementsPlaceholder:
        "Opisz branżę, zakres strony, styl wizualny i czego oczekujesz od projektu...",
    },
    intent: {
      eyebrow: "Projektowanie stron www - Grudziądz",
      heading: "Projektowanie stron www, które porządkuje ofertę i zwiększa zaufanie",
      paragraphs: [
        "Projektuję strony www dla firm z Grudziądza i okolic, które chcą lepiej pokazać ofertę, wyróżnić się wizualnie i prowadzić użytkownika prosto do kontaktu.",
        "Jeśli interesuje Cię projektowanie strony www w Grudziądzu, zacznijmy od przemyślanego układu treści, hierarchii sekcji i komunikacji dopasowanej do Twojej firmy.",
      ],
      ctaTitle: "Chcesz zaprojektować stronę www?",
      ctaDescription:
        "Przejdź do formularza i opisz branżę, zakres strony oraz oczekiwany styl.",
      primaryCtaLabel: "Przejdź do formularza i opisz projekt",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Projekt landing page",
          description:
            "Dla jednej oferty lub kampanii. Skupia się na przejrzystym układzie i mocnym CTA.",
        },
        {
          name: "Projekt strony firmowej",
          description:
            "Najlepsza opcja dla firm, które chcą uporządkować ofertę, proces współpracy i zbudować profesjonalny wizerunek.",
          highlighted: true,
        },
        {
          name: "Projekt rozbudowanego serwisu",
          description:
            "Dla firm, które potrzebują większej liczby podstron, bloga, rozbudowanej struktury lub rozwoju etapami.",
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Dobre projektowanie strony www to nie tylko estetyka. To przede wszystkim czytelny układ, właściwe komunikaty i wygodna ścieżka użytkownika.",
      whyPoints: [
        "Projekt dopasowany do branży, oferty i celu strony",
        "Przemyślana hierarchia sekcji i komunikatów sprzedażowych",
        "Układ wspierający kontakt, telefon lub zapytanie ofertowe",
        "Spójne połączenie estetyki, użyteczności i SEO lokalnego",
        "Bezpośredni kontakt od pomysłu po finalne wdrożenie",
      ],
      processTitle: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Analiza celu i zakresu",
          description:
            "Ustalamy, do kogo ma trafiać strona, jaki ma mieć cel i jakie sekcje są naprawdę potrzebne.",
        },
        {
          title: "2. Koncepcja układu i komunikacji",
          description:
            "Przygotowuję kierunek strony, strukturę sekcji i sposób prezentacji oferty.",
        },
        {
          title: "3. Projekt i wdrożenie",
          description:
            "Tworzę stronę, dbam o czytelność, responsywność i konfiguruję najważniejsze elementy kontaktowe.",
        },
        {
          title: "4. Publikacja i rozwój",
          description:
            "Po uruchomieniu strony wiesz, jak dalej ją rozwijać i jakie kolejne elementy można rozbudować.",
        },
      ],
      includedTitle: "Co otrzymujesz w cenie",
      includedParagraphs: [
        "Zakres dopasowuję do projektu - od prostego landing page po rozbudowaną stronę firmową.",
        "Celem jest strona www, która dobrze wygląda, ale przede wszystkim porządkuje ofertę i ułatwia klientowi kontakt.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt dopasowany do marki, odbiorcy i celu strony",
        "czytelną strukturę sekcji i komunikatów",
        "pełną responsywność na telefon, tablet i desktop",
        "mocne CTA prowadzące do kontaktu",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "podstawy local SEO i przygotowanie do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę projektu",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują projektowanie strony www w Grudziądzu.",
      faqItems: [
        {
          question: "Czym różni się projektowanie strony od samego wdrożenia?",
          answer:
            "Projektowanie skupia się na strukturze, komunikacji, wyglądzie i doświadczeniu użytkownika. Wdrożenie to później przełożenie tego na działającą stronę.",
        },
        {
          question: "Czy pomagasz dobrać układ sekcji i treści?",
          answer:
            "Tak. Pomagam ułożyć sekcje, uporządkować ofertę i dobrać komunikaty tak, aby strona była czytelna i bardziej sprzedażowa.",
        },
        {
          question: "Czy projekt będzie dopasowany do urządzeń mobilnych?",
          answer:
            "Tak. Już na etapie projektowania uwzględniam sposób, w jaki strona ma działać i wyglądać na telefonie.",
        },
        {
          question: "Czy projektowanie strony może wspierać SEO lokalne?",
          answer:
            "Tak. Dobrze zaplanowana struktura nagłówków, sekcji i treści pomaga później lepiej rozwijać stronę pod frazy lokalne.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz zaprojektować stronę www, która naprawdę będzie pracować na wynik?",
      nextStepDescription:
        "Opisz, czym zajmuje się Twoja firma i czego oczekujesz od strony. Wrócę z propozycją rozwiązania i wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Wybrane realizacje stron internetowych",
    contact: {
      title: "Chcesz zaprojektować nową stronę www?",
      subtitle: "Opisz projekt, a przygotuję kierunek i wycenę",
      imageAlt: "Projektowanie strony www",
    },
  };
}

function createLandingPageServicePage(): LandingPageContent {
  return {
    key: "landing-page-grudziadz",
    slug: "landing-page-grudziadz",
    seo: {
      title: "Landing page Grudziądz - strony sprzedażowe pod kampanie i leady",
      description:
        "Tworzę landing page dla firm z Grudziądza. Strony pod kampanie, usługi i reklamy, zaprojektowane tak, by zwiększać liczbę zapytań i kontaktów.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "LANDING PAGE",
      headingSuffix: " - POD LEADY, REKLAMY I KONKRETNĄ OFERTĘ",
      description:
        "Projektuję landing page dla firm, które chcą szybko przetestować ofertę, wesprzeć kampanię i kierować użytkownika do jednego celu.",
      floatingPromptPrimary: "Chcesz uruchomić skuteczny landing page?",
      floatingPromptSecondary: "Porozmawiajmy o stronie pod kampanię lub usługę",
    },
    form: {
      ...DEFAULT_FORM_CONTENT,
      requirementsPlaceholder:
        "Opisz ofertę, kampanię, grupę docelową i główny cel landing page...",
    },
    intent: {
      eyebrow: "Landing page - Grudziądz",
      heading: "Landing page, który skupia uwagę i zwiększa liczbę zapytań",
      paragraphs: [
        "Tworzę landing page dla firm z Grudziądza i okolic, które chcą promować konkretną usługę, kampanię lub ofertę bez rozpraszania użytkownika zbędnymi sekcjami.",
        "Jeśli interesuje Cię landing page w Grudziądzu, zaprojektujmy stronę, która prowadzi klienta do jednego celu: telefonu, formularza albo zapytania.",
      ],
      ctaTitle: "Chcesz zamówić landing page?",
      ctaDescription:
        "Przejdź do formularza i opisz ofertę, reklamę albo usługę, którą chcesz promować.",
      primaryCtaLabel: "Przejdź do formularza i opisz landing page",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Landing page pod usługę",
          description:
            "Dla jednej usługi, gdy liczy się prosty układ, szybki kontakt i wysoka czytelność oferty.",
          highlighted: true,
        },
        {
          name: "Landing page pod kampanię",
          description:
            "Dla działań reklamowych, promocji lub okresowych akcji, gdzie liczy się szybki start i dobra konwersja.",
        },
        {
          name: "Landing page rozwijany etapami",
          description:
            "Dla firm, które chcą zacząć od jednej strony i z czasem rozbudować ją o kolejne warianty lub sekcje.",
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Dobry landing page nie ma być rozbudowany. Ma być prosty, czytelny i skupiony na jednym działaniu użytkownika.",
      whyPoints: [
        "Skupienie całego układu na jednym celu konwersji",
        "Sekcje, które prowadzą od problemu do kontaktu",
        "Mocne CTA i uproszczona ścieżka użytkownika",
        "Dopasowanie strony do reklamy, usługi lub konkretnej oferty",
        "Szybkie wdrożenie bez zbędnej rozbudowy",
      ],
      processTitle: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Ustalenie celu landing page",
          description:
            "Definiujemy, czy najważniejszy ma być telefon, formularz, lead czy zapis.",
        },
        {
          title: "2. Układ treści i argumentów",
          description:
            "Przygotowuję strukturę sekcji, argumenty sprzedażowe i sposób prowadzenia użytkownika.",
        },
        {
          title: "3. Wdrożenie i konfiguracja",
          description:
            "Tworzę landing page, dbam o responsywność i podpinam formularz lub inne elementy kontaktowe.",
        },
        {
          title: "4. Publikacja i dalsze testy",
          description:
            "Po uruchomieniu strony możesz dalej rozwijać kolejne warianty kampanii lub ofert.",
        },
      ],
      includedTitle: "Co otrzymujesz w cenie",
      includedParagraphs: [
        "Zakres dopasowuję do celu strony - od prostego landing page pod jedną usługę po bardziej rozbudowaną stronę kampanijną.",
        "Najważniejsze jest to, żeby landing page był szybki, konkretny i skuteczny sprzedażowo.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt landing page pod jedną ofertę lub kampanię",
        "układ skoncentrowany na konwersji",
        "pełną responsywność na telefon i desktop",
        "sekcje sprzedażowe, argumenty i FAQ",
        "mocne CTA do formularza, telefonu lub maila",
        "konfigurację formularza kontaktowego i przygotowanie do publikacji",
      ],
      includedCtaLabel: "Chcę dostać wycenę landing page",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują landing page w Grudziądzu.",
      faqItems: [
        {
          question: "Dla kogo landing page będzie najlepszym rozwiązaniem?",
          answer:
            "Dla firm, które promują jedną usługę, ofertę lub kampanię i chcą skupić użytkownika na jednym celu działania.",
        },
        {
          question: "Czy landing page nadaje się pod reklamy?",
          answer:
            "Tak. To jedno z najlepszych zastosowań, bo landing page można zaprojektować dokładnie pod konkretny komunikat reklamowy.",
        },
        {
          question: "Czy landing page może zastąpić stronę firmową?",
          answer:
            "Czasem tak, jeśli na start chcesz promować jedną usługę. Przy większej ofercie zwykle lepsza będzie pełna strona firmowa.",
        },
        {
          question: "Jak szybko można wdrożyć landing page?",
          answer:
            "Zwykle szybciej niż rozbudowaną stronę, bo zakres jest mniejszy i skupiony na jednej ofercie.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz landing page, który będzie wspierał konkretną usługę lub kampanię?",
      nextStepDescription:
        "Opisz, co chcesz promować i jaki ma być cel strony. Wrócę z propozycją układu oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Wybrane realizacje stron sprzedażowych",
    contact: {
      title: "Chcesz uruchomić landing page?",
      subtitle: "Opisz ofertę lub kampanię, a przygotuję propozycję strony",
      imageAlt: "Landing page dla firmy",
    },
  };
}

function createBusinessWebsitePage(): LandingPageContent {
  return {
    key: "strona-internetowa-dla-firmy-grudziadz",
    slug: "strona-internetowa-dla-firmy-grudziadz",
    seo: {
      title:
        "Strona internetowa dla firmy Grudziądz - profesjonalna strona firmowa",
      description:
        "Tworzę strony internetowe dla firm z Grudziądza. Profesjonalne strony firmowe, które porządkują ofertę, budują zaufanie i pomagają zdobywać klientów.",
    },
    hero: {
      headingPrefix: "TWORZĘ ",
      headingHighlight: "STRONY DLA FIRM",
      headingSuffix: " - PROFESJONALNE, CZYTELNE I SKUTECZNE",
      description:
        "Pomagam firmom zbudować stronę internetową, która dobrze pokazuje ofertę, wzmacnia wiarygodność i ułatwia klientom kontakt.",
      floatingPromptPrimary: "Chcesz stronę internetową dla firmy?",
      floatingPromptSecondary: "Porozmawiajmy o firmowej stronie, która sprzedaje",
    },
    form: {
      ...DEFAULT_FORM_CONTENT,
      requirementsPlaceholder:
        "Opisz firmę, zakres oferty, grupę docelową i czego oczekujesz od strony...",
    },
    intent: {
      eyebrow: "Strona internetowa dla firmy - Grudziądz",
      heading: "Strona internetowa dla firmy, która buduje zaufanie i wspiera sprzedaż",
      paragraphs: [
        "Tworzę strony internetowe dla firm z Grudziądza i okolic, które chcą wyglądać profesjonalnie, jasno komunikować ofertę i ułatwiać klientom podjęcie decyzji.",
        "Jeśli potrzebna Ci strona internetowa dla firmy w Grudziądzu, zaplanujmy ją tak, aby wspierała zarówno wizerunek marki, jak i codzienne pozyskiwanie zapytań.",
      ],
      ctaTitle: "Chcesz stronę internetową dla firmy?",
      ctaDescription:
        "Przejdź do formularza i opisz swoją firmę, ofertę oraz cel nowej strony.",
      primaryCtaLabel: "Przejdź do formularza i opisz firmę",
      offerLabel: "Oferta",
      offerOptions: [
        {
          name: "Prosta strona firmowa",
          description:
            "Dla mniejszych firm, które chcą szybko uporządkować ofertę i uruchomić podstawową obecność online.",
        },
        {
          name: "Rozbudowana strona dla firmy",
          description:
            "Najlepsza opcja dla firm, które chcą połączyć ofertę, proces, argumenty sprzedażowe i SEO lokalne.",
          highlighted: true,
        },
        {
          name: "Strona rozwijana etapami",
          description:
            "Dla firm, które chcą zacząć od solidnej bazy i stopniowo dodawać nowe podstrony, treści i sekcje.",
        },
      ],
      whyTitle: "Dlaczego warto ze mną współpracować",
      whyIntro:
        "Strona firmowa powinna jednocześnie wyglądać profesjonalnie, porządkować ofertę i wspierać pozyskiwanie klientów.",
      whyPoints: [
        "Projekt dopasowany do branży, oferty i sposobu działania firmy",
        "Treści i układ budowane pod zaufanie oraz decyzję zakupową",
        "Sekcje pokazujące ofertę, proces współpracy i argumenty",
        "Podstawy SEO lokalnego od początku planowania strony",
        "Bezpośredni kontakt od strategii po wdrożenie",
      ],
      processTitle: "Jak wygląda współpraca",
      processSteps: [
        {
          title: "1. Poznanie firmy i celu strony",
          description:
            "Ustalamy, czym zajmuje się firma, jakie usługi chcesz pokazać i jaki cel ma spełniać strona.",
        },
        {
          title: "2. Struktura i komunikacja oferty",
          description:
            "Porządkuję sekcje, układ oferty i sposób komunikacji, aby klient szybciej zrozumiał, co proponujesz.",
        },
        {
          title: "3. Wdrożenie i dopracowanie detali",
          description:
            "Tworzę stronę, dbam o responsywność, formularz kontaktowy i uzgodnione poprawki.",
        },
        {
          title: "4. Publikacja i dalszy rozwój",
          description:
            "Po starcie strona jest gotowa do działania, a Ty możesz dalej rozwijać ofertę i lokalne podstrony SEO.",
        },
      ],
      includedTitle: "Co otrzymujesz w cenie",
      includedParagraphs: [
        "Zakres dopasowuję do wielkości firmy, liczby usług i tego, jak rozbudowana ma być strona.",
        "Celem jest profesjonalna strona internetowa dla firmy, która wspiera sprzedaż i buduje wiarygodność.",
      ],
      includedListLabel: "W standardzie otrzymujesz:",
      includedItems: [
        "projekt strony dopasowany do firmy i jej oferty",
        "pełną responsywność na telefon, tablet i desktop",
        "sekcje sprzedażowe: oferta, proces, argumenty, FAQ",
        "mocne CTA do telefonu, formularza i maila",
        "podstawy SEO lokalnego i przygotowanie do publikacji",
        "konfigurację formularza kontaktowego",
      ],
      includedCtaLabel: "Chcę dostać wycenę strony firmowej",
      faqTitle: "FAQ",
      faqIntro:
        "Najczęstsze pytania od firm, które planują nową stronę internetową w Grudziądzu.",
      faqItems: [
        {
          question: "Jaka strona będzie najlepsza dla mojej firmy?",
          answer:
            "To zależy od liczby usług, sposobu sprzedaży i tego, jak dużo treści chcesz pokazać. Dla wielu lokalnych firm najlepszym wyborem jest rozbudowana strona firmowa.",
        },
        {
          question: "Czy pomagasz uporządkować ofertę i treści?",
          answer:
            "Tak. Pomagam ułożyć ofertę, sekcje i komunikaty tak, żeby strona była czytelna i bardziej przekonująca dla klienta.",
        },
        {
          question: "Czy taka strona może wspierać lokalne SEO?",
          answer:
            "Tak. Już na etapie planowania można przygotować strukturę i treści pod rozwój widoczności na lokalne frazy.",
        },
        {
          question: "Czy stronę można później rozbudować?",
          answer:
            "Tak. To bardzo częsty scenariusz - najpierw powstaje baza, a później dokładane są kolejne podstrony i sekcje.",
        },
      ],
      faqCtaLabel: "Przejdź do formularza",
      nextStepEyebrow: "Następny krok",
      nextStepTitle:
        "Chcesz stronę internetową dla firmy bez przypadkowego układu i treści?",
      nextStepDescription:
        "Opisz swoją firmę, ofertę i cele. Wrócę z propozycją rozwiązania oraz wyceną.",
      nextStepPrimaryCtaLabel: "Przejdź do kontaktu",
      nextStepSecondaryCtaLabel: "Wyślij brief",
    },
    portfolioHeading: "Wybrane realizacje stron dla firm",
    contact: {
      title: "Chcesz stronę internetową dla firmy?",
      subtitle: "Opisz firmę i zakres strony, a przygotuję propozycję rozwiązania",
      imageAlt: "Strona internetowa dla firmy",
    },
  };
}

export const HOME_LANDING_PAGE = createWebsitePage({
  key: "home",
  seoTitle: "Strony internetowe Grudziądz - Paweł Wessel",
  seoDescription:
    "Tworzę strony internetowe dla firm z Grudziądza i okolic. Projekt, wdrożenie, local SEO i landing pages nastawione na zapytania od klientów.",
  heroHighlight: "STRONY INTERNETOWE",
  intentEyebrow: "Tworzenie stron internetowych - Grudziądz",
});

export const SEO_LANDING_PAGES: LandingPageContent[] = [
  createWebsitePage({
    key: "strony-internetowe-grudziadz",
    slug: "strony-internetowe-grudziadz",
    seoTitle: "Strony internetowe Grudziądz - nowoczesne strony dla firm",
    seoDescription:
      "Tworzę strony internetowe dla firm z Grudziądza. Projektuję nowoczesne, szybkie strony www, które pomagają lepiej prezentować ofertę i zdobywać klientów.",
    heroHighlight: "STRONY INTERNETOWE",
    intentEyebrow: "Strony internetowe Grudziądz",
  }),
  createWebsitePage({
    key: "tworzenie-stron-www-grudziadz",
    slug: "tworzenie-stron-www-grudziadz",
    seoTitle: "Tworzenie stron www Grudziądz - projekt i wdrożenie",
    seoDescription:
      "Tworzenie stron www w Grudziądzu dla lokalnych firm. Pomagam zaprojektować i wdrożyć strony nastawione na sprzedaż, kontakt i lokalne SEO.",
    heroHighlight: "STRONY WWW",
    intentEyebrow: "Tworzenie stron www - Grudziądz",
  }),
  createWebDesignPage(),
  createLandingPageServicePage(),
  createBusinessWebsitePage(),
  createStorePage(),
  createSeoPage(),
];

const LANDING_PAGE_BY_SLUG = new Map(
  SEO_LANDING_PAGES.map((page) => [page.slug as string, page]),
);

export function getLandingPageBySlug(slug: string): LandingPageContent | null {
  return LANDING_PAGE_BY_SLUG.get(slug) ?? null;
}

export function getAllLandingPageSlugs(): string[] {
  return SEO_LANDING_PAGES.map((page) => page.slug as string);
}

export function getLandingPageMetadata(page: LandingPageContent): Metadata {
  return createMetadata(page);
}

const KEY_LANDING_PAGE_LINKS = [
  {
    slug: "projektowanie-stron-www-grudziadz",
    label: "Projektowanie stron www",
  },
  {
    slug: "landing-page-grudziadz",
    label: "Landing page Grudziądz",
  },
  {
    slug: "strona-internetowa-dla-firmy-grudziadz",
    label: "Strona internetowa dla firmy",
  },
  {
    slug: "pozycjonowanie-stron-internetowych-grudziadz",
    label: "Pozycjonowanie stron",
  },
  {
    slug: "sklepy-internetowe-grudziadz",
    label: "Sklepy internetowe",
  },
] as const;

export function getHomepageSectionLinks(isHomepage: boolean): LandingPageLink[] {
  return [
    {
      href: isHomepage ? "#projects" : "/#projects",
      label: "Zobacz realizacje",
    },
    {
      href: isHomepage ? "#contact" : "/#contact",
      label: "Zamów wycenę",
    },
  ];
}

export function getContextualLandingPageLinks(
  currentSlug?: string,
  limit = 3,
): LandingPageLink[] {
  return KEY_LANDING_PAGE_LINKS.filter((item) => item.slug !== currentSlug)
    .slice(0, limit)
    .map((item) => ({
      href: `/${item.slug}`,
      label: item.label,
    }));
}
