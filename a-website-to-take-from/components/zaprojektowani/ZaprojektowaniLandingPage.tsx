import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { Post } from "@/types";
import {
  FaBullhorn,
  FaGlobe,
  FaPenNib,
  FaShoppingBag,
} from "react-icons/fa";
import { FaChevronRight, FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import ZaprojektowaniContactForm from "./ZaprojektowaniContactForm";

export type ZaprojektowaniCaseStudy = {
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
};

export type ZaprojektowaniLandingPageProps = {
  city: string;
  ownerName: string;
  phone: string;
  email: string;
  logos: string[];
  cases: ZaprojektowaniCaseStudy[];
  otherProjects: string[];
  /** Wpisy bloga pobrane w `app/page.tsx` (Server Component), żeby uniknąć async child + TS2786 */
  blogPosts?: Post[];
};

function HeroSection({
  city,
  ownerName,
}: {
  city: string;
  ownerName: string;
}) {
  return (
    <section className="relative px-8 py-20 md:py-32 max-w-7xl mx-auto overflow-visible">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-primary/80 mb-6 block">
          Tworzenie stron WWW w {city}
        </span>

        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-on-surface mb-8">
          Tworzenie stron internetowych {city} — {ownerName}
        </h1>

        <p className="font-body text-xl md:text-2xl text-on-surface-variant leading-relaxed max-w-2xl mb-12">
          Projektuję strony, które wyglądają premium i dowożą wyniki: UX,
          szybkość, SEO techniczne oraz wdrożenie dopasowane do Twojego biznesu.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="#contact"
            className="bg-primary text-on-primary px-10 py-5 font-headline font-extrabold text-lg transition-all hover:bg-primary-container rounded-sm shadow-xl shadow-black/20 text-center"
          >
            Darmowa Wycena
          </Link>
          <Link
            href="#portfolio"
            className="border border-outline-variant/30 text-on-surface px-10 py-5 font-headline font-extrabold text-lg hover:bg-surface-bright transition-all rounded-sm text-center"
          >
            Zobacz Realizacje
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustSection({ logos }: { logos: string[] }) {
  return (
    <section className="px-8 py-16 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <p className="font-label text-[10px] uppercase tracking-[0.3em] text-center text-on-surface-variant/60 mb-12">
          Zaufali nam liderzy branży
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-40 grayscale contrast-125">
          {logos.slice(0, 5).map((logo) => (
            <div key={logo} className="flex justify-center">
              <span className="font-headline font-bold text-on-surface-variant text-sm px-4 text-center">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ city }: { city: string }) {
  return (
    <section className="px-8 py-24 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-4">
          Nasze Specjalizacje
        </h2>
        <div className="h-1 w-20 bg-primary" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strony Internetowe */}
        <div className="md:col-span-2 group bg-surface-container hover:bg-surface-container-high p-10 transition-all duration-500 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-primary text-4xl mb-6 block">
              <FaGlobe />
            </span>
            <h3 className="font-headline text-2xl font-bold mb-4">
              Strony internetowe
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-6 max-w-md">
              Tworzymy strony WWW {city} i całej Polski: szybkie, responsywne
              i gotowe na konwersję.
            </p>
            <span className="text-primary font-bold inline-flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Poznaj ofertę{" "}
              <FaChevronRight className="relative top-[1px]" />
            </span>
          </div>

          <div className="absolute bottom-[-20%] right-[-10%] opacity-10 group-hover:opacity-20 transition-opacity">
            <FaGlobe className="text-[200px]" />
          </div>
        </div>

        {/* Sklepy */}
        <div className="group bg-surface-container hover:bg-surface-container-high p-10 transition-all duration-500 rounded-xl">
          <span className="text-primary text-4xl mb-6 block">
            <FaShoppingBag />
          </span>
          <h3 className="font-headline text-2xl font-bold mb-4">
            Sklepy internetowe
          </h3>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            E-commerce z UX, który sprzedaje i integracjami dopasowanymi do
            Twoich procesów.
          </p>
        </div>

        {/* Ads */}
        <div className="group bg-surface-container hover:bg-surface-container-high p-10 transition-all duration-500 rounded-xl">
          <span className="text-primary text-4xl mb-6 block">
            <FaBullhorn />
          </span>
          <h3 className="font-headline text-2xl font-bold mb-4">
            Marketing i Ads
          </h3>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            Kampanie i konfiguracja nastawione na realny zwrot z inwestycji.
          </p>
        </div>

        {/* Logo */}
        <div className="group bg-surface-container hover:bg-surface-container-high p-10 transition-all duration-500 rounded-xl">
          <span className="text-primary text-4xl mb-6 block">
            <FaPenNib />
          </span>
          <h3 className="font-headline text-2xl font-bold mb-4">
            Projekty logo
          </h3>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            Identyfikacja wizualna, która buduje rozpoznawalność marki.
          </p>
        </div>

        {/* Branding */}
        <div className="group bg-surface-container hover:bg-surface-container-high p-10 transition-all duration-500 rounded-xl">
          <span className="text-primary text-4xl mb-6 block">
            <span className="font-headline">B</span>
          </span>
          <h3 className="font-headline text-2xl font-bold mb-4">
            Branding i identyfikacja
          </h3>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            Systemy wizualne spójne na lata: od logotypu po księgę znaku.
          </p>
        </div>

        {/* Audit */}
        <div className="md:col-span-3 group bg-surface-container-lowest border border-outline-variant/10 hover:border-primary/20 p-10 transition-all duration-500 rounded-xl flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="font-headline text-2xl font-bold mb-2">
              Audyt strony i kampanii
            </h3>
            <p className="text-on-surface-variant">
              Znajdziemy słabe punkty i wskażemy drogę do wzrostu: UX,
              szybkość i widoczność w Google.
            </p>
          </div>
          <Link
            href="#contact"
            className="mt-6 md:mt-0 px-8 py-3 bg-surface-container-high text-primary font-bold border border-primary/20 hover:bg-primary hover:text-on-primary transition-all rounded-sm"
          >
            Zamów Bezpłatny Audyt
          </Link>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ cs }: { cs: ZaprojektowaniCaseStudy }) {
  return (
    <Link href={cs.href} className="group cursor-pointer block">
      <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-6">
        <Image
          src={cs.imageSrc}
          alt={cs.title}
          fill
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-primary text-on-primary px-8 py-3 font-bold uppercase text-xs tracking-widest rounded-sm">
            Zobacz Case Study
          </span>
        </div>
      </div>

      <h3 className="font-headline text-2xl font-bold mb-2">{cs.title}</h3>
      <p className="text-on-surface-variant/70 font-label uppercase text-[10px] tracking-widest">
        {cs.subtitle}
      </p>
    </Link>
  );
}

function PortfolioSection({
  cases,
  otherProjects,
}: {
  cases: ZaprojektowaniCaseStudy[];
  otherProjects: string[];
}) {
  return (
    <section
      id="portfolio"
      className="px-8 py-24 bg-surface-container-low"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
              Portfolio
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight">
              Wybrane realizacje w stylu premium
            </h2>
          </div>

          <div className="flex gap-4">
            <span className="px-4 py-1 text-[10px] font-bold border border-primary/30 text-primary rounded-full uppercase tracking-widest">
              UX-first
            </span>
            <span className="px-4 py-1 text-[10px] font-bold border border-primary/30 text-primary rounded-full uppercase tracking-widest">
              SEO-ready
            </span>
            <span className="px-4 py-1 text-[10px] font-bold border border-primary/30 text-primary rounded-full uppercase tracking-widest">
              Mobile-first
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {cases.slice(0, 2).map((cs) => (
            <div key={cs.title}>
              <CaseStudyCard cs={cs} />
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {otherProjects.slice(0, 10).map((name) => (
            <div
              key={name}
              className="bg-surface-container p-6 rounded-lg text-center font-headline font-bold text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/10"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const packages = [
    {
      name: "Landing / Strona WWW",
      price: "od 2 900 PLN",
      features: [
        "Projekt strony (3 propozycje)",
        "Wdrożenie + sekcja lead",
        "Podstawy SEO technicznego",
        "Responsywność i UX",
      ],
      cta: "Wybierz pakiet",
      variant: "default" as const,
    },
    {
      name: "Strona Firmowa",
      price: "od 4 900 PLN",
      features: [
        "Kompletny projekt i wdrożenie",
        "SEO techniczne + Core Web Vitals",
        "CMS do edycji treści",
        "Integracje (np. Analytics)",
      ],
      cta: "Wybierz pakiet",
      variant: "featured" as const,
    },
    {
      name: "E-commerce / Sklep online",
      price: "od 8 900 PLN",
      features: [
        "Katalog produktów + UX zakupowy",
        "Integracje płatności i logistyki",
        "SEO i wydajność",
        "Wdrożenie i konfiguracja",
      ],
      cta: "Wybierz pakiet",
      variant: "default" as const,
    },
  ];

  return (
    <section className="px-8 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="font-headline text-4xl font-extrabold mb-4">
          Pakiety współpracy
        </h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto">
          Transparentny zakres i szybki start. Wycenę dopasuję do Twojego
          biznesu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {packages.map((p) => {
          const featured = p.variant === "featured";
          return (
            <div
              key={p.name}
              className={`${
                featured ? "bg-surface-container-highest border-2 border-primary shadow-2xl shadow-primary/10 -mt-4" : "bg-surface-container p-10 rounded-lg border border-outline-variant/20"
              } p-10 rounded-lg ${featured ? "relative" : ""}`}
            >
              {featured && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary text-on-primary px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Polecany
                </div>
              )}

              <h3 className="font-headline text-2xl font-bold mb-2 mt-2">
                {p.name}
              </h3>
              <div className="text-primary font-headline text-4xl font-black mb-8">
                {p.price}
              </div>

              <ul className="space-y-4 mb-10 text-on-surface-variant">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="text-primary text-sm">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className={`w-full py-4 font-bold rounded-sm transition-all ${
                  featured
                    ? "bg-primary text-on-primary hover:bg-primary-container"
                    : "border border-outline-variant text-on-surface hover:bg-surface-bright"
                } text-center`}
              >
                {p.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const steps = [
    {
      n: "1",
      title: "Rozmowa i zakres",
      text: "Zaczynamy od celu, branży i oczekiwań. Dostajesz jasny plan i rekomendowany kierunek projektu.",
    },
    {
      n: "2",
      title: "Projekt i wdrożenie",
      text: "Przekładamy strategię na wygląd i UX. Projektujemy i kodujemy, dbając o wydajność i SEO techniczne.",
    },
    {
      n: "3",
      title: "Pomiar i rozwój",
      text: "Po wdrożeniu analizujemy dane, poprawiamy to co ważne i rozwijamy stronę wraz z Twoim biznesem.",
    },
  ];

  return (
    <section className="px-8 py-24 bg-surface-container-low border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="font-headline text-4xl font-extrabold mb-4">
            Jak działamy?
          </h2>
          <p className="text-on-surface-variant">
            Proces wypracowany w praktyce. Od briefu do wyników.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <span className="text-9xl font-headline font-black text-white/5 absolute -top-16 -left-8">
                {s.n}
              </span>
              <h4 className="font-headline text-xl font-bold mb-4 relative z-10">
                {s.title}
              </h4>
              <p className="text-on-surface-variant leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactInfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <Link href={href} className="text-lg font-bold hover:underline">
        {value}
      </Link>
    </div>
  );
}

function ContactSectionShell({
  city,
  ownerName,
  email,
  phone,
}: {
  city: string;
  ownerName: string;
  email: string;
  phone: string;
}) {
  return (
    <section id="contact" className="px-8 py-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h2 className="font-headline text-5xl font-extrabold mb-8">
            Porozmawiajmy o Twoim projekcie
          </h2>
          <p className="text-on-surface-variant text-lg mb-12">
            Wypełnij formularz, a przygotuję wycenę i propozycję
            rozwiązania dla Twojej strony w {city}.
          </p>

          <div className="space-y-6">
            <div className="space-y-4">
              <ContactInfoRow
                icon={<FaEnvelope />}
                label="Email"
                value={email}
                href={`mailto:${email}`}
              />
              <ContactInfoRow
                icon={<FaPhoneAlt />}
                label="Telefon"
                value={phone}
                href={`tel:${phone.replace(/\\s/g, "")}`}
              />
            </div>

            <p className="text-on-surface-variant/70">
              Szybka odpowiedź zwykle w ciągu 24h. Ty mówisz co chcesz
              osiągnąć, a ja dopasowuję plan działania.
            </p>
          </div>
        </div>

        <ZaprojektowaniContactForm ownerName={ownerName} city={city} />
      </div>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  const imageSrc =
    typeof post.mainImage === "string" &&
    (post.mainImage.startsWith("http://") ||
      post.mainImage.startsWith("https://") ||
      post.mainImage.startsWith("/"))
      ? post.mainImage
      : "/images/projects/quixy/hero.png";

  const href = `/oferta/${post.slug || post.url || post.postId}`;

  return (
    <div className="group">
      <div className="aspect-video mb-6 rounded-lg overflow-hidden relative">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <h4 className="font-headline text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {post.title}
      </h4>
      <p className="text-on-surface-variant text-sm">
        {post.intro?.slice(0, 110) || "Przeczytaj wpis i dowiedz się więcej."}
      </p>

      <div className="mt-4">
        <Link href={href} className="text-primary font-bold hover:underline">
          Otwórz wpis
        </Link>
      </div>
    </div>
  );
}

function BlogSection({ posts }: { posts: Post[] }) {
  return (
    <section className="px-8 py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="font-headline text-3xl font-extrabold">
            Ostatnie z bloga
          </h2>
          <Link
            href="/blog"
            className="text-primary font-bold hover:underline"
          >
            Wszystkie wpisy
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-on-surface-variant/70">
            Brak wpisów do wyświetlenia.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.postId} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default function ZaprojektowaniLandingPage(
  props: ZaprojektowaniLandingPageProps
) {
  return (
    <div className="bg-background text-on-surface">
      <main className="pt-24 overflow-hidden">
        <HeroSection city={props.city} ownerName={props.ownerName} />
        <TrustSection logos={props.logos} />
        <ServicesSection city={props.city} />
        <PortfolioSection
          cases={props.cases}
          otherProjects={props.otherProjects}
        />
        <PricingSection />
        <HowWeWorkSection />
        <ContactSectionShell
          city={props.city}
          ownerName={props.ownerName}
          email={props.email}
          phone={props.phone}
        />
        <BlogSection posts={props.blogPosts ?? []} />
      </main>
    </div>
  );
}

