"use client";

import Link from "next/link";
import { FaEnvelope, FaPaperPlane, FaPhone } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import donutImage from "@/public/assets/donuts.png";
import type { LandingPageContactContent } from "@/data/landingPages";
import { openCookiePopup } from "@/components/CookieConsent";

const DEFAULT_CONTACT_CONTENT: LandingPageContactContent = {
  title: "Masz pomysł na stronę internetową?",
  subtitle: "Zamów darmową wycenę, wypełniając formularz poniżej",
  imageAlt: "Zamów stronę internetową",
};

type ContactSectionProps = {
  content?: LandingPageContactContent;
};

export default function ContactSection({
  content = DEFAULT_CONTACT_CONTENT,
}: ContactSectionProps) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const t = {
    namePlaceholder: "Imię",
    phoneNumberPlaceholder: "Numer telefonu",
    messagePlaceholder: "Wiadomość",
    send: "Wyślij wiadomość",
    sending: "Wysyłanie…",
    success: "Dzięki! Wiadomość została wysłana.",
    errorGeneric: "Coś poszło nie tak. Spróbuj ponownie.",
    errorMissing: "Uzupełnij wszystkie pola.",
    errorInvalidPhoneNumber:
      "Podaj poprawny 9-cyfrowy numer telefonu (np. 721 417 154).",
  };

  /** Normalize to 9 digits: strip non-digits, optionally remove leading 48 (Polish country code). */
  const normalizePhoneNumber = (raw: string): string => {
    const digits = raw.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("48")) return digits.slice(2);
    return digits;
  };

  const isValidPhoneNumber = (raw: string): boolean => {
    const normalized = normalizePhoneNumber(raw);
    return /^[0-9]{9}$/.test(normalized);
  };

  const phoneDigitCount = normalizePhoneNumber(phoneValue).length;
  const phoneValid = isValidPhoneNumber(phoneValue);
  const phoneTouched = phoneValue.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setStatusMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const rawPhone = String(formData.get("phoneNumber") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim(); // honeypot

    if (!name || !rawPhone || !message) {
      setStatus("error");
      setStatusMessage(t.errorMissing);
      return;
    }
    if (!isValidPhoneNumber(rawPhone)) {
      setStatus("error");
      setStatusMessage(t.errorInvalidPhoneNumber);
      return;
    }
    const phoneNumber = normalizePhoneNumber(rawPhone);

    const response = await saveToFirestore(name, phoneNumber, message, website);
    if (response.success) {
      setStatus("success");
      setStatusMessage(t.success);
      form.reset();
      setPhoneValue("");
    } else {
      setStatus("error");
      setStatusMessage(response.message || t.errorGeneric);
    }
  };

  const saveToFirestore = async (
    name: string,
    phoneNumber: string,
    message: string,
    website: string,
  ) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneNumber, message, website }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) return { success: true, message: "" };
      return {
        success: false,
        message: data?.message || t.errorGeneric,
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: t.errorGeneric };
    }
  };
  return (
    <div className="relative w-full flex items-center justify-center">
      <div
        className="w-[1px] h-[1px] bg-transparent -top-32 left-0 absolute"
        id="darmowa-wycena"
      ></div>
      <div className="font-dosis w-full border-t-2 border-yellow-300 bg-slate-800/30 pb-24 pt-0 text-xl flex flex-col items-center justify-center z-[600] relative lg:pb-12">
        <div className="w-full bg-slate-800 px-4 py-8 lg:px-24 lg:py-20">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:gap-8">
            <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.12),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.94),rgba(15,23,42,0.82))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-200/85">
                Kontakt
              </p>
              <h2 className="mt-4 font-cocosharp text-3xl font-bold leading-tight text-yellow-300 sm:text-4xl">
                {content.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
                {content.subtitle}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                  <p className="text-sm font-semibold text-white">
                    Opisz projekt tak, jak Ci wygodnie
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Wystarczy krótki opis usługi, miasta albo celu strony.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                  <p className="text-sm font-semibold text-white">
                    Wrócę z kierunkiem i wyceną
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Najpierw porządkujemy zakres, potem dobieramy najlepszy model:
                    landing page, strona firmowa, sklep albo rozbudowa pod SEO.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="tel:+48721417154"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <FaPhone className="h-4 w-4 text-yellow-200" />
                  <span>721 417 154</span>
                </Link>
                <Link
                  href="mailto:hello@wesselpawel.com"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <FaEnvelope className="h-4 w-4 text-yellow-200" />
                  <span>hello@wesselpawel.com</span>
                </Link>
              </div>

              <div className="mt-8 overflow-hidden rounded-[26px] border border-white/10 bg-black/20 px-4 py-4 sm:px-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Krótka wiadomość wystarczy na start
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Odpowiadam zwykle szybko i od razu proponuję kolejny krok.
                    </p>
                  </div>
                  <Image
                    src={donutImage}
                    alt={content.imageAlt}
                    width={420}
                    height={420}
                    className="mx-auto w-full max-w-[220px] opacity-90 sm:mx-0"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-7">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                  Formularz
                </p>
                <p className="text-xl font-bold text-white sm:text-2xl">
                  Opisz projekt. Przygotuję kierunek i wycenę.
                </p>
                <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                  Napisz, czego potrzebujesz i jaki
                  efekt ma dać nowa strona.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-stretch">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-white" htmlFor="contact-name">
                        {t.namePlaceholder}
                      </label>
                      
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder={t.namePlaceholder}
                        autoComplete="name"
                        required
                        className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-yellow-300/70 focus:ring-2 focus:ring-yellow-300/20"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-white" htmlFor="contact-phone">
                        {t.phoneNumberPlaceholder}
                      </label>
                     
                      <input
                        id="contact-phone"
                        name="phoneNumber"
                        type="tel"
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                        placeholder={t.phoneNumberPlaceholder}
                        autoComplete="tel"
                        required
                        inputMode="numeric"
                        aria-invalid={phoneTouched && !phoneValid}
                        aria-describedby={
                          phoneTouched ? "contact-phone-hint" : undefined
                        }
                        className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-black outline-none transition focus:ring-2 ${
                          !phoneTouched
                            ? "border-white/10 focus:border-yellow-300/70 focus:ring-yellow-300/20"
                            : phoneValid
                              ? "border-green-500/60 focus:border-green-500 focus:ring-green-500/20"
                              : "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                        }`}
                      />
                      <p
                        id="contact-phone-hint"
                        className={`text-xs ${
                          !phoneTouched
                            ? "text-white/45"
                            : phoneValid
                              ? "text-green-300"
                              : "text-red-300"
                        }`}
                      >
                        {phoneTouched
                          ? phoneValid
                            ? "Numer wygląda poprawnie."
                            : `${phoneDigitCount}/9 cyfr. Podaj poprawny numer telefonu.`
                          : "Możesz wpisać numer z odstępami, np. 721 417 154."}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-full flex-col gap-2">
                    <label className="text-sm font-semibold text-white" htmlFor="contact-message">
                      {t.messagePlaceholder}
                    </label>
                    
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder={t.messagePlaceholder}
                      required
                      rows={8}
                      className="w-full flex-1 resize-y rounded-xl border border-white/10 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-yellow-300/70 focus:ring-2 focus:ring-yellow-300/20 md:min-h-[12rem]"
                    />
                  </div>
                </div>

                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-4 text-base font-bold text-black shadow-[0_12px_30px_rgba(253,224,71,0.24)] transition-all duration-200 hover:brightness-105 hover:shadow-[0_16px_36px_rgba(253,224,71,0.32)] disabled:opacity-60 disabled:hover:brightness-100"
                  >
                    <FaPaperPlane className="h-5 w-5" />
                    <span>{status === "sending" ? t.sending : t.send}</span>
                  </button>

                  <div className="grid grid-cols-1 gap-2 text-sm text-white/60 sm:grid-cols-2">
                    <p>Odpowiadam zwykle w 24h.</p>
                    <p>Krótka wiadomość wystarczy na start.</p>
                  </div>

                  {statusMessage ? (
                    <p
                      className={`text-sm ${
                        status === "success" ? "text-green-300" : "text-red-300"
                      }`}
                      role={status === "error" ? "alert" : "status"}
                    >
                      {statusMessage}
                    </p>
                  ) : null}
                </div>
              </form>
            </section>
          </div>
        </div>

        <div className="mt-12 w-full px-4 lg:px-6">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(253,224,71,0.12),transparent_32%),linear-gradient(180deg,rgba(30,41,59,0.92),rgba(15,23,42,0.88))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="grid grid-cols-1 gap-4 border-b border-white/10 p-5 md:grid-cols-3 lg:p-6">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
                  Właściciel serwisu
                </p>
                <p className="mt-3 text-xl font-bold text-white">PAWEŁ WESSEL</p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  Dane przedsiębiorcy i kontakt do bezpośredniej współpracy przy
                  stronach internetowych, landing page oraz SEO lokalnym.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
                  Dane firmy
                </p>
                <div className="mt-3 space-y-3 text-sm text-white/80">
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-white/60">NIP</span>
                    <span className="font-semibold text-white">8762494772</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3">
                    <span className="text-white/60">REGON</span>
                    <span className="font-semibold text-white">387851407</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/80">
                  Kontakt
                </p>
                <div className="mt-3 space-y-3">
                  <Link
                    title="Call me"
                    href="tel:+48721417154"
                    className="flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3 text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    
                    <span className="font-semibold text-white text-base">721 417 154</span>
                  </Link>
                  <Link
                    title="Send me an email"
                    href="mailto:hello@wesselpawel.com"
                    className="relative flex items-center justify-between gap-4 rounded-xl bg-white/5 px-4 py-3 text-white/85 transition hover:bg-white/10 hover:text-white"
                  >
                    
                    <span className="font-semibold text-white text-base">
                      hello@wesselpawel.com
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-5 py-4 text-sm text-white/65 lg:flex-row lg:items-center lg:justify-between lg:px-6">
              <p>© 2026 wesselpawel.com · PAWEŁ WESSEL</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/polityka-prywatnosci"
                  className="transition hover:text-yellow-200"
                >
                  Polityka prywatności
                </Link>
                <span className="text-white/25">/</span>
                <Link
                  href="/polityka-cookies"
                  className="transition hover:text-yellow-200"
                >
                  Polityka cookies
                </Link>
                <span className="text-white/25">/</span>
                <button
                  type="button"
                  onClick={openCookiePopup}
                  className="transition hover:text-yellow-200"
                >
                  Ustawienia cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
