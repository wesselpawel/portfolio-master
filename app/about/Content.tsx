"use client";
import AOS from "aos";
import { FaCode } from "react-icons/fa";
import { useEffect } from "react";
import { FaBullseye, FaComputerMouse, FaLocationDot, FaRocket } from "react-icons/fa6";
import Footer from "@/components/ContactSection";
import dynamic from "next/dynamic";
import { ABOUT_TIMELINE } from "@/data/aboutTimeline";

const StarsBg = dynamic(() => import("@/components/StarsBg"), {
  ssr: false,
});

export default function Content() {
  useEffect(() => {
    AOS.init({
      offset: 100,
    });
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-screen scale-150 bg-gradient-to-br from-black via-zinc-800 to-black"></div>
      <StarsBg />

      <section className="relative z-[600] px-4 pb-16 pt-40 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-yellow-300/30 bg-slate-900/85 shadow-[0_0_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-300/10 px-4 py-2 font-anta text-xs uppercase tracking-[0.28em] text-yellow-200">
                  <FaLocationDot className="h-4 w-4" />
                  Tworzenie stron Grudziądz
                </div>

                <h1 className="mt-6 max-w-4xl font-anta text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                  Projektuję i buduję strony, które wyglądają mocno, działają
                  szybko i pracują na wynik.
                </h1>

                <p className="mt-6 max-w-3xl font-dosis text-lg leading-relaxed text-white/80 lg:text-2xl">
                  Nie opowiadam o planach ani próbach. Opieram się na drodze,
                  którą już przeszedłem: od technikum informatycznego, przez
                  pierwsze wdrożenia, po strony, sklepy i platformy internetowe
                  tworzone dla realnych biznesów.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {HIGHLIGHTS.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-dosis text-sm font-semibold text-white/90 sm:text-base"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {POSITIONING_CARDS.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-5 shadow-lg shadow-black/20"
                  >
                    <div className="flex items-center gap-3 text-yellow-300">
                      <card.icon className="h-5 w-5" />
                      <p className="font-anta text-lg text-white">{card.title}</p>
                    </div>
                    <p className="mt-3 font-dosis text-sm leading-relaxed text-white/75 sm:text-base">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-[600] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="font-anta text-sm uppercase tracking-[0.28em] text-yellow-300">
                O mnie
              </span>
              <h2 className="mt-4 max-w-3xl font-anta text-3xl text-white sm:text-4xl lg:text-5xl">
                Drogę w web developmencie zbudowałem krok po kroku.
              </h2>
            </div>
            <p className="max-w-2xl font-dosis text-base leading-relaxed text-white/75 sm:text-lg">
              Ta oś czasu pokazuje konkretny progres: od podstaw, przez własną
              działalność, po projekty, które łączą front-end, SEO, UX i realne
              potrzeby firm.
            </p>
          </div>

          <div className="relative mx-auto flex max-w-5xl flex-col gap-6 pb-4 pt-12">
            <div className="absolute left-5 top-0 h-full w-px rounded-full bg-yellow-300 md:left-1/2 md:-translate-x-1/2"></div>
            <div className="absolute left-5 top-0 -translate-x-1/2 rounded-full border border-yellow-300/60 bg-slate-900 px-5 py-2 font-anta text-lg text-white md:left-1/2">
              Timeline
            </div>

            {ABOUT_TIMELINE.map((item, i) => (
              <RoadmapItem key={item.year} item={item} alignLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </section>

      <div
        data-aos="fade-up"
        id="about"
        data-aos-duration={1200}
        className="relative z-[600] flex w-screen flex-col group"
      >
        <div className="absolute left-1/2 top-0 z-[50] h-1 w-full -translate-x-1/2 scale-x-0 rounded-full bg-transparent duration-[1000ms] group-hover:bg-yellow-300 group-hover:scale-x-100"></div>
        <div className="relative bg-slate-800/95 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 text-white lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className="relative pl-16 font-anta text-3xl text-white drop-shadow-xl shadow-black lg:text-4xl 2xl:text-5xl">
                <FaCode className="absolute left-0 top-1/2 h-[52px] w-[52px] -translate-y-1/2 text-gray-300 opacity-15 lg:h-[68px] lg:w-[68px]" />
                <span className="text-yellow-300">Jak pracuję nad stronami</span>
              </h2>

              <div className="mt-10 space-y-5">
                {EXPERTISE_SECTIONS.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-6"
                  >
                    <h3 className="font-anta text-xl font-bold text-white lg:text-2xl">
                      {section.title}
                    </h3>
                    <p className="mt-3 font-dosis text-base leading-relaxed text-white/80 lg:text-lg">
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="relative pl-16 font-anta text-3xl text-white drop-shadow-xl shadow-black lg:text-4xl 2xl:text-5xl">
                <FaComputerMouse className="absolute left-0 top-1/2 h-[52px] w-[52px] -translate-y-1/2 text-gray-300 opacity-15 lg:h-[68px] lg:w-[68px]" />
                <span className="text-yellow-300">Moja historia</span>
              </h2>

              <div className="mt-8 rounded-[1.75rem] border border-yellow-300/20 bg-gradient-to-br from-slate-900 to-black/80 p-6 shadow-xl shadow-black/20 sm:p-8">
                <p className="font-dosis text-base leading-relaxed text-white/85 lg:text-xl">
                  Wszystko zaczęło się od prostego pytania: jak to jest
                  zrobione? Zamiast zatrzymać się na ciekawości, zacząłem
                  budować własne odpowiedzi w kodzie. Tak weszły pierwsze strony,
                  kolejne technologie i coraz większe projekty.
                </p>

                <p className="mt-5 font-dosis text-base leading-relaxed text-white/75 lg:text-xl">
                  Dzisiaj łączę front-end, UX, SEO i wyczucie komunikacji
                  sprzedażowej. Tworzę strony internetowe w Grudziądzu dla firm,
                  które chcą wyglądać profesjonalnie, działać nowocześnie i być
                  łatwiejsze do znalezienia przez klientów.
                </p>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="font-anta text-lg text-yellow-300 lg:text-xl">
                    Mój kierunek jest prosty:
                  </p>
                  <p className="mt-3 font-dosis text-base leading-relaxed text-white/85 lg:text-lg">
                    projektować strony, które nie tylko dobrze wyglądają, ale
                    naprawdę wspierają rozwój biznesu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

const RoadmapItem = ({
  item,
  alignLeft,
}: {
  item: (typeof ABOUT_TIMELINE)[number];
  alignLeft: boolean;
}) => (
  <div
    className={`relative ml-10 w-[calc(100%-2.5rem)] rounded-[1.5rem] border border-white/10 bg-slate-800/95 text-white shadow-lg shadow-black/20 md:ml-0 md:w-[calc(50%-2rem)] ${
      alignLeft
        ? "md:mr-auto"
        : "md:ml-auto"
    } duration-300`}
  >
    <div
      className={`absolute left-[-1.8rem] top-10 h-4 w-4 rounded-full border-4 border-slate-950 bg-yellow-300 md:top-1/2 md:-translate-y-1/2 ${
        alignLeft
          ? "md:left-auto md:right-[-2.45rem]"
          : "md:left-[-2.45rem]"
      }`}
    ></div>
    <div
      className={`flex flex-col items-start gap-3 border-b border-white/10 p-5 md:items-center md:justify-between ${
        alignLeft ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div
        className="w-max rounded-full bg-yellow-300 px-4 py-2 font-anta text-sm text-zinc-900"
      >
        {item.year}
      </div>
      <h2 className="font-anta text-xl font-bold md:text-2xl">{item.title}</h2>
    </div>
    <p className="p-5 pt-4 font-dosis text-sm leading-relaxed text-white/80 sm:text-base">
      {item.description}
    </p>
  </div>
);

const HIGHLIGHTS = [
  "Front-end i UX",
  "SEO i widoczność lokalna",
  "Strony firmowe, sklepy i platformy",
] as const;

const POSITIONING_CARDS = [
  {
    title: "Mocne wykonanie",
    description:
      "Buduję nowoczesne strony i interfejsy, które są szybkie, responsywne i dopracowane technicznie.",
    icon: FaRocket,
  },
  {
    title: "Podejście biznesowe",
    description:
      "Projektuję z myślą o widoczności, konwersji i klarownym przekazie, nie tylko o samym efekcie wizualnym.",
    icon: FaBullseye,
  },
  {
    title: "Lokalny kontekst",
    description:
      "Znam realia współpracy z małymi firmami i usługami lokalnymi, dlatego tworzenie stron w Grudziądzu ma dla mnie konkretny wymiar.",
    icon: FaLocationDot,
  },
] as const;

const EXPERTISE_SECTIONS = [
  {
    title: "Kod, który robi porządną robotę",
    description:
      "Pracuję nad logiką aplikacji, wydajnością, responsywnością i strukturą front-endu tak, żeby strona była stabilna, czytelna i gotowa do rozwoju.",
  },
  {
    title: "Design, który prowadzi użytkownika",
    description:
      "Łączę estetykę z funkcją. Układ, hierarchia treści i doświadczenie użytkownika mają wspierać konkretne działanie, a nie być tylko ozdobą.",
  },
  {
    title: "SEO, które wspiera sprzedaż",
    description:
      "Wdrażam techniki SEO, optymalizację wydajności i rozwiązania pod widoczność lokalną, żeby strona pomagała docierać do właściwych klientów.",
  },
] as const;
