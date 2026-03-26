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
      "Strona internetowa glazurnik Grudziadz - sekcja hero i oferta uslug",
      "Ukladanie plytek Grudziadz - sekcja uslug i realizacji na stronie",
      "Remont lazienki Grudziadz - sekcja wspolpracy i procesu realizacji",
      "Cennik uslug glazurniczych Grudziadz - widok strony z wycena",
      "Strona firmowa glazurnik Grudziadz - stopka i kontakt lokalny",
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
        "Projekt i wdrozenie strony internetowej dla lokalnej firmy uslugowej z branzy remontowo-budowlanej - glazurnika dzialajacego w Grudziadzu i okolicach. Strona zostala zaprojektowana pod katem local SEO, generowania leadow oraz maksymalnej konwersji zapytan.",
      serviceScope:
        "Serwis prezentuje kompleksowe uslugi, takie jak ukladanie plytek, remont lazienek oraz wykonczenia wnetrz. Kluczowym elementem bylo stworzenie przejrzystej struktury tresci, ktora odpowiada na realne potrzeby uzytkownikow - od cennika po szczegolowy proces realizacji.",
      applied: [
        "optymalizacje pod frazy: glazurnik Grudziadz, ukladanie plytek Grudziadz, remont lazienki Grudziadz",
        "landing pages pod konkretne uslugi i zapytania lokalne",
        "formularze szybkiej wyceny zwiekszajace liczbe konwersji",
        "sekcje FAQ wspierajaca pozycjonowanie long tail",
      ],
      result:
        "Strona nastawiona na pozyskiwanie klientow lokalnych i budowanie widocznosci w Google.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Starter",
          price: "od 2500 PLN",
          description: "Prosta strona uslugowa pod lokalne SEO.",
          features: [
            "landing page + oferta",
            "formularz kontaktowy",
            "podstawowe SEO on-page",
          ],
        },
        {
          name: "Growth",
          price: "od 4900 PLN",
          description: "Wersja nastawiona na konwersje i leady.",
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
          description: "Pelne wdrozenie wraz z analityka i automatyzacja.",
          features: [
            "strategie tresci i wireframe",
            "integracje (mailing, CRM)",
            "wsparcie powdrozeniowe",
          ],
        },
      ],
      howIWork: [
        "1) Brief i analiza celu biznesowego",
        "2) Struktura tresci + makieta strony",
        "3) Design i wdrozenie frontendu",
        "4) Testy, publikacja i optymalizacja SEO",
      ],
      whatYouBuy: [
        "Nowoczesny design zgodny z marka",
        "Szybka strona zoptymalizowana pod Core Web Vitals",
        "Struktura zaprojektowana pod konwersje",
        "Panel do latwej aktualizacji tresci",
      ],
      faq: [
        {
          question: "Ile trwa realizacja strony?",
          answer: "Zazwyczaj od 2 do 5 tygodni, zaleznie od zakresu.",
        },
        {
          question: "Czy pomagasz z tresciami i SEO?",
          answer: "Tak, przygotowuje strukture tresci i rekomendacje fraz.",
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
      "Jak dziala Naily - proces rezerwacji wizyty u stylistki paznokci",
      "Panel uzytkowniczki Naily - dashboard i zarzadzanie rezerwacjami",
      "Dashboard stylistki paznokci Naily - kalendarz i obsluga klientek",
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
        "Projekt i realizacja platformy internetowej typu marketplace dla branzy beauty, laczacej klientki ze stylistkami paznokci w calej Polsce. System umozliwia rezerwacje wizyt online, zarzadzanie kalendarzem oraz promocje uslug.",
      serviceScope:
        "Strona zostala zaprojektowana jako narzedzie zwiekszajace liczbe klientow dla stylistek oraz upraszczajace proces rezerwacji dla uzytkowniczek. Platforma prezentuje dostepne terminy, ceny i profile specjalistek w jednym miejscu.",
      applied: [
        "optymalizacje pod frazy: manicure online, rezerwacja manicure, stylistka paznokci [miasto]",
        "rozbudowany system kont (klient / specjalista)",
        "integracje kalendarza i powiadomien",
        "elementy UX redukujace liczbe zapytan (automatyzacja rezerwacji)",
      ],
      result:
        "Skalowalna platforma wspierajaca pozyskiwanie klientow i automatyzacje pracy w branzy beauty.",
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
          description: "Rozwoj produktu i pelne wsparcie techniczne.",
          features: ["roadmapa funkcji", "analityka", "iteracyjne wdrozenia"],
        },
      ],
      howIWork: [
        "1) Warsztat produktu i priorytety MVP",
        "2) UX flow i makiety kluczowych ekranow",
        "3) Implementacja oraz testy",
        "4) Publikacja i dalszy rozwoj",
      ],
      whatYouBuy: [
        "Gotowy produkt webowy",
        "Przejrzysty panel zarzadzania",
        "Automatyzacje ograniczajace reczna obsluge",
        "Baze pod dalszy rozwoj biznesu",
      ],
      faq: [
        {
          question: "Czy mozna zaczac od malego zakresu?",
          answer: "Tak, zwykle zaczynamy od MVP i rozwijamy je etapami.",
        },
        {
          question: "Czy projektujesz tez UX?",
          answer: "Tak, obejmuje to architekture informacji i flow rezerwacji.",
        },
      ],
    },
  },
  {
    name: "Blackbell Studio",
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
      "Blackbell Studio - strona glowna sklepu z obrazami na plotnie",
      "Sklep z obrazami na zamowienie - lista produktow Blackbell Studio",
      "Sztuka nowoczesna sklep online - widok karty produktow Blackbell",
      "Koszyk Blackbell Studio - zakup obrazow i wydrukow artystycznych",
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
        "Realizacja sklepu internetowego dla artystki sprzedajacej autorskie obrazy oraz wydruki artystyczne. Strona laczy funkcje e-commerce oraz portfolio twórczego, umozliwiajac sprzedaz unikatowych dziel sztuki online.",
      serviceScope:
        "Projekt skupial sie na estetyce i emocjach - minimalistyczny design eksponuje prace artystyczne i podkresla ich unikalny charakter. Uzytkownik moze zamowic zarówno gotowe obrazy, jak i obrazy na zamowienie dopasowane do wlasnej wizji.",
      applied: [
        "optymalizacje pod frazy: obrazy na plotnie, obrazy na zamowienie, sztuka nowoczesna sklep",
        "intuicyjny system filtrowania produktow (styl, technika, rozmiar)",
        "storytelling budujacy marke osobista artysty",
        "responsywny design pod urzadzenia mobilne",
      ],
      result:
        "Nowoczesna platforma sprzedazowa wspierajaca sprzedaz sztuki online i budowe marki artystycznej.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Portfolio",
          price: "od 3900 PLN",
          description: "Strona artystyczna z prezentacja prac.",
          features: ["galeria", "strona o artyscie", "kontakt"],
        },
        {
          name: "E-commerce",
          price: "od 6900 PLN",
          description: "Sprzedaz obrazow i wydrukow online.",
          features: [
            "karty produktow",
            "koszyk i checkout",
            "podstawowa konfiguracja SEO",
          ],
          highlighted: true,
        },
        {
          name: "Custom",
          price: "wycena indywidualna",
          description: "Rozszerzenia pod model biznesowy artysty.",
          features: ["zamowienia indywidualne", "integracje", "analityka"],
        },
      ],
      howIWork: [
        "1) Strategia marki i styl wizualny",
        "2) Makiety i hierarchia prezentacji prac",
        "3) Wdrozenie sklepu i karty produktow",
        "4) Publikacja i optymalizacja konwersji",
      ],
      whatYouBuy: [
        "Sklep i portfolio w jednym",
        "Design podkreslajacy charakter marki",
        "Przyjazna obsluga zamowien",
        "Dobra podstawa pod SEO i kampanie",
      ],
      faq: [
        {
          question: "Czy da sie sprzedawac produkty cyfrowe?",
          answer: "Tak, projekt mozna rozbudowac o sprzedaz plikow cyfrowych.",
        },
        {
          question: "Czy moge samodzielnie dodawac nowe prace?",
          answer: "Tak, sklep przygotowuje pod wygodna edycje oferty.",
        },
      ],
    },
  },
  {
    name: "Dzien Diety",
    shortDescription: "Strona internetowa z dziennym planem diety.",
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
      "Dieta online - strona glowna Dzien Diety z oferta planow zywieniowych",
      "Dietetyk online - sekcja korzysci i oferty na stronie Dzien Diety",
      "Plan dietetyczny online - jak dziala wspolpraca z dietetykiem",
      "Opinie klientow Dzien Diety - social proof dla uslug dietetycznych",
      "Cennik diet online - pakiety i ceny na stronie Dzien Diety",
      "FAQ dieta odchudzajaca - najczestsze pytania i odpowiedzi",
      "Formularz kwalifikacyjny dieta online - lead generation",
      "Panel uzytkownika Dzien Diety - podglad indywidualnego planu",
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
        "Projekt i wdrozenie strony internetowej dla marki dietetycznej oferujacej indywidualne plany zywieniowe oraz wsparcie dietetyka online. Serwis zostal zaprojektowany z mysla o budowaniu zaufania, edukacji uzytkownikow oraz skutecznym pozyskiwaniu klientow zainteresowanych zdrowym stylem zycia.",
      serviceScope:
        "Strona prezentuje oferte diet dopasowanych do roznych celow - redukcji, poprawy zdrowia czy budowy sylwetki. Kluczowym elementem bylo uproszczenie procesu zapisu oraz przedstawienie korzysci w sposob przystepny i motywujacy.",
      applied: [
        "optymalizacje pod frazy: dieta online, dietetyk online, plan dietetyczny, dieta odchudzajaca",
        "rozbudowane landing pages pod konkretne cele dietetyczne",
        "formularze kwalifikacyjne zwiekszajace jakosc leadow",
        "sekcje edukacyjna (blog / porady) wspierajaca SEO",
      ],
      result:
        "Funkcjonalna strona uslugowa wspierajaca sprzedaz diet online oraz budowe eksperckiego wizerunku marki w branzy zdrowia i zywienia.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Landing",
          price: "od 2900 PLN",
          description: "Strona ofertowa dla jednej uslugi dietetycznej.",
          features: ["sekcja korzysci", "formularz zapisu", "FAQ"],
        },
        {
          name: "Standard",
          price: "od 5200 PLN",
          description: "Pelna strona uslugowa z tresciami edukacyjnymi.",
          features: ["kilka landing page", "blog", "formularz kwalifikacyjny"],
          highlighted: true,
        },
        {
          name: "Pro",
          price: "od 8900 PLN",
          description: "Rozszerzona wersja z automatyzacjami.",
          features: ["segmentacja leadow", "integracje", "analityka kampanii"],
        },
      ],
      howIWork: [
        "1) Audyt oferty i person klienta",
        "2) Struktura tresci i komunikacja korzysci",
        "3) Wdrozenie strony i formularzy",
        "4) Testy, publikacja i rozwiazania SEO",
      ],
      whatYouBuy: [
        "Strone uslugowa pod leady",
        "Sekcje edukacyjne budujace zaufanie",
        "Formularze poprawiajace jakosc zapytan",
        "Podstawe pod marketing organiczny",
      ],
      faq: [
        {
          question: "Czy moge sam publikowac artykuly?",
          answer: "Tak, rozwiazanie pozwala na latwa aktualizacje tresci.",
        },
        {
          question: "Czy strona moze rosnac razem z oferta?",
          answer: "Tak, architektura jest przygotowana pod dalsza rozbudowe.",
        },
      ],
    },
  },
  {
    name: "Stickerka",
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
      "Naklejki na zamowienie - sekcja produktow i konfiguracji Stickerka",
      "Naklejki firmowe i dekoracyjne - oferta Stickerka na stronie",
      "Druk naklejek online - panel konfiguratora i wariantow produktu",
      "Checkout Stickerka - szybki proces zakupu naklejek online",
    ],
    link: "https://stickerka.pl/",
    linkText:
      "Stickerka.pl – sklep internetowy z naklejkami (e-commerce / personalizacja)",
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
        "Projekt i wdrozenie sklepu internetowego oferujacego naklejki na zamowienie oraz gotowe wzory dekoracyjne i brandingowe. Strona zostala zaprojektowana z mysla o sprzedazy online oraz latwej personalizacji produktow przez uzytkownika.",
      serviceScope:
        "Serwis umozliwia szybkie zamowienie naklejek do roznych zastosowan - od dekoracji (laptop, telefon, butelki) po materialy marketingowe dla firm (branding, packaging, etykiety). Kluczowym elementem bylo stworzenie intuicyjnego procesu zakupowego oraz prezentacji wariantow produktu.",
      applied: [
        "optymalizacje pod frazy: naklejki na zamowienie, druk naklejek, naklejki personalizowane, naklejki firmowe",
        "przejrzysty konfigurator produktu (rozmiar, ilosc, wykonczenie)",
        "szybki koszyk i uproszczony proces checkout zwiekszajacy konwersje",
        "sekcje inspiracji i zastosowan wspierajaca sprzedaz",
      ],
      result:
        "Nowoczesny sklep e-commerce nastawiony na sprzedaz produktow personalizowanych oraz obsluge klientow indywidualnych i biznesowych.",
    },
    portfolioSections: {
      pricing: [
        {
          name: "Starter",
          price: "od 4500 PLN",
          description: "Sklep z podstawowa oferta naklejek.",
          features: ["lista produktow", "koszyk", "checkout"],
        },
        {
          name: "Pro",
          price: "od 7900 PLN",
          description: "Sprzedaz personalizowanych wariantow.",
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
          description: "Rozwoj pod klientow B2B i wieksza skale.",
          features: ["automatyzacje", "integracje", "raportowanie"],
        },
      ],
      howIWork: [
        "1) Plan asortymentu i scenariuszy zakupu",
        "2) UX konfiguratora i flow checkout",
        "3) Wdrozenie i testy konwersji",
        "4) Publikacja i optymalizacja SEO",
      ],
      whatYouBuy: [
        "Sklep gotowy do sprzedazy online",
        "Konfigurator ulatwiajacy personalizacje",
        "Sprawny proces zakupowy",
        "Moduly wspierajace konwersje i SEO",
      ],
      faq: [
        {
          question: "Czy mozna dodawac nowe wzory bez developera?",
          answer: "Tak, oferta moze byc samodzielnie aktualizowana.",
        },
        {
          question: "Czy sklep obsluzy zamowienia firmowe?",
          answer: "Tak, mozna dodac warianty i pola pod zamowienia B2B.",
        },
      ],
    },
  },
] as const;
