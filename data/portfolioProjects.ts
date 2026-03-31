/** Projekty portfolio (treść statyczna, język polski). */
type PortfolioProjectCaseStudy = {
  implementationSummary: string;
  serviceScope: string;
  applied: readonly string[];
  result: string;
};

type PortfolioPricingPlan = {
  name: string;
  price: string;
  description: string;
  features: readonly string[];
  highlighted?: boolean;
};

type PortfolioFaqItem = {
  question: string;
  answer: string;
};

type PortfolioSections = {
  pricing: readonly PortfolioPricingPlan[];
  howIWork: readonly string[];
  whatYouBuy: readonly string[];
  faq: readonly PortfolioFaqItem[];
};

type PortfolioProject = {
  name: string;
  shortDescription: string;
  images: readonly string[];
  imageAlts?: readonly string[];
  link: string;
  type: string;
  technologies: readonly string[];
  colors: readonly string[];
  fonts: readonly { fontName: string; variants: readonly string[] }[];
  sourceCode: string;
  caseStudy?: PortfolioProjectCaseStudy;
  linkText?: string;
  portfolioSections?: PortfolioSections;
};

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    name: "Strona internetowa",
    shortDescription: "Strona internetowa dla stylistek paznokci.",
    images: [
      "/images/projects/glazurnikgrudziadz/hero.png",
      "/images/projects/glazurnikgrudziadz/underHero.png",
      "/images/projects/glazurnikgrudziadz/wspolpraca.png",
      "/images/projects/glazurnikgrudziadz/cennik.png",
      "/images/projects/glazurnikgrudziadz/footer.png",
    ],
    imageAlts: [
      "Strona internetowa glazurnik Grudziądz - sekcja hero i oferta usług",
      "Układanie płytek Grudziądz - sekcja usług i realizacji na stronie",
      "Remont łazienki Grudziądz - sekcja współpracy i procesu realizacji",
      "Cennik usług glazurniczych Grudziądz - widok strony z wyceną",
      "Strona firmowa glazurnik Grudziądz - stopka i kontakt lokalny",
    ],
    link: "https://www.glazurnikgrudziadz.pl/",
    linkText: "Glazurnik Grudziądz – strona usługowa",
    type: "Projekt E-commerce",
    technologies: [
      "Next",
      "Tailwind",
      "TypeScript",
      "Stripe",
      "Firebase",
      "Redux",
      "ThreeJS",
      "PWA",
    ],
    colors: ["#2463EB", "#CDED52", "#C084FC"],
    fonts: [
      { fontName: "Baloo", variants: ["bold"] },
      { fontName: "Poppins", variants: ["light", "regular"] },
      { fontName: "Inter", variants: ["regular", "bold"] },
    ],
    sourceCode: "",
    caseStudy: {
      implementationSummary:
        "Projekt i wdrożenie strony internetowej dla lokalnej firmy usługowej z branży remontowo-budowlanej - glazurnika działającego w Grudziądzu i okolicach. Strona została zaprojektowana pod kątem local SEO, generowania leadów oraz maksymalnej konwersji zapytań.",
      serviceScope:
        "Serwis prezentuje kompleksowe usługi, takie jak układanie płytek, remont łazienek oraz wykończenia wnętrz. Kluczowym elementem było stworzenie przejrzystej struktury treści, która odpowiada na realne potrzeby użytkowników - od cennika po szczegółowy proces realizacji.",
      applied: [
        "optymalizacje pod frazy: glazurnik Grudziądz, układanie płytek Grudziądz, remont łazienki Grudziądz",
        "landing pages pod konkretne usługi i zapytania lokalne",
        "formularze szybkiej wyceny zwiększające liczbę konwersji",
        "sekcje FAQ wspierające pozycjonowanie long tail",
      ],
      result:
        "Strona nastawiona na pozyskiwanie klientów lokalnych i budowanie widoczności w Google.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Starter",
          price: "od 2500 PLN",
          description: "Prosta strona usługowa pod lokalne SEO.",
          features: [
            "landing page + oferta",
            "formularz kontaktowy",
            "podstawowe SEO on-page",
          ],
        },
        {
          name: "Growth",
          price: "od 4900 PLN",
          description: "Wersja nastawiona na konwersję i leady.",
          features: [
            "do 6 podstron lokalnych",
            "rozbudowane CTA i formularze",
            "sekcja FAQ pod long-tail",
          ],
          highlighted: true,
        },
        {
          name: "Premium",
          price: "od 7900 PLN",
          description: "Pełne wdrożenie wraz z analityką i automatyzacją.",
          features: [
            "strategie treści i wireframe",
            "integracje (mailing, CRM)",
            "wsparcie powdrożeniowe",
          ],
        },
      ],
      howIWork: [
        "1) Brief i analiza celu biznesowego",
        "2) Struktura treści + makieta strony",
        "3) Design i wdrożenie frontendu",
        "4) Testy, publikacja i optymalizacja SEO",
      ],
      whatYouBuy: [
        "Nowoczesny design zgodny z marką",
        "Szybka strona zoptymalizowana pod Core Web Vitals",
        "Struktura zaprojektowana pod konwersję",
        "Panel do łatwej aktualizacji treści",
      ],
      faq: [
        {
          question: "Ile trwa realizacja strony?",
          answer: "Zazwyczaj od 2 do 5 tygodni, zależnie od zakresu.",
        },
        {
          question: "Czy pomagasz z treściami i SEO?",
          answer: "Tak, przygotowuję strukturę treści i rekomendacje fraz.",
        },
      ],
    },
  },
  {
    name: "Platforma internetowa",
    shortDescription: "Strona internetowa dla stylistek paznokci.",
    images: [
      "/images/projects/naily/hero.png",
      "/images/projects/naily/how-it-works.png",
      "/images/projects/naily/dashboard-hello.png",
      "/images/projects/naily/dashboard-ready.png",
    ],
    imageAlts: [
      "Naily platforma beauty - hero marketplace do rezerwacji manicure online",
      "Jak działa Naily - proces rezerwacji wizyty u stylistki paznokci",
      "Panel użytkowniczki Naily - dashboard i zarządzanie rezerwacjami",
      "Dashboard stylistki paznokci Naily - kalendarz i obsługa klientek",
    ],
    link: "https://naily.pl",
    linkText: "Naily – platforma rezerwacji usług beauty",
    type: "Aplikacja Full-stack",
    technologies: [
      "React",
      "Next",
      "Tailwind",
      "TypeScript",
      "Firebase",
      "Redux",
      "openai",
      "moment.js",
    ],
    colors: ["#2463EB", "#CDED52", "#C084FC"],
    fonts: [
      { fontName: "Baloo", variants: ["bold"] },
      { fontName: "Poppins", variants: ["light", "regular"] },
      { fontName: "Inter", variants: ["regular", "bold"] },
    ],
    sourceCode: "",
    caseStudy: {
      implementationSummary:
        "Projekt i realizacja platformy internetowej typu marketplace dla branży beauty, łączącej klientki ze stylistkami paznokci w całej Polsce. System umożliwia rezerwacje wizyt online, zarządzanie kalendarzem oraz promocję usług.",
      serviceScope:
        "Strona została zaprojektowana jako narzędzie zwiększające liczbę klientek dla stylistek oraz upraszczające proces rezerwacji dla użytkowniczek. Platforma prezentuje dostępne terminy, ceny i profile specjalistek w jednym miejscu.",
      applied: [
        "optymalizacje pod frazy: manicure online, rezerwacja manicure, stylistka paznokci [miasto]",
        "rozbudowany system kont (klient / specjalista)",
        "integracje kalendarza i powiadomień",
        "elementy UX redukujące liczbę zapytań (automatyzacja rezerwacji)",
      ],
      result:
        "Skalowalna platforma wspierająca pozyskiwanie klientów i automatyzację pracy w branży beauty.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "MVP",
          price: "od 8900 PLN",
          description: "Start marketplace z kluczowymi funkcjami.",
          features: [
            "rejestracja i logowanie",
            "profil specjalisty",
            "podstawowe rezerwacje",
          ],
        },
        {
          name: "Business",
          price: "od 14900 PLN",
          description: "Wersja gotowa do skalowania ruchu.",
          features: [
            "kalendarz + powiadomienia",
            "panel klienta i specjalisty",
            "automatyzacje procesu rezerwacji",
          ],
          highlighted: true,
        },
        {
          name: "Scale",
          price: "wycena indywidualna",
          description: "Rozwój produktu i pełne wsparcie techniczne.",
          features: ["roadmapa funkcji", "analityka", "iteracyjne wdrożenia"],
        },
      ],
      howIWork: [
        "1) Warsztat produktu i priorytety MVP",
        "2) UX flow i makiety kluczowych ekranów",
        "3) Implementacja oraz testy",
        "4) Publikacja i dalszy rozwój",
      ],
      whatYouBuy: [
        "Gotowy produkt webowy",
        "Przejrzysty panel zarządzania",
        "Automatyzacje ograniczające ręczną obsługę",
        "Bazę pod dalszy rozwój biznesu",
      ],
      faq: [
        {
          question: "Czy można zacząć od małego zakresu?",
          answer: "Tak, zwykle zaczynamy od MVP i rozwijamy je etapami.",
        },
        {
          question: "Czy projektujesz też UX?",
          answer: "Tak, obejmuje to architekturę informacji i flow rezerwacji.",
        },
      ],
    },
  },
  {
    name: "Sklep internetowy",
    shortDescription:
      "Sklep internetowy z pracami artystycznymi Blackbell Studio.",
    images: [
      "/images/projects/blackbellart/hero.png",
      "/images/projects/blackbellart/products.png",
      "/images/projects/blackbellart/products2.png",
      "/images/projects/blackbellart/cart.png",
      "/images/projects/blackbellart/footer.png",
    ],
    imageAlts: [
      "Blackbell Studio - strona główna sklepu z obrazami na płótnie",
      "Sklep z obrazami na zamówienie - lista produktów Blackbell Studio",
      "Sztuka nowoczesna sklep online - widok karty produktów Blackbell",
      "Koszyk Blackbell Studio - zakup obrazów i wydruków artystycznych",
      "Blackbell Studio kontakt i stopka - finalna sekcja sklepu artystycznego",
    ],
    link: "https://www.blackbellstudio.pl/",
    type: "Projekt E-commerce",
    linkText: "Blackbell Studio – sklep artystyczny / portfolio twórcy",
    technologies: [
      "React",
      "TypeScript",
      "Next",
      "Redux",
      "Stripe",
      "Firebase",
      "Tailwind",
      "ThreeJS",
      "PWA",
    ],
    colors: ["#252326", "#8F26F3", "#22C55E"],
    fonts: [
      {
        fontName: "CocoSharp",
        variants: ["regular", "bold", "light", "italic"],
      },
      { fontName: "Gilroy", variants: ["regular"] },
      { fontName: "GraublauWeb", variants: ["regular", "bold"] },
    ],
    sourceCode: "https://github.com/wesiudev/art-tattoo",
    caseStudy: {
      implementationSummary:
        "Realizacja sklepu internetowego dla artystki sprzedającej autorskie obrazy oraz wydruki artystyczne. Strona łączy funkcje e-commerce oraz portfolio twórcy, umożliwiając sprzedaż unikatowych dzieł sztuki online.",
      serviceScope:
        "Projekt skupiał się na estetyce i emocjach - minimalistyczny design eksponuje prace artystyczne i podkreśla ich unikalny charakter. Użytkownik może zamówić zarówno gotowe obrazy, jak i obrazy na zamówienie dopasowane do własnej wizji.",
      applied: [
        "optymalizacje pod frazy: obrazy na płótnie, obrazy na zamówienie, sztuka nowoczesna sklep",
        "intuicyjny system filtrowania produktów (styl, technika, rozmiar)",
        "storytelling budujący markę osobistą artysty",
        "responsywny design pod urządzenia mobilne",
      ],
      result:
        "Nowoczesna platforma sprzedażowa wspierająca sprzedaż sztuki online i budowę marki artystycznej.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Portfolio",
          price: "od 3900 PLN",
          description: "Strona artystyczna z prezentacją prac.",
          features: ["galeria", "strona o artyście", "kontakt"],
        },
        {
          name: "E-commerce",
          price: "od 6900 PLN",
          description: "Sprzedaż obrazów i wydruków online.",
          features: [
            "karty produktów",
            "koszyk i checkout",
            "podstawowa konfiguracja SEO",
          ],
          highlighted: true,
        },
        {
          name: "Custom",
          price: "wycena indywidualna",
          description: "Rozszerzenia pod model biznesowy artysty.",
          features: ["zamówienia indywidualne", "integracje", "analityka"],
        },
      ],
      howIWork: [
        "1) Strategia marki i styl wizualny",
        "2) Makiety i hierarchia prezentacji prac",
        "3) Wdrożenie sklepu i karty produktów",
        "4) Publikacja i optymalizacja konwersji",
      ],
      whatYouBuy: [
        "Sklep i portfolio w jednym",
        "Design podkreślający charakter marki",
        "Przyjazna obsługa zamówień",
        "Dobra podstawa pod SEO i kampanie",
      ],
      faq: [
        {
          question: "Czy da się sprzedawać produkty cyfrowe?",
          answer: "Tak, projekt można rozbudować o sprzedaż plików cyfrowych.",
        },
        {
          question: "Czy mogę samodzielnie dodawać nowe prace?",
          answer:
            "Tak, sklep przygotowuję tak, aby umożliwiał wygodną edycję oferty.",
        },
      ],
    },
  },
  {
    name: "Platforma Dietetyczna",
    shortDescription: "Platforma dietetyczna z dziennym planem diety.",
    images: [
      "/images/projects/dziendiety/hero.png",
      "/images/projects/dziendiety/underhero.png",
      "/images/projects/dziendiety/howitworks.png",
      "/images/projects/dziendiety/opinie.png",
      "/images/projects/dziendiety/cennik.png",
      "/images/projects/dziendiety/faq.png",
      "/images/projects/dziendiety/test.png",
      "/images/projects/dziendiety/userplan.png",
    ],
    imageAlts: [
      "Dieta online - strona główna Dzien Diety z ofertą planów żywieniowych",
      "Dietetyk online - sekcja korzyści i oferty na stronie Dzien Diety",
      "Plan dietetyczny online - jak działa współpraca z dietetykiem",
      "Opinie klientów Dzien Diety - social proof dla usług dietetycznych",
      "Cennik diet online - pakiety i ceny na stronie Dzien Diety",
      "FAQ dieta odchudzająca - najczęstsze pytania i odpowiedzi",
      "Formularz kwalifikacyjny dieta online - lead generation",
      "Panel użytkownika Dzien Diety - podgląd indywidualnego planu",
    ],
    link: "https://dziendiety.pl/",
    linkText:
      "DzienDiety.pl – strona dietetyczna / platforma usług zdrowotnych",
    type: "Projekt strony internetowej",
    technologies: [
      "Next",
      "Tailwind",
      "TypeScript",
      "Firebase",
      "Redux",
      "ThreeJS",
      "PWA",
    ],
    colors: ["#AFFC31", "#06B6D4", "#27272A"],
    fonts: [
      {
        fontName: "CocoSharp",
        variants: ["light", "light italic", "regular", "bold"],
      },
      { fontName: "Gotham", variants: ["light", "regular", "bold"] },
    ],
    sourceCode: "",
    caseStudy: {
      implementationSummary:
        "Projekt i wdrożenie strony internetowej dla marki dietetycznej oferującej indywidualne plany żywieniowe oraz wsparcie dietetyka online. Serwis został zaprojektowany z myślą o budowaniu zaufania, edukacji użytkowników oraz skutecznym pozyskiwaniu klientów zainteresowanych zdrowym stylem życia.",
      serviceScope:
        "Strona prezentuje ofertę diet dopasowanych do różnych celów - redukcji, poprawy zdrowia czy budowy sylwetki. Kluczowym elementem było uproszczenie procesu zapisu oraz przedstawienie korzyści w sposób przystępny i motywujący.",
      applied: [
        "optymalizacje pod frazy: dieta online, dietetyk online, plan dietetyczny, dieta odchudzająca",
        "rozbudowane landing pages pod konkretne cele dietetyczne",
        "formularze kwalifikacyjne zwiększające jakość leadów",
        "sekcje edukacyjne (blog / porady) wspierające SEO",
      ],
      result:
        "Funkcjonalna strona usługowa wspierająca sprzedaż diet online oraz budowę eksperckiego wizerunku marki w branży zdrowia i żywienia.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Landing",
          price: "od 2900 PLN",
          description: "Strona ofertowa dla jednej usługi dietetycznej.",
          features: ["sekcja korzyści", "formularz zapisu", "FAQ"],
        },
        {
          name: "Standard",
          price: "od 5200 PLN",
          description: "Pełna strona usługowa z treściami edukacyjnymi.",
          features: ["kilka landing page", "blog", "formularz kwalifikacyjny"],
          highlighted: true,
        },
        {
          name: "Pro",
          price: "od 8900 PLN",
          description: "Rozszerzona wersja z automatyzacjami.",
          features: ["segmentacja leadów", "integracje", "analityka kampanii"],
        },
      ],
      howIWork: [
        "1) Audyt oferty i person klienta",
        "2) Struktura treści i komunikacja korzyści",
        "3) Wdrożenie strony i formularzy",
        "4) Testy, publikacja i rozwiązania SEO",
      ],
      whatYouBuy: [
        "Stronę usługową pod leady",
        "Sekcje edukacyjne budujące zaufanie",
        "Formularze poprawiające jakość zapytań",
        "Podstawę pod marketing organiczny",
      ],
      faq: [
        {
          question: "Czy mogę sam publikować artykuły?",
          answer: "Tak, rozwiązanie pozwala na łatwą aktualizację treści.",
        },
        {
          question: "Czy strona może rosnąć razem z ofertą?",
          answer: "Tak, architektura jest przygotowana pod dalszą rozbudowę.",
        },
      ],
    },
  },
  {
    name: "Sklep internetowy",
    shortDescription: "Sklep internetowy z naklejkami.",
    images: [
      "/images/projects/stickerka/hero.png",
      "/images/projects/stickerka/underHero.png",
      "/images/projects/stickerka/footer.png",
      "/images/projects/stickerka/chart.png",
      "/images/projects/stickerka/checkout.png",
    ],
    imageAlts: [
      "Stickerka - sklep internetowy z naklejkami personalizowanymi",
      "Naklejki na zamówienie - sekcja produktów i konfiguracji Stickerka",
      "Naklejki firmowe i dekoracyjne - oferta Stickerka na stronie",
      "Druk naklejek online - panel konfiguratora i wariantów produktu",
      "Checkout Stickerka - szybki proces zakupu naklejek online",
    ],
    link: "https://stickerka.pl/",
    linkText:
      "Stickerka.pl – sklep internetowy z naklejkami",
    type: "Projekt E-commerce",
    technologies: [
      "Next",
      "Tailwind",
      "TypeScript",
      "Firebase",
      "Redux",
      "ThreeJS",
      "PWA",
    ],
    colors: ["#AFFC31", "#06B6D4", "#27272A"],
    fonts: [
      {
        fontName: "CocoSharp",
        variants: ["light", "light italic", "regular", "bold"],
      },
      { fontName: "Gotham", variants: ["light", "regular", "bold"] },
    ],
    sourceCode: "",
    caseStudy: {
      implementationSummary:
        "Projekt i wdrożenie sklepu internetowego oferującego naklejki na zamówienie oraz gotowe wzory dekoracyjne i brandingowe. Strona została zaprojektowana z myślą o sprzedaży online oraz łatwej personalizacji produktów przez użytkownika.",
      serviceScope:
        "Serwis umożliwia szybkie zamówienie naklejek do różnych zastosowań - od dekoracji (laptop, telefon, butelki) po materiały marketingowe dla firm (branding, packaging, etykiety). Kluczowym elementem było stworzenie intuicyjnego procesu zakupowego oraz prezentacji wariantów produktu.",
      applied: [
        "optymalizacje pod frazy: naklejki na zamówienie, druk naklejek, naklejki personalizowane, naklejki firmowe",
        "przejrzysty konfigurator produktu (rozmiar, ilość, wykończenie)",
        "szybki koszyk i uproszczony proces checkout zwiększający konwersję",
        "sekcje inspiracji i zastosowań wspierające sprzedaż",
      ],
      result:
        "Nowoczesny sklep e-commerce nastawiony na sprzedaż produktów personalizowanych oraz obsługę klientów indywidualnych i biznesowych.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Starter",
          price: "od 4500 PLN",
          description: "Sklep z podstawową ofertą naklejek.",
          features: ["lista produktów", "koszyk", "checkout"],
        },
        {
          name: "Pro",
          price: "od 7900 PLN",
          description: "Sprzedaż personalizowanych wariantów.",
          features: [
            "konfigurator produktu",
            "warianty i wycena",
            "sekcja inspiracji",
          ],
          highlighted: true,
        },
        {
          name: "Business",
          price: "wycena indywidualna",
          description: "Rozwój pod klientów B2B i większą skalę.",
          features: ["automatyzacje", "integracje", "raportowanie"],
        },
      ],
      howIWork: [
        "1) Plan asortymentu i scenariuszy zakupu",
        "2) UX konfiguratora i flow checkout",
        "3) Wdrożenie i testy konwersji",
        "4) Publikacja i optymalizacja SEO",
      ],
      whatYouBuy: [
        "Sklep gotowy do sprzedaży online",
        "Konfigurator ułatwiający personalizację",
        "Sprawny proces zakupowy",
        "Moduły wspierające konwersję i SEO",
      ],
      faq: [
        {
          question: "Czy można dodawać nowe wzory bez developera?",
          answer: "Tak, oferta może być samodzielnie aktualizowana.",
        },
        {
          question: "Czy sklep obsłuży zamówienia firmowe?",
          answer: "Tak, można dodać warianty i pola pod zamówienia B2B.",
        },
      ],
    },
  },
] as const;
