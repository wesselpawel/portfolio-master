"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBars,
  FaChevronDown,
  FaGithub,
  FaLinkedin,
  FaLongArrowAltRight,
  FaTimes,
} from "react-icons/fa";
import authorImage from "@/public/assets/author.png";
import {
  getCurrentCityServiceLinks,
  getLandingPageBySlug,
  getSiblingCityLinks,
  type LandingPageLink,
} from "@/data/landingPages";

type NavLinkGroupProps = {
  title: string;
  description: string;
  links: LandingPageLink[];
  activeHref: string;
  onNavigate: () => void;
};

function getCurrentSlug(pathname: string): string | undefined {
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (!firstSegment) {
    return undefined;
  }

  return getLandingPageBySlug(firstSegment) ? firstSegment : undefined;
}

function getSectionHref(pathname: string, sectionId: string): string {
  if (pathname === "/") {
    return `/#${sectionId}`;
  }

  return `${pathname}#${sectionId}`;
}

function NavLinkGroup({
  title,
  description,
  links,
  activeHref,
  onNavigate,
}: NavLinkGroupProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => {
          const isActive = link.href === activeHref;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`inline-flex min-h-11 items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-yellow-300/60 bg-yellow-300/15 text-yellow-100"
                  : "border-white/10 bg-black/20 text-white/85 hover:border-white/20 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function NavRight() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const [isStructureMenuOpen, setIsStructureMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMeasuredViewport, setHasMeasuredViewport] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(true);

  const currentSlug = useMemo(
    () => (pathname ? getCurrentSlug(pathname) : undefined),
    [pathname],
  );
  const currentPage = currentSlug ? getLandingPageBySlug(currentSlug) : null;
  const currentCityServiceLinks = getCurrentCityServiceLinks(currentSlug, true);
  const siblingCityLinks = getSiblingCityLinks(currentSlug, 8);
  const activeHref = currentSlug ? `/${currentSlug}` : pathname || "/";

  useEffect(() => {
    setIsStructureMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function updateViewportState() {
      setIsDesktopViewport(window.innerWidth >= 1180);
      setHasMeasuredViewport(true);
    }

    updateViewportState();
    window.addEventListener("resize", updateViewportState);

    return () => {
      window.removeEventListener("resize", updateViewportState);
    };
  }, []);

  useEffect(() => {
    if (hasMeasuredViewport && isDesktopViewport) {
      setIsMobileMenuOpen(false);
    }

    if (hasMeasuredViewport && !isDesktopViewport) {
      setIsStructureMenuOpen(false);
    }
  }, [hasMeasuredViewport, isDesktopViewport]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!navRef.current) {
        return;
      }

      if (!navRef.current.contains(event.target as Node)) {
        setIsStructureMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsStructureMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!pathname || pathname.startsWith("/admin")) {
    return null;
  }

  const quickLinks = [
    {
      href: "/about",
      label: "O mnie",
    },
    {
      href: getSectionHref(pathname, "projects"),
      label: "Realizacje",
    },
    {
      href: getSectionHref(pathname, "contact"),
      label: "Kontakt",
    },
  ];

  const dropdownTitle = currentPage?.cityName
    ? `Struktura SEO dla ${currentPage.cityName}`
    : "Struktura SEO dla miast";
  const dropdownSubtitle = currentPage?.serviceKey
    ? "Przechodź między usługami w tym samym mieście oraz między wariantami miejskimi tej samej usługi."
    : "Otwórz siatkę usług i miast, żeby szybko przejść do kluczowych wariantów podstron.";

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-4 z-[1100] mx-auto w-[94vw] max-w-[1320px] text-white"
    >
      <div className="rounded-[30px] border border-white/10 bg-slate-950/72 px-3 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-white/5"
            onClick={() => {
              setIsStructureMenuOpen(false);
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="relative shrink-0">
              <Image
                src={authorImage}
                alt="Logo Paweł Wessel"
                width={88}
                height={88}
                className="h-12 w-12 rounded-full border border-yellow-300/30 object-cover shadow-[0_12px_30px_rgba(253,224,71,0.2)] transition duration-300 group-hover:rotate-6"
              />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border border-slate-950 bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.12)]" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-bold text-white sm:text-xl">
                Paweł Wessel
              </div>
              <div className="flex items-center gap-2 text-xs text-white/65 sm:text-sm">
                <span className="font-dosis">Strony, SEO i landing pages</span>
                <FaLongArrowAltRight className="hidden sm:block" />
              </div>
            </div>
          </Link>

          <div
            className={`items-center gap-2 ${
              hasMeasuredViewport && !isDesktopViewport
                ? "hidden"
                : "hidden lg:flex"
            }`}
          >
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/80 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              aria-expanded={isStructureMenuOpen}
              onClick={() => setIsStructureMenuOpen((value) => !value)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                isStructureMenuOpen
                  ? "border-yellow-300/60 bg-yellow-300/15 text-yellow-100"
                  : "border-white/10 bg-white/[0.03] text-white/85 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              Miasta i usługi
              <FaChevronDown
                className={`transition duration-300 ${
                  isStructureMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <Link
              href={getSectionHref(pathname, "contact")}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-yellow-300/40 bg-yellow-300 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(253,224,71,0.22)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Zamów wycenę
            </Link>

            <div className="ml-1 flex items-center gap-1 rounded-2xl border border-white/10 bg-black/20 px-2 py-2">
              <Link
                target="_blank"
                title="Przejdź do Github.com"
                href="https://github.com/wesiudev"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link
                target="_blank"
                title="Przejdź do Linkedin.com"
                href="https://linkedin.com/in/wesselpawel"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <FaLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div
            className={`items-center gap-2 ${
              hasMeasuredViewport && isDesktopViewport
                ? "hidden"
                : "flex lg:hidden"
            }`}
          >
            <Link
              href={getSectionHref(pathname, "contact")}
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-yellow-300/40 bg-yellow-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(253,224,71,0.22)] transition hover:brightness-105"
            >
              Kontakt
            </Link>
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isStructureMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={hasMeasuredViewport && !isDesktopViewport ? "hidden" : "hidden lg:block"}
            >
              <div className="mt-3 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
                <div className="flex flex-col gap-2 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-200/80">
                      Nawigacja programmatic SEO
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-white">
                      {dropdownTitle}
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/65">
                      {dropdownSubtitle}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70">
                    {currentPage?.cityName ? (
                      <>
                        <span className="font-semibold text-white">
                          Aktywna strona:
                        </span>{" "}
                        {currentPage.cityName}
                      </>
                    ) : (
                      "Przeglądaj najważniejsze miasta i usługi"
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_1fr]">
                  <NavLinkGroup
                    title={currentPage?.cityName ? `Usługi w ${currentPage.cityName}` : "Usługi w strukturze"}
                    description="To warianty usług dostępne w ramach bieżącego lub domyślnego miasta."
                    links={currentCityServiceLinks}
                    activeHref={activeHref}
                    onNavigate={() => setIsStructureMenuOpen(false)}
                  />
                  <NavLinkGroup
                    title="Ta sama usługa w innych miastach"
                    description="Przydatne do przeglądania skali wewnętrznej siatki city pages."
                    links={siblingCityLinks}
                    activeHref={activeHref}
                    onNavigate={() => setIsStructureMenuOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {isMobileMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className={`overflow-hidden ${
                hasMeasuredViewport && isDesktopViewport
                  ? "hidden"
                  : "lg:hidden"
              }`}
            >
              <div className="mt-3 max-h-[calc(100svh-6.5rem)] overflow-y-auto overscroll-contain rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 pr-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/80">
                    Menu
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {dropdownSubtitle}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/85 transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-4 space-y-4">
                  <NavLinkGroup
                    title={currentPage?.cityName ? `Usługi w ${currentPage.cityName}` : "Usługi"}
                    description="Najważniejsze podstrony dla bieżącego kontekstu miasta."
                    links={currentCityServiceLinks}
                    activeHref={activeHref}
                    onNavigate={() => setIsMobileMenuOpen(false)}
                  />
                  <NavLinkGroup
                    title="Inne miasta"
                    description="Ten sam typ podstrony w innych lokalizacjach."
                    links={siblingCityLinks.slice(0, 6)}
                    activeHref={activeHref}
                    onNavigate={() => setIsMobileMenuOpen(false)}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      target="_blank"
                      title="Przejdź do Github.com"
                      href="https://github.com/wesiudev"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/75 transition hover:bg-white/10 hover:text-white"
                    >
                      <FaGithub className="h-5 w-5" />
                    </Link>
                    <Link
                      target="_blank"
                      title="Przejdź do Linkedin.com"
                      href="https://linkedin.com/in/wesselpawel"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/75 transition hover:bg-white/10 hover:text-white"
                    >
                      <FaLinkedin className="h-5 w-5" />
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-white/70 transition hover:text-white"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
